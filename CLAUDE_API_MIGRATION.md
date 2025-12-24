# Claude API Migration Guide

## Overview
PLCAutoPilot has been migrated from Google Gemini API to Anthropic Claude API for improved AI-powered PLC code generation and sketch analysis.

## Changes Made

### 1. Environment Variables
- **Old**: `GEMINI_API_KEY`
- **New**: `ANTHROPIC_API_KEY`

### 2. Updated Files
- `.env.local` - Created with Claude API key
- `.env.example` - Updated with Claude API configuration
- `plc_file_handler/converters/sketch_analyzer.py` - Migrated to Claude SDK
- `plc_file_handler/cli.py` - Updated environment variable checks
- `requirements.txt` - Added `anthropic>=0.40.0`

### 3. Model Configuration
- **Default Model**: `claude-3-5-sonnet-20241022`
- **Max Tokens**: 4096
- **Vision Support**: Yes (for sketch analysis)

## Installation

### Option 1: Using Virtual Environment (Recommended)
```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On macOS/Linux
# OR
venv\Scripts\activate  # On Windows

# Install dependencies
pip install -r requirements.txt
```

### Option 2: Using pipx (For CLI tools)
```bash
# Install pipx
brew install pipx  # On macOS

# Install anthropic
pipx install anthropic
```

### Option 3: System-wide (Not recommended)
```bash
pip3 install --break-system-packages anthropic
```

## Configuration

### 1. Set Environment Variable
Add to your `.env.local` file:
```bash
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
CLAUDE_MODEL=claude-3-5-sonnet-20241022
```

Or export in your shell:
```bash
export ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
```

### 2. Vercel Deployment
Add environment variables in Vercel dashboard:
- `ANTHROPIC_API_KEY` - Your Claude API key
- `CLAUDE_MODEL` - `claude-3-5-sonnet-20241022`

## Usage

### Sketch Analysis (CLI)
```bash
# Analyze a hand-drawn ladder logic sketch
python3 plc_file_handler/cli.py analyze motor_sketch.jpg --platform schneider -o analysis.json
```

### Generate PLC File from Sketch
```bash
# Generate .smbp file from sketch
python3 plc_file_handler/cli.py generate \
  --platform schneider \
  --name "Motor_Control" \
  --from-sketch motor_sketch.jpg \
  --output Motor_Control.smbp
```

### Python API
```python
from plc_file_handler import SketchAnalyzer

# Initialize analyzer
analyzer = SketchAnalyzer()  # Uses ANTHROPIC_API_KEY from environment

# Analyze sketch
analysis = analyzer.analyze_sketch("motor_sketch.jpg", platform="schneider")

# Get summary
print(analyzer.get_summary(analysis))

# Export to JSON
analyzer.export_analysis(analysis, "analysis_result.json")
```

## API Key Acquisition

### Get Claude API Key
1. Visit: https://console.anthropic.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (starts with `sk-ant-api03-`)

### Pricing
- Claude 3.5 Sonnet:
  - Input: $3 per million tokens
  - Output: $15 per million tokens
  - Vision: Same as text pricing

## Migration Benefits

### 1. Better Performance
- More accurate ladder logic recognition
- Improved handling of hand-drawn diagrams
- Better understanding of PLC-specific terminology

### 2. Enhanced Features
- Native vision support (no separate processing)
- Longer context windows
- More reliable JSON output parsing

### 3. Cost Efficiency
- Competitive pricing
- Better accuracy = fewer retries
- More predictable token usage

## Troubleshooting

### "anthropic package required" Error
```bash
# Install in virtual environment
python3 -m venv venv
source venv/bin/activate
pip install anthropic
```

### "ANTHROPIC_API_KEY not found" Error
```bash
# Check environment variable
echo $ANTHROPIC_API_KEY

# Set temporarily
export ANTHROPIC_API_KEY=sk-ant-api03-your-key-here

# Set permanently (add to ~/.zshrc or ~/.bashrc)
echo 'export ANTHROPIC_API_KEY=sk-ant-api03-your-key-here' >> ~/.zshrc
source ~/.zshrc
```

### Vision Analysis Not Working
- Ensure image format is supported: JPEG, PNG, GIF, WebP
- Check image file size (max 5MB recommended)
- Verify image path is correct and accessible

## Backward Compatibility

The old Gemini API integration has been completely removed. To use the new Claude API:

1. Update environment variables
2. Install anthropic package
3. No code changes needed for end users

## Testing

### Test Sketch Analyzer
```bash
# Set API key
export ANTHROPIC_API_KEY=sk-ant-api03-your-key-here

# Run test
python3 -c "
from plc_file_handler import SketchAnalyzer
import os
if os.getenv('ANTHROPIC_API_KEY'):
    print('✓ Claude API key configured')
    print('✓ SketchAnalyzer ready')
else:
    print('✗ ANTHROPIC_API_KEY not set')
"
```

### Test CLI
```bash
# Check help
python3 plc_file_handler/cli.py --help

# Test analyze command (requires image file)
# python3 plc_file_handler/cli.py analyze test_sketch.jpg --platform schneider
```

## Support

For issues or questions:
- GitHub Issues: https://github.com/chatgptnotes/plcautopilot.com/issues
- Documentation: README.md
- API Reference: https://docs.anthropic.com/

## Version History

- **v1.3** (2025-12-25): Migrated to Claude API
- **v1.2** (2025-12-22): Last version with Gemini API
- **v1.0** (2025-12-21): Initial release

---

*PLCAutoPilot v1.3 | Last Updated: 2025-12-25 | Claude API Integration*
