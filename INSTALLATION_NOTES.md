# Installation Notes for PLCAutoPilot

## Required Software Downloads

### EcoStruxure Machine Expert Basic

The EcoStruxure Machine Expert Basic installer (`MachineExpertBasic_V1.4_Build484.exe`, 695 MB) is **not included** in this repository due to GitHub's 100 MB file size limit.

**Download it separately from Schneider Electric:**

1. Visit: https://www.se.com/ww/en/product-range-download/548-ecostruxure%E2%84%A2-machine-expert/
2. Download: **EcoStruxure Machine Expert - Basic** (latest version)
3. Install the software before running the Python automation scripts

### Alternative Download Links

- Schneider Electric Product Page: https://www.se.com/ww/en/product/SOMBXBASIC/ecostruxure-machine-expert-basic/
- Technical Support: https://www.se.com/support

## Files Excluded from Git

The following large files are excluded via `.gitignore`:

- `*.exe` - Executable files (installers, applications)
- `*.msi` - Windows installer packages
- `*.dmg` - macOS disk images
- `*.pkg` - macOS packages

These files should be downloaded directly from official sources or kept locally.

## Python Requirements

All Python dependencies are included in `requirements.txt`:

```bash
pip install -r requirements.txt
```

This installs:
- pyautogui==0.9.54
- pillow==12.0.0
- opencv-python (optional)
- pygetwindow==0.0.9
- pynput==1.8.1
- pytesseract (optional, for OCR features)

## Next Steps

1. Download and install EcoStruxure Machine Expert Basic
2. Install Python dependencies
3. Run automation scripts:
   - `python program_motor_startstop.py`
   - `python auto_download_plc.py`

For complete instructions, see `README.md` and `COMPLETE_WORKFLOW_SUMMARY.md`.
