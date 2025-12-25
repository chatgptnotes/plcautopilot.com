"""
Sequential Lights Program - Instruction Logic (IL) Version
Creates program using working template and instruction logic only

Based on diagram:
- 3 lights start serially with 3 second gaps
- START button to begin sequence
- STOP button to interrupt sequence
"""

import os
import shutil

def create_sequential_lights_IL():
    """Create sequential lights program using instruction logic"""

    # Source template (working file)
    template_path = os.path.join(
        os.path.expanduser("~"),
        "OneDrive",
        "Documents",
        "convy_test_no_emergency.smbp"
    )

    # Output path
    output_path = os.path.join(
        os.path.expanduser("~"),
        "OneDrive",
        "Documents",
        "Sequential_Lights_IL.smbp"
    )

    # Read template
    print(f"Reading template: {template_path}")
    with open(template_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace project name
    content = content.replace(
        '<Name>convy_test</Name>',
        '<Name>Sequential_Lights_IL</Name>'
    )
    content = content.replace(
        'convy_test_no_emergency.smbp',
        'Sequential_Lights_IL.smbp'
    )
    content = content.replace(
        'convy_test.smbp',
        'Sequential_Lights_IL.smbp'
    )

    # Replace POU name
    content = content.replace(
        '<Name>New POU</Name>',
        '<Name>Sequential_Lights_Main</Name>'
    )

    # Find and replace the Rungs section with our instruction logic program
    rungs_start = content.find('<Rungs>')
    rungs_end = content.find('</Rungs>') + len('</Rungs>')

    if rungs_start == -1 or rungs_end == -1:
        print("ERROR: Could not find Rungs section!")
        return None

    # Generate new rungs with instruction logic
    new_rungs = generate_instruction_logic_rungs()

    # Replace rungs section
    content = content[:rungs_start] + new_rungs + content[rungs_end:]

    # Update I/O symbols
    content = update_io_symbols(content)

    # Update timer configuration
    content = update_timers(content)

    # Write output file
    print(f"Writing output: {output_path}")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)

    file_size = os.path.getsize(output_path)
    print(f"Created: {output_path}")
    print(f"File size: {file_size} bytes")

    return output_path


def generate_instruction_logic_rungs():
    """Generate rungs using pure instruction logic"""
    return '''<Rungs>
          <RungEntity>
            <LadderElements />
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
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>
          <RungEntity>
            <LadderElements />
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
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>BLK   %TM0</InstructionLine>
                <Comment>Begin Timer 1 block</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>LD    %M0</InstructionLine>
                <Comment>Load sequence run flag</Comment>
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
                <InstructionLine>ST    %Q0.1</InstructionLine>
                <Comment>Turn ON Light 2</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>END_BLK</InstructionLine>
                <Comment>End timer block</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 3</Name>
            <MainComment>Timer 1 + Light 2 (3 seconds)</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>
          <RungEntity>
            <LadderElements />
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>BLK   %TM1</InstructionLine>
                <Comment>Begin Timer 2 block</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>LD    %TM0.Q</InstructionLine>
                <Comment>Load Timer 1 done bit</Comment>
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
                <InstructionLine>ST    %Q0.2</InstructionLine>
                <Comment>Turn ON Light 3</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>END_BLK</InstructionLine>
                <Comment>End timer block</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 4</Name>
            <MainComment>Timer 2 + Light 3 (3 seconds)</MainComment>
            <Label />
            <IsLadderSelected>false</IsLadderSelected>
          </RungEntity>
        </Rungs>'''


def update_io_symbols(content):
    """Update I/O symbol names"""
    # Replace input symbols
    content = content.replace('<Symbol>SENSOR_1</Symbol>', '<Symbol>START_BTN</Symbol>')
    content = content.replace('<Symbol>SENSOR_2</Symbol>', '<Symbol>STOP_BTN</Symbol>')

    # Replace output symbols
    content = content.replace('<Symbol>CONVYER_1</Symbol>', '<Symbol>LIGHT_1</Symbol>')
    content = content.replace('<Symbol>CONVYER_2</Symbol>', '<Symbol>LIGHT_2</Symbol>')

    # Add LIGHT_3 symbol if needed (find %Q0.2 section)
    if '<Address>%Q0.2</Address>' in content:
        # Find the section and add symbol
        import re
        pattern = r'(<Address>%Q0\.2</Address>\s+<Index>2</Index>)'
        replacement = r'\1\n            <Symbol>LIGHT_3</Symbol>'
        content = re.sub(pattern, replacement, content)

    return content


def update_timers(content):
    """Ensure timers are configured correctly"""
    # Check if timer section exists
    if '<Timers>' in content:
        # Find timers section
        timer_start = content.find('<Timers>')
        timer_end = content.find('</Timers>') + len('</Timers>')

        # Generate timer configuration
        timer_config = '''<Timers>
      <Timer>
        <Address>%TM0</Address>
        <Index>0</Index>
        <Symbol>TIMER_1</Symbol>
        <Comment>3 Second Timer for Light 2</Comment>
        <Type>TON</Type>
        <TimeBase>TimeBase1s</TimeBase>
        <Preset>3</Preset>
      </Timer>
      <Timer>
        <Address>%TM1</Address>
        <Index>1</Index>
        <Symbol>TIMER_2</Symbol>
        <Comment>3 Second Timer for Light 3</Comment>
        <Type>TON</Type>
        <TimeBase>TimeBase1s</TimeBase>
        <Preset>3</Preset>
      </Timer>
    </Timers>'''

        content = content[:timer_start] + timer_config + content[timer_end:]

    # Update timer memory allocation
    content = content.replace(
        '<ForcedCount>0</ForcedCount>',
        '<ForcedCount>2</ForcedCount>',
        1  # Only replace first occurrence in TimersMemoryAllocation
    )

    return content


if __name__ == "__main__":
    print("=" * 70)
    print("Sequential Lights - Instruction Logic Version")
    print("=" * 70)
    print()

    filepath = create_sequential_lights_IL()

    if filepath:
        print()
        print("=" * 70)
        print("PROGRAM SUMMARY")
        print("=" * 70)
        print("""
INSTRUCTION LOGIC PROGRAM STRUCTURE:
------------------------------------

Rung 1: Sequence Start/Stop Control
  LD    %I0.0        ; Load START button
  OR    %M0          ; OR with sequence run flag (seal-in)
  ANDN  %I0.1        ; AND NOT STOP button
  ST    %M0          ; Store to sequence run flag

Rung 2: Light 1 (Immediate)
  LD    %M0          ; Load sequence run flag
  ST    %Q0.0        ; Turn ON Light 1

Rung 3: Timer 1 + Light 2 (Combined)
  BLK   %TM0         ; Begin Timer 1 block
  LD    %M0          ; Load sequence run flag
  IN                 ; Timer input
  OUT_BLK            ; Output from timer block
  LD    Q            ; Load timer Q output
  ST    %Q0.1        ; Turn ON Light 2
  END_BLK            ; End timer block

Rung 4: Timer 2 + Light 3 (Combined)
  BLK   %TM1         ; Begin Timer 2 block
  LD    %TM0.Q       ; Load Timer 1 done bit
  IN                 ; Timer input
  OUT_BLK            ; Output from timer block
  LD    Q            ; Load timer Q output
  ST    %Q0.2        ; Turn ON Light 3
  END_BLK            ; End timer block

I/O ASSIGNMENT:
--------------
INPUTS:
  %I0.0 - START_BTN   (Start Button - Normally Open)
  %I0.1 - STOP_BTN    (Stop Button - Normally Closed)

OUTPUTS:
  %Q0.0 - LIGHT_1     (First Light - ON immediately)
  %Q0.1 - LIGHT_2     (Second Light - ON after 3 sec)
  %Q0.2 - LIGHT_3     (Third Light - ON after 6 sec)

TIMERS:
  %TM0 - TIMER_1      (TON, 3 seconds, for Light 2)
  %TM1 - TIMER_2      (TON, 3 seconds, for Light 3)

INTERNAL MEMORY:
  %M0  - SEQUENCE_RUN (Sequence running flag with seal-in)

SEQUENCE OPERATION:
------------------
1. Press START (%I0.0) -> SEQUENCE_RUN (%M0) = TRUE
2. SEQUENCE_RUN turns ON LIGHT_1 (%Q0.0) immediately
3. SEQUENCE_RUN starts TIMER_1 (%TM0) for 3 seconds
4. When TIMER_1 done -> LIGHT_2 (%Q0.1) turns ON
5. TIMER_1 done starts TIMER_2 (%TM1) for 3 seconds
6. When TIMER_2 done -> LIGHT_3 (%Q0.2) turns ON
7. Press STOP (%I0.1) anytime -> All lights turn OFF
""")
        print("=" * 70)
        print(f"File created: {filepath}")
        print("Open with EcoStruxure Machine Expert - Basic")
        print("=" * 70)
    else:
        print("ERROR: Failed to create file!")
