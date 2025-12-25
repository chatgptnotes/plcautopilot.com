"""
Script to open EcoStruxure Machine Expert Basic
"""

from desktop_ai_agent import DesktopAIAgent
import time


def open_ecostruxure():
    """Open EcoStruxure Machine Expert Basic software"""
    agent = DesktopAIAgent()

    print("=" * 60)
    print("Opening EcoStruxure Machine Expert Basic")
    print("=" * 60)
    print("\nIMPORTANT: Move mouse to top-left corner to abort!")
    print("\nStarting in 3 seconds...")
    print("=" * 60)

    time.sleep(3)

    # Try opening via Windows Search
    print("\n[Attempt 1] Opening via Windows Search...")
    agent.open_software_via_search("ecostruxure machine expert basic", wait_time=5)

    print("\nEcoStruxure Machine Expert Basic should now be opening...")
    print("If it doesn't open, the software might use a different search term.")


if __name__ == "__main__":
    try:
        open_ecostruxure()
    except KeyboardInterrupt:
        print("\n\nStopped by user")
    except Exception as e:
        print(f"\nError: {e}")
        raise
