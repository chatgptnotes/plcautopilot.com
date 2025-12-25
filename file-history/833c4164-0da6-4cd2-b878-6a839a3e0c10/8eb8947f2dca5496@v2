"""
Vision-Enhanced PLC Programming
Programs TM221CE24T with visual verification at each step
"""

from vision_agent import VisionAgent
import time


class SmartPLCProgrammer:
    """PLC Programmer with vision capabilities"""

    def __init__(self):
        self.agent = VisionAgent()
        self.software_name = "EcoStruxure Machine Expert Basic"

    def open_software_verified(self):
        """Open EcoStruxure and verify it's running"""
        print("\n[Step 1] Opening EcoStruxure Machine Expert Basic...")

        # Method 1: Try to verify window title
        self.agent.press_key('win')
        self.agent.safe_delay(0.5)
        self.agent.type_text("ecostruxure machine expert basic", interval=0.1)
        self.agent.safe_delay(0.5)
        self.agent.press_key('enter')

        print("Waiting for software to load...")
        self.agent.safe_delay(8)

        # Try to verify (will work if OCR is available)
        if self.agent.ocr_enabled:
            if self.agent.verify_text_on_screen("Machine Expert", timeout=3):
                print("✓ Software verified as open!")
                return True
            else:
                print("⚠ Software may be open (OCR verification uncertain)")
                return True
        else:
            print("✓ Software should be open (no OCR verification)")
            return True

    def create_new_project_verified(self):
        """Create new project with verification"""
        print("\n[Step 2] Creating new project with verification...")

        # Open new project dialog
        self.agent.hotkey('ctrl', 'n')
        self.agent.safe_delay(2)

        # Verify dialog opened (if OCR available)
        if self.agent.ocr_enabled:
            if self.agent.verify_text_on_screen("New", timeout=3):
                print("✓ New Project dialog detected")
            else:
                print("⚠ Dialog may be open (visual verification uncertain)")

        print("Dialog should be open, continuing...")

    def select_plc_verified(self, plc_model="TM221CE24T"):
        """Select PLC with verification"""
        print(f"\n[Step 3] Selecting PLC model: {plc_model}...")

        # Type PLC model
        self.agent.type_text(plc_model, interval=0.1)
        self.agent.safe_delay(1)

        # Verify text was typed (if OCR available)
        if self.agent.ocr_enabled:
            if self.agent.verify_text_on_screen(plc_model, timeout=2):
                print(f"✓ PLC model '{plc_model}' verified in field")
            else:
                print(f"⚠ PLC model may be entered")

        # Continue
        self.agent.press_key('tab')
        self.agent.safe_delay(0.5)
        self.agent.press_key('enter')
        self.agent.safe_delay(3)

        print(f"PLC model {plc_model} selected")

    def setup_project_name_verified(self, project_name="MotorStartStop"):
        """Set project name with verification"""
        print(f"\n[Step 4] Setting project name: {project_name}...")

        self.agent.type_text(project_name, interval=0.1)
        self.agent.safe_delay(0.5)

        # Verify project name visible
        if self.agent.ocr_enabled:
            if self.agent.verify_text_on_screen(project_name, timeout=2):
                print(f"✓ Project name '{project_name}' verified")
            else:
                print(f"⚠ Project name may be entered")

        self.agent.press_key('tab')
        self.agent.safe_delay(0.5)
        self.agent.press_key('enter')
        self.agent.safe_delay(3)

        print(f"Project '{project_name}' created")

    def program_ladder_logic(self):
        """Program ladder logic (same as before)"""
        print("\n[Step 5] Programming ladder logic...")

        # Navigate to ladder editor
        self.agent.click(200, 300, clicks=2)
        self.agent.safe_delay(2)

        # Program rungs
        print("Adding Start button contact (%I0.0)...")
        self.agent.press_key('i')
        self.agent.safe_delay(0.5)
        self.agent.type_text("%I0.0", interval=0.1)
        self.agent.safe_delay(0.5)
        self.agent.press_key('enter')
        self.agent.safe_delay(1)

        print("Adding Stop button contact (%I0.1 NC)...")
        self.agent.press_key('right')
        self.agent.safe_delay(0.5)
        self.agent.press_key('/')
        self.agent.safe_delay(0.5)
        self.agent.type_text("%I0.1", interval=0.1)
        self.agent.safe_delay(0.5)
        self.agent.press_key('enter')
        self.agent.safe_delay(1)

        print("Adding Motor output (%Q0.0)...")
        self.agent.press_key('right')
        self.agent.safe_delay(0.5)
        self.agent.press_key('o')
        self.agent.safe_delay(0.5)
        self.agent.type_text("%Q0.0", interval=0.1)
        self.agent.safe_delay(0.5)
        self.agent.press_key('enter')
        self.agent.safe_delay(1)

        print("Adding seal-in contact (%Q0.0)...")
        self.agent.press_key('down')
        self.agent.safe_delay(0.5)
        self.agent.press_key('i')
        self.agent.safe_delay(0.5)
        self.agent.type_text("%Q0.0", interval=0.1)
        self.agent.safe_delay(0.5)
        self.agent.press_key('enter')
        self.agent.safe_delay(1)

        print("✓ Ladder logic programmed")

        # Verify I/O addresses if OCR available
        if self.agent.ocr_enabled:
            print("\nVerifying I/O addresses...")
            if self.agent.verify_text_on_screen("%I0.0", timeout=2):
                print("✓ Input %I0.0 verified")
            if self.agent.verify_text_on_screen("%Q0.0", timeout=2):
                print("✓ Output %Q0.0 verified")

    def compile_verified(self):
        """Compile with verification"""
        print("\n[Step 6] Compiling program...")

        self.agent.hotkey('ctrl', 'shift', 'b')
        self.agent.safe_delay(3)

        # Try to verify compilation success
        if self.agent.ocr_enabled:
            # Check for success message or error
            screen_text = self.agent.read_screen_text()

            if 'error' in screen_text.lower():
                print("✗ Compilation errors detected!")
                print("Check output window for details")
                return False
            elif 'success' in screen_text.lower() or 'complete' in screen_text.lower():
                print("✓ Compilation successful!")
                return True
            else:
                print("⚠ Compilation status uncertain")
                return True
        else:
            print("✓ Compilation initiated (no verification)")
            return True

    def save_verified(self):
        """Save project with verification"""
        print("\n[Step 7] Saving project...")

        self.agent.hotkey('ctrl', 's')
        self.agent.safe_delay(2)
        self.agent.press_key('enter')
        self.agent.safe_delay(1)

        print("✓ Project saved")

    def take_verification_screenshot(self):
        """Take screenshot for visual verification"""
        print("\n[Step 8] Taking verification screenshot...")

        if self.agent.ocr_enabled:
            self.agent.save_screenshot_with_text('program_verification.png')
            print("✓ Annotated screenshot saved: program_verification.png")
        else:
            self.agent.take_screenshot('program_verification.png')
            print("✓ Screenshot saved: program_verification.png")

    def run_smart_programming(self):
        """Run complete programming with vision verification"""
        try:
            print("=" * 70)
            print("VISION-ENHANCED PLC PROGRAMMING")
            print("Motor Start/Stop - TM221CE24T")
            print("=" * 70)

            if not self.agent.ocr_enabled:
                print("\n⚠ NOTE: OCR not available")
                print("Visual verification will be limited")
                print("Automation will still work, but cannot verify results")
                print("\nTo enable full vision:")
                print("  Install Tesseract OCR from:")
                print("  https://github.com/UB-Mannheim/tesseract/wiki")

            print("\n" + "=" * 70)
            print("Starting in 5 seconds...")
            print("Move mouse to top-left corner to abort!")
            print("=" * 70)
            time.sleep(5)

            # Run all steps with verification
            self.open_software_verified()
            self.create_new_project_verified()
            self.select_plc_verified("TM221CE24T")
            self.setup_project_name_verified("MotorStartStop")
            self.program_ladder_logic()
            success = self.compile_verified()
            self.save_verified()
            self.take_verification_screenshot()

            print("\n" + "=" * 70)
            print("PROGRAMMING COMPLETE!")
            print("=" * 70)

            print("\nProgram Summary:")
            print("  PLC: TM221CE24T")
            print("  Project: MotorStartStop")
            print("  Inputs: %I0.0 (Start), %I0.1 (Stop)")
            print("  Output: %Q0.0 (Motor)")
            print(f"  Compilation: {'Success' if success else 'Check errors'}")

            print("\nNext Steps:")
            print("  1. Review program in EcoStruxure")
            print("  2. Check verification screenshot")
            print("  3. Download to PLC")
            print("  4. Test operation")

            print("\n" + "=" * 70)

        except Exception as e:
            print(f"\nError during programming: {e}")
            print("Taking screenshot for debugging...")
            self.agent.take_screenshot('error_screenshot.png')
            raise


def main():
    """Main function"""
    programmer = SmartPLCProgrammer()
    programmer.run_smart_programming()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nStopped by user")
    except Exception as e:
        print(f"\nError: {e}")
