"""
Schneider Electric .smbp File Parser
Parses EcoStruxure Machine Expert Basic project files.
"""

import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path
from typing import Dict, List, Optional
import json


class SchneiderParser:
    """Parser for Schneider Electric .smbp files."""

    def __init__(self, file_path: str):
        """
        Initialize parser with .smbp file path.

        Args:
            file_path: Path to .smbp file
        """
        self.file_path = Path(file_path)
        self.project_data = {}
        self.ladder_logic = []
        self.tags = []
        self.io_config = {}

    def parse(self) -> Dict:
        """
        Parse .smbp file and extract all project data.

        Returns:
            Dictionary containing complete project structure
        """
        if not self.file_path.exists():
            raise FileNotFoundError(f"File not found: {self.file_path}")

        # Extract ZIP archive
        with zipfile.ZipFile(self.file_path, 'r') as zip_ref:
            # List all files in archive
            file_list = zip_ref.namelist()
            print(f"Found {len(file_list)} files in archive")

            # Extract to temporary directory
            temp_dir = Path(f"/tmp/smbp_{self.file_path.stem}")
            temp_dir.mkdir(exist_ok=True)
            zip_ref.extractall(temp_dir)

            # Parse project structure
            self._parse_project_files(temp_dir)

        return self._build_project_dict()

    def _parse_project_files(self, project_dir: Path):
        """Parse extracted project files."""

        # Look for main project file (typically .xml or .mxbp)
        for xml_file in project_dir.rglob('*.xml'):
            try:
                self._parse_xml_file(xml_file)
            except ET.ParseError as e:
                print(f"Warning: Could not parse {xml_file}: {e}")

        # Look for ladder logic files
        for ld_file in project_dir.rglob('*.ld'):
            self._parse_ladder_file(ld_file)

    def _parse_xml_file(self, xml_path: Path):
        """Parse XML file from project."""

        tree = ET.parse(xml_path)
        root = tree.getroot()

        # Extract project metadata
        if 'project' in xml_path.name.lower() or root.tag.endswith('Project'):
            self._extract_project_metadata(root)

        # Extract tags/variables
        if 'variable' in xml_path.name.lower() or self._has_variables(root):
            self._extract_variables(root)

        # Extract I/O configuration
        if 'io' in xml_path.name.lower() or 'config' in xml_path.name.lower():
            self._extract_io_config(root)

    def _extract_project_metadata(self, root: ET.Element):
        """Extract project name, version, controller type."""

        # This is a template - actual structure depends on Schneider's schema
        for elem in root.iter():
            if 'name' in elem.attrib:
                self.project_data['name'] = elem.attrib['name']
            if 'version' in elem.attrib:
                self.project_data['version'] = elem.attrib['version']
            if 'controller' in elem.tag.lower():
                self.project_data['controller'] = elem.text or elem.attrib.get('type', 'Unknown')

    def _has_variables(self, root: ET.Element) -> bool:
        """Check if XML contains variable definitions."""
        for elem in root.iter():
            if 'variable' in elem.tag.lower() or 'tag' in elem.tag.lower():
                return True
        return False

    def _extract_variables(self, root: ET.Element):
        """Extract tag/variable definitions."""

        for var_elem in root.iter():
            if 'variable' in var_elem.tag.lower():
                tag = {
                    'name': var_elem.attrib.get('name', ''),
                    'address': var_elem.attrib.get('address', ''),
                    'type': var_elem.attrib.get('type', 'BOOL'),
                    'comment': var_elem.attrib.get('comment', '')
                }
                if tag['name']:
                    self.tags.append(tag)

    def _extract_io_config(self, root: ET.Element):
        """Extract I/O module configuration."""

        io_modules = []
        for module in root.iter():
            if 'module' in module.tag.lower():
                io_modules.append({
                    'type': module.attrib.get('type', ''),
                    'address': module.attrib.get('address', ''),
                    'channels': module.attrib.get('channels', '0')
                })

        self.io_config['modules'] = io_modules

    def _parse_ladder_file(self, ld_path: Path):
        """Parse ladder logic file (if text-based)."""

        # This is a placeholder - actual ladder logic might be in binary or XML
        with open(ld_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        # Simple pattern matching for ladder elements (very basic)
        if '|' in content and '(' in content:
            self.ladder_logic.append({
                'file': ld_path.name,
                'content': content[:500]  # First 500 chars as preview
            })

    def _build_project_dict(self) -> Dict:
        """Build final project dictionary."""

        return {
            'platform': 'schneider_m221',
            'project_name': self.project_data.get('name', self.file_path.stem),
            'version': self.project_data.get('version', '1.0'),
            'controller': self.project_data.get('controller', 'M221'),
            'tags': self.tags,
            'io_config': self.io_config,
            'ladder_logic': self.ladder_logic,
            'file_path': str(self.file_path)
        }

    def get_summary(self) -> str:
        """Get human-readable project summary."""

        data = self._build_project_dict()

        summary = f"""
Schneider Electric Project Analysis
====================================
Project: {data['project_name']}
Platform: {data['platform']}
Controller: {data['controller']}
Version: {data['version']}

Tags/Variables: {len(data['tags'])}
I/O Modules: {len(data['io_config'].get('modules', []))}
Ladder Logic Files: {len(data['ladder_logic'])}

Tag Summary:
"""

        for tag in data['tags'][:10]:  # Show first 10 tags
            summary += f"  - {tag['address']}: {tag['name']} ({tag['type']}) - {tag['comment']}\n"

        if len(data['tags']) > 10:
            summary += f"  ... and {len(data['tags']) - 10} more tags\n"

        return summary

    def extract_ladder_logic(self) -> List[Dict]:
        """
        Extract ladder logic in structured format.

        Returns:
            List of networks/rungs with elements
        """
        # This would need deeper parsing of the actual ladder logic structure
        # For now, return what we've extracted
        return self.ladder_logic

    def get_tags_by_type(self, tag_type: str) -> List[Dict]:
        """
        Get all tags of a specific type.

        Args:
            tag_type: Type of tag (BOOL, INT, REAL, etc.)

        Returns:
            List of matching tags
        """
        return [tag for tag in self.tags if tag['type'] == tag_type]

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


# Example usage
if __name__ == "__main__":
    parser = SchneiderParser("example.smbp")
    try:
        project = parser.parse()
        print(parser.get_summary())
        parser.export_to_json("project_export.json")
    except FileNotFoundError:
        print("Example file not found. This parser is ready for actual .smbp files.")
