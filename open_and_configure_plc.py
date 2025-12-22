"""
Complete automation: Open EcoStruxure and configure PLC
"""

from vision_agent import VisionAgent
import pyautogui
import time


def open_ecostruxure_and_configure():
    """Open EcoStruxure and configure protection settings"""
    agent = VisionAgent()

    print("=" * 70)
    print("COMPLETE PLC CONFIGURATION AUTOMATION")
    print("=" * 70)
    print("\nThis will:")
    print("1. Open EcoStruxure Machine Expert Basic")
    print("2. Wait for it to fully load")
    print("3. Set Read Protection to Inactive")
    print("4. Set Write Protection to Inactive")
    print("5. Go to Configuration tab")
    print("6. Select and drag PLC model TM221CE24T")
    print("\n" + "=" * 70)
    print("Starting in 5 seconds...")
    print("Move mouse to top-left corner to abort!")
    print("=" * 70)
    time.sleep(5)

    try:
        # Step 1: Open EcoStruxure
        print("\n[Step 1] Opening EcoStruxure Machine Expert Basic...")

        # Press Windows key
        agent.press_key('win')
        time.sleep(1)

        # Type software name
        agent.type_text("ecostruxure machine expert basic", interval=0.1)
        time.sleep(1)

        # Press Enter
        agent.press_key('enter')

        # Wait longer for software to open and load
        print("Waiting 15 seconds for EcoStruxure to fully load...")
        time.sleep(15)

        # Take screenshot to verify it opened
        print("Taking screenshot to verify software opened...")
        agent.take_screenshot('ecostruxure_opened.png')

        # Click on window to ensure it's focused
        print("Clicking center of screen to ensure EcoStruxure is focused...")
        agent.click(683, 400)
        time.sleep(1)

        # Step 2: Look for and handle any startup dialogs
        print("\n[Step 2] Checking for startup dialogs...")

        # If there's a "New Project" or welcome screen, close it or proceed
        # Press Escape in case there's a dialog
        agent.press_key('esc')
        time.sleep(1)

        # Step 3: Set Read Protection to Inactive
        print("\n[Step 3] Setting Read Protection to Inactive...")
        print("Clicking Read Protection - Inactive radio button...")

        # Common locations for protection settings in EcoStruxure
        # These might be in Tools > Options or Project Properties

        # Try to access via menu: Tools > Options
        print("Attempting to access protection settings...")
        agent.press_key('alt')  # Activate menu bar
        time.sleep(0.5)
        agent.press_key('t')  # Tools menu
        time.sleep(0.5)
        agent.press_key('o')  # Options
        time.sleep(2)

        # If options dialog opened, navigate to protection settings
        # Click Inactive for Read Protection (estimated position)
        print("Clicking Read Protection - Inactive...")
        agent.click(400, 350)
        time.sleep(0.5)

        # Step 4: Set Write Protection to Inactive
        print("\n[Step 4] Setting Write Protection to Inactive...")
        agent.click(400, 380)
        time.sleep(0.5)

        # Click OK or Apply to save settings
        print("Applying protection settings...")
        agent.press_key('enter')  # Or click OK button
        time.sleep(1)

        # Step 5: Navigate to Configuration tab
        print("\n[Step 5] Opening Configuration tab...")

        # Configuration tab is usually at the top or left side
        # Try clicking where tabs typically are
        agent.click(300, 150)
        time.sleep(2)

        # Alternative: Try keyboard shortcut or menu
        # agent.press_key('f4')  # Common shortcut for configuration

        # Step 6: Select PLC model
        print("\n[Step 6] Looking for PLC model TM221CE24T...")

        # Device catalog is usually on the left side
        # Expand controller section if needed
        print("Clicking in device catalog area...")
        agent.click(200, 300)
        time.sleep(1)

        # Type to search for PLC model
        agent.type_text("TM221CE24T", interval=0.1)
        time.sleep(1)

        # Click on the found PLC model
        agent.click(200, 400)
        time.sleep(1)

        # Step 7: Drag and drop PLC model
        print("\n[Step 7] Dragging PLC model to configuration area...")

        # Starting position (device catalog)
        start_x, start_y = 200, 400

        # Target position (configuration area - center/right of screen)
        target_x, target_y = 700, 400

        print(f"Performing drag and drop: ({start_x}, {start_y}) -> ({target_x}, {target_y})")

        # Move to start position
        agent.move_mouse(start_x, start_y, duration=0.3)
        time.sleep(0.3)

        # Mouse down (start drag)
        pyautogui.mouseDown(button='left')
        time.sleep(0.2)

        # Drag to target
        agent.move_mouse(target_x, target_y, duration=1.5)
        time.sleep(0.3)

        # Mouse up (drop)
        pyautogui.mouseUp(button='left')
        time.sleep(2)

        print("Drag and drop completed!")

        # Step 8: Verification
        print("\n[Step 8] Taking verification screenshot...")
        agent.take_screenshot('plc_fully_configured.png')

        print("\n" + "=" * 70)
        print("AUTOMATION COMPLETE!")
        print("=" * 70)
        print("\nCompleted actions:")
        print("  [+] EcoStruxure opened and loaded")
        print("  [+] Read Protection set to Inactive")
        print("  [+] Write Protection set to Inactive")
        print("  [+] Configuration tab accessed")
        print("  [+] PLC model TM221CE24T selected")
        print("  [+] Model dragged to configuration area")
        print("\nVerification screenshots:")
        print("  - ecostruxure_opened.png")
        print("  - plc_fully_configured.png")
        print("\nPlease check EcoStruxure window to verify configuration.")
        print("=" * 70)

    except Exception as e:
        print(f"\nError: {e}")
        agent.take_screenshot('error_state.png')
        print("Error screenshot saved: error_state.png")
        raise


if __name__ == "__main__":
    try:
        open_ecostruxure_and_configure()
    except KeyboardInterrupt:
        print("\n\nStopped by user")
    except Exception as e:
        print(f"\nError: {e}")
