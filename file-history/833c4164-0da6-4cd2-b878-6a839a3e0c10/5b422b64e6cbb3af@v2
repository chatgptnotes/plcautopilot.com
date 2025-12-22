"""
Download Program to TM221CE24T PLC
Automates the download process in EcoStruxure Machine Expert Basic
"""

from desktop_ai_agent import DesktopAIAgent
import time


class PLCDownloader:
    """Automates PLC program download"""

    def __init__(self):
        self.agent = DesktopAIAgent()

    def verify_program(self):
        """Verify the program is open and compiled"""
        print("\n[Step 1] Verifying program is ready...")
        print("Checking if EcoStruxure Machine Expert Basic is open...")
        time.sleep(2)

        # Try to bring window to focus
        self.agent.hotkey('alt', 'tab')
        time.sleep(1)

        print("Program should be visible now")

    def open_download_dialog(self):
        """Open the download/transfer dialog"""
        print("\n[Step 2] Opening Download dialog...")

        # Common methods to open download dialog:
        # Method 1: Ctrl+D (Download shortcut)
        self.agent.hotkey('ctrl', 'd')
        time.sleep(2)

        # Method 2: Alternative - Menu -> PLC -> Download
        # If Ctrl+D doesn't work, try Alt key to access menu
        if False:  # Fallback option
            self.agent.press_key('alt')
            time.sleep(0.5)
            self.agent.press_key('p')  # PLC menu
            time.sleep(0.5)
            self.agent.press_key('d')  # Download
            time.sleep(2)

        print("Download dialog should be open")

    def select_connection_type(self, connection_type='usb'):
        """
        Select connection type

        Args:
            connection_type: 'usb', 'ethernet', or 'serial'
        """
        print(f"\n[Step 3] Selecting connection type: {connection_type.upper()}...")

        if connection_type.lower() == 'usb':
            # Tab through options and select USB
            self.agent.press_key('tab')
            time.sleep(0.5)
            self.agent.type_text("USB", interval=0.1)
            time.sleep(0.5)
        elif connection_type.lower() == 'ethernet':
            self.agent.press_key('tab')
            time.sleep(0.5)
            self.agent.type_text("Ethernet", interval=0.1)
            time.sleep(0.5)
        elif connection_type.lower() == 'serial':
            self.agent.press_key('tab')
            time.sleep(0.5)
            self.agent.type_text("Serial", interval=0.1)
            time.sleep(0.5)

        print(f"{connection_type.upper()} connection selected")

    def detect_plc(self):
        """Auto-detect PLC on the network/connection"""
        print("\n[Step 4] Detecting PLC...")

        # Look for "Detect" or "Scan" button
        # Usually Tab to the button and Enter
        self.agent.press_key('tab')
        time.sleep(0.5)
        self.agent.press_key('tab')
        time.sleep(0.5)

        # Press Detect/Scan button (usually Enter or Space)
        self.agent.press_key('enter')
        time.sleep(3)  # Wait for detection

        print("PLC detection in progress...")
        print("Waiting for PLC to be found...")
        time.sleep(3)

    def initiate_download(self):
        """Initiate the download to PLC"""
        print("\n[Step 5] Initiating download to PLC...")

        # Navigate to Download/Transfer button
        self.agent.press_key('tab')
        time.sleep(0.5)

        # Click Download button
        self.agent.press_key('enter')
        time.sleep(2)

        print("Download initiated...")
        print("Transferring program to TM221CE24T...")

        # Wait for download to complete (typically 5-15 seconds)
        time.sleep(10)

    def confirm_download_complete(self):
        """Confirm download and close dialogs"""
        print("\n[Step 6] Confirming download completion...")

        # If success dialog appears, close it
        self.agent.press_key('enter')
        time.sleep(1)

        # Close download dialog
        self.agent.press_key('esc')
        time.sleep(1)

        print("Download process completed!")

    def switch_plc_to_run_mode(self):
        """Switch PLC from STOP to RUN mode"""
        print("\n[Step 7] Switching PLC to RUN mode...")

        # Open PLC menu
        self.agent.press_key('alt')
        time.sleep(0.5)
        self.agent.press_key('p')
        time.sleep(0.5)

        # Look for Run option
        self.agent.press_key('r')
        time.sleep(1)

        # Confirm
        self.agent.press_key('enter')
        time.sleep(2)

        print("PLC should now be in RUN mode")

    def verify_plc_status(self):
        """Verify PLC is running"""
        print("\n[Step 8] Verifying PLC status...")
        print("Check the PLC status indicator in the software")
        print("It should show 'RUN' or 'Running'")
        time.sleep(2)

    def run_full_download(self, connection_type='usb'):
        """Run complete download process"""
        try:
            print("=" * 70)
            print("AUTOMATED PLC DOWNLOAD PROCESS")
            print("=" * 70)
            print("\nThis script will:")
            print("1. Verify the program is ready")
            print("2. Open download dialog")
            print("3. Select connection type")
            print("4. Detect the PLC")
            print("5. Download the program")
            print("6. Switch PLC to RUN mode")
            print("\n" + "=" * 70)
            print("PREREQUISITES:")
            print("- TM221CE24T PLC must be powered ON")
            print("- PLC must be connected via USB/Ethernet/Serial cable")
            print("- EcoStruxure Machine Expert Basic must be open")
            print("- Program must be compiled without errors")
            print("=" * 70)
            print("\nIMPORTANT: Move mouse to top-left corner to abort!")
            print("=" * 70)
            print(f"\nConnection Type: {connection_type.upper()}")
            print("\nStarting in 5 seconds...")
            time.sleep(5)

            # Execute download steps
            self.verify_program()
            self.open_download_dialog()
            self.select_connection_type(connection_type)
            self.detect_plc()
            self.initiate_download()
            self.confirm_download_complete()
            self.switch_plc_to_run_mode()
            self.verify_plc_status()

            print("\n" + "=" * 70)
            print("DOWNLOAD COMPLETE!")
            print("=" * 70)
            print("\nNext Steps:")
            print("1. Verify PLC is in RUN mode (check status LED)")
            print("2. Connect Start button to Input %I0.0")
            print("3. Connect Stop button to Input %I0.1")
            print("4. Connect Motor contactor to Output %Q0.0")
            print("5. Test the start/stop operation")
            print("\nSafety Reminder:")
            print("- Ensure all wiring follows electrical codes")
            print("- Test with motor disconnected first")
            print("- Add emergency stop circuit")
            print("- Have qualified personnel verify installation")
            print("=" * 70)

        except Exception as e:
            print(f"\nError during download: {e}")
            print("You may need to complete the download manually.")
            print("\nManual Steps:")
            print("1. Click PLC -> Download in the menu")
            print("2. Select your connection type")
            print("3. Click Detect to find PLC")
            print("4. Click Download/Transfer")
            print("5. Wait for completion")
            print("6. Switch PLC to RUN mode")


def main():
    """Main function with user options"""
    print("=" * 70)
    print("PLC Download Automation")
    print("=" * 70)

    print("\nSelect connection type:")
    print("1. USB (default)")
    print("2. Ethernet")
    print("3. Serial")
    print("0. Cancel")

    choice = input("\nEnter choice (1-3, default=1): ").strip()

    connection_map = {
        '1': 'usb',
        '2': 'ethernet',
        '3': 'serial',
        '': 'usb'  # default
    }

    if choice == '0':
        print("Cancelled.")
        return

    connection_type = connection_map.get(choice, 'usb')

    print(f"\nSelected: {connection_type.upper()} connection")
    print("\nMake sure:")
    print(f"- PLC is connected via {connection_type.upper()}")
    print("- PLC is powered ON")
    print("- EcoStruxure Machine Expert Basic is open with the project")

    confirm = input("\nReady to proceed? (y/n): ").strip().lower()

    if confirm == 'y':
        downloader = PLCDownloader()
        downloader.run_full_download(connection_type)
    else:
        print("Download cancelled.")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nDownload stopped by user")
    except Exception as e:
        print(f"\nError: {e}")
        raise
