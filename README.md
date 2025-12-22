# Desktop AI Agent - Windows Automation

A Python-based AI agent that automates keyboard keystrokes and mouse movements to open installed software on Windows.

## Features

- **Automated Software Launch**: Open any installed software using multiple methods
- **Smart Search**: Use Windows Search to find and launch applications
- **Run Dialog**: Execute commands via Win+R dialog
- **Mouse Control**: Simulate mouse movements and clicks
- **Keyboard Control**: Type text and press key combinations
- **Configurable**: Easy JSON configuration for different software
- **Safe**: Built-in failsafe - move mouse to top-left corner to abort

## Requirements

- Windows 10/11
- Python 3.7 or higher

## Installation

### Step 1: Install Python
If you don't have Python installed:
1. Download from https://www.python.org/downloads/
2. Run installer and check "Add Python to PATH"

### Step 2: Install Dependencies
Open Command Prompt or PowerShell and run:
```bash
pip install -r requirements.txt
```

This will install:
- `pyautogui` - For mouse and keyboard automation
- `pillow` - For screenshots
- `opencv-python` - For image processing
- `pygetwindow` - For window management
- `pynput` - For input monitoring

## Usage

### Basic Demo
Run the included demo to see the agent in action:
```bash
python desktop_ai_agent.py
```

This will:
1. Open Notepad via Windows Search
2. Open Calculator via Run dialog
3. Type text in Notepad

### Custom Usage

Create your own script:

```python
from desktop_ai_agent import DesktopAIAgent

# Initialize agent
agent = DesktopAIAgent()

# Method 1: Open via Windows Search
agent.open_software_via_search("Chrome", wait_time=3)

# Method 2: Open via Run Dialog
agent.open_software_via_run("notepad", wait_time=2)

# Method 3: Click on icon (if you know coordinates)
agent.open_software_via_click((100, 100), wait_time=2)

# Type text
agent.type_text("Hello World!", interval=0.1)

# Press keys
agent.press_key('enter')
agent.hotkey('ctrl', 's')  # Ctrl+S to save
```

## Configuration

Edit `config.json` to add your software:

```json
{
  "software_list": [
    {
      "name": "Your Software",
      "search_term": "software name",
      "run_command": "software.exe",
      "method": "search"
    }
  ],
  "settings": {
    "default_wait_time": 2,
    "typing_interval": 0.1,
    "mouse_duration": 0.5,
    "failsafe": true
  }
}
```

## Available Methods

### Opening Software
- `open_software_via_search(name)` - Use Windows Search
- `open_software_via_run(command)` - Use Run dialog (Win+R)
- `open_software_via_click(x, y)` - Click on icon

### Mouse Control
- `move_mouse(x, y)` - Move to coordinates
- `click(x, y)` - Click at position
- `click(clicks=2)` - Double-click

### Keyboard Control
- `type_text(text)` - Type text
- `press_key(key)` - Press single key
- `hotkey('ctrl', 'c')` - Press key combination

### Utility
- `take_screenshot(filename)` - Capture screen
- `safe_delay(seconds)` - Wait with logging

## Safety Features

1. **Failsafe**: Move mouse to top-left corner (0, 0) to abort
2. **Pause**: 0.5s delay between PyAutoGUI calls
3. **Logging**: All actions are logged for debugging
4. **Keyboard Interrupt**: Press Ctrl+C to stop

## Common Software Commands

| Software | Search Term | Run Command |
|----------|-------------|-------------|
| Notepad | notepad | notepad |
| Calculator | calculator | calc |
| Paint | paint | mspaint |
| File Explorer | file explorer | explorer |
| Chrome | chrome | chrome |
| Word | word | winword |
| Excel | excel | excel |
| PowerPoint | powerpoint | powerpnt |
| VS Code | vscode | code |

## Troubleshooting

### Software doesn't open
- Increase `wait_time` parameter
- Verify software is installed
- Check if software name in search is correct

### Mouse/Keyboard not working
- Run as Administrator
- Disable antivirus temporarily
- Check Windows permissions

### Import errors
- Reinstall dependencies: `pip install -r requirements.txt --upgrade`
- Use virtual environment

## Advanced Features

### Screen Capture & Analysis
```python
# Take screenshot
agent.take_screenshot('screen.png')

# Find element on screen (requires OpenCV)
import cv2
# Add your computer vision logic here
```

### Window Management
```python
import pygetwindow as gw

# Get all windows
windows = gw.getAllTitles()

# Focus specific window
window = gw.getWindowsWithTitle('Notepad')[0]
window.activate()
```

## Creating Custom Automation Scripts

Example: Open Chrome and navigate to website
```python
from desktop_ai_agent import DesktopAIAgent
import time

agent = DesktopAIAgent()

# Open Chrome
agent.open_software_via_search("Chrome", wait_time=3)

# Wait for Chrome to load
time.sleep(2)

# Type URL
agent.type_text("https://www.google.com")
agent.press_key('enter')
```

## License

This project is for educational and automation purposes. Use responsibly.

## Support

For issues or questions, modify the code to suit your needs or check PyAutoGUI documentation:
https://pyautogui.readthedocs.io/

## Next Steps

1. Add computer vision to detect UI elements
2. Integrate with AI APIs for intelligent decision-making
3. Create workflow automation sequences
4. Build GUI for easier configuration
5. Add OCR for reading screen text
