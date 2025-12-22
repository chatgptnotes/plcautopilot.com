"""
Vision-Enabled Desktop AI Agent
Enhanced agent with OCR and image recognition capabilities
"""

import pyautogui
import time
import json
import logging
from pathlib import Path
from PIL import Image

# Try to import cv2 (opencv)
try:
    import cv2
    import numpy as np
    CV2_AVAILABLE = True
except ImportError:
    CV2_AVAILABLE = False
    print("WARNING: opencv-python not installed. Image matching features disabled.")

# Try to import pytesseract
try:
    import pytesseract
    # Try to set Tesseract path (common Windows location)
    try:
        pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
    except:
        pass
    OCR_AVAILABLE = True
except ImportError:
    OCR_AVAILABLE = False
    print("WARNING: pytesseract not installed. OCR features disabled.")

# Configure PyAutoGUI safety
pyautogui.FAILSAFE = True
pyautogui.PAUSE = 0.5

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class VisionAgent:
    """Enhanced AI Agent with computer vision capabilities"""

    def __init__(self, config_file='config.json'):
        """Initialize the vision agent"""
        self.config = self.load_config(config_file)
        self.screen_width, self.screen_height = pyautogui.size()
        self.ocr_enabled = OCR_AVAILABLE
        self.image_matching_enabled = CV2_AVAILABLE
        logger.info(f"Screen resolution: {self.screen_width}x{self.screen_height}")
        logger.info(f"OCR available: {self.ocr_enabled}")
        logger.info(f"Image matching available: {self.image_matching_enabled}")

    def load_config(self, config_file):
        """Load configuration from JSON file"""
        try:
            if Path(config_file).exists():
                with open(config_file, 'r') as f:
                    return json.load(f)
            else:
                return {}
        except Exception as e:
            logger.error(f"Error loading config: {e}")
            return {}

    # ========================================================================
    # BASIC AUTOMATION (Same as original agent)
    # ========================================================================

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

    def take_screenshot(self, filename='screenshot.png'):
        """Take a screenshot and save it"""
        logger.info(f"Taking screenshot: {filename}")
        screenshot = pyautogui.screenshot()
        screenshot.save(filename)
        logger.info(f"Screenshot saved as {filename}")
        return screenshot

    # ========================================================================
    # VISION CAPABILITIES - OCR
    # ========================================================================

    def read_screen_text(self, region=None):
        """
        Read all text from screen using OCR

        Args:
            region: Optional (x, y, width, height) to read specific area

        Returns:
            String containing all text found on screen
        """
        if not self.ocr_enabled:
            logger.warning("OCR not available. Install Tesseract OCR.")
            return ""

        try:
            if region:
                screenshot = pyautogui.screenshot(region=region)
            else:
                screenshot = pyautogui.screenshot()

            text = pytesseract.image_to_string(screenshot)
            logger.info(f"Read text from screen: {len(text)} characters")
            return text
        except Exception as e:
            logger.error(f"OCR error: {e}")
            return ""

    def find_text_on_screen(self, search_text, case_sensitive=False):
        """
        Find text on screen and return its position

        Args:
            search_text: Text to search for
            case_sensitive: Whether search is case sensitive

        Returns:
            (x, y) coordinates of text, or None if not found
        """
        if not self.ocr_enabled:
            logger.warning("OCR not available")
            return None

        try:
            screenshot = pyautogui.screenshot()
            # Get detailed OCR data with positions
            data = pytesseract.image_to_data(screenshot, output_type=pytesseract.Output.DICT)

            for i, word in enumerate(data['text']):
                if not word.strip():
                    continue

                found = False
                if case_sensitive:
                    found = search_text in word
                else:
                    found = search_text.lower() in word.lower()

                if found:
                    x = data['left'][i] + data['width'][i] // 2
                    y = data['top'][i] + data['height'][i] // 2
                    logger.info(f"Found '{search_text}' at ({x}, {y})")
                    return (x, y)

            logger.info(f"Text '{search_text}' not found on screen")
            return None
        except Exception as e:
            logger.error(f"Error finding text: {e}")
            return None

    def verify_text_on_screen(self, text, timeout=5):
        """
        Verify if text appears on screen within timeout

        Args:
            text: Text to look for
            timeout: Maximum seconds to wait

        Returns:
            True if found, False otherwise
        """
        logger.info(f"Verifying text '{text}' appears on screen...")
        start_time = time.time()

        while time.time() - start_time < timeout:
            screen_text = self.read_screen_text()
            if text.lower() in screen_text.lower():
                logger.info(f"✓ Text '{text}' verified on screen")
                return True
            time.sleep(0.5)

        logger.warning(f"✗ Text '{text}' not found within {timeout}s")
        return False

    def wait_for_text(self, text, timeout=10):
        """
        Wait until specific text appears on screen

        Args:
            text: Text to wait for
            timeout: Maximum seconds to wait

        Returns:
            True if text appeared, False if timeout
        """
        logger.info(f"Waiting for text '{text}' to appear...")
        return self.verify_text_on_screen(text, timeout)

    def click_text(self, text, offset_x=0, offset_y=0):
        """
        Find and click on text

        Args:
            text: Text to find and click
            offset_x: X offset from text position
            offset_y: Y offset from text position

        Returns:
            True if clicked, False if text not found
        """
        pos = self.find_text_on_screen(text)
        if pos:
            self.click(pos[0] + offset_x, pos[1] + offset_y)
            return True
        return False

    # ========================================================================
    # VISION CAPABILITIES - IMAGE MATCHING
    # ========================================================================

    def find_image_on_screen(self, template_path, confidence=0.8):
        """
        Find an image template on screen

        Args:
            template_path: Path to template image file
            confidence: Match confidence (0.0 to 1.0)

        Returns:
            (x, y) coordinates of center, or None if not found
        """
        if not self.image_matching_enabled:
            logger.warning("Image matching not available. Install opencv-python.")
            return None

        try:
            # Take screenshot
            screenshot = pyautogui.screenshot()
            screenshot_np = np.array(screenshot)
            screenshot_gray = cv2.cvtColor(screenshot_np, cv2.COLOR_RGB2GRAY)

            # Load template
            template = cv2.imread(template_path, cv2.IMREAD_GRAYSCALE)
            if template is None:
                logger.error(f"Could not load template: {template_path}")
                return None

            # Match template
            result = cv2.matchTemplate(screenshot_gray, template, cv2.TM_CCOEFF_NORMED)
            min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)

            if max_val >= confidence:
                # Get center of match
                h, w = template.shape
                center_x = max_loc[0] + w // 2
                center_y = max_loc[1] + h // 2
                logger.info(f"Found image at ({center_x}, {center_y}), confidence: {max_val:.2f}")
                return (center_x, center_y)
            else:
                logger.info(f"Image not found (best match: {max_val:.2f}, threshold: {confidence})")
                return None

        except Exception as e:
            logger.error(f"Image matching error: {e}")
            return None

    def click_image(self, template_path, confidence=0.8):
        """
        Find and click on an image

        Args:
            template_path: Path to template image
            confidence: Match confidence threshold

        Returns:
            True if clicked, False if not found
        """
        pos = self.find_image_on_screen(template_path, confidence)
        if pos:
            self.click(pos[0], pos[1])
            return True
        return False

    def wait_for_image(self, template_path, timeout=10, confidence=0.8):
        """
        Wait for an image to appear on screen

        Args:
            template_path: Path to template image
            timeout: Maximum seconds to wait
            confidence: Match confidence threshold

        Returns:
            True if found, False if timeout
        """
        logger.info(f"Waiting for image '{template_path}'...")
        start_time = time.time()

        while time.time() - start_time < timeout:
            if self.find_image_on_screen(template_path, confidence):
                logger.info(f"✓ Image found")
                return True
            time.sleep(0.5)

        logger.warning(f"✗ Image not found within {timeout}s")
        return False

    # ========================================================================
    # HIGH-LEVEL SMART AUTOMATION
    # ========================================================================

    def open_software_smart(self, software_name, verify_text=None, wait_time=5):
        """
        Open software and verify it opened

        Args:
            software_name: Name to search for
            verify_text: Text to verify in opened window (optional)
            wait_time: Time to wait for software to open

        Returns:
            True if opened (and verified), False otherwise
        """
        logger.info(f"Opening {software_name} with verification...")

        # Open via search
        self.press_key('win')
        self.safe_delay(0.5)
        self.type_text(software_name, interval=0.1)
        self.safe_delay(0.5)
        self.press_key('enter')
        self.safe_delay(wait_time)

        # Verify if text provided
        if verify_text:
            return self.verify_text_on_screen(verify_text, timeout=5)
        else:
            logger.info(f"{software_name} opened (no verification)")
            return True

    def click_button_by_text(self, button_text, offset_y=0):
        """
        Find and click a button by its text label

        Args:
            button_text: Text on the button
            offset_y: Y offset (useful if text is above button)

        Returns:
            True if clicked, False if not found
        """
        logger.info(f"Looking for button: '{button_text}'")
        return self.click_text(button_text, offset_y=offset_y)

    def verify_action_success(self, expected_text, timeout=3):
        """
        Verify an action succeeded by checking for expected text

        Args:
            expected_text: Text that should appear if successful
            timeout: How long to wait

        Returns:
            True if verified, False otherwise
        """
        return self.wait_for_text(expected_text, timeout)

    def smart_type_in_field(self, field_label, text_to_type, offset_y=30):
        """
        Find a field by its label and type in it

        Args:
            field_label: Label text near the field
            text_to_type: Text to type
            offset_y: Y offset from label to field

        Returns:
            True if typed, False if field not found
        """
        logger.info(f"Looking for field: '{field_label}'")
        pos = self.find_text_on_screen(field_label)
        if pos:
            # Click below the label (where field usually is)
            self.click(pos[0], pos[1] + offset_y)
            self.safe_delay(0.3)
            self.type_text(text_to_type)
            return True
        return False

    # ========================================================================
    # DIAGNOSTICS AND UTILITIES
    # ========================================================================

    def show_screen_text(self):
        """Debug: Print all text currently on screen"""
        text = self.read_screen_text()
        print("=" * 70)
        print("TEXT ON SCREEN:")
        print("=" * 70)
        print(text)
        print("=" * 70)
        return text

    def save_screenshot_with_text(self, filename='debug_screen.png'):
        """Save screenshot with OCR text overlay for debugging"""
        if not self.ocr_enabled or not self.image_matching_enabled:
            logger.warning("OCR or OpenCV not available. Saving plain screenshot.")
            return self.take_screenshot(filename)

        try:
            screenshot = pyautogui.screenshot()
            screenshot_np = np.array(screenshot)

            # Get OCR data with bounding boxes
            data = pytesseract.image_to_data(screenshot, output_type=pytesseract.Output.DICT)

            # Draw boxes around detected text
            for i in range(len(data['text'])):
                if data['text'][i].strip():
                    x, y, w, h = data['left'][i], data['top'][i], data['width'][i], data['height'][i]
                    cv2.rectangle(screenshot_np, (x, y), (x + w, y + h), (0, 255, 0), 2)
                    cv2.putText(screenshot_np, data['text'][i], (x, y - 5),
                              cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 1)

            # Save annotated image
            cv2.imwrite(filename, cv2.cvtColor(screenshot_np, cv2.COLOR_RGB2BGR))
            logger.info(f"Debug screenshot saved: {filename}")
            return screenshot

        except Exception as e:
            logger.error(f"Error creating debug screenshot: {e}")
            return self.take_screenshot(filename)

    def check_ocr_setup(self):
        """Check if OCR is properly configured"""
        print("\n" + "=" * 70)
        print("OCR SETUP CHECK")
        print("=" * 70)

        if not OCR_AVAILABLE:
            print("[X] pytesseract not installed")
            print("  Run: pip install pytesseract")
            return False

        try:
            # Try to run OCR
            test_img = Image.new('RGB', (100, 30), color='white')
            pytesseract.image_to_string(test_img)
            print("[OK] OCR is working!")
            return True
        except Exception as e:
            print(f"[X] OCR error: {e}")
            print("\nTesseract OCR not installed or not in PATH")
            print("Download from: https://github.com/UB-Mannheim/tesseract/wiki")
            print("Install to: C:\\Program Files\\Tesseract-OCR")
            return False


def main():
    """Demo the vision agent"""
    print("=" * 70)
    print("VISION-ENABLED AI AGENT")
    print("=" * 70)

    agent = VisionAgent()

    # Check OCR setup
    if not agent.check_ocr_setup():
        print("\nNote: Some features require Tesseract OCR installation")
        print("Basic mouse/keyboard automation still works!")

    print("\n" + "=" * 70)
    print("VISION AGENT READY")
    print("=" * 70)
    print("\nCapabilities:")
    print("  [+] Read text from screen (OCR)")
    print("  [+] Find and click text")
    print("  [+] Verify actions succeeded")
    print("  [+] Find images on screen")
    print("  [+] Smart field detection")
    print("  [+] Wait for specific elements")
    print("\nSee vision_agent_examples.py for usage examples")


if __name__ == "__main__":
    main()
