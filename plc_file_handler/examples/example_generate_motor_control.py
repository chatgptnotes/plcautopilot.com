#!/usr/bin/env python3
"""
Example: Generate Motor Start/Stop Control
Creates a complete .smbp file for Schneider M221 PLC
"""

import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from plc_file_handler import SchneiderGenerator


def main():
    """Generate motor control project."""

    print("Generating Motor Start/Stop Control Project")
    print("=" * 60)

    # Create generator
    gen = SchneiderGenerator(
        project_name="Motor_StartStop_Control",
        controller="TM221CE24R"
    )

    # Define tags
    print("\nAdding tags...")

    gen.add_tag("START_BTN", "%I0.0", "BOOL", "Green start push button (NO)")
    gen.add_tag("STOP_BTN", "%I0.1", "BOOL", "Red stop push button (NC)")
    gen.add_tag("OVERLOAD", "%I0.2", "BOOL", "Motor overload relay (NC)")
    gen.add_tag("MOTOR_RUN", "%Q0.0", "BOOL", "Motor contactor coil")
    gen.add_tag("RUN_INDICATOR", "%Q0.1", "BOOL", "Green indicator light")

    # Define ladder logic
    print("Adding ladder logic...")

    # Rung 0: Motor control with latching and safety
    gen.add_rung(
        rung_number=0,
        comment="Motor start/stop with latching and overload protection",
        elements=[
            {"type": "contact_no", "address": "%I0.0", "label": "START_BTN"},
            {"type": "contact_nc", "address": "%I0.1", "label": "STOP_BTN"},
            {"type": "contact_nc", "address": "%I0.2", "label": "OVERLOAD"},
            {"type": "contact_no", "address": "%Q0.0", "label": "MOTOR_RUN"},
            {"type": "coil", "address": "%Q0.0", "label": "MOTOR_RUN"}
        ]
    )

    # Rung 1: Run indicator (energized when motor running)
    gen.add_rung(
        rung_number=1,
        comment="Green run indicator follows motor status",
        elements=[
            {"type": "contact_no", "address": "%Q0.0", "label": "MOTOR_RUN"},
            {"type": "coil", "address": "%Q0.1", "label": "RUN_INDICATOR"}
        ]
    )

    # Define I/O configuration
    print("Configuring I/O modules...")

    gen.add_io_module("DI", "%I0", 8)   # 8 digital inputs
    gen.add_io_module("DO", "%Q0", 4)   # 4 digital outputs

    # Generate file
    output_file = "Motor_StartStop_Control.smbp"
    print(f"\nGenerating file: {output_file}")

    gen.generate(output_file)

    print("\n" + "=" * 60)
    print("SUCCESS! Project generated successfully.")
    print(f"\nFile: {output_file}")
    print("\nProject Details:")
    print(f"  - Name: Motor_StartStop_Control")
    print(f"  - Controller: TM221CE24R")
    print(f"  - Tags: 5")
    print(f"  - Rungs: 2")
    print(f"  - I/O Modules: 2")
    print("\nOpen this file in EcoStruxure Machine Expert Basic")
    print("\nWiring:")
    print("  - %I0.0: Start button (Green, NO)")
    print("  - %I0.1: Stop button (Red, NC)")
    print("  - %I0.2: Overload relay (NC)")
    print("  - %Q0.0: Motor contactor coil")
    print("  - %Q0.1: Run indicator lamp (Green)")


if __name__ == "__main__":
    main()
