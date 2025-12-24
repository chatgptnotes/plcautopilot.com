"""
Schneider Electric .smbp File Generator
Creates EcoStruxure Machine Expert Basic project files from ladder logic data.
"""

import zipfile
import xml.etree.ElementTree as ET
from xml.dom import minidom
from pathlib import Path
from typing import Dict, List
from datetime import datetime
import uuid


class SchneiderGenerator:
    """Generator for Schneider Electric .smbp files."""

    def __init__(self, project_name: str = "New_Project", controller: str = "TM221CE24R"):
        """
        Initialize generator.

        Args:
            project_name: Name of the project
            controller: Controller model (TM221CE24R, TM241CE24R, etc.)
        """
        self.project_name = project_name
        self.controller = controller
        self.tags = []
        self.rungs = []
        self.io_config = []
        self.version = "1.0"
        self.author = "PLCAutoPilot"

    def add_tag(self, name: str, address: str, data_type: str = "BOOL", comment: str = ""):
        """
        Add a tag/variable to the project.

        Args:
            name: Tag name
            address: PLC address (%I0.0, %Q0.0, %M0, etc.)
            data_type: Data type (BOOL, INT, REAL, etc.)
            comment: Description
        """
        tag = {
            'name': name,
            'address': address,
            'type': data_type,
            'comment': comment
        }
        self.tags.append(tag)

    def add_rung(self, rung_number: int, elements: List[Dict], comment: str = ""):
        """
        Add a ladder logic rung.

        Args:
            rung_number: Rung number (0, 1, 2, ...)
            elements: List of ladder elements (contacts, coils, timers, etc.)
            comment: Rung description

        Example elements:
            [
                {"type": "contact_no", "address": "%I0.0", "label": "START"},
                {"type": "coil", "address": "%Q0.0", "label": "MOTOR"}
            ]
        """
        rung = {
            'number': rung_number,
            'comment': comment,
            'elements': elements
        }
        self.rungs.append(rung)

    def add_io_module(self, module_type: str, address: str, channels: int):
        """
        Add I/O module configuration.

        Args:
            module_type: Module type (DI, DO, AI, AO)
            address: Module address
            channels: Number of channels
        """
        module = {
            'type': module_type,
            'address': address,
            'channels': channels
        }
        self.io_config.append(module)

    def generate(self, output_path: str):
        """
        Generate .smbp file.

        Args:
            output_path: Path for output .smbp file
        """
        output_file = Path(output_path)

        # Create temporary directory for project files
        temp_dir = Path(f"/tmp/smbp_gen_{uuid.uuid4().hex[:8]}")
        temp_dir.mkdir(exist_ok=True, parents=True)

        # Generate project files
        self._generate_project_xml(temp_dir)
        self._generate_variables_xml(temp_dir)
        self._generate_ladder_logic(temp_dir)
        self._generate_io_config_xml(temp_dir)

        # Create .smbp (ZIP) archive
        self._create_smbp_archive(temp_dir, output_file)

        print(f"Generated .smbp file: {output_file}")
        print(f"  - {len(self.tags)} tags")
        print(f"  - {len(self.rungs)} rungs")
        print(f"  - {len(self.io_config)} I/O modules")

        # Cleanup
        import shutil
        shutil.rmtree(temp_dir)

    def _generate_project_xml(self, project_dir: Path):
        """Generate main project XML file."""

        root = ET.Element('Project')
        root.set('Name', self.project_name)
        root.set('Version', self.version)
        root.set('Created', datetime.now().isoformat())
        root.set('Author', self.author)

        # Controller configuration
        controller_elem = ET.SubElement(root, 'Controller')
        controller_elem.set('Type', self.controller)
        controller_elem.set('CatalogNumber', self.controller)

        # Application info
        app_elem = ET.SubElement(root, 'Application')
        app_elem.set('Name', 'Application')
        app_elem.set('Type', 'Ladder')

        # Write to file
        xml_str = self._prettify_xml(root)
        project_file = project_dir / 'project.xml'
        with open(project_file, 'w', encoding='utf-8') as f:
            f.write(xml_str)

    def _generate_variables_xml(self, project_dir: Path):
        """Generate variables/tags XML file."""

        root = ET.Element('Variables')

        for tag in self.tags:
            var_elem = ET.SubElement(root, 'Variable')
            var_elem.set('Name', tag['name'])
            var_elem.set('Address', tag['address'])
            var_elem.set('Type', tag['type'])

            if tag['comment']:
                comment_elem = ET.SubElement(var_elem, 'Comment')
                comment_elem.text = tag['comment']

        # Write to file
        xml_str = self._prettify_xml(root)
        var_file = project_dir / 'variables.xml'
        with open(var_file, 'w', encoding='utf-8') as f:
            f.write(xml_str)

    def _generate_ladder_logic(self, project_dir: Path):
        """Generate ladder logic XML file."""

        root = ET.Element('LadderLogic')
        root.set('Name', 'Main')

        # Add networks/rungs
        for rung in sorted(self.rungs, key=lambda x: x['number']):
            network = ET.SubElement(root, 'Network')
            network.set('Number', str(rung['number']))

            if rung['comment']:
                comment_elem = ET.SubElement(network, 'Comment')
                comment_elem.text = rung['comment']

            # Add rung elements
            rung_elem = ET.SubElement(network, 'Rung')

            for elem in rung['elements']:
                self._add_ladder_element(rung_elem, elem)

        # Write to file
        xml_str = self._prettify_xml(root)
        ladder_file = project_dir / 'ladder.xml'
        with open(ladder_file, 'w', encoding='utf-8') as f:
            f.write(xml_str)

    def _add_ladder_element(self, parent: ET.Element, element: Dict):
        """Add individual ladder logic element to XML."""

        elem_type = element['type']

        if elem_type == 'contact_no':
            contact = ET.SubElement(parent, 'Contact')
            contact.set('Type', 'NO')
            contact.set('Address', element['address'])
            if 'label' in element:
                contact.set('Label', element['label'])

        elif elem_type == 'contact_nc':
            contact = ET.SubElement(parent, 'Contact')
            contact.set('Type', 'NC')
            contact.set('Address', element['address'])
            if 'label' in element:
                contact.set('Label', element['label'])

        elif elem_type == 'coil':
            coil = ET.SubElement(parent, 'Coil')
            coil.set('Type', 'Standard')
            coil.set('Address', element['address'])
            if 'label' in element:
                coil.set('Label', element['label'])

        elif elem_type == 'coil_set':
            coil = ET.SubElement(parent, 'Coil')
            coil.set('Type', 'Set')
            coil.set('Address', element['address'])
            if 'label' in element:
                coil.set('Label', element['label'])

        elif elem_type == 'coil_reset':
            coil = ET.SubElement(parent, 'Coil')
            coil.set('Type', 'Reset')
            coil.set('Address', element['address'])
            if 'label' in element:
                coil.set('Label', element['label'])

        elif elem_type == 'timer_ton':
            timer = ET.SubElement(parent, 'FunctionBlock')
            timer.set('Type', 'TON')
            timer.set('Instance', element['address'])

            if 'preset' in element:
                param = ET.SubElement(timer, 'Parameter')
                param.set('Name', 'PT')
                param.set('Value', element['preset'])

        elif elem_type == 'counter_ctu':
            counter = ET.SubElement(parent, 'FunctionBlock')
            counter.set('Type', 'CTU')
            counter.set('Instance', element['address'])

            if 'preset' in element:
                param = ET.SubElement(counter, 'Parameter')
                param.set('Name', 'PV')
                param.set('Value', element['preset'])

        else:
            # Generic function block
            fb = ET.SubElement(parent, 'FunctionBlock')
            fb.set('Type', elem_type.upper())
            fb.set('Instance', element.get('address', ''))

    def _generate_io_config_xml(self, project_dir: Path):
        """Generate I/O configuration XML file."""

        root = ET.Element('IOConfiguration')

        for module in self.io_config:
            module_elem = ET.SubElement(root, 'Module')
            module_elem.set('Type', module['type'])
            module_elem.set('Address', module['address'])
            module_elem.set('Channels', str(module['channels']))

        # Write to file
        xml_str = self._prettify_xml(root)
        io_file = project_dir / 'io_config.xml'
        with open(io_file, 'w', encoding='utf-8') as f:
            f.write(xml_str)

    def _prettify_xml(self, elem: ET.Element) -> str:
        """Return pretty-printed XML string."""

        rough_string = ET.tostring(elem, encoding='utf-8')
        reparsed = minidom.parseString(rough_string)
        return reparsed.toprettyxml(indent="  ")

    def _create_smbp_archive(self, project_dir: Path, output_path: Path):
        """Create .smbp ZIP archive from project files."""

        with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for file in project_dir.rglob('*'):
                if file.is_file():
                    arcname = file.relative_to(project_dir)
                    zipf.write(file, arcname)

    def from_sketch_analysis(self, analysis: Dict):
        """
        Populate generator from sketch analysis result.

        Args:
            analysis: Output from SketchAnalyzer
        """
        # Add tags
        for tag in analysis.get('tags_detected', []):
            self.add_tag(
                name=tag['name'],
                address=tag['address'],
                data_type=tag.get('data_type', 'BOOL'),
                comment=tag.get('comment', '')
            )

        # Add rungs
        for rung in analysis.get('rungs', []):
            self.add_rung(
                rung_number=rung['rung_number'],
                elements=rung['elements'],
                comment=rung.get('comment', '')
            )

        print(f"Loaded from sketch analysis: {len(self.tags)} tags, {len(self.rungs)} rungs")

    def from_json(self, json_path: str):
        """
        Load project data from JSON file.

        Args:
            json_path: Path to JSON file
        """
        import json

        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        self.project_name = data.get('project_name', self.project_name)
        self.controller = data.get('controller', self.controller)

        # Load tags
        for tag in data.get('tags', []):
            self.add_tag(
                name=tag['name'],
                address=tag['address'],
                data_type=tag.get('type', 'BOOL'),
                comment=tag.get('comment', '')
            )

        # Load rungs (if available)
        if 'rungs' in data:
            for rung in data['rungs']:
                self.add_rung(
                    rung_number=rung['rung_number'],
                    elements=rung['elements'],
                    comment=rung.get('comment', '')
                )


# Example usage
if __name__ == "__main__":
    # Create a simple motor control project
    gen = SchneiderGenerator(
        project_name="Motor_Control",
        controller="TM221CE24R"
    )

    # Add tags
    gen.add_tag("START_BTN", "%I0.0", "BOOL", "Start push button")
    gen.add_tag("STOP_BTN", "%I0.1", "BOOL", "Stop push button")
    gen.add_tag("MOTOR_RUN", "%Q0.0", "BOOL", "Motor contactor")

    # Add ladder logic rung (latching motor control)
    gen.add_rung(
        rung_number=0,
        comment="Motor start/stop control with latching",
        elements=[
            {"type": "contact_no", "address": "%I0.0", "label": "START_BTN"},
            {"type": "contact_nc", "address": "%I0.1", "label": "STOP_BTN"},
            {"type": "contact_no", "address": "%Q0.0", "label": "MOTOR_RUN"},
            {"type": "coil", "address": "%Q0.0", "label": "MOTOR_RUN"}
        ]
    )

    # Add I/O configuration
    gen.add_io_module("DI", "%I0", 8)
    gen.add_io_module("DO", "%Q0", 4)

    # Generate .smbp file
    gen.generate("Motor_Control.smbp")

    print("\nExample .smbp file generated successfully!")
    print("This file can be opened in EcoStruxure Machine Expert Basic")
