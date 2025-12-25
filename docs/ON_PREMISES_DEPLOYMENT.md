# PLCAutoPilot On-Premises Deployment Guide

## Overview

PLCAutoPilot Enterprise Edition supports fully offline, on-premises deployment with local AI models. This allows companies to generate PLC programs without internet connectivity, ensuring complete data privacy and compliance with air-gapped network requirements.

## Benefits of On-Premises Deployment

### Security & Compliance
- **Air-Gapped Networks**: Works in facilities with no internet access
- **IP Protection**: All code and designs remain within your network
- **ITAR/EAR Compliance**: Suitable for defense and aerospace applications
- **Data Sovereignty**: Complete control over all data

### Reliability
- **No Internet Dependency**: Generate programs 24/7 regardless of connectivity
- **Predictable Performance**: Dedicated hardware ensures consistent response times
- **No API Rate Limits**: Unlimited program generation

### Cost Efficiency
- **No Per-Use Fees**: One-time license, unlimited usage
- **Reduced Latency**: Local processing eliminates network delays

## Supported Local AI Models

### Recommended: CodeLlama 34B
- **Parameters**: 34 billion
- **Training**: 500B tokens of code
- **Performance**: Best balance of quality and hardware requirements
- **Hardware**: 64GB RAM, 24GB VRAM GPU (RTX 4090 or better)
- **Use Case**: Production environments, complex PLC programs

### Alternative: DeepSeek Coder 33B
- **Parameters**: 33 billion
- **Performance**: 94% effectiveness (vs Copilot's 89%)
- **Hardware**: 64GB RAM, 24GB VRAM GPU
- **Use Case**: Advanced algorithm generation, optimization

### Budget Option: Mistral 7B
- **Parameters**: 7 billion
- **Performance**: Good for simple to moderate programs
- **Hardware**: 16GB RAM, 8GB VRAM GPU (RTX 3060 or better)
- **Use Case**: Small facilities, basic automation

### Lightweight: CodeLlama 13B
- **Parameters**: 13 billion
- **Performance**: Balanced quality and speed
- **Hardware**: 32GB RAM, 12GB VRAM GPU
- **Use Case**: Mid-size projects, real-time generation

## System Requirements

### Minimum (Mistral 7B)
- **CPU**: 8-core modern processor (Intel i7 12th gen or AMD Ryzen 7)
- **RAM**: 16GB DDR4
- **GPU**: NVIDIA RTX 3060 (8GB VRAM) or Apple M1 Pro
- **Storage**: 100GB SSD
- **OS**: Windows 10/11, Ubuntu 20.04+, macOS 12+

### Recommended (CodeLlama 34B)
- **CPU**: 16-core processor (Intel i9 13th gen or AMD Ryzen 9)
- **RAM**: 64GB DDR5
- **GPU**: NVIDIA RTX 4090 (24GB VRAM) or A100 (40GB)
- **Storage**: 500GB NVMe SSD
- **OS**: Windows 11 Pro, Ubuntu 22.04 LTS

### Enterprise (Multi-User)
- **CPU**: Dual Xeon or EPYC (32+ cores)
- **RAM**: 128GB+ ECC
- **GPU**: 2x NVIDIA A100 (80GB) or H100
- **Storage**: 2TB NVMe RAID
- **OS**: Ubuntu Server 22.04 LTS, Docker support

## Architecture

### Deployment Options

#### 1. Standalone Desktop
```
┌─────────────────────────────────────┐
│   PLCAutoPilot Desktop Application  │
│                                      │
│   ┌──────────────┐  ┌─────────────┐ │
│   │   Web UI     │  │  Local AI   │ │
│   │  (Electron)  │◄─┤   (Ollama)  │ │
│   └──────────────┘  └─────────────┘ │
│                                      │
│   ┌──────────────────────────────┐  │
│   │  PLC Program Generator       │  │
│   │  - Schneider (Machine Expert)│  │
│   │  - Siemens (TIA Portal)      │  │
│   │  - Rockwell (Studio 5000)    │  │
│   │  - CODESYS (500+ brands)     │  │
│   └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

#### 2. Server Deployment (Multi-User)
```
┌───────────────────────────────────────────────┐
│           PLCAutoPilot Server                 │
│                                               │
│   ┌─────────────┐      ┌──────────────┐     │
│   │   API       │      │   Local AI   │     │
│   │   Server    │◄─────┤   Model      │     │
│   │  (FastAPI)  │      │  (Ollama)    │     │
│   └─────────────┘      └──────────────┘     │
│         ▲                                     │
│         │                                     │
│   ┌─────┴────────────────────────────┐      │
│   │  Load Balancer (nginx)           │      │
│   └──────────────────────────────────┘      │
└───────────────────────────────────────────────┘
           ▲
           │ Internal Network Only
           │
    ┌──────┴───────┐
    │              │
┌───▼────┐    ┌───▼────┐
│ Client │    │ Client │  (Engineers' workstations)
│   1    │    │   2    │
└────────┘    └────────┘
```

## Installation Steps

### Step 1: Install Ollama (AI Model Server)

#### Windows
```powershell
# Download from https://ollama.ai/download/windows
# Run installer: OllamaSetup.exe

# Verify installation
ollama --version
```

#### Linux
```bash
curl -fsSL https://ollama.ai/install.sh | sh

# Verify installation
ollama --version
```

#### macOS
```bash
# Download from https://ollama.ai/download/mac
# Install via DMG

# Or via Homebrew
brew install ollama
```

### Step 2: Pull AI Models

```bash
# For production (recommended)
ollama pull codellama:34b

# For budget deployment
ollama pull mistral:7b-instruct

# For advanced features
ollama pull deepseek-coder:33b

# Verify models
ollama list
```

### Step 3: Install PLCAutoPilot Enterprise

#### Option A: Desktop Application
```bash
# Download PLCAutoPilot Enterprise installer
# Windows: PLCAutoPilot-Enterprise-Setup.exe
# Linux: plcautopilot-enterprise.deb or .rpm
# macOS: PLCAutoPilot-Enterprise.dmg

# Run installer and follow prompts
```

#### Option B: Server Deployment
```bash
# Clone repository
git clone https://github.com/plcautopilot/enterprise-server.git
cd enterprise-server

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env to point to local Ollama instance

# Start server
python server.py
```

### Step 4: Configure Local AI Connection

Edit configuration file: `config/ai-settings.yaml`

```yaml
ai_provider: "local"  # Use local AI instead of cloud

local_ai:
  provider: "ollama"
  host: "http://localhost:11434"
  model: "codellama:34b"

  # Model-specific settings
  temperature: 0.2  # Lower = more deterministic
  max_tokens: 4096
  timeout: 60  # seconds

  # Fallback models
  fallback:
    - "codellama:13b"
    - "mistral:7b-instruct"

# PLC Platform support
platforms:
  schneider:
    enabled: true
    machine_expert_path: "C:\\Program Files\\Schneider Electric\\Machine Expert"

  siemens:
    enabled: true
    tia_portal_path: "C:\\Program Files\\Siemens\\Automation\\Portal V18"

  rockwell:
    enabled: true
    studio5000_path: "C:\\Program Files (x86)\\Rockwell Software\\Studio 5000"

  codesys:
    enabled: true
    codesys_path: "C:\\Program Files\\CODESYS\\CODESYS"
```

### Step 5: Verify Installation

```bash
# Test local AI connection
plcautopilot test-ai

# Expected output:
# ✓ Ollama service running
# ✓ Model codellama:34b loaded
# ✓ Test generation successful
# ✓ Response time: 1.2s

# Test PLC platform integration
plcautopilot test-platforms

# Expected output:
# ✓ Schneider Machine Expert detected
# ✓ Siemens TIA Portal detected
# ✓ Rockwell Studio 5000 detected
# ✓ CODESYS detected
```

## Usage

### Generate PLC Program (Offline)

```python
from plcautopilot import PLCGenerator

# Initialize with local AI
generator = PLCGenerator(
    ai_provider="local",
    model="codellama:34b"
)

# Create program specification
spec = {
    "platform": "schneider",
    "plc_model": "M241",
    "description": "Motor start/stop with safety interlocks",
    "inputs": [
        {"name": "START_BUTTON", "address": "%I0.0"},
        {"name": "STOP_BUTTON", "address": "%I0.1"},
        {"name": "EMERGENCY_STOP", "address": "%I0.2"}
    ],
    "outputs": [
        {"name": "MOTOR_CONTACTOR", "address": "%Q0.0"},
        {"name": "RUNNING_LAMP", "address": "%Q0.1"}
    ]
}

# Generate program (completely offline)
program = generator.generate(spec)

# Export to Machine Expert format
generator.export(program, format="xef", path="motor_program.xef")
```

### Web Interface (Local)

Access at: `http://localhost:3000`

All processing happens locally, no internet required.

## Performance Benchmarks

### Generation Times (CodeLlama 34B on RTX 4090)

| Program Complexity | Generation Time | Lines of Code |
|-------------------|-----------------|---------------|
| Simple (motor control) | 2-3 seconds | 50-100 |
| Medium (conveyor system) | 5-8 seconds | 200-400 |
| Complex (batch process) | 15-25 seconds | 800-1500 |
| Very Complex (production line) | 45-90 seconds | 3000+ |

### Concurrent Users

| Hardware | Model | Max Concurrent Users |
|----------|-------|---------------------|
| RTX 4090 (24GB) | CodeLlama 34B | 2-3 |
| A100 (40GB) | CodeLlama 34B | 4-6 |
| 2x A100 (80GB) | CodeLlama 70B | 8-12 |

## License Activation (Offline)

### Air-Gapped Activation Process

1. **Generate License Request**
```bash
plcautopilot license generate-request --machine-id auto
# Outputs: license-request.txt
```

2. **Transfer to Connected Machine**
- Copy `license-request.txt` to USB drive
- On internet-connected computer, upload to: https://plcautopilot.com/enterprise/activate

3. **Receive License File**
- Download `license-response.lic`
- Transfer back to air-gapped machine via USB

4. **Activate License**
```bash
plcautopilot license activate --file license-response.lic
# ✓ License activated successfully
# ✓ Valid until: 2026-12-31
# ✓ Max users: 10
```

## Updates & Maintenance

### Update AI Models (Offline)

```bash
# On internet-connected machine:
ollama pull codellama:34b
ollama list  # Note the model digest

# Export model
docker save ollama/codellama:34b -o codellama-34b.tar

# Transfer to air-gapped machine via USB/secure transfer
# Import model
docker load -i codellama-34b.tar
```

### Update PLCAutoPilot Software

```bash
# Download update package on connected machine
# Transfer update-v2.0.0.pkg to air-gapped machine

# Install update
plcautopilot update --offline --package update-v2.0.0.pkg
```

## Security Considerations

### Network Isolation
- Ensure Ollama service only listens on localhost (127.0.0.1)
- Use firewall rules to prevent external access
- Disable cloud telemetry in Ollama config

### File System Permissions
```bash
# Linux/macOS: Restrict access to authorized users only
chmod 700 /opt/plcautopilot
chown root:plcengineers /opt/plcautopilot
```

### Audit Logging
```yaml
# config/security.yaml
audit:
  enabled: true
  log_path: "/var/log/plcautopilot/audit.log"
  log_level: "INFO"
  events:
    - program_generation
    - program_export
    - user_login
    - configuration_change
```

## Troubleshooting

### Issue: Slow Generation Times

**Solution**: Check GPU utilization
```bash
# NVIDIA GPUs
nvidia-smi

# Ensure GPU is being used
# If VRAM is full, reduce model size or batch size
```

### Issue: Model Not Loading

**Solution**: Verify Ollama service
```bash
# Check service status
systemctl status ollama  # Linux
# or
Get-Service Ollama  # Windows PowerShell

# Restart service
systemctl restart ollama  # Linux
```

### Issue: Out of Memory

**Solution**: Switch to smaller model or add RAM
```bash
# Use smaller model
ollama pull codellama:13b

# Update config to use smaller model
# Edit config/ai-settings.yaml
model: "codellama:13b"
```

## Support

### Enterprise Support Contact
- **Email**: enterprise@plcautopilot.com
- **Phone**: +1-800-PLC-AUTO (24/7 for Enterprise customers)
- **Secure Portal**: https://support.plcautopilot.com

### Documentation
- **Installation Videos**: https://docs.plcautopilot.com/enterprise/videos
- **API Reference**: https://docs.plcautopilot.com/enterprise/api
- **Best Practices**: https://docs.plcautopilot.com/enterprise/best-practices

## Pricing

On-premises deployment is included in the **Enterprise Plan**:
- **Monthly**: $120/month
- **Annual**: $1,200/year
- **Perpetual License**: $5,000 (one-time) + $600/year support

Includes:
- Unlimited program generation (offline)
- All PLC platforms (Schneider, Siemens, Rockwell, CODESYS)
- Unlimited users
- Dedicated support engineer
- Custom AI model training
- Source code access (optional)

---

**PLCAutoPilot Enterprise Edition**
Version 2.0 | Last Updated: 2025-01-22
