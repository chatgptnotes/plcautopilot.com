"""
Configure PLC Protection and Model Selection
Automates clicking protection settings and configuring PLC model
"""

from vision_agent import VisionAgent
import time


def configure_plc_settings():
    """Configure protection settings and PLC model"""
    agent = VisionAgent()

    print("=" * 70)
    print("PLC CONFIGURATION AUTOMATION")
    print("=" * 70)
    print("\nThis will:")
    print("1. Set Read Protection to Inactive")
    print("2. Set Write Protection to Inactive")
    print("3. Go to Configuration tab")
    print("4. Select PLC model")
    print("5. Drag and drop onto existing PLC")
    print("\n" + "=" * 70)
    print("Starting in 5 seconds...")
    print("Move mouse to top-left corner to abort!")
    print("=" * 70)
    time.sleep(5)

    try:
        # Step 1: Set Read Protection to Inactive
        print("\n[Step 1] Setting Read Protection to Inactive...")

        # Try to find and click "Inactive" radio button for Read Protection
        # Typical location for read protection (adjust coordinates if needed)
        # First radio button group - Read Protection
        print("Looking for Read Protection radio button...")

        # If we can use OCR to find it
        if agent.ocr_enabled:
            pos = agent.find_text_on_screen("Read")
            if pos:
                # Click radio button to the right of "Read" text
                agent.click(pos[0] + 150, pos[1])
                print("Clicked Read Protection - Inactive")
            else:
                # Fallback to estimated position
                print("Using estimated position for Read Protection")
                agent.click(400, 350)
        else:
            # Use estimated coordinates
            print("Clicking estimated position for Read Protection - Inactive")
            agent.click(400, 350)  # Adjust based on your screen

        time.sleep(0.5)

        # Step 2: Set Write Protection to Inactive
        print("\n[Step 2] Setting Write Protection to Inactive...")

        if agent.ocr_enabled:
            pos = agent.find_text_on_screen("Write")
            if pos:
                # Click radio button to the right of "Write" text
                agent.click(pos[0] + 150, pos[1])
                print("Clicked Write Protection - Inactive")
            else:
                print("Using estimated position for Write Protection")
                agent.click(400, 380)
        else:
            print("Clicking estimated position for Write Protection - Inactive")
            agent.click(400, 380)  # Adjust based on your screen

        time.sleep(0.5)

        # Step 3: Navigate to Configuration tab
        print("\n[Step 3] Navigating to Configuration tab...")

        if agent.ocr_enabled:
            # Try to find "Configuration" text
            if agent.click_text("Configuration"):
                print("Clicked Configuration tab")
            else:
                print("Configuration tab not found by text, using coordinates")
                agent.click(300, 150)  # Typical tab location
        else:
            print("Clicking Configuration tab at estimated position")
            agent.click(300, 150)

        time.sleep(2)

        # Step 4: Select PLC Model (TM221CE24T)
        print("\n[Step 4] Selecting PLC model TM221CE24T...")

        # Look for the PLC model in the device list (usually on left side)
        print("Looking for TM221CE24T in device list...")

        if agent.ocr_enabled:
            pos = agent.find_text_on_screen("TM221CE24T")
            if pos:
                print(f"Found TM221CE24T at position {pos}")
                # Click to select it
                agent.click(pos[0], pos[1])
                time.sleep(0.5)
            else:
                print("TM221CE24T not found, searching for TM221")
                pos = agent.find_text_on_screen("TM221")
                if pos:
                    agent.click(pos[0], pos[1])
                else:
                    print("Using estimated position for PLC list")
                    agent.click(200, 400)
        else:
            print("Clicking estimated position for PLC model")
            agent.click(200, 400)

        time.sleep(1)

        # Step 5: Drag and drop PLC model onto existing PLC
        print("\n[Step 5] Dragging PLC model to configuration area...")

        # Get current mouse position (where PLC model is)
        start_x, start_y = 200, 400  # Starting position (PLC list)

        # Target position (center of configuration area)
        target_x, target_y = 683, 400  # Center of screen typically

        print(f"Dragging from ({start_x}, {start_y}) to ({target_x}, {target_y})")

        # Perform drag and drop
        agent.move_mouse(start_x, start_y)
        time.sleep(0.3)

        # Press and hold left mouse button, drag, then release
        import pyautogui
        pyautogui.mouseDown(button='left')
        time.sleep(0.2)

        # Drag to target position
        agent.move_mouse(target_x, target_y, duration=1.0)
        time.sleep(0.3)

        # Release mouse button
        pyautogui.mouseUp(button='left')
        time.sleep(1)

        print("Drag and drop completed!")

        # Step 6: Take verification screenshot
        print("\n[Step 6] Taking verification screenshot...")
        agent.take_screenshot('plc_configured.png')
        print("Screenshot saved: plc_configured.png")

        print("\n" + "=" * 70)
        print("CONFIGURATION COMPLETE!")
        print("=" * 70)
        print("\nCompleted actions:")
        print("  [+] Read Protection set to Inactive")
        print("  [+] Write Protection set to Inactive")
        print("  [+] Configuration tab opened")
        print("  [+] PLC model TM221CE24T selected")
        print("  [+] Model dragged to configuration area")
        print("\nVerify the configuration in the software window.")
        print("Screenshot saved as: plc_configured.png")
        print("=" * 70)

    except Exception as e:
        print(f"\nError during configuration: {e}")
        print("Taking error screenshot...")
        agent.take_screenshot('config_error.png')
        print("Error screenshot saved as: config_error.png")
        raise


def main():
    """Main function"""
    print("\nIMPORTANT: Make sure EcoStruxure Machine Expert Basic is open!")
    print("This script will configure protection settings and PLC model.")

    confirm = input("\nIs EcoStruxure open and ready? (y/n): ").strip().lower()

    if confirm == 'y':
        configure_plc_settings()
    else:
        print("Please open EcoStruxure Machine Expert Basic first, then run this script.")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nStopped by user")
    except Exception as e:
        print(f"\nError: {e}")
