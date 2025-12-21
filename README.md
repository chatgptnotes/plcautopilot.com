# PLCAutoPilot

AI-Powered PLC Programming Assistant for Industrial Automation

## Overview

PLCAutoPilot is the world's first AI assistant that writes, tests, and deploys ladder logic for Schneider Electric EcoStruxure platforms. Transform specifications into production-ready PLC code in minutes while maintaining safety standards.

## Features

- **Ladder Logic Expert**: Understands relay logic, timers, counters, and industrial control patterns
- **Safety First**: Implements emergency stops and safety interlocks per IEC 61508
- **Hardware Configuration**: Auto-configures I/O modules for Modicon M221, M241, M251, M258, M580
- **HMI Integration**: Generates variable tags and screens for Vijeo Designer
- **Code Review**: Highlights safety-critical sections for engineer verification
- **Documentation**: Auto-generates I/O lists and commissioning guides

## Supported Platforms

- Machine Expert - Basic (Modicon M221)
- Machine Expert (M241/M251/M258)
- Control Expert (M580/M340)

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

This project is optimized for deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/chatgptnotes/plcautopilot.com)

## Safety Notice

PLCAutoPilot is a code drafting tool designed to accelerate development. All generated code must be reviewed, tested, and validated by certified engineers before deployment to production systems.

## License

Copyright © 2025 PLCAutoPilot. All rights reserved.

**Disclaimer**: Not affiliated with Schneider Electric. EcoStruxure and Modicon are registered trademarks of Schneider Electric.
