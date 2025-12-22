"""
PLC Program Generator Module
Reusable functions for generating Schneider PLC programs

Based on learnings from 2025-12-22 session
"""

import os
import re
from typing import Optional, List, Dict


class PLCProgramGenerator:
    """Main class for generating PLC programs"""

    def __init__(self, template_path: str):
        """
        Initialize generator with template file

        Args:
            template_path: Path to working .smbp template file
        """
        self.template_path = template_path
        self.template_content = None
        self._load_template()

    def _load_template(self):
        """Load template file content"""
        if not os.path.exists(self.template_path):
            raise FileNotFoundError(f"Template not found: {self.template_path}")

        with open(self.template_path, 'r', encoding='utf-8') as f:
            self.template_content = f.read()

    def generate_sequential_lights(
        self,
        output_path: str,
        num_lights: int,
        delay_seconds: int = 3,
        project_name: Optional[str] = None,
        use_ladder_diagram: bool = True
    ) -> str:
        """
        Generate sequential lights program

        Args:
            output_path: Path for output .smbp file
            num_lights: Number of lights (2+)
            delay_seconds: Delay between lights
            project_name: Name of project (auto-generated if None)
            use_ladder_diagram: True for LD, False for IL only

        Returns:
            Path to generated file
        """
        if num_lights < 2:
            raise ValueError("Must have at least 2 lights")

        # Generate project name
        if not project_name:
            project_name = f"Sequential_{num_lights}Lights"

        # Start with template
        content = self.template_content

        # Update project metadata
        content = self._update_project_name(content, project_name, output_path)

        # Generate rungs
        rungs = self._generate_sequential_lights_rungs(
            num_lights,
            delay_seconds,
            use_ladder_diagram
        )

        # Replace rungs section
        content = self._replace_rungs(content, rungs)

        # Update I/O symbols
        content = self._update_io_symbols(content, num_lights)

        # Configure timers
        content = self._configure_timers(content, num_lights - 1, delay_seconds)

        # Write output file
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(content)

        return output_path

    def _update_project_name(self, content: str, name: str, path: str) -> str:
        """Update project name and path in content"""
        # Extract old name
        old_name_match = re.search(r'<Name>(.*?)</Name>', content)
        if old_name_match:
            old_name = old_name_match.group(1)
            content = content.replace(f'<Name>{old_name}</Name>', f'<Name>{name}</Name>')
            content = content.replace(old_name, name)

        # Update full path
        content = re.sub(
            r'<FullName>.*?</FullName>',
            f'<FullName>{path}</FullName>',
            content
        )

        return content

    def _generate_sequential_lights_rungs(
        self,
        num_lights: int,
        delay_seconds: int,
        use_ladder: bool
    ) -> str:
        """Generate all rungs for sequential lights"""
        rungs = []

        # Rung 1: Start/Stop control
        rungs.append(self._generate_control_rung(use_ladder))

        # Rung 2: First light (immediate)
        rungs.append(self._generate_first_light_rung(use_ladder))

        # Rungs 3+: Timer + Light
        for i in range(1, num_lights):
            timer_idx = i - 1
            light_idx = i
            prev_timer = timer_idx - 1 if i > 1 else None

            rungs.append(self._generate_timer_light_rung(
                timer_idx,
                light_idx,
                prev_timer,
                use_ladder
            ))

        return f'<Rungs>\n{"".join(rungs)}\n        </Rungs>'

    def _generate_control_rung(self, use_ladder: bool) -> str:
        """Generate start/stop control rung"""
        ladder_elements = self._control_rung_ladder() if use_ladder else ''

        return f'''          <RungEntity>
            <LadderElements>{ladder_elements}</LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %I0.0</InstructionLine>
                <Comment>Load START button</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OR    %M0</InstructionLine>
                <Comment>OR with sequence run flag (seal-in)</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ANDN  %I0.1</InstructionLine>
                <Comment>AND NOT STOP button</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %M0</InstructionLine>
                <Comment>Store to sequence run flag</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 1</Name>
            <MainComment>Sequence Start/Stop Control</MainComment>
            <Label />
            <IsLadderSelected>{"true" if use_ladder else "false"}</IsLadderSelected>
          </RungEntity>'''

    def _generate_first_light_rung(self, use_ladder: bool) -> str:
        """Generate first light rung (immediate activation)"""
        ladder_elements = self._first_light_ladder() if use_ladder else ''

        return f'''          <RungEntity>
            <LadderElements>{ladder_elements}</LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>LD    %M0</InstructionLine>
                <Comment>Load sequence run flag</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.0</InstructionLine>
                <Comment>Turn ON Light 1</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 2</Name>
            <MainComment>Light 1 - ON immediately</MainComment>
            <Label />
            <IsLadderSelected>{"true" if use_ladder else "false"}</IsLadderSelected>
          </RungEntity>'''

    def _generate_timer_light_rung(
        self,
        timer_idx: int,
        light_idx: int,
        prev_timer: Optional[int],
        use_ladder: bool
    ) -> str:
        """Generate timer + light rung"""
        # Determine input condition
        if prev_timer is None:
            input_condition = "%M0"
            comment = "Load sequence run flag"
        else:
            input_condition = f"%TM{prev_timer}.Q"
            comment = f"Load Timer {prev_timer + 1} done bit"

        ladder_elements = self._timer_light_ladder(
            timer_idx, light_idx, input_condition
        ) if use_ladder else ''

        return f'''          <RungEntity>
            <LadderElements>{ladder_elements}</LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>BLK   %TM{timer_idx}</InstructionLine>
                <Comment>Begin Timer {timer_idx + 1} block</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>LD    {input_condition}</InstructionLine>
                <Comment>{comment}</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>IN</InstructionLine>
                <Comment>Timer input</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>OUT_BLK</InstructionLine>
                <Comment>Output from timer block</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>LD    Q</InstructionLine>
                <Comment>Load timer Q output</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>ST    %Q0.{light_idx}</InstructionLine>
                <Comment>Turn ON Light {light_idx + 1}</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>END_BLK</InstructionLine>
                <Comment>End timer block</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung {light_idx + 2}</Name>
            <MainComment>Timer {timer_idx + 1} + Light {light_idx + 1}</MainComment>
            <Label />
            <IsLadderSelected>{"true" if use_ladder else "false"}</IsLadderSelected>
          </RungEntity>'''

    def _control_rung_ladder(self) -> str:
        """Generate ladder elements for control rung"""
        return '''
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%I0.0</Descriptor>
                <Comment>Start Button</Comment>
                <Symbol>START_BTN</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Down, Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M0</Descriptor>
                <Comment>Seal-in</Comment>
                <Symbol>SEQUENCE_RUN</Symbol>
                <Row>1</Row>
                <Column>0</Column>
                <ChosenConnection>Up, Left</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>NegatedContact</ElementType>
                <Descriptor>%I0.1</Descriptor>
                <Comment>Stop Button</Comment>
                <Symbol>STOP_BTN</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>''' + ''.join([
            f'''
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>{i}</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>''' for i in range(2, 10)
        ]) + '''
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%M0</Descriptor>
                <Comment>Sequence Running Flag</Comment>
                <Symbol>SEQUENCE_RUN</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>'''

    def _first_light_ladder(self) -> str:
        """Generate ladder elements for first light rung"""
        return '''
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M0</Descriptor>
                <Comment>Sequence Running</Comment>
                <Symbol>SEQUENCE_RUN</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>''' + ''.join([
            f'''
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>{i}</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>''' for i in range(1, 10)
        ]) + '''
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%Q0.0</Descriptor>
                <Comment>Light 1 Output</Comment>
                <Symbol>LIGHT_1</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>'''

    def _timer_light_ladder(self, timer_idx: int, light_idx: int, input_cond: str) -> str:
        """Generate ladder elements for timer + light rung"""
        return f'''
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>{input_cond}</Descriptor>
                <Comment>Timer Input</Comment>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Timer</ElementType>
                <Descriptor>%TM{timer_idx}</Descriptor>
                <Comment>3 Second Timer</Comment>
                <Symbol>TIMER_{timer_idx + 1}</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>''' + ''.join([
            f'''
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>{i}</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>''' for i in range(3, 10)
        ]) + f'''
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%Q0.{light_idx}</Descriptor>
                <Comment>Light {light_idx + 1} Output</Comment>
                <Symbol>LIGHT_{light_idx + 1}</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>'''

    def _replace_rungs(self, content: str, new_rungs: str) -> str:
        """Replace rungs section in content"""
        rungs_start = content.find('<Rungs>')
        rungs_end = content.find('</Rungs>') + len('</Rungs>')

        if rungs_start == -1 or rungs_end == -1:
            raise ValueError("Could not find Rungs section in template")

        return content[:rungs_start] + new_rungs + content[rungs_end:]

    def _update_io_symbols(self, content: str, num_lights: int) -> str:
        """Update I/O symbol names"""
        # Update outputs
        for i in range(num_lights):
            pattern = rf'(<Address>%Q0\.{i}</Address>\s+<Index>{i}</Index>)'
            if f'<Symbol>LIGHT_{i + 1}</Symbol>' not in content:
                replacement = rf'\1\n            <Symbol>LIGHT_{i + 1}</Symbol>'
                content = re.sub(pattern, replacement, content)

        return content

    def _configure_timers(self, content: str, num_timers: int, delay: int) -> str:
        """Configure timer objects"""
        if '<Timers>' not in content:
            return content

        timer_start = content.find('<Timers>')
        timer_end = content.find('</Timers>') + len('</Timers>')

        # Generate timer configurations
        timers_xml = '<Timers>\n'
        for i in range(num_timers):
            timers_xml += f'''      <Timer>
        <Address>%TM{i}</Address>
        <Index>{i}</Index>
        <Symbol>TIMER_{i + 1}</Symbol>
        <Comment>{delay} Second Timer for Light {i + 2}</Comment>
        <Type>TON</Type>
        <TimeBase>TimeBase1s</TimeBase>
        <Preset>{delay}</Preset>
      </Timer>
'''
        timers_xml += '    </Timers>'

        content = content[:timer_start] + timers_xml + content[timer_end:]

        # Update timer memory allocation
        pattern = r'(<TimersMemoryAllocation>.*?<ForcedCount>)\d+(</ForcedCount>)'
        content = re.sub(pattern, rf'\g<1>{num_timers}\g<2>', content, flags=re.DOTALL)

        return content


# Usage example
if __name__ == "__main__":
    # Initialize generator with template
    template = os.path.join(
        os.path.expanduser("~"),
        "OneDrive",
        "Documents",
        "convy_test_no_emergency.smbp"
    )

    generator = PLCProgramGenerator(template)

    # Generate 5-light sequential program
    output = os.path.join(
        os.path.expanduser("~"),
        "OneDrive",
        "Documents",
        "Sequential_5Lights_Auto.smbp"
    )

    generator.generate_sequential_lights(
        output_path=output,
        num_lights=5,
        delay_seconds=3,
        use_ladder_diagram=True
    )

    print(f"Generated: {output}")
