"""
Platform Converter
Converts ladder logic between different PLC platforms.
"""

from typing import Dict, List
import re


class PlatformConverter:
    """Convert ladder logic between PLC platforms."""

    # Address mapping patterns
    ADDRESS_MAPS = {
        'schneider_to_rockwell': {
            r'%I(\d+)\.(\d+)': r'Local:1:I.Data[\1].\2',  # Digital input
            r'%Q(\d+)\.(\d+)': r'Local:2:O.Data[\1].\2',  # Digital output
            r'%M(\d+)': r'Memory_Bit_\1',                 # Memory bit
            r'%MW(\d+)': r'Memory_Word_\1',               # Memory word
            r'%TM(\d+)': r'Timer_\1',                     # Timer
        },
        'rockwell_to_schneider': {
            r'Local:1:I\.Data\[(\d+)\]\.(\d+)': r'%I\1.\2',
            r'Local:2:O\.Data\[(\d+)\]\.(\d+)': r'%Q\1.\2',
            r'Memory_Bit_(\d+)': r'%M\1',
            r'Timer_(\d+)': r'%TM\1',
        },
        'schneider_to_siemens': {
            r'%I(\d+)\.(\d+)': r'I\1.\2',
            r'%Q(\d+)\.(\d+)': r'Q\1.\2',
            r'%M(\d+)': r'M\1.0',
            r'%TM(\d+)': r'T\1',
        },
        'siemens_to_schneider': {
            r'I(\d+)\.(\d+)': r'%I\1.\2',
            r'Q(\d+)\.(\d+)': r'%Q\1.\2',
            r'M(\d+)\.(\d+)': r'%M\1',
            r'T(\d+)': r'%TM\1',
        },
        'schneider_to_mitsubishi': {
            r'%I(\d+)\.(\d+)': r'X\1\2',
            r'%Q(\d+)\.(\d+)': r'Y\1\2',
            r'%M(\d+)': r'M\1',
            r'%TM(\d+)': r'T\1',
        },
    }

    def __init__(self, source_platform: str, target_platform: str):
        """
        Initialize converter.

        Args:
            source_platform: Source platform (schneider, rockwell, siemens, mitsubishi)
            target_platform: Target platform
        """
        self.source_platform = source_platform.lower()
        self.target_platform = target_platform.lower()

        # Get address mapping
        map_key = f"{self.source_platform}_to_{self.target_platform}"
        self.address_map = self.ADDRESS_MAPS.get(map_key, {})

    def convert_project(self, project_data: Dict) -> Dict:
        """
        Convert entire project from source to target platform.

        Args:
            project_data: Source project dictionary

        Returns:
            Converted project dictionary
        """
        converted = project_data.copy()

        # Update platform identifier
        converted['platform'] = self.target_platform
        converted['source_platform'] = self.source_platform
        converted['conversion_notes'] = []

        # Convert tags
        if 'tags' in converted:
            converted['tags'] = self.convert_tags(converted['tags'])

        # Convert ladder logic
        if 'rungs' in converted:
            converted['rungs'] = self.convert_rungs(converted['rungs'])

        # Convert I/O configuration
        if 'io_config' in converted:
            converted['io_config'] = self.convert_io_config(converted['io_config'])

        return converted

    def convert_tags(self, tags: List[Dict]) -> List[Dict]:
        """Convert tag addresses and types."""

        converted_tags = []

        for tag in tags:
            converted_tag = tag.copy()

            # Convert address
            if 'address' in converted_tag:
                converted_tag['address'] = self.convert_address(converted_tag['address'])

            # Convert data types if needed
            if 'type' in converted_tag or 'data_type' in converted_tag:
                data_type_key = 'type' if 'type' in converted_tag else 'data_type'
                converted_tag[data_type_key] = self.convert_data_type(converted_tag[data_type_key])

            converted_tags.append(converted_tag)

        return converted_tags

    def convert_rungs(self, rungs: List[Dict]) -> List[Dict]:
        """Convert ladder logic rungs."""

        converted_rungs = []

        for rung in rungs:
            converted_rung = rung.copy()

            # Convert elements
            if 'elements' in converted_rung:
                converted_rung['elements'] = self.convert_elements(converted_rung['elements'])

            # Convert rung text if present (Rockwell format)
            if 'text' in converted_rung:
                converted_rung['text'] = self.convert_logic_text(converted_rung['text'])

            converted_rungs.append(converted_rung)

        return converted_rungs

    def convert_elements(self, elements: List[Dict]) -> List[Dict]:
        """Convert individual ladder elements."""

        converted_elements = []

        for elem in elements:
            converted_elem = elem.copy()

            # Convert address
            if 'address' in converted_elem:
                converted_elem['address'] = self.convert_address(converted_elem['address'])

            # Convert timer/counter parameters
            if elem.get('type', '').startswith('timer_'):
                converted_elem = self.convert_timer(converted_elem)
            elif elem.get('type', '').startswith('counter_'):
                converted_elem = self.convert_counter(converted_elem)

            converted_elements.append(converted_elem)

        return converted_elements

    def convert_address(self, address: str) -> str:
        """Convert address format between platforms."""

        if not self.address_map:
            return address  # No mapping available

        converted = address

        for pattern, replacement in self.address_map.items():
            converted = re.sub(pattern, replacement, converted)

        return converted

    def convert_data_type(self, data_type: str) -> str:
        """Convert data type names."""

        type_map = {
            'BOOL': 'BOOL',
            'INT': {'rockwell': 'DINT', 'schneider': 'INT', 'siemens': 'INT'},
            'REAL': {'rockwell': 'REAL', 'schneider': 'REAL', 'siemens': 'REAL'},
            'DINT': {'rockwell': 'DINT', 'schneider': 'DINT', 'siemens': 'DINT'},
        }

        if data_type in type_map:
            mapping = type_map[data_type]
            if isinstance(mapping, dict):
                return mapping.get(self.target_platform, data_type)
            return mapping

        return data_type

    def convert_timer(self, timer_elem: Dict) -> Dict:
        """Convert timer element between platforms."""

        converted = timer_elem.copy()

        # Convert preset time format
        if 'preset' in converted:
            preset = converted['preset']

            if self.target_platform == 'schneider':
                # Convert to T#...ms or T#...s format
                if preset.isdigit():
                    converted['preset'] = f"T#{preset}ms"

            elif self.target_platform == 'rockwell':
                # Convert to milliseconds (integer)
                if preset.startswith('T#'):
                    # Extract numeric value
                    num = re.search(r'(\d+)', preset)
                    if num:
                        converted['preset'] = num.group(1)

            elif self.target_platform == 'siemens':
                # Convert to TIME#...ms format
                if preset.isdigit():
                    converted['preset'] = f"TIME#{preset}ms"

        return converted

    def convert_counter(self, counter_elem: Dict) -> Dict:
        """Convert counter element between platforms."""

        converted = counter_elem.copy()

        # Counter presets are typically just integers, so minimal conversion needed
        # But ensure format is correct for target platform

        return converted

    def convert_logic_text(self, logic_text: str) -> str:
        """Convert Rockwell logic text format."""

        # This is complex - would need full instruction mapping
        # For now, just convert addresses

        converted = logic_text

        for pattern, replacement in self.address_map.items():
            converted = re.sub(pattern, replacement, converted)

        return converted

    def convert_io_config(self, io_config: Dict) -> Dict:
        """Convert I/O configuration."""

        converted = io_config.copy()

        # Convert module addresses
        if 'modules' in converted:
            for module in converted['modules']:
                if 'address' in module:
                    module['address'] = self.convert_address(module['address'])

        return converted

    def get_conversion_notes(self) -> List[str]:
        """Get notes about platform conversion."""

        notes = []

        if self.source_platform == 'schneider' and self.target_platform == 'rockwell':
            notes.append("Schneider %I/%Q addresses converted to Rockwell tag-based addressing")
            notes.append("Timer format changed from T#...s to milliseconds")
            notes.append("Memory bits converted to named tags")

        elif self.source_platform == 'rockwell' and self.target_platform == 'schneider':
            notes.append("Rockwell tag-based addressing converted to Schneider %I/%Q format")
            notes.append("Timer values converted from milliseconds to T# format")

        elif self.source_platform == 'siemens':
            notes.append("Siemens addressing (I/Q/M) converted to target platform")
            notes.append("DB blocks may require manual configuration")

        if not self.address_map:
            notes.append(f"Warning: No automatic conversion available for {self.source_platform} to {self.target_platform}")
            notes.append("Manual review and adjustment required")

        return notes


# Example usage
if __name__ == "__main__":
    # Example: Convert Schneider project to Rockwell
    schneider_project = {
        'platform': 'schneider_m221',
        'project_name': 'Motor_Control',
        'tags': [
            {'name': 'START_BTN', 'address': '%I0.0', 'type': 'BOOL'},
            {'name': 'MOTOR_RUN', 'address': '%Q0.0', 'type': 'BOOL'},
        ],
        'rungs': [
            {
                'rung_number': 0,
                'elements': [
                    {'type': 'contact_no', 'address': '%I0.0'},
                    {'type': 'coil', 'address': '%Q0.0'}
                ]
            }
        ]
    }

    converter = PlatformConverter('schneider', 'rockwell')
    rockwell_project = converter.convert_project(schneider_project)

    print("Converted Project:")
    print(f"  Platform: {rockwell_project['platform']}")
    print(f"  Tags: {rockwell_project['tags']}")
    print("\nConversion Notes:")
    for note in converter.get_conversion_notes():
        print(f"  - {note}")
