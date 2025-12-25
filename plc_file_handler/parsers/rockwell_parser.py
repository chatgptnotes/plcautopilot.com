"""
Rockwell/Allen-Bradley L5X File Parser
Parses Studio 5000 Logix Designer XML export files.
"""

import xml.etree.ElementTree as ET
from pathlib import Path
from typing import Dict, List, Optional
import json


class RockwellParser:
    """Parser for Rockwell .L5X (XML) files."""

    def __init__(self, file_path: str):
        """
        Initialize parser with .L5X file path.

        Args:
            file_path: Path to .L5X file
        """
        self.file_path = Path(file_path)
        self.project_data = {}
        self.controller = {}
        self.tags = []
        self.programs = []
        self.routines = []
        self.io_config = []

    def parse(self) -> Dict:
        """
        Parse .L5X file and extract all project data.

        Returns:
            Dictionary containing complete project structure
        """
        if not self.file_path.exists():
            raise FileNotFoundError(f"File not found: {self.file_path}")

        tree = ET.parse(self.file_path)
        root = tree.getroot()

        # L5X files have specific structure
        self._parse_controller(root)
        self._parse_tags(root)
        self._parse_programs(root)
        self._parse_io_config(root)

        return self._build_project_dict()

    def _parse_controller(self, root: ET.Element):
        """Parse controller information."""

        # Find Controller element
        controller = root.find('.//Controller')
        if controller is not None:
            self.controller = {
                'name': controller.attrib.get('Name', 'Unknown'),
                'processor_type': controller.attrib.get('ProcessorType', 'Unknown'),
                'major_revision': controller.attrib.get('MajorRev', ''),
                'minor_revision': controller.attrib.get('MinorRev', ''),
                'time_slice': controller.attrib.get('TimeSlice', '20')
            }

    def _parse_tags(self, root: ET.Element):
        """Parse tag definitions."""

        # Controller-scoped tags
        for tag in root.findall('.//Controller/Tags/Tag'):
            self._extract_tag(tag, scope='Controller')

        # Program-scoped tags
        for tag in root.findall('.//Program/Tags/Tag'):
            program_name = tag.getparent().getparent().attrib.get('Name', 'Unknown')
            self._extract_tag(tag, scope=f'Program:{program_name}')

    def _extract_tag(self, tag_elem: ET.Element, scope: str):
        """Extract individual tag data."""

        tag_data = {
            'name': tag_elem.attrib.get('Name', ''),
            'type': tag_elem.attrib.get('TagType', 'Base'),
            'data_type': tag_elem.attrib.get('DataType', 'BOOL'),
            'scope': scope,
            'radix': tag_elem.attrib.get('Radix', 'Decimal'),
            'constant': tag_elem.attrib.get('Constant', 'false') == 'true',
            'external_access': tag_elem.attrib.get('ExternalAccess', 'Read/Write')
        }

        # Get description/comment
        desc = tag_elem.find('Description')
        if desc is not None and desc.text:
            tag_data['comment'] = desc.text.strip()
        else:
            tag_data['comment'] = ''

        # Get initial value if present
        data = tag_elem.find('Data')
        if data is not None:
            tag_data['value'] = data.text
        else:
            tag_data['value'] = None

        self.tags.append(tag_data)

    def _parse_programs(self, root: ET.Element):
        """Parse program structure."""

        for program in root.findall('.//Program'):
            program_data = {
                'name': program.attrib.get('Name', ''),
                'type': program.attrib.get('Type', 'Normal'),
                'test_edits': program.attrib.get('TestEdits', 'false') == 'true',
                'routines': []
            }

            # Parse routines in this program
            for routine in program.findall('.//Routine'):
                routine_data = self._parse_routine(routine)
                program_data['routines'].append(routine_data)

            self.programs.append(program_data)

    def _parse_routine(self, routine_elem: ET.Element) -> Dict:
        """Parse individual routine."""

        routine_data = {
            'name': routine_elem.attrib.get('Name', ''),
            'type': routine_elem.attrib.get('Type', 'RLL'),  # RLL = Ladder Logic
            'rungs': []
        }

        # Parse ladder logic rungs
        if routine_data['type'] == 'RLL':
            rll_content = routine_elem.find('.//RLLContent')
            if rll_content is not None:
                for rung in rll_content.findall('Rung'):
                    rung_data = {
                        'number': rung.attrib.get('Number', '0'),
                        'type': rung.attrib.get('Type', 'N'),
                        'comment': '',
                        'text': ''
                    }

                    # Get rung comment
                    comment = rung.find('Comment')
                    if comment is not None and comment.text:
                        rung_data['comment'] = comment.text.strip()

                    # Get rung logic (text format)
                    text = rung.find('Text')
                    if text is not None and text.text:
                        rung_data['text'] = text.text.strip()

                    routine_data['rungs'].append(rung_data)

        self.routines.append(routine_data)
        return routine_data

    def _parse_io_config(self, root: ET.Element):
        """Parse I/O configuration."""

        # Find all modules
        for module in root.findall('.//Module'):
            module_data = {
                'name': module.attrib.get('Name', ''),
                'catalog_number': module.attrib.get('CatalogNumber', ''),
                'vendor': module.attrib.get('Vendor', '1'),  # 1 = Rockwell
                'type': module.attrib.get('Type', ''),
                'parent': module.attrib.get('ParentModule', 'Local')
            }

            # Get port configuration
            ports = module.findall('.//Port')
            module_data['ports'] = []
            for port in ports:
                module_data['ports'].append({
                    'id': port.attrib.get('Id', ''),
                    'address': port.attrib.get('Address', ''),
                    'type': port.attrib.get('Type', '')
                })

            self.io_config.append(module_data)

    def _build_project_dict(self) -> Dict:
        """Build final project dictionary."""

        return {
            'platform': 'rockwell_logix',
            'project_name': self.controller.get('name', self.file_path.stem),
            'controller': self.controller,
            'tags': self.tags,
            'programs': self.programs,
            'routines': self.routines,
            'io_config': self.io_config,
            'file_path': str(self.file_path)
        }

    def get_summary(self) -> str:
        """Get human-readable project summary."""

        data = self._build_project_dict()

        summary = f"""
Rockwell Automation Project Analysis
=====================================
Project: {data['project_name']}
Platform: {data['platform']}
Controller: {data['controller'].get('processor_type', 'Unknown')}
Firmware: {data['controller'].get('major_revision', '')}.{data['controller'].get('minor_revision', '')}

Programs: {len(data['programs'])}
Routines: {len(data['routines'])}
Tags: {len(data['tags'])}
I/O Modules: {len(data['io_config'])}

Tag Summary (First 10):
"""

        for tag in data['tags'][:10]:
            scope_short = tag['scope'].split(':')[0]
            summary += f"  - {tag['name']} ({tag['data_type']}) [{scope_short}] - {tag['comment']}\n"

        if len(data['tags']) > 10:
            summary += f"  ... and {len(data['tags']) - 10} more tags\n"

        summary += "\nProgram Structure:\n"
        for program in data['programs']:
            summary += f"  - {program['name']}: {len(program['routines'])} routines\n"
            for routine in program['routines'][:3]:  # Show first 3 routines
                rung_count = len(routine.get('rungs', []))
                summary += f"    └─ {routine['name']} ({routine['type']}): {rung_count} rungs\n"

        return summary

    def get_ladder_logic_text(self, program_name: str, routine_name: str) -> str:
        """
        Get ladder logic text for a specific routine.

        Args:
            program_name: Name of the program
            routine_name: Name of the routine

        Returns:
            Formatted ladder logic text
        """
        for program in self.programs:
            if program['name'] == program_name:
                for routine in program['routines']:
                    if routine['name'] == routine_name:
                        output = f"Routine: {routine_name} ({routine['type']})\n"
                        output += "=" * 60 + "\n\n"

                        for rung in routine.get('rungs', []):
                            output += f"Rung {rung['number']}:\n"
                            if rung['comment']:
                                output += f"  Comment: {rung['comment']}\n"
                            output += f"  Logic: {rung['text']}\n\n"

                        return output

        return f"Routine '{routine_name}' not found in program '{program_name}'"

    def export_to_json(self, output_path: str):
        """
        Export parsed project to JSON.

        Args:
            output_path: Path to output JSON file
        """
        data = self._build_project_dict()

        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)

        print(f"Project exported to: {output_path}")

    def find_tag(self, tag_name: str) -> Optional[Dict]:
        """
        Find a tag by name.

        Args:
            tag_name: Name of the tag to find

        Returns:
            Tag dictionary if found, None otherwise
        """
        for tag in self.tags:
            if tag['name'] == tag_name:
                return tag
        return None


# Example usage
if __name__ == "__main__":
    parser = RockwellParser("example.L5X")
    try:
        project = parser.parse()
        print(parser.get_summary())
        parser.export_to_json("rockwell_export.json")
    except FileNotFoundError:
        print("Example file not found. This parser is ready for actual .L5X files.")
