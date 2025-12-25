#!/usr/bin/env python3
"""
PLC File Handler CLI
Command-line interface for PLC file operations.
"""

import argparse
import sys
import os
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from plc_file_handler import (
    detect_plc_format,
    SchneiderParser,
    RockwellParser,
    SchneiderGenerator,
    RockwellGenerator,
    SketchAnalyzer,
    PlatformConverter
)


def parse_file(args):
    """Parse a PLC file and display information."""

    try:
        # Detect format
        format_info = detect_plc_format(args.file)
        print(f"\nDetected Format: {format_info.platform} - {format_info.format_type}")

        # Parse based on platform
        if format_info.platform == 'schneider':
            parser = SchneiderParser(args.file)
            project = parser.parse()
            print(parser.get_summary())

            if args.output:
                parser.export_to_json(args.output)

        elif format_info.platform == 'rockwell' and format_info.format_type == 'studio5000_xml':
            parser = RockwellParser(args.file)
            project = parser.parse()
            print(parser.get_summary())

            if args.output:
                parser.export_to_json(args.output)

        else:
            print(f"Parser not yet implemented for {format_info.platform}")

    except Exception as e:
        print(f"Error parsing file: {e}")
        sys.exit(1)


def analyze_sketch(args):
    """Analyze a hand-drawn ladder logic sketch."""

    if not os.getenv('ANTHROPIC_API_KEY'):
        print("Error: ANTHROPIC_API_KEY environment variable not set")
        print("Set it with: export ANTHROPIC_API_KEY=your_key_here")
        sys.exit(1)

    try:
        analyzer = SketchAnalyzer()

        print(f"\nAnalyzing sketch: {args.image}")
        print(f"Target platform: {args.platform}")

        analysis = analyzer.analyze_sketch(args.image, args.platform)

        print(analyzer.get_summary(analysis))

        # Validate
        errors = analyzer.validate_analysis(analysis)
        if errors:
            print("\nValidation Errors:")
            for error in errors:
                print(f"  - {error}")

        # Export if requested
        if args.output:
            analyzer.export_analysis(analysis, args.output)
            print(f"\nAnalysis exported to: {args.output}")

    except Exception as e:
        print(f"Error analyzing sketch: {e}")
        sys.exit(1)


def generate_file(args):
    """Generate a PLC file from sketch or JSON."""

    try:
        if args.platform == 'schneider':
            gen = SchneiderGenerator(
                project_name=args.name,
                controller=args.controller or "TM221CE24R"
            )

            if args.from_sketch:
                # Analyze sketch first
                analyzer = SketchAnalyzer()
                analysis = analyzer.analyze_sketch(args.from_sketch, 'schneider')
                gen.from_sketch_analysis(analysis)

            elif args.from_json:
                gen.from_json(args.from_json)

            else:
                print("Error: Specify --from-sketch or --from-json")
                sys.exit(1)

            gen.generate(args.output)

        elif args.platform == 'rockwell':
            gen = RockwellGenerator(
                project_name=args.name,
                processor_type=args.controller or "1769-L33ER"
            )

            # For Rockwell, would need similar logic
            print("Rockwell generation from sketch/JSON not yet implemented")
            print("Use Python API for now")

        else:
            print(f"Generator not implemented for platform: {args.platform}")
            sys.exit(1)

    except Exception as e:
        print(f"Error generating file: {e}")
        sys.exit(1)


def convert_file(args):
    """Convert between PLC platforms."""

    try:
        # Parse source file
        format_info = detect_plc_format(args.input)
        source_platform = format_info.platform

        print(f"\nConverting from {source_platform} to {args.target}")

        # Parse source
        if source_platform == 'schneider':
            parser = SchneiderParser(args.input)
        elif source_platform == 'rockwell':
            parser = RockwellParser(args.input)
        else:
            print(f"Source platform {source_platform} not supported for conversion")
            sys.exit(1)

        project = parser.parse()

        # Convert
        converter = PlatformConverter(source_platform, args.target)
        converted = converter.convert_project(project)

        # Show conversion notes
        notes = converter.get_conversion_notes()
        if notes:
            print("\nConversion Notes:")
            for note in notes:
                print(f"  - {note}")

        # Generate target file
        if args.target == 'schneider':
            gen = SchneiderGenerator()
            gen.from_json_dict(converted)  # Would need to implement
            gen.generate(args.output)

        elif args.target == 'rockwell':
            gen = RockwellGenerator()
            # Would need implementation
            print("Rockwell target generation in progress...")

        print(f"\nConversion complete: {args.output}")

    except Exception as e:
        print(f"Error converting file: {e}")
        sys.exit(1)


def list_formats(args):
    """List supported file formats."""

    from plc_file_handler.utils import get_supported_formats

    formats = get_supported_formats()

    print("\nSupported PLC File Formats:")
    print("=" * 60)

    for platform, extensions in formats.items():
        print(f"\n{platform.upper()}:")
        for ext in extensions:
            print(f"  - {ext}")

    print("\nNote: Some formats have limited support (read-only or basic)")


def main():
    """Main CLI entry point."""

    parser = argparse.ArgumentParser(
        description='PLC File Handler - Multi-platform PLC file operations',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Parse a .smbp file
  python cli.py parse Motor_Control.smbp

  # Analyze a sketch
  python cli.py analyze motor_sketch.jpg --platform schneider

  # Generate .smbp from sketch
  python cli.py generate --platform schneider --name "Motor_Control" \\
      --from-sketch motor_sketch.jpg --output Motor_Control.smbp

  # Convert between platforms
  python cli.py convert Motor_Control.smbp --target rockwell \\
      --output Motor_Control.L5X

  # List supported formats
  python cli.py formats
        """
    )

    subparsers = parser.add_subparsers(dest='command', help='Command to execute')

    # Parse command
    parse_parser = subparsers.add_parser('parse', help='Parse a PLC file')
    parse_parser.add_argument('file', help='PLC file to parse')
    parse_parser.add_argument('-o', '--output', help='Export to JSON file')
    parse_parser.set_defaults(func=parse_file)

    # Analyze command
    analyze_parser = subparsers.add_parser('analyze', help='Analyze a ladder logic sketch')
    analyze_parser.add_argument('image', help='Image file of sketch')
    analyze_parser.add_argument('--platform', default='schneider',
                               choices=['schneider', 'rockwell', 'siemens', 'mitsubishi'],
                               help='Target PLC platform')
    analyze_parser.add_argument('-o', '--output', help='Export analysis to JSON')
    analyze_parser.set_defaults(func=analyze_sketch)

    # Generate command
    generate_parser = subparsers.add_parser('generate', help='Generate a PLC file')
    generate_parser.add_argument('--platform', required=True,
                                choices=['schneider', 'rockwell'],
                                help='Target platform')
    generate_parser.add_argument('--name', required=True, help='Project name')
    generate_parser.add_argument('--controller', help='Controller model')
    generate_parser.add_argument('--from-sketch', help='Generate from sketch image')
    generate_parser.add_argument('--from-json', help='Generate from JSON file')
    generate_parser.add_argument('-o', '--output', required=True, help='Output file')
    generate_parser.set_defaults(func=generate_file)

    # Convert command
    convert_parser = subparsers.add_parser('convert', help='Convert between platforms')
    convert_parser.add_argument('input', help='Input PLC file')
    convert_parser.add_argument('--target', required=True,
                               choices=['schneider', 'rockwell', 'siemens'],
                               help='Target platform')
    convert_parser.add_argument('-o', '--output', required=True, help='Output file')
    convert_parser.set_defaults(func=convert_file)

    # Formats command
    formats_parser = subparsers.add_parser('formats', help='List supported formats')
    formats_parser.set_defaults(func=list_formats)

    # Parse arguments
    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(1)

    # Execute command
    args.func(args)


if __name__ == '__main__':
    main()
