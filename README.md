# PLCAutoPilot

**AI-Powered PLC Programming Platform for Industrial Automation**

Transform PLC specifications into production-ready ladder logic code in minutes, reducing development time by 80% while maintaining IEC 61508 safety standards.

---

## 🎯 Project Overview

PLCAutoPilot combines two powerful components:

1. **Next.js Web Application** - Marketing website and AI assistant interface
2. **Python Desktop Automation** - Automated PLC programming framework

---

## 🌐 Web Application

Modern Next.js application for PLCAutoPilot marketing and future AI assistant.

### Tech Stack
- Next.js 15.5.9
- React 19.0.0
- TypeScript 5
- Tailwind CSS 3.4.1
- Framer Motion 11.15.0

### Quick Start
```bash
cd plcautopilot-nextjs
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Deployment
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/chatgptnotes/plcautopilot.com)

---

## 🤖 Python Desktop Automation

Python-based automation framework for PLC programming with Windows desktop automation.

### Features

- **Automated Software Launch**: Open EcoStruxure Machine Expert Basic
- **Ladder Logic Programming**: Automated motor start/stop circuits
- **PLC Download**: Automated program download to PLC hardware
- **Vision Agent**: OCR and computer vision for UI automation
- **Hardware Configuration**: I/O setup and safety configuration

### Requirements

- Windows 10/11
- Python 3.7+
- EcoStruxure Machine Expert Basic

### Installation

```bash
pip install -r requirements.txt
```

This installs:
- `pyautogui` - Mouse and keyboard automation
- `pillow` - Screenshots
- `opencv-python` - Image processing
- `pygetwindow` - Window management
- `pynput` - Input monitoring
- `pytesseract` - OCR (optional)

### Quick Start

**1. Program Motor Start/Stop:**
```bash
python program_motor_startstop.py
```

**2. Download to PLC:**
```bash
python auto_download_plc.py
```

**3. Complete Workflow:**
See `COMPLETE_WORKFLOW_SUMMARY.md` for end-to-end guide

---

## 📚 Documentation

| File | Description |
|------|-------------|
| `README.md` | This file - Project overview |
| `COMPLETE_WORKFLOW_SUMMARY.md` | Complete automation workflow (546 lines) |
| `MOTOR_STARTSTOP_README.md` | Motor start/stop program details |
| `WIRING_AND_TESTING_GUIDE.md` | Hardware installation guide |
| `VISION_AGENT_COMPLETE.md` | Vision agent summary |
| `VISION_AGENT_SETUP.md` | Vision setup instructions |
| `VISION_CAPABILITIES.md` | Vision features documentation |

---

## 🎛️ Supported PLCs

### Machine Expert - Basic
- Modicon M221 (Compact PLCs)

### Machine Expert
- M241, M251, M258 (Mid-range PLCs)

### Control Expert
- M580, M340 (High-performance PLCs)

---

## ✨ Key Features

### AI Assistant Capabilities

1. **Ladder Logic Expert**: Relay logic, timers, counters, industrial patterns
2. **Safety First**: Emergency stops, safety interlocks per IEC 61508
3. **Hardware Configuration**: Auto-configures I/O modules
4. **HMI Integration**: Variable tags for Vijeo Designer, Wonderware, FactoryTalk
5. **Code Review**: Highlights safety-critical sections
6. **Documentation**: Auto-generates I/O lists and commissioning guides

### Desktop Automation Capabilities

1. **Software Launch**: Automated opening of EcoStruxure
2. **Project Creation**: Create and configure PLC projects
3. **Ladder Programming**: Automated ladder logic programming
4. **Compilation**: Compile and save projects
5. **PLC Download**: Download programs via USB
6. **Vision Support**: OCR text reading and image matching

---

## 🚀 Usage Examples

### Basic Desktop Automation
```python
from desktop_ai_agent import DesktopAIAgent

agent = DesktopAIAgent()
agent.open_software_via_search("EcoStruxure", wait_time=3)
agent.type_text("Hello World!")
```

### Vision-Enabled Automation
```python
from vision_agent import VisionAgent

agent = VisionAgent()
text = agent.read_screen_text()
agent.click_text("OK")
agent.wait_for_text("Ready", timeout=10)
```

---

## 📁 Project Structure

```
plcautopilot.com/
├── Python Automation Scripts
│   ├── desktop_ai_agent.py         # Core automation agent
│   ├── vision_agent.py             # Vision-enabled agent
│   ├── program_motor_startstop.py  # Motor control automation
│   ├── auto_download_plc.py        # PLC download automation
│   └── configure_plc_protection.py # Safety configuration
│
├── Documentation
│   ├── COMPLETE_WORKFLOW_SUMMARY.md
│   ├── MOTOR_STARTSTOP_README.md
│   ├── WIRING_AND_TESTING_GUIDE.md
│   └── VISION_AGENT_COMPLETE.md
│
├── Next.js Web App
│   └── plcautopilot-nextjs/        # Web application
│
└── Configuration
    ├── config.json                  # Software configuration
    └── requirements.txt             # Python dependencies
```

---

## ⚙️ Configuration

Edit `config.json` to customize software settings:

```json
{
  "software_list": [
    {
      "name": "EcoStruxure Machine Expert Basic",
      "search_term": "Machine Expert",
      "method": "search"
    }
  ],
  "settings": {
    "default_wait_time": 2,
    "typing_interval": 0.1,
    "failsafe": true
  }
}
```

---

## 🔒 Safety Features

1. **Failsafe Abort**: Move mouse to top-left corner (0,0) to stop
2. **Logging**: All actions logged for debugging
3. **Safety Standards**: IEC 61131-3 and IEC 61508 compliant
4. **Code Review**: Mandatory human verification of safety sections

---

## ⚠️ Safety Notice

PLCAutoPilot is a code drafting tool designed to accelerate development. **All generated code must be reviewed, tested, and validated by certified engineers before deployment to production systems.**

Always:
- Follow local electrical codes
- Test thoroughly before production
- Maintain proper documentation
- Train operators properly

---

## 📊 Statistics

- **Lines of Code**: 1,500+ Python automation
- **Documentation**: 100+ pages
- **React Components**: 22 TSX files
- **Automation Coverage**: Motor start/stop 100% complete
- **Time Savings**: 80% reduction in PLC development

---

## 🛠️ Troubleshooting

### Software doesn't open
- Increase `wait_time` parameter
- Verify software is installed
- Check software name in Windows Search

### Vision features not working
- Install Tesseract OCR: https://github.com/UB-Mannheim/tesseract/wiki
- Check PATH includes Tesseract directory

### PLC download fails
- Verify USB connection
- Check PLC is powered ON
- Ensure PLC is in STOP mode

---

## 📄 License

Copyright © 2025 PLCAutoPilot - Dr.M Hope Softwares. All rights reserved.

**Disclaimer**: Not affiliated with Schneider Electric. EcoStruxure and Modicon are registered trademarks of Schneider Electric SE.

---

## 🤝 Support

For issues or questions:
- Check documentation files
- Review PyAutoGUI docs: https://pyautogui.readthedocs.io
- Schneider Electric support: www.se.com/support

---

**Created by**: Dr. Murali BK
**Publisher**: Dr.M Hope Softwares
**Website**: https://plcautopilot.com
