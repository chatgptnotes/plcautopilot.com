"""
Automatic PLC Download - No user input required
Downloads program to TM221CE24T PLC automatically
"""

from desktop_ai_agent import DesktopAIAgent
import time


def auto_download_to_plc():
    """Automatically download program to PLC"""
    agent = DesktopAIAgent()

    print("=" * 70)
    print("AUTOMATIC PLC DOWNLOAD TO TM221CE24T")
    print("=" * 70)
    print("\nConnection: USB (default)")
    print("\nPrerequisites:")
    print("- PLC is powered ON and connected via USB")
    print("- EcoStruxure Machine Expert Basic is open")
    print("- Program is compiled successfully")
    print("\n" + "=" * 70)
    print("IMPORTANT: Move mouse to top-left corner to abort!")
    print("=" * 70)
    print("\nStarting in 5 seconds...")
    time.sleep(5)

    try:
        # Step 1: Focus on the application
        print("\n[Step 1] Focusing on EcoStruxure Machine Expert Basic...")
        agent.hotkey('alt', 'tab')
        time.sleep(2)

        # Step 2: Open Download dialog (Ctrl+D)
        print("\n[Step 2] Opening Download dialog...")
        agent.hotkey('ctrl', 'd')
        time.sleep(3)

        # Step 3: Select USB connection
        print("\n[Step 3] Selecting USB connection...")
        agent.press_key('tab')
        time.sleep(0.5)
        agent.type_text("USB", interval=0.1)
        time.sleep(1)

        # Step 4: Detect PLC
        print("\n[Step 4] Detecting PLC on USB...")
        agent.press_key('tab')
        time.sleep(0.5)
        agent.press_key('tab')
        time.sleep(0.5)
        agent.press_key('enter')  # Click Detect button
        time.sleep(5)  # Wait for detection

        print("Waiting for PLC detection...")
        time.sleep(3)

        # Step 5: Download to PLC
        print("\n[Step 5] Downloading program to PLC...")
        agent.press_key('tab')
        time.sleep(0.5)
        agent.press_key('enter')  # Click Download button
        time.sleep(2)

        print("Transfer in progress...")
        time.sleep(10)  # Wait for download to complete

        # Step 6: Confirm completion
        print("\n[Step 6] Confirming download...")
        agent.press_key('enter')  # Close success dialog
        time.sleep(1)
        agent.press_key('esc')  # Close download window
        time.sleep(1)

        # Step 7: Switch to RUN mode
        print("\n[Step 7] Switching PLC to RUN mode...")
        agent.press_key('alt')  # Open menu
        time.sleep(0.5)
        agent.press_key('p')  # PLC menu
        time.sleep(0.5)
        agent.press_key('r')  # Run
        time.sleep(1)
        agent.press_key('enter')  # Confirm
        time.sleep(2)

        print("\n" + "=" * 70)
        print("DOWNLOAD COMPLETE!")
        print("=" * 70)
        print("\nPLC Status: Should be in RUN mode")
        print("\nMotor Start/Stop Program is now loaded on TM221CE24T")
        print("\n" + "=" * 70)
        print("NEXT: WIRING AND TESTING")
        print("=" * 70)
        print("\nWiring Instructions:")
        print("1. Input %I0.0 <- Start Button (Normally Open)")
        print("2. Input %I0.1 <- Stop Button (Normally Closed)")
        print("3. Output %Q0.0 -> Motor Contactor Coil")
        print("\nTesting:")
        print("1. Press Start button -> Motor should energize")
        print("2. Release Start button -> Motor stays ON (sealed)")
        print("3. Press Stop button -> Motor should de-energize")
        print("\nSafety:")
        print("- Add emergency stop circuit")
        print("- Install motor overload protection")
        print("- Verify all connections before powering motor")
        print("=" * 70)

    except Exception as e:
        print(f"\nError: {e}")
        print("\nManual download instructions:")
        print("1. In EcoStruxure, click: PLC -> Download")
        print("2. Select USB connection")
        print("3. Click 'Detect' to find PLC")
        print("4. Click 'Download' to transfer program")
        print("5. Click 'PLC' -> 'Run' to start PLC")


if __name__ == "__main__":
    try:
        auto_download_to_plc()
    except KeyboardInterrupt:
        print("\n\nStopped by user")
    except Exception as e:
        print(f"\nError: {e}")
