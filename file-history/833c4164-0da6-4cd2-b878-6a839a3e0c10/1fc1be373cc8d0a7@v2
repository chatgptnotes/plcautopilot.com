"""
Desktop AI Agent for Windows Automation
Automates keyboard and mouse actions to open installed software
"""

import pyautogui
import time
import json
import logging
from pathlib import Path

# Configure PyAutoGUI safety
pyautogui.FAILSAFE = True  # Move mouse to top-left corner to abort
pyautogui.PAUSE = 0.5  # Add delay between PyAutoGUI calls

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class DesktopAIAgent:
    """AI Agent to automate desktop tasks in Windows"""

    def __init__(self, config_file='config.json'):
        """Initialize the agent with configuration"""
        self.config = self.load_config(config_file)
        self.screen_width, self.screen_height = pyautogui.size()
        logger.info(f"Screen resolution: {self.screen_width}x{self.screen_height}")

    def load_config(self, config_file):
        """Load configuration from JSON file"""
        try:
            if Path(config_file).exists():
                with open(config_file, 'r') as f:
                    return json.load(f)
            else:
                logger.warning(f"Config file {config_file} not found. Using defaults.")
                return {}
        except Exception as e:
            logger.error(f"Error loading config: {e}")
            return {}

    def safe_delay(self, seconds=1):
        """Add a delay with logging"""
        logger.info(f"Waiting {seconds} seconds...")
        time.sleep(seconds)

    def move_mouse(self, x, y, duration=0.5):
        """Move mouse to specific coordinates"""
        logger.info(f"Moving mouse to ({x}, {y})")
        pyautogui.moveTo(x, y, duration=duration)

    def click(self, x=None, y=None, clicks=1, button='left'):
        """Click at current position or specified coordinates"""
        if x and y:
            logger.info(f"Clicking at ({x}, {y})")
            pyautogui.click(x, y, clicks=clicks, button=button)
        else:
            logger.info(f"Clicking at current position")
            pyautogui.click(clicks=clicks, button=button)

    def type_text(self, text, interval=0.1):
        """Type text with specified interval between keystrokes"""
        logger.info(f"Typing: {text}")
        pyautogui.write(text, interval=interval)

    def press_key(self, key):
        """Press a specific key"""
        logger.info(f"Pressing key: {key}")
        pyautogui.press(key)

    def hotkey(self, *keys):
        """Press a combination of keys"""
        logger.info(f"Pressing hotkey: {'+'.join(keys)}")
        pyautogui.hotkey(*keys)

    def open_software_via_search(self, software_name, wait_time=2):
        """
        Open software using Windows Search

        Args:
            software_name: Name of the software to open
            wait_time: Time to wait for software to launch
        """
        logger.info(f"Opening software: {software_name}")

        # Method 1: Use Windows Search (Win + S or Win key)
        logger.info("Opening Windows Search...")
        self.press_key('win')
        self.safe_delay(0.5)

        # Type software name
        self.type_text(software_name, interval=0.1)
        self.safe_delay(0.5)

        # Press Enter to open
        logger.info("Launching software...")
        self.press_key('enter')
        self.safe_delay(wait_time)

        logger.info(f"Successfully opened {software_name}")

    def open_software_via_run(self, command, wait_time=2):
        """
        Open software using Run dialog (Win + R)

        Args:
            command: Command to run (e.g., 'notepad', 'calc', 'chrome')
            wait_time: Time to wait for software to launch
        """
        logger.info(f"Opening software via Run dialog: {command}")

        # Open Run dialog
        self.hotkey('win', 'r')
        self.safe_delay(0.5)

        # Type command
        self.type_text(command, interval=0.05)
        self.safe_delay(0.3)

        # Press Enter
        self.press_key('enter')
        self.safe_delay(wait_time)

        logger.info(f"Successfully launched {command}")

    def open_software_via_click(self, icon_position, wait_time=2):
        """
        Open software by clicking on desktop icon or taskbar

        Args:
            icon_position: Tuple of (x, y) coordinates
            wait_time: Time to wait for software to launch
        """
        x, y = icon_position
        logger.info(f"Clicking on icon at position ({x}, {y})")

        # Double-click on the icon
        self.click(x, y, clicks=2)
        self.safe_delay(wait_time)

        logger.info("Software opened via click")

    def take_screenshot(self, filename='screenshot.png'):
        """Take a screenshot and save it"""
        logger.info(f"Taking screenshot: {filename}")
        screenshot = pyautogui.screenshot()
        screenshot.save(filename)
        logger.info(f"Screenshot saved as {filename}")
        return filename


def main():
    """Main function to demonstrate the AI agent"""

    print("=" * 60)
    print("Desktop AI Agent - Windows Automation")
    print("=" * 60)
    print("\nThis agent can open installed software using:")
    print("1. Windows Search (Win key)")
    print("2. Run Dialog (Win + R)")
    print("3. Click on icon (if you know coordinates)")
    print("\nIMPORTANT: Move mouse to top-left corner to abort!\n")
    print("=" * 60)

    # Initialize agent
    agent = DesktopAIAgent()

    # Give user time to prepare
    print("\nStarting in 3 seconds...")
    time.sleep(3)

    # Example 1: Open Notepad via search
    print("\n[Example 1] Opening Notepad via Windows Search...")
    agent.open_software_via_search("notepad", wait_time=2)

    time.sleep(2)

    # Example 2: Open Calculator via Run dialog
    print("\n[Example 2] Opening Calculator via Run dialog...")
    agent.open_software_via_run("calc", wait_time=2)

    time.sleep(2)

    # Example 3: Type in Notepad
    print("\n[Example 3] Typing in Notepad...")
    agent.type_text("Hello from Desktop AI Agent!", interval=0.1)

    print("\n" + "=" * 60)
    print("Demo completed successfully!")
    print("=" * 60)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        logger.info("\nAgent stopped by user")
    except Exception as e:
        logger.error(f"Error occurred: {e}")
        raise
