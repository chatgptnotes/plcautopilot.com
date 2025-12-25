# Vision-Enabled AI Agent - Setup Guide

## What's New

Your AI agent can now **SEE and UNDERSTAND** what's on the screen!

### Before (Blind Automation):
```python
agent.click(500, 300)  # Hope button is there
time.sleep(2)          # Guess how long
# No way to verify it worked!
```

### After (Vision-Enabled):
```python
agent.click_text("OK")              # Find and click OK button
agent.verify_text_on_screen("Done") # Confirm success
agent.wait_for_text("Ready")        # Wait for specific state
# Knows exactly what's happening!
```

---

## Quick Setup

### Step 1: Python Packages (✓ Already Done)
```bash
pip install pytesseract  # ✓ Installed
```

### Step 2: Install Tesseract OCR

**Download Tesseract:**
- Go to: https://github.com/UB-Mannheim/tesseract/wiki
- Download: `tesseract-ocr-w64-setup-5.3.3.20231005.exe` (or latest)
- Run installer
- **Important:** Install to default location: `C:\Program Files\Tesseract-OCR`
- Check "Add to PATH" during installation

**Verify Installation:**
```bash
tesseract --version
```

Should show: `tesseract 5.x.x`

### Step 3: Test Vision Agent
```bash
python vision_agent.py
```

Should show:
```
✓ OCR is working!
```

---

## File Overview

### New Vision Files

| File | Description |
|------|-------------|
| `vision_agent.py` | Enhanced agent with OCR & vision |
| `vision_agent_examples.py` | Interactive examples |
| `program_plc_with_vision.py` | Vision-enhanced PLC programming |
| `VISION_AGENT_SETUP.md` | This file |
| `VISION_CAPABILITIES.md` | Detailed capabilities guide |

### Original Files (Still Work)
| File | Description |
|------|-------------|
| `desktop_ai_agent.py` | Basic agent (no vision) |
| `program_motor_startstop.py` | Original PLC programmer |

---

## New Capabilities

### 1. Read Text from Screen (OCR)
```python
from vision_agent import VisionAgent

agent = VisionAgent()

# Read all text on screen
text = agent.read_screen_text()
print(text)

# Check if specific text is visible
if agent.verify_text_on_screen("EcoStruxure"):
    print("Software is open!")
```

### 2. Find and Click Text
```python
# Find button by text and click it
agent.click_text("OK")

# Click near a label
agent.click_text("Username", offset_y=30)  # Click field below
```

### 3. Wait for Elements
```python
# Wait for text to appear
if agent.wait_for_text("Ready", timeout=10):
    print("System ready!")

# Verify action succeeded
agent.hotkey('ctrl', 'n')
if agent.verify_text_on_screen("New Project", timeout=5):
    print("Dialog opened successfully!")
```

### 4. Smart Field Entry
```python
# Find field by label and type in it
agent.smart_type_in_field("Project Name", "MotorStartStop")
```

### 5. Image Recognition
```python
# Find and click image on screen
agent.click_image("ok_button.png")

# Wait for image to appear
agent.wait_for_image("loading_icon.png", timeout=10)
```

### 6. Verification Screenshots
```python
# Save screenshot with all detected text highlighted
agent.save_screenshot_with_text("debug.png")

# Show all text on screen
agent.show_screen_text()
```

---

## Usage Examples

### Example 1: Verify Software Opened
```python
from vision_agent import VisionAgent

agent = VisionAgent()

# Open software
agent.press_key('win')
agent.type_text("notepad")
agent.press_key('enter')

# VERIFY it opened
if agent.wait_for_text("Untitled", timeout=5):
    print("✓ Notepad opened successfully!")
else:
    print("✗ Failed to open Notepad")
```

### Example 2: Smart Button Clicking
```python
# Instead of fixed coordinates:
# agent.click(500, 300)  # Breaks if UI changes

# Use text recognition:
agent.click_text("OK")     # Works even if button moved!
agent.click_text("Cancel")
agent.click_text("Apply")
```

### Example 3: Error Detection
```python
# Perform action
agent.hotkey('ctrl', 's')

# Check for errors
screen_text = agent.read_screen_text()
if 'error' in screen_text.lower():
    print("✗ Error detected!")
    agent.take_screenshot('error.png')
elif 'success' in screen_text.lower():
    print("✓ Action successful!")
```

### Example 4: Adaptive Automation
```python
# Wait for specific state
agent.wait_for_text("Ready", timeout=30)

# Find dialog by content
if agent.verify_text_on_screen("Confirm"):
    agent.click_text("Yes")
elif agent.verify_text_on_screen("Warning"):
    agent.click_text("Continue")
```

---

## Complete PLC Programming Example

### Traditional (Blind):
```python
agent.hotkey('ctrl', 'n')      # Hope dialog opens
time.sleep(2)                   # Guess timing
agent.type_text("TM221CE24T")  # Hope in right field
agent.press_key('enter')        # Hope it works
# No verification!
```

### With Vision:
```python
# Open new project
agent.hotkey('ctrl', 'n')

# VERIFY dialog opened
if not agent.wait_for_text("New Project", timeout=5):
    raise Exception("Dialog didn't open!")

# FIND and click PLC field
if agent.click_text("Controller"):
    agent.type_text("TM221CE24T")
else:
    # Fallback to keyboard navigation
    agent.press_key('tab')
    agent.type_text("TM221CE24T")

# Click OK button by text
agent.click_text("OK")

# VERIFY success
if agent.wait_for_text("MotorStartStop", timeout=10):
    print("✓ Project created successfully!")
else:
    raise Exception("Project creation failed!")
```

---

## Running the Examples

### Test Vision Features:
```bash
python vision_agent_examples.py
```

Choose from:
1. Read screen text
2. Find and click text
3. Verify text visibility
4. Smart software opening
5. Debug screen text
6. Annotated screenshots
7. Wait for text demo
8. PLC programming comparison

### Run Vision-Enhanced PLC Programming:
```bash
python program_plc_with_vision.py
```

Features:
- ✓ Verifies software opened
- ✓ Confirms dialogs appeared
- ✓ Validates text entry
- ✓ Detects compilation errors
- ✓ Takes verification screenshots

---

## Troubleshooting

### "OCR not available" Error

**Problem:** Tesseract not installed

**Solution:**
1. Download from: https://github.com/UB-Mannheim/tesseract/wiki
2. Install to: `C:\Program Files\Tesseract-OCR`
3. Add to PATH
4. Restart terminal

**Test:**
```bash
tesseract --version
```

### Text Not Being Recognized

**Causes:**
- Small font size
- Low contrast
- Unusual fonts
- Screen resolution

**Solutions:**
```python
# Take debug screenshot to see what OCR detects
agent.save_screenshot_with_text('debug.png')

# Read specific region
text = agent.read_screen_text(region=(100, 100, 500, 300))

# Show all detected text
agent.show_screen_text()
```

### Image Not Found

**Check:**
1. Template image exists
2. Image is exact match (same size/color)
3. Confidence threshold not too high

```python
# Lower confidence threshold
agent.click_image("button.png", confidence=0.7)  # Instead of 0.8

# Save debug screenshot
agent.take_screenshot('screen.png')
```

---

## Comparison: Basic vs Vision Agent

| Feature | Basic Agent | Vision Agent |
|---------|-------------|--------------|
| Click coordinates | YES | YES |
| Type text | YES | YES |
| Press keys | YES | YES |
| Read screen text | NO | ✓ YES (OCR) |
| Find text position | NO | ✓ YES |
| Verify actions | NO | ✓ YES |
| Find images | NO | ✓ YES |
| Wait for elements | NO | ✓ YES |
| Error detection | NO | ✓ YES |
| Adaptive UI | NO | ✓ YES |
| Debug tools | Basic | ✓ Advanced |

---

## API Reference

### Basic Automation (Same as original)
```python
agent.click(x, y)              # Click at coordinates
agent.type_text(text)          # Type text
agent.press_key(key)           # Press key
agent.hotkey('ctrl', 'c')      # Key combination
agent.take_screenshot(file)    # Screenshot
```

### Vision Features (NEW)
```python
# OCR - Text Recognition
agent.read_screen_text()                    # Read all text
agent.read_screen_text(region=(x,y,w,h))   # Read specific area
agent.find_text_on_screen(text)            # Find text position
agent.verify_text_on_screen(text, timeout) # Check if visible
agent.wait_for_text(text, timeout)         # Wait for text
agent.click_text(text, offset_x, offset_y) # Click text

# Image Recognition
agent.find_image_on_screen(template, confidence)
agent.click_image(template, confidence)
agent.wait_for_image(template, timeout, confidence)

# Smart Automation
agent.open_software_smart(name, verify_text, wait_time)
agent.click_button_by_text(button_text)
agent.smart_type_in_field(label, text, offset_y)
agent.verify_action_success(expected_text, timeout)

# Debugging
agent.show_screen_text()                   # Print all text
agent.save_screenshot_with_text(filename)  # Annotated screenshot
agent.check_ocr_setup()                    # Verify OCR works
```

---

## Best Practices

### 1. Always Verify Important Actions
```python
# BAD
agent.click(500, 300)
agent.type_text("important data")

# GOOD
if agent.click_text("Submit"):
    if agent.verify_text_on_screen("Success"):
        print("✓ Submitted successfully")
```

### 2. Use Timeouts
```python
# Give reasonable time for UI to respond
agent.wait_for_text("Ready", timeout=10)
```

### 3. Handle Errors
```python
try:
    if not agent.verify_text_on_screen("Dialog"):
        raise Exception("Expected dialog not found")
except Exception as e:
    agent.take_screenshot('error.png')
    raise
```

### 4. Debug with Screenshots
```python
# When something doesn't work:
agent.show_screen_text()  # See what OCR detects
agent.save_screenshot_with_text('debug.png')  # Visual debug
```

### 5. Fallback to Coordinates
```python
# Try vision first, fall back to coordinates
if not agent.click_text("OK"):
    print("Text not found, using coordinates")
    agent.click(500, 400)
```

---

## Performance Notes

- **OCR Speed:** ~0.5-2 seconds per screen read
- **Image Matching:** ~0.1-0.5 seconds
- **Screenshot:** ~0.1 seconds

**Optimization:**
```python
# Read specific region (faster)
text = agent.read_screen_text(region=(0, 0, 800, 600))

# Lower confidence for faster matching
agent.find_image_on_screen("icon.png", confidence=0.7)
```

---

## Next Steps

1. ✓ Install Tesseract OCR
2. ✓ Test: `python vision_agent.py`
3. ✓ Try examples: `python vision_agent_examples.py`
4. ✓ Run vision PLC programming: `python program_plc_with_vision.py`
5. ✓ Build your own vision-enhanced automations!

---

## Support Resources

**Tesseract OCR:**
- Download: https://github.com/UB-Mannheim/tesseract/wiki
- Documentation: https://tesseract-ocr.github.io/

**OpenCV (Image Processing):**
- Docs: https://docs.opencv.org/

**PyAutoGUI:**
- Docs: https://pyautogui.readthedocs.io/

---

**Created:** 2025-12-21
**Status:** Ready to Use
**Next:** Install Tesseract OCR and start using vision features!
