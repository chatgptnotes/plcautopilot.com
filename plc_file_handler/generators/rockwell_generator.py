"""
Rockwell/Allen-Bradley .L5X File Generator
Creates Studio 5000 Logix Designer XML export files.
"""

import xml.etree.ElementTree as ET
from xml.dom import minidom
from pathlib import Path
from typing import Dict, List
from datetime import datetime


class RockwellGenerator:
    """Generator for Rockwell .L5X (XML) files."""

    def __init__(self, project_name: str = "New_Project", processor_type: str = "1769-L33ER"):
        """
        Initialize generator.

        Args:
            project_name: Controller/project name
            processor_type: Processor catalog number
        """
        self.project_name = project_name
        self.processor_type = processor_type
        self.tags = []
        self.rungs = []
        self.program_name = "MainProgram"
        self.routine_name = "MainRoutine"

    def add_tag(self, name: str, data_type: str = "BOOL", scope: str = "Controller",
                comment: str = "", value: str = "0"):
        """
        Add a tag to the project.

        Args:
            name: Tag name
            data_type: Data type (BOOL, DINT, REAL, etc.)
            scope: Tag scope (Controller or Program)
            comment: Description
            value: Initial value
        """
        tag = {
            'name': name,
            'data_type': data_type,
            'scope': scope,
            'comment': comment,
            'value': value
        }
        self.tags.append(tag)

    def add_rung(self, rung_number: int, logic_text: str, comment: str = ""):
        """
        Add a ladder logic rung.

        Args:
            rung_number: Rung number
            logic_text: Rung logic in Rockwell text format
            comment: Rung description

        Example logic_text:
            "XIC(START_BTN)XIO(STOP_BTN)XIC(MOTOR_RUN)OTE(MOTOR_RUN);"
        """
        rung = {
            'number': rung_number,
            'comment': comment,
            'text': logic_text
        }
        self.rungs.append(rung)

    def generate(self, output_path: str):
        """
        Generate .L5X file.

        Args:
            output_path: Path for output .L5X file
        """
        # Create root L5X structure
        root = ET.Element('RSLogix5000Content')
        root.set('SchemaRevision', '1.0')
        root.set('SoftwareRevision', '32.00')
        root.set('TargetName', self.project_name)
        root.set('TargetType', 'Controller')
        root.set('ContainsContext', 'true')
        root.set('ExportDate', datetime.now().strftime('%a %b %d %H:%M:%S %Y'))
        root.set('ExportOptions', 'References NoRawData L5KData DecoratedData Context Dependencies ForceProtectedEncoding AllProjDocTrans')

        # Add Controller
        controller = ET.SubElement(root, 'Controller')
        controller.set('Use', 'Context')
        controller.set('Name', self.project_name)
        controller.set('ProcessorType', self.processor_type)
        controller.set('MajorRev', '32')
        controller.set('MinorRev', '11')
        controller.set('TimeSlice', '20')
        controller.set('ShareUnusedTimeSlice', '1')

        # Add tags
        self._add_tags(controller)

        # Add programs
        self._add_programs(controller)

        # Add I/O configuration placeholder
        self._add_io_config(controller)

        # Write to file
        xml_str = self._prettify_xml(root)
        output_file = Path(output_path)

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n')
            f.write(xml_str)

        print(f"Generated .L5X file: {output_file}")
        print(f"  - {len(self.tags)} tags")
        print(f"  - {len(self.rungs)} rungs")

    def _add_tags(self, controller: ET.Element):
        """Add controller and program tags."""

        tags_elem = ET.SubElement(controller, 'Tags')

        for tag in self.tags:
            if tag['scope'] == 'Controller':
                tag_elem = ET.SubElement(tags_elem, 'Tag')
                tag_elem.set('Name', tag['name'])
                tag_elem.set('TagType', 'Base')
                tag_elem.set('DataType', tag['data_type'])
                tag_elem.set('Radix', 'Decimal')
                tag_elem.set('Constant', 'false')
                tag_elem.set('ExternalAccess', 'Read/Write')

                # Add description
                if tag['comment']:
                    desc = ET.SubElement(tag_elem, 'Description')
                    desc_cdata = ET.SubElement(desc, 'CData')
                    desc_cdata.text = tag['comment']

                # Add data/value
                data = ET.SubElement(tag_elem, 'Data')
                data.set('Format', 'Decorated')
                data_value = ET.SubElement(data, 'DataValue')
                data_value.set('DataType', tag['data_type'])
                data_value.set('Value', tag['value'])

    def _add_programs(self, controller: ET.Element):
        """Add programs and routines."""

        programs_elem = ET.SubElement(controller, 'Programs')

        program = ET.SubElement(programs_elem, 'Program')
        program.set('Use', 'Context')
        program.set('Name', self.program_name)
        program.set('TestEdits', 'false')
        program.set('Disabled', 'false')
        program.set('UseAsFolder', 'false')

        # Add program tags
        prog_tags = ET.SubElement(program, 'Tags')
        for tag in self.tags:
            if tag['scope'] == 'Program':
                tag_elem = ET.SubElement(prog_tags, 'Tag')
                tag_elem.set('Name', tag['name'])
                tag_elem.set('TagType', 'Base')
                tag_elem.set('DataType', tag['data_type'])

                if tag['comment']:
                    desc = ET.SubElement(tag_elem, 'Description')
                    desc_cdata = ET.SubElement(desc, 'CData')
                    desc_cdata.text = tag['comment']

        # Add routines
        routines_elem = ET.SubElement(program, 'Routines')
        self._add_routine(routines_elem)

    def _add_routine(self, routines_elem: ET.Element):
        """Add ladder logic routine."""

        routine = ET.SubElement(routines_elem, 'Routine')
        routine.set('Use', 'Context')
        routine.set('Name', self.routine_name)
        routine.set('Type', 'RLL')

        # Add routine description
        desc = ET.SubElement(routine, 'Description')
        desc_cdata = ET.SubElement(desc, 'CData')
        desc_cdata.text = 'Main ladder logic routine'

        # Add RLL content
        rll_content = ET.SubElement(routine, 'RLLContent')

        for rung in sorted(self.rungs, key=lambda x: x['number']):
            rung_elem = ET.SubElement(rll_content, 'Rung')
            rung_elem.set('Number', str(rung['number']))
            rung_elem.set('Type', 'N')

            # Add comment
            if rung['comment']:
                comment = ET.SubElement(rung_elem, 'Comment')
                comment_cdata = ET.SubElement(comment, 'CData')
                comment_cdata.text = rung['comment']

            # Add logic text
            text = ET.SubElement(rung_elem, 'Text')
            text_cdata = ET.SubElement(text, 'CData')
            text_cdata.text = rung['text']

    def _add_io_config(self, controller: ET.Element):
        """Add basic I/O configuration (placeholder)."""

        modules_elem = ET.SubElement(controller, 'Modules')

        # Local chassis
        local_module = ET.SubElement(modules_elem, 'Module')
        local_module.set('Name', 'Local')
        local_module.set('CatalogNumber', self.processor_type)
        local_module.set('Vendor', '1')
        local_module.set('ProductType', '14')
        local_module.set('ProductCode', '166')

    def _prettify_xml(self, elem: ET.Element) -> str:
        """Return pretty-printed XML string."""

        rough_string = ET.tostring(elem, encoding='utf-8')
        reparsed = minidom.parseString(rough_string)
        pretty = reparsed.toprettyxml(indent="  ")

        # Remove extra blank lines
        lines = [line for line in pretty.split('\n') if line.strip()]
        return '\n'.join(lines[1:])  # Skip XML declaration (added separately)

    def from_elements(self, elements: List[Dict]) -> str:
        """
        Convert ladder elements to Rockwell logic text.

        Args:
            elements: List of ladder elements

        Returns:
            Rockwell logic text format
        """
        logic_parts = []

        for elem in elements:
            elem_type = elem['type']
            address = elem.get('label', elem.get('address', ''))

            if elem_type == 'contact_no':
                logic_parts.append(f"XIC({address})")
            elif elem_type == 'contact_nc':
                logic_parts.append(f"XIO({address})")
            elif elem_type == 'coil':
                logic_parts.append(f"OTE({address})")
            elif elem_type == 'coil_set':
                logic_parts.append(f"OTL({address})")
            elif elem_type == 'coil_reset':
                logic_parts.append(f"OTU({address})")
            elif elem_type == 'timer_ton':
                preset = elem.get('preset', '5000')
                logic_parts.append(f"TON({address},{preset},0)")
            elif elem_type == 'counter_ctu':
                preset = elem.get('preset', '100')
                logic_parts.append(f"CTU({address},{preset},0)")

        return ''.join(logic_parts) + ';'


# Example usage
if __name__ == "__main__":
    gen = RockwellGenerator(
        project_name="Motor_Control",
        processor_type="1769-L33ER"
    )

    # Add tags
    gen.add_tag("START_BTN", "BOOL", "Controller", "Start push button")
    gen.add_tag("STOP_BTN", "BOOL", "Controller", "Stop push button")
    gen.add_tag("MOTOR_RUN", "BOOL", "Controller", "Motor contactor")

    # Add rung
    logic = gen.from_elements([
        {"type": "contact_no", "label": "START_BTN"},
        {"type": "contact_nc", "label": "STOP_BTN"},
        {"type": "contact_no", "label": "MOTOR_RUN"},
        {"type": "coil", "label": "MOTOR_RUN"}
    ])

    gen.add_rung(0, logic, "Motor start/stop with latching")

    # Generate file
    gen.generate("Motor_Control.L5X")

    print("\nExample .L5X file generated successfully!")
    print("This file can be imported into Studio 5000 Logix Designer")
