"""
Sequential 4 Lights Program - Ladder Diagram (LD) Version
4 lights start serially with 3 second gaps between each

Same logic as IL version but with graphical ladder diagram
"""

import os

def create_sequential_4lights_LD():
    """Create 4-light sequential program using ladder diagram"""

    # Source template (working file)
    template_path = os.path.join(
        os.path.expanduser("~"),
        "OneDrive",
        "Documents",
        "Sequential_Lights_IL.smbp"
    )

    # Output path
    output_path = os.path.join(
        os.path.expanduser("~"),
        "OneDrive",
        "Documents",
        "Sequential_4Lights_LD.smbp"
    )

    # Read template
    print(f"Reading template: {template_path}")
    with open(template_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace project name
    content = content.replace(
        '<Name>Sequential_Lights_IL</Name>',
        '<Name>Sequential_4Lights_LD</Name>'
    )
    content = content.replace(
        'Sequential_Lights_IL.smbp',
        'Sequential_4Lights_LD.smbp'
    )
    content = content.replace(
        '<Name>Sequential_Lights_Main</Name>',
        '<Name>Sequential_4Lights_LD_Main</Name>'
    )

    # Find and replace the Rungs section
    rungs_start = content.find('<Rungs>')
    rungs_end = content.find('</Rungs>') + len('</Rungs>')

    if rungs_start == -1 or rungs_end == -1:
        print("ERROR: Could not find Rungs section!")
        return None

    # Generate new rungs with ladder diagram
    new_rungs = generate_4light_LD_rungs()

    # Replace rungs section
    content = content[:rungs_start] + new_rungs + content[rungs_end:]

    # Update I/O symbols
    content = update_io_symbols(content)

    # Update timer configuration (3 timers needed)
    content = update_timers(content)

    # Write output file
    print(f"Writing output: {output_path}")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)

    file_size = os.path.getsize(output_path)
    print(f"Created: {output_path}")
    print(f"File size: {file_size} bytes")

    return output_path


def generate_4light_LD_rungs():
    """Generate ladder diagram rungs for 4 sequential lights"""
    return '''<Rungs>
          <RungEntity>
            <LadderElements>
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
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>2</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>3</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>4</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>5</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>6</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>7</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>8</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>9</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%M0</Descriptor>
                <Comment>Sequence Running Flag</Comment>
                <Symbol>SEQUENCE_RUN</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
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
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M0</Descriptor>
                <Comment>Sequence Running</Comment>
                <Symbol>SEQUENCE_RUN</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>2</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>3</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>4</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>5</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>6</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>7</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>8</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>9</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%Q0.0</Descriptor>
                <Comment>Light 1 Output</Comment>
                <Symbol>LIGHT_1</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
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
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%M0</Descriptor>
                <Comment>Sequence Running</Comment>
                <Symbol>SEQUENCE_RUN</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Timer</ElementType>
                <Descriptor>%TM0</Descriptor>
                <Comment>3 Second Timer</Comment>
                <Symbol>TIMER_1</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>3</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>4</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>5</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>6</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>7</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>8</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>9</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%Q0.1</Descriptor>
                <Comment>Light 2 Output</Comment>
                <Symbol>LIGHT_2</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
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
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%TM0.Q</Descriptor>
                <Comment>Timer 1 Done</Comment>
                <Symbol>TIMER_1</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Timer</ElementType>
                <Descriptor>%TM1</Descriptor>
                <Comment>3 Second Timer</Comment>
                <Symbol>TIMER_2</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>3</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>4</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>5</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>6</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>7</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>8</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>9</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%Q0.2</Descriptor>
                <Comment>Light 3 Output</Comment>
                <Symbol>LIGHT_3</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
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
            <MainComment>Timer 2 + Light 3 (6 seconds total)</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>
          <RungEntity>
            <LadderElements>
              <LadderEntity>
                <ElementType>NormalContact</ElementType>
                <Descriptor>%TM1.Q</Descriptor>
                <Comment>Timer 2 Done</Comment>
                <Symbol>TIMER_2</Symbol>
                <Row>0</Row>
                <Column>0</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Timer</ElementType>
                <Descriptor>%TM2</Descriptor>
                <Comment>3 Second Timer</Comment>
                <Symbol>TIMER_3</Symbol>
                <Row>0</Row>
                <Column>1</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>3</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>4</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>5</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>6</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>7</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>8</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Line</ElementType>
                <Row>0</Row>
                <Column>9</Column>
                <ChosenConnection>Left, Right</ChosenConnection>
              </LadderEntity>
              <LadderEntity>
                <ElementType>Coil</ElementType>
                <Descriptor>%Q0.3</Descriptor>
                <Comment>Light 4 Output</Comment>
                <Symbol>LIGHT_4</Symbol>
                <Row>0</Row>
                <Column>10</Column>
                <ChosenConnection>Left</ChosenConnection>
              </LadderEntity>
            </LadderElements>
            <InstructionLines>
              <InstructionLineEntity>
                <InstructionLine>BLK   %TM2</InstructionLine>
                <Comment>Begin Timer 3 block</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>LD    %TM1.Q</InstructionLine>
                <Comment>Load Timer 2 done bit</Comment>
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
                <InstructionLine>ST    %Q0.3</InstructionLine>
                <Comment>Turn ON Light 4</Comment>
              </InstructionLineEntity>
              <InstructionLineEntity>
                <InstructionLine>END_BLK</InstructionLine>
                <Comment>End timer block</Comment>
              </InstructionLineEntity>
            </InstructionLines>
            <Name>Rung 5</Name>
            <MainComment>Timer 3 + Light 4 (9 seconds total)</MainComment>
            <Label />
            <IsLadderSelected>true</IsLadderSelected>
          </RungEntity>
        </Rungs>'''


def update_io_symbols(content):
    """Update I/O symbol names"""
    import re

    # Add LIGHT_3 symbol
    if '<Address>%Q0.2</Address>' in content:
        pattern = r'(<Address>%Q0\.2</Address>\s+<Index>2</Index>)'
        replacement = r'\1\n            <Symbol>LIGHT_3</Symbol>'
        content = re.sub(pattern, replacement, content)

    # Add LIGHT_4 symbol
    if '<Address>%Q0.3</Address>' in content:
        pattern = r'(<Address>%Q0\.3</Address>\s+<Index>3</Index>)'
        replacement = r'\1\n            <Symbol>LIGHT_4</Symbol>'
        content = re.sub(pattern, replacement, content)

    # Add SEQUENCE_RUN symbol to %M0 if not exists
    if '<Address>%M0</Address>' in content and 'SEQUENCE_RUN' not in content:
        pattern = r'(<Address>%M0</Address>\s+<Index>0</Index>)'
        replacement = r'\1\n        <Symbol>SEQUENCE_RUN</Symbol>\n        <Comment>Sequence Running Flag</Comment>'
        content = re.sub(pattern, replacement, content)

    return content


def update_timers(content):
    """Configure 3 timers for 4-light sequence"""
    import re

    # Check if timer section exists
    if '<Timers>' in content:
        # Find timers section
        timer_start = content.find('<Timers>')
        timer_end = content.find('</Timers>') + len('</Timers>')

        # Generate timer configuration for 3 timers
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
      <Timer>
        <Address>%TM2</Address>
        <Index>2</Index>
        <Symbol>TIMER_3</Symbol>
        <Comment>3 Second Timer for Light 4</Comment>
        <Type>TON</Type>
        <TimeBase>TimeBase1s</TimeBase>
        <Preset>3</Preset>
      </Timer>
    </Timers>'''

        content = content[:timer_start] + timer_config + content[timer_end:]

    # Update timer memory allocation to 3
    pattern = r'(<TimersMemoryAllocation>.*?<ForcedCount>)\d+(</ForcedCount>)'
    content = re.sub(pattern, r'\g<1>3\g<2>', content, flags=re.DOTALL)

    return content


if __name__ == "__main__":
    print("=" * 70)
    print("Sequential 4 Lights - Ladder Diagram (LD) Version")
    print("=" * 70)
    print()

    filepath = create_sequential_4lights_LD()

    if filepath:
        print()
        print("=" * 70)
        print("LADDER DIAGRAM PROGRAM")
        print("=" * 70)
        print("""
GRAPHICAL LADDER DIAGRAM:
-------------------------

Rung 1: Start/Stop Control
  |--[START]--+--]/[STOP]--(SEQUENCE_RUN)--|
  |           |                             |
  |--[SEQ]----+                             |

Rung 2: Light 1
  |--[SEQUENCE_RUN]--(LIGHT_1)--|

Rung 3: Timer 1 + Light 2
  |--[SEQUENCE_RUN]--[TIMER_1 3s]--(LIGHT_2)--|

Rung 4: Timer 2 + Light 3
  |--[TIMER_1.Q]--[TIMER_2 3s]--(LIGHT_3)--|

Rung 5: Timer 3 + Light 4
  |--[TIMER_2.Q]--[TIMER_3 3s]--(LIGHT_4)--|

I/O ASSIGNMENT:
--------------
INPUTS:
  %I0.0 - START_BTN   (Start Button)
  %I0.1 - STOP_BTN    (Stop Button)

OUTPUTS:
  %Q0.0 - LIGHT_1     (ON at 0 sec)
  %Q0.1 - LIGHT_2     (ON at 3 sec)
  %Q0.2 - LIGHT_3     (ON at 6 sec)
  %Q0.3 - LIGHT_4     (ON at 9 sec)

TIMERS:
  %TM0 - TIMER_1      (3 seconds)
  %TM1 - TIMER_2      (3 seconds)
  %TM2 - TIMER_3      (3 seconds)

SEQUENCE:
---------
  0 sec: START -> Light 1 ON
  3 sec:          Light 2 ON
  6 sec:          Light 3 ON
  9 sec:          Light 4 ON

  STOP anytime -> All lights OFF
""")
        print("=" * 70)
        print(f"File created: {filepath}")
        print("Open with EcoStruxure Machine Expert - Basic")
        print("Displays as GRAPHICAL LADDER DIAGRAM")
        print("=" * 70)
    else:
        print("ERROR: Failed to create file!")
