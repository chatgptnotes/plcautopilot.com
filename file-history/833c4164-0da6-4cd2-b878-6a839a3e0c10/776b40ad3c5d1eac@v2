"""
Example: Custom automation script
Shows how to use the Desktop AI Agent to open specific software
"""

from desktop_ai_agent import DesktopAIAgent
import time


def open_chrome_and_navigate():
    """Open Chrome and navigate to a website"""
    agent = DesktopAIAgent()

    print("\n=== Opening Chrome and navigating to website ===")
    agent.open_software_via_search("Chrome", wait_time=3)

    time.sleep(2)
    agent.hotkey('ctrl', 'l')  # Focus address bar
    time.sleep(0.5)

    agent.type_text("https://www.google.com")
    agent.press_key('enter')
    print("Navigation complete!")


def open_notepad_and_write():
    """Open Notepad and write some text"""
    agent = DesktopAIAgent()

    print("\n=== Opening Notepad and writing text ===")
    agent.open_software_via_run("notepad", wait_time=2)

    time.sleep(1)
    agent.type_text("This is automated text from Desktop AI Agent!\n\n")
    agent.type_text("Date: " + time.strftime("%Y-%m-%d %H:%M:%S"))

    # Save file
    time.sleep(1)
    agent.hotkey('ctrl', 's')
    time.sleep(1)
    agent.type_text("automated_note.txt")
    agent.press_key('enter')
    print("Notepad automation complete!")


def open_calculator_and_calculate():
    """Open Calculator and perform calculation"""
    agent = DesktopAIAgent()

    print("\n=== Opening Calculator and performing calculation ===")
    agent.open_software_via_run("calc", wait_time=2)

    time.sleep(1)
    # Calculate 125 + 75
    agent.press_key('1')
    agent.press_key('2')
    agent.press_key('5')
    agent.press_key('add')
    agent.press_key('7')
    agent.press_key('5')
    agent.press_key('enter')
    print("Calculation complete! Result should be 200")


def open_file_explorer_and_navigate():
    """Open File Explorer and navigate to a folder"""
    agent = DesktopAIAgent()

    print("\n=== Opening File Explorer ===")
    agent.open_software_via_run("explorer", wait_time=2)

    time.sleep(1)
    agent.hotkey('ctrl', 'l')  # Focus address bar
    time.sleep(0.5)

    agent.type_text(r"C:\Users")
    agent.press_key('enter')
    print("File Explorer opened and navigated!")


def open_custom_software(software_name, wait_time=3):
    """
    Template for opening any custom software

    Replace software_name with your installed software
    Examples: "Visual Studio Code", "Slack", "Discord", "Spotify"
    """
    agent = DesktopAIAgent()

    print(f"\n=== Opening {software_name} ===")
    agent.open_software_via_search(software_name, wait_time=wait_time)
    print(f"{software_name} should now be open!")


def main():
    """Main menu for examples"""
    print("=" * 60)
    print("Desktop AI Agent - Custom Examples")
    print("=" * 60)
    print("\nChoose an example:")
    print("1. Open Chrome and navigate to website")
    print("2. Open Notepad and write text")
    print("3. Open Calculator and perform calculation")
    print("4. Open File Explorer")
    print("5. Open custom software (you specify)")
    print("0. Exit")
    print("\nIMPORTANT: Move mouse to top-left corner to abort!")
    print("=" * 60)

    choice = input("\nEnter your choice (0-5): ").strip()

    if choice == '1':
        print("\nStarting in 3 seconds...")
        time.sleep(3)
        open_chrome_and_navigate()
    elif choice == '2':
        print("\nStarting in 3 seconds...")
        time.sleep(3)
        open_notepad_and_write()
    elif choice == '3':
        print("\nStarting in 3 seconds...")
        time.sleep(3)
        open_calculator_and_calculate()
    elif choice == '4':
        print("\nStarting in 3 seconds...")
        time.sleep(3)
        open_file_explorer_and_navigate()
    elif choice == '5':
        software = input("Enter software name: ").strip()
        print(f"\nStarting in 3 seconds...")
        time.sleep(3)
        open_custom_software(software)
    elif choice == '0':
        print("Goodbye!")
    else:
        print("Invalid choice!")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nStopped by user")
    except Exception as e:
        print(f"\nError: {e}")
        raise
