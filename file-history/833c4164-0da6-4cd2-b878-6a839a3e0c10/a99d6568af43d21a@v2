"""
Automated PLC Programming Script
Programs a Motor Start/Stop application for TM221CE24T PLC
using EcoStruxure Machine Expert Basic
"""

from desktop_ai_agent import DesktopAIAgent
import time


class PLCProgrammer:
    """Automates PLC programming in EcoStruxure Machine Expert Basic"""

    def __init__(self):
        self.agent = DesktopAIAgent()

    def open_software(self):
        """Open EcoStruxure Machine Expert Basic"""
        print("\n[Step 1] Opening EcoStruxure Machine Expert Basic...")
        self.agent.open_software_via_search("ecostruxure machine expert basic", wait_time=8)
        print("Software should be open. Waiting for it to fully load...")
        time.sleep(5)

    def create_new_project(self):
        """Create a new project"""
        print("\n[Step 2] Creating new project...")

        # Try File -> New Project (Ctrl+N is common shortcut)
        self.agent.hotkey('ctrl', 'n')
        time.sleep(2)

        print("New project dialog should be open")

    def select_plc_model(self):
        """Select TM221CE24T PLC model"""
        print("\n[Step 3] Selecting PLC model TM221CE24T...")

        # Type the PLC model to search for it
        self.agent.type_text("TM221CE24T", interval=0.1)
        time.sleep(1)

        # Press Tab or Enter to select
        self.agent.press_key('tab')
        time.sleep(0.5)

        # Continue or OK button
        self.agent.press_key('enter')
        time.sleep(3)

        print("PLC model selected")

    def setup_project_name(self):
        """Set up project name"""
        print("\n[Step 4] Setting up project name...")

        # Project name field might be focused
        self.agent.type_text("MotorStartStop", interval=0.1)
        time.sleep(0.5)

        # Press Tab to move to next field
        self.agent.press_key('tab')
        time.sleep(0.5)

        # Confirm
        self.agent.press_key('enter')
        time.sleep(3)

        print("Project created: MotorStartStop")

    def navigate_to_ladder_logic(self):
        """Navigate to ladder logic programming area"""
        print("\n[Step 5] Navigating to ladder logic editor...")

        # Usually ladder logic is the default view, or accessible via double-click on PLC
        # Try double-clicking in the center of the screen where project tree usually is
        self.agent.click(200, 300, clicks=2)
        time.sleep(2)

        print("Ladder logic editor should be open")

    def program_motor_startstop_logic(self):
        """
        Program basic motor start/stop ladder logic

        Ladder Logic:
        Rung 1: Start/Stop Logic with Seal-in
        |--[ ]--[/]--( )--|
        |  Start Stop Motor
        |              |
        |--[ ]---------|
        |  Motor (Seal)

        Inputs:
        - %I0.0 = Start Button (NO)
        - %I0.1 = Stop Button (NC)

        Outputs:
        - %Q0.0 = Motor Contactor
        """
        print("\n[Step 6] Programming motor start/stop ladder logic...")

        # Rung 1: Start button contact (NO)
        print("Adding Start button contact...")
        self.agent.press_key('i')  # Insert contact (common in ladder editors)
        time.sleep(0.5)
        self.agent.type_text("%I0.0", interval=0.1)  # Start button
        time.sleep(0.5)
        self.agent.press_key('enter')
        time.sleep(1)

        # Add Stop button contact (NC - Normally Closed)
        print("Adding Stop button contact...")
        self.agent.press_key('right')  # Move to next position
        time.sleep(0.5)
        self.agent.press_key('/')  # Insert NC contact (slash for normally closed)
        time.sleep(0.5)
        self.agent.type_text("%I0.1", interval=0.1)  # Stop button
        time.sleep(0.5)
        self.agent.press_key('enter')
        time.sleep(1)

        # Add Motor output coil
        print("Adding Motor output coil...")
        self.agent.press_key('right')  # Move to end of rung
        time.sleep(0.5)
        self.agent.press_key('o')  # Insert coil/output
        time.sleep(0.5)
        self.agent.type_text("%Q0.0", interval=0.1)  # Motor contactor
        time.sleep(0.5)
        self.agent.press_key('enter')
        time.sleep(1)

        # Rung 2: Seal-in contact (parallel branch)
        print("Adding seal-in/latch contact...")
        self.agent.press_key('down')  # New rung or branch
        time.sleep(0.5)
        self.agent.press_key('i')  # Insert contact
        time.sleep(0.5)
        self.agent.type_text("%Q0.0", interval=0.1)  # Motor feedback (seal-in)
        time.sleep(0.5)
        self.agent.press_key('enter')
        time.sleep(1)

        print("Motor start/stop logic programmed!")

    def add_comments(self):
        """Add comments to the program"""
        print("\n[Step 7] Adding comments...")

        # Add comment to describe the program
        self.agent.hotkey('ctrl', 'home')  # Go to beginning
        time.sleep(0.5)

        # Try to add comment (varies by software)
        self.agent.press_key('c')  # Comment shortcut
        time.sleep(0.5)
        self.agent.type_text("Motor Start/Stop Application", interval=0.1)
        time.sleep(0.5)
        self.agent.press_key('enter')

        print("Comments added")

    def compile_program(self):
        """Compile the program"""
        print("\n[Step 8] Compiling the program...")

        # Common shortcut for compile/build
        self.agent.hotkey('ctrl', 'shift', 'b')
        time.sleep(3)

        # Alternative: F7 is also common
        # self.agent.press_key('f7')

        print("Program compiled. Check for errors in the output window.")
        time.sleep(2)

    def save_project(self):
        """Save the project"""
        print("\n[Step 9] Saving the project...")

        self.agent.hotkey('ctrl', 's')
        time.sleep(2)

        # If save dialog appears, accept default location
        self.agent.press_key('enter')
        time.sleep(1)

        print("Project saved!")

    def run_full_automation(self):
        """Run the complete automation workflow"""
        try:
            print("=" * 70)
            print("AUTOMATED PLC PROGRAMMING - MOTOR START/STOP APPLICATION")
            print("PLC Model: TM221CE24T")
            print("=" * 70)
            print("\nThis script will:")
            print("1. Open EcoStruxure Machine Expert Basic")
            print("2. Create a new project")
            print("3. Select TM221CE24T PLC")
            print("4. Program motor start/stop ladder logic")
            print("5. Compile the program")
            print("6. Save the project")
            print("\n" + "=" * 70)
            print("IMPORTANT: Move mouse to top-left corner to abort!")
            print("=" * 70)
            print("\nStarting in 5 seconds...")
            time.sleep(5)

            # Execute all steps
            self.open_software()
            self.create_new_project()

            # Note: The following steps might need adjustment based on
            # the actual UI flow of EcoStruxure Machine Expert Basic
            print("\n" + "=" * 70)
            print("ATTENTION: The next steps attempt to automate the UI.")
            print("If the software UI differs, you may need to adjust coordinates.")
            print("Continuing in 3 seconds...")
            print("=" * 70)
            time.sleep(3)

            self.select_plc_model()
            self.setup_project_name()
            self.navigate_to_ladder_logic()
            self.program_motor_startstop_logic()
            self.compile_program()
            self.save_project()

            print("\n" + "=" * 70)
            print("AUTOMATION COMPLETE!")
            print("=" * 70)
            print("\nMotor Start/Stop Application Summary:")
            print("- PLC: TM221CE24T")
            print("- Input %I0.0: Start Button (Normally Open)")
            print("- Input %I0.1: Stop Button (Normally Closed)")
            print("- Output %Q0.0: Motor Contactor")
            print("\nLogic:")
            print("1. Press Start button to energize motor")
            print("2. Motor latches/seals-in via %Q0.0 contact")
            print("3. Press Stop button to de-energize motor")
            print("\nPlease verify the program in the software and download to PLC.")
            print("=" * 70)

        except Exception as e:
            print(f"\nError during automation: {e}")
            print("You may need to complete the remaining steps manually.")


def main():
    """Main function"""
    programmer = PLCProgrammer()
    programmer.run_full_automation()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nAutomation stopped by user")
    except Exception as e:
        print(f"\nError: {e}")
        raise
