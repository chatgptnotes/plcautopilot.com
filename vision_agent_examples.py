"""
Vision Agent Examples
Demonstrates how to use the vision-enabled AI agent
"""

from vision_agent import VisionAgent
import time


def example1_read_screen():
    """Example 1: Read all text from screen"""
    print("\n" + "=" * 70)
    print("EXAMPLE 1: Read Screen Text")
    print("=" * 70)

    agent = VisionAgent()

    print("\nReading all text from current screen...")
    text = agent.read_screen_text()

    if text:
        print(f"\nFound {len(text)} characters")
        print("\nFirst 500 characters:")
        print(text[:500])
    else:
        print("No text found or OCR not available")


def example2_find_and_click_text():
    """Example 2: Find and click text"""
    print("\n" + "=" * 70)
    print("EXAMPLE 2: Find and Click Text")
    print("=" * 70)

    agent = VisionAgent()

    text_to_find = input("\nEnter text to find and click (or press Enter to skip): ")

    if text_to_find:
        print(f"\nSearching for '{text_to_find}'...")
        if agent.click_text(text_to_find):
            print(f"✓ Clicked on '{text_to_find}'")
        else:
            print(f"✗ Text '{text_to_find}' not found")


def example3_verify_text():
    """Example 3: Verify text appears on screen"""
    print("\n" + "=" * 70)
    print("EXAMPLE 3: Verify Text on Screen")
    print("=" * 70)

    agent = VisionAgent()

    text_to_verify = input("\nEnter text to verify (or press Enter to skip): ")

    if text_to_verify:
        print(f"\nChecking if '{text_to_verify}' is visible...")
        if agent.verify_text_on_screen(text_to_verify, timeout=2):
            print(f"✓ Text '{text_to_verify}' is visible!")
        else:
            print(f"✗ Text '{text_to_verify}' not found")


def example4_smart_software_open():
    """Example 4: Open software with verification"""
    print("\n" + "=" * 70)
    print("EXAMPLE 4: Smart Software Opening")
    print("=" * 70)

    agent = VisionAgent()

    print("\nOpening Notepad with verification...")
    print("This will:")
    print("  1. Open Notepad")
    print("  2. Verify it opened by checking for text")
    print("\nStarting in 3 seconds...")
    time.sleep(3)

    success = agent.open_software_smart(
        "notepad",
        verify_text="Untitled",
        wait_time=3
    )

    if success:
        print("✓ Notepad opened and verified!")
    else:
        print("✗ Could not verify Notepad opened")


def example5_debug_screen():
    """Example 5: Debug - Show all text on screen"""
    print("\n" + "=" * 70)
    print("EXAMPLE 5: Debug Screen Text")
    print("=" * 70)

    agent = VisionAgent()

    print("\nThis will display ALL text detected on your current screen")
    input("Press Enter to continue...")

    agent.show_screen_text()


def example6_save_annotated_screenshot():
    """Example 6: Save screenshot with detected text highlighted"""
    print("\n" + "=" * 70)
    print("EXAMPLE 6: Annotated Screenshot")
    print("=" * 70)

    agent = VisionAgent()

    print("\nTaking screenshot with text detection overlay...")
    agent.save_screenshot_with_text('annotated_screen.png')
    print("✓ Saved as: annotated_screen.png")
    print("  Green boxes show detected text regions")


def example7_wait_for_text():
    """Example 7: Wait for specific text to appear"""
    print("\n" + "=" * 70)
    print("EXAMPLE 7: Wait for Text")
    print("=" * 70)

    agent = VisionAgent()

    print("\nDemo: Waiting for text to appear")
    print("1. Opens Notepad")
    print("2. Types 'Hello Vision!'")
    print("3. Waits to verify the text appears")

    confirm = input("\nRun demo? (y/n): ")

    if confirm.lower() == 'y':
        print("\nStarting in 3 seconds...")
        time.sleep(3)

        # Open Notepad
        agent.press_key('win')
        time.sleep(0.5)
        agent.type_text('notepad')
        time.sleep(0.5)
        agent.press_key('enter')
        time.sleep(2)

        # Type text
        agent.type_text('Hello Vision!')
        time.sleep(0.5)

        # Verify it appeared
        if agent.wait_for_text('Hello Vision', timeout=5):
            print("✓ Text verified on screen!")
        else:
            print("✗ Text not detected")


def example8_plc_programming_smart():
    """Example 8: Smart PLC Programming with Vision"""
    print("\n" + "=" * 70)
    print("EXAMPLE 8: Vision-Enhanced PLC Programming")
    print("=" * 70)

    agent = VisionAgent()

    print("\nThis example shows how vision makes automation more reliable:")
    print("\n TRADITIONAL (Blind):")
    print("   - Press Ctrl+N (hope dialog opens)")
    print("   - Wait 2 seconds (guess)")
    print("   - Type text (hope in right field)")
    print("   - Press Enter (hope it worked)")
    print("   - No verification!")

    print("\n WITH VISION:")
    print("   - Press Ctrl+N")
    print("   - VERIFY 'New Project' dialog appeared")
    print("   - FIND PLC selection field")
    print("   - Type TM221CE24T")
    print("   - Click OK button by text")
    print("   - VERIFY project created")

    print("\nKey Differences:")
    print("  ✓ Verifies each step")
    print("  ✓ Adapts to UI changes")
    print("  ✓ Detects errors immediately")
    print("  ✓ More reliable")


def main():
    """Main menu"""
    print("=" * 70)
    print("VISION AGENT EXAMPLES")
    print("=" * 70)

    agent = VisionAgent()

    # Check OCR
    print("\nChecking OCR setup...")
    ocr_works = agent.check_ocr_setup()

    if not ocr_works:
        print("\n⚠ WARNING: OCR not fully configured")
        print("\nTo enable vision features:")
        print("  1. Download Tesseract OCR:")
        print("     https://github.com/UB-Mannheim/tesseract/wiki")
        print("  2. Install to: C:\\Program Files\\Tesseract-OCR")
        print("  3. Restart this script")
        print("\nBasic automation (mouse/keyboard) still works!")

    print("\n" + "=" * 70)
    print("AVAILABLE EXAMPLES")
    print("=" * 70)
    print("1. Read all text from screen")
    print("2. Find and click text")
    print("3. Verify text is visible")
    print("4. Smart software opening (Notepad demo)")
    print("5. Debug - Show all screen text")
    print("6. Save annotated screenshot")
    print("7. Wait for text demo")
    print("8. PLC programming comparison (info only)")
    print("0. Exit")

    while True:
        choice = input("\nEnter choice (0-8): ").strip()

        if choice == '0':
            print("Goodbye!")
            break
        elif choice == '1':
            example1_read_screen()
        elif choice == '2':
            example2_find_and_click_text()
        elif choice == '3':
            example3_verify_text()
        elif choice == '4':
            example4_smart_software_open()
        elif choice == '5':
            example5_debug_screen()
        elif choice == '6':
            example6_save_annotated_screenshot()
        elif choice == '7':
            example7_wait_for_text()
        elif choice == '8':
            example8_plc_programming_smart()
        else:
            print("Invalid choice")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nExiting...")
