# PLCAutoPilot Simulation & Testing Framework

## Overview

PLCAutoPilot includes a comprehensive simulation and testing framework that allows you to validate PLC programs before deploying to physical hardware. This eliminates costly mistakes, reduces commissioning time by 60-80%, and ensures code quality.

---

## Why Simulation & Testing Matter

### Industry Problems
- **Costly Hardware Errors**: Bugs discovered on production floor cost 10-100x more than in simulation
- **Long Commissioning Times**: Traditional testing requires physical hardware and takes weeks
- **Safety Risks**: Untested code can damage equipment or injure personnel
- **No Regression Testing**: Changes break existing functionality without warning
- **Limited Test Coverage**: Physical testing only covers happy paths, misses edge cases

### PLCAutoPilot Solution
- **Virtual PLC**: Test without physical hardware
- **Automated Testing**: Generate test cases from specifications
- **Safety Validation**: Verify safety interlocks and SIL compliance
- **Edge Case Detection**: AI identifies scenarios you didn't consider
- **Regression Suite**: Ensure changes don't break existing code

---

## Simulation Technologies & Approaches

### 1. Virtual PLC Runtime (Recommended)

#### Technology Stack:
- **CODESYS Control Runtime** - Industry-standard virtual PLC
- **Soft PLC Emulators** - Platform-specific simulators
- **IEC 61131-3 Interpreter** - Execute ladder logic, ST, FBD in browser

#### How It Works:
```
┌─────────────────────────────────────────────────────┐
│         PLCAutoPilot Web Interface                  │
│                                                      │
│  ┌──────────────┐      ┌──────────────┐            │
│  │   Editor     │      │  Simulation  │            │
│  │  (Ladder/ST) │─────▶│   Engine     │            │
│  └──────────────┘      └──────────────┘            │
│                              │                       │
│                              ▼                       │
│                    ┌──────────────────┐             │
│                    │  Virtual PLC     │             │
│                    │  Runtime Engine  │             │
│                    │  (IEC 61131-3)   │             │
│                    └──────────────────┘             │
│                              │                       │
│                              ▼                       │
│  ┌────────────────────────────────────────┐         │
│  │  I/O Simulator                         │         │
│  │  - Virtual inputs (buttons, sensors)   │         │
│  │  - Virtual outputs (motors, valves)    │         │
│  │  - Analog simulation                   │         │
│  │  - Network communication               │         │
│  └────────────────────────────────────────┘         │
│                              │                       │
│                              ▼                       │
│  ┌────────────────────────────────────────┐         │
│  │  Visualization                          │         │
│  │  - Real-time variable monitoring       │         │
│  │  - 3D process animation                │         │
│  │  - HMI preview                          │         │
│  │  - Trend charts                         │         │
│  └────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────┘
```

#### Advantages:
- ✅ 100% accurate PLC behavior
- ✅ Cycle time calculation
- ✅ Memory usage analysis
- ✅ Real-time debugging
- ✅ Works offline

#### Implementation Options:

**Option A: WebAssembly Runtime (Best for PLCAutoPilot)**
```javascript
// Compile IEC 61131-3 interpreter to WebAssembly
// Run entirely in browser, no backend needed
import { PLCRuntime } from './plc-runtime.wasm';

const runtime = new PLCRuntime();
runtime.loadProgram(ladderLogicCode);
runtime.setInput('START_BUTTON', true);
runtime.scan(); // Execute one PLC scan cycle
const motorStatus = runtime.getOutput('MOTOR_CONTACTOR');
```

**Option B: CODESYS Control Win (Desktop Only)**
```bash
# Install CODESYS Control Win SL (free soft PLC)
# PLCAutoPilot uploads program to local CODESYS runtime
# Best for enterprise on-premises deployment
```

**Option C: Node-RED + node-red-contrib-ladder (Quick Start)**
```javascript
// Use existing Node-RED ladder logic runtime
// Good for prototyping, less accurate than CODESYS
const ladder = require('node-red-contrib-ladder');
ladder.execute(program);
```

---

### 2. Physics-Based Process Simulation

Simulate the actual physical process the PLC controls.

#### Example: Motor Control with Inertia
```python
class MotorSimulator:
    def __init__(self):
        self.rpm = 0
        self.inertia = 0.5  # kg·m²
        self.torque = 10    # N·m

    def update(self, contactor_on, dt):
        """Simulate motor physics"""
        if contactor_on:
            # Accelerate with torque
            acceleration = self.torque / self.inertia
            self.rpm += acceleration * dt
            self.rpm = min(self.rpm, 1750)  # Max RPM
        else:
            # Decelerate with friction
            self.rpm *= 0.95  # 5% friction per cycle

        return {
            'rpm': self.rpm,
            'current': self.rpm / 1750 * 10,  # Amps
            'vibration': abs(self.rpm - 1750) / 1750 * 100
        }

# Integrate with PLC simulation
plc.set_output('MOTOR_CONTACTOR', True)
motor_state = motor.update(plc.get_output('MOTOR_CONTACTOR'), dt=0.01)
plc.set_input('MOTOR_SPEED', motor_state['rpm'])
```

#### Use Cases:
- Conveyor belt speed and position
- Tank filling/draining (fluid dynamics)
- Temperature control (thermal modeling)
- Pneumatic cylinder movement
- Robot arm kinematics

---

### 3. Digital Twin Integration

Create a complete virtual factory.

#### Technology:
- **Unity 3D** or **Three.js** for 3D visualization
- **Physics Engine** (Bullet, PhysX, Cannon.js)
- **OPC UA** for PLC-to-twin communication

#### Architecture:
```
┌──────────────────────────────────────────────────┐
│              Digital Twin                        │
│                                                   │
│  ┌────────────┐    ┌─────────────┐              │
│  │  3D Model  │◄───│  Physics    │              │
│  │  (Three.js)│    │  Engine     │              │
│  └────────────┘    └─────────────┘              │
│         ▲                  ▲                      │
│         │                  │                      │
│         └──────┬───────────┘                      │
│                │                                  │
│         ┌──────▼──────┐                          │
│         │  OPC UA     │                          │
│         │  Server     │                          │
│         └──────┬──────┘                          │
└────────────────┼───────────────────────────────┘
                 │
                 ▼
         ┌───────────────┐
         │ Virtual PLC   │
         │ (PLCAutoPilot)│
         └───────────────┘
```

---

## Testing Framework

### 1. Unit Testing for PLC Code

Test individual function blocks and routines.

#### Example: Motor Start/Stop Test
```python
class TestMotorControl:
    def test_motor_starts_on_button_press(self):
        """Test: Motor should start when START button pressed"""
        plc = VirtualPLC()
        plc.load_program('motor_startstop.st')

        # Arrange
        plc.set_input('START_BUTTON', False)
        plc.set_input('STOP_BUTTON', False)
        plc.set_input('EMERGENCY_STOP', False)

        # Act
        plc.set_input('START_BUTTON', True)
        plc.scan()

        # Assert
        assert plc.get_output('MOTOR_CONTACTOR') == True
        assert plc.get_output('RUNNING_LAMP') == True

    def test_emergency_stop_kills_motor(self):
        """Test: E-stop should override all other commands"""
        plc = VirtualPLC()
        plc.load_program('motor_startstop.st')

        # Arrange - motor running
        plc.set_input('START_BUTTON', True)
        plc.scan()
        assert plc.get_output('MOTOR_CONTACTOR') == True

        # Act - press E-stop
        plc.set_input('EMERGENCY_STOP', True)
        plc.scan()

        # Assert - motor must stop
        assert plc.get_output('MOTOR_CONTACTOR') == False

    def test_motor_maintains_state_when_button_released(self):
        """Test: Motor should stay on after START button released (latching)"""
        plc = VirtualPLC()
        plc.load_program('motor_startstop.st')

        # Start motor
        plc.set_input('START_BUTTON', True)
        plc.scan()

        # Release button
        plc.set_input('START_BUTTON', False)
        plc.scan()

        # Motor should still be running
        assert plc.get_output('MOTOR_CONTACTOR') == True
```

---

### 2. Integration Testing

Test multiple systems working together.

#### Example: Conveyor System
```python
def test_conveyor_integration():
    """Test: Conveyor should move parts when sensor detects presence"""
    plc = VirtualPLC()
    plc.load_program('conveyor_system.st')

    conveyor = ConveyorSimulator(length=5.0, speed=0.5)
    part = Part(position=0.0)

    # Part enters conveyor
    conveyor.add_part(part)

    for cycle in range(100):
        # Update physical simulation
        conveyor.update(dt=0.01)

        # Update PLC inputs from simulation
        plc.set_input('ENTRY_SENSOR', conveyor.entry_sensor_active())
        plc.set_input('EXIT_SENSOR', conveyor.exit_sensor_active())

        # Run PLC scan
        plc.scan()

        # Apply PLC outputs to simulation
        conveyor.set_motor_on(plc.get_output('CONVEYOR_MOTOR'))

    # Part should have traveled through
    assert part.position >= 5.0
    assert conveyor.parts_exited == 1
```

---

### 3. AI-Powered Test Generation

Use AI to automatically generate test cases from program specifications.

#### How It Works:
```python
from plcautopilot import TestGenerator

# Generate tests from specification
spec = {
    "description": "Motor start/stop with safety interlocks",
    "inputs": ["START_BUTTON", "STOP_BUTTON", "EMERGENCY_STOP"],
    "outputs": ["MOTOR_CONTACTOR", "RUNNING_LAMP"],
    "requirements": [
        "Motor must not start if E-stop is active",
        "Motor must stop immediately on E-stop",
        "STOP button must override START button",
        "Running lamp must match motor contactor state"
    ]
}

generator = TestGenerator(ai_model="codellama:34b")
test_suite = generator.generate_tests(spec)

# Auto-generated test cases:
# 1. test_motor_cannot_start_when_estop_active()
# 2. test_estop_stops_running_motor()
# 3. test_stop_button_overrides_start()
# 4. test_running_lamp_follows_contactor()
# 5. test_simultaneous_start_stop_buttons()
# 6. test_estop_pressed_during_start_pulse()
# ... (AI generates 20-50 test cases covering edge cases)

# Run all tests
results = test_suite.run(plc_program)
print(f"Pass rate: {results.pass_rate}%")
```

---

### 4. Safety Testing & SIL Validation

Verify IEC 61508 safety integrity level compliance.

#### Example: Safety Interlock Verification
```python
class SafetyTester:
    def test_category_3_safety_circuit(self):
        """Verify dual-channel safety with monitoring"""
        plc = VirtualPLC()
        plc.load_program('safety_system.st')

        # Test: Both safety channels must agree
        plc.set_input('SAFETY_CH1', True)
        plc.set_input('SAFETY_CH2', False)  # Mismatch!
        plc.scan()

        # Machine must enter safe state
        assert plc.get_output('HAZARDOUS_MOTION') == False
        assert plc.get_output('SAFETY_FAULT') == True

    def test_fault_detection_time(self):
        """Verify safety response time < 10ms (SIL 3 requirement)"""
        plc = VirtualPLC()
        plc.load_program('safety_system.st')

        # Start timer
        start_time = time.time()

        # Inject fault
        plc.set_input('LIGHT_CURTAIN', False)  # Beam broken

        # Scan until output responds
        while plc.get_output('HAZARDOUS_MOTION') == True:
            plc.scan()
            elapsed = (time.time() - start_time) * 1000  # ms

            # Fail if too slow
            assert elapsed < 10, f"Safety response too slow: {elapsed}ms"
```

---

## Implementation Roadmap

### Phase 1: Basic Simulation (Month 1-2)
- [ ] IEC 61131-3 interpreter in JavaScript/WebAssembly
- [ ] Virtual I/O simulator
- [ ] Real-time variable monitoring
- [ ] Single-scan debugging
- [ ] Simple test runner

**Deliverables**:
- Web-based ladder logic simulator
- Virtual inputs/outputs panel
- Variable watch window
- Step-through debugger

### Phase 2: Testing Framework (Month 2-3)
- [ ] Test case DSL (Domain-Specific Language)
- [ ] Assertion library for PLC logic
- [ ] Test runner with reporting
- [ ] Code coverage analysis
- [ ] CI/CD integration

**Deliverables**:
- Unit test framework
- Test generator UI
- Coverage reports
- Automated test execution

### Phase 3: Process Simulation (Month 3-4)
- [ ] Physics engine integration
- [ ] Common process models (motors, conveyors, tanks)
- [ ] Custom process builder
- [ ] 2D/3D visualization
- [ ] Real-time trend charts

**Deliverables**:
- Process simulation library
- Visual process editor
- Real-time dashboards
- Video export of simulations

### Phase 4: Digital Twin (Month 5-6)
- [ ] 3D factory model templates
- [ ] OPC UA server integration
- [ ] Multi-PLC coordination
- [ ] Cloud deployment option
- [ ] VR/AR viewing

**Deliverables**:
- Digital twin builder
- Industry-specific templates
- Remote monitoring capability
- VR walkthrough mode

---

## Technology Recommendations

### Option 1: Quick Start (Recommended for MVP)

**Stack**:
- **Frontend**: React + Three.js for 3D
- **PLC Runtime**: Custom JavaScript interpreter for Ladder/ST
- **Testing**: Jest + custom PLC assertions
- **Deployment**: Runs entirely in browser

**Pros**:
- No additional software required
- Works on any device
- Easy to iterate
- Fast development (2-3 months)

**Cons**:
- Not 100% cycle-accurate
- Limited to web performance
- Custom runtime development needed

**Cost**: $0 (open source libraries)

---

### Option 2: Professional (Recommended for Enterprise)

**Stack**:
- **PLC Runtime**: CODESYS Control Runtime (licensed)
- **Simulation**: SimulationX or MATLAB Simulink
- **Testing**: pytest + PLC-specific plugins
- **Deployment**: Desktop application + cloud option

**Pros**:
- Industry-standard accuracy
- Certified for safety applications
- Advanced physics modeling
- Professional support

**Cons**:
- Licensing costs ($500-5,000/year per seat)
- Requires desktop installation
- Steeper learning curve
- Longer development (4-6 months)

**Cost**: $500-5,000/year per user

---

### Option 3: Hybrid (Best of Both Worlds)

**Stack**:
- **Web Simulation**: Custom JavaScript runtime for quick testing
- **Desktop Simulation**: CODESYS integration for final validation
- **Testing**: Unified test framework works on both
- **Deployment**: Web for development, desktop for certification

**Pros**:
- Fast web-based development
- Accurate desktop validation
- Flexible deployment
- Best user experience

**Cons**:
- Two runtimes to maintain
- More complex architecture
- Higher development cost

**Cost**: $200-1,000/year per user

---

## Competitive Advantage

### What Competitors DON'T Have:

| Feature | PLCAutoPilot | Siemens | Schneider | Rockwell |
|---------|--------------|---------|-----------|----------|
| **Web-Based Simulation** | ✅ | ❌ | ❌ | ❌ |
| **AI Test Generation** | ✅ | ❌ | ❌ | ❌ |
| **Multi-Platform Support** | ✅ | ❌ | ❌ | ❌ |
| **Physics Simulation** | ✅ | ❌ | ❌ | ❌ |
| **Digital Twin Integration** | ✅ | Separate $ | Separate $ | Separate $ |
| **Automated Safety Testing** | ✅ | Manual | Manual | Manual |
| **No Additional Cost** | ✅ | $$$ | $$$ | $$$ |

**Siemens PLCSIM**: $2,500/license, Windows only, Siemens PLCs only
**Schneider EcoStruxure**: $1,500/year, Schneider only
**Rockwell Emulate**: $3,000/license, Rockwell only

**PLCAutoPilot**: $0 extra (included in all plans), all platforms, web + desktop

---

## User Experience Flow

### Developer Workflow:

1. **Write/Generate Code**
   ```
   User: "Generate motor start/stop program"
   AI: Creates ladder logic + ST code
   ```

2. **One-Click Simulate**
   ```
   User clicks: "▶ Run Simulation"
   Browser opens: Virtual PLC interface
   ```

3. **Interactive Testing**
   ```
   User toggles: START button → Motor starts
   User toggles: E-STOP → Motor stops immediately
   Visual feedback: Green/red indicators
   ```

4. **Auto Test Generation**
   ```
   User clicks: "🧪 Generate Tests"
   AI creates: 25 test cases covering all scenarios
   User clicks: "Run All Tests"
   Result: 25/25 passed ✓
   ```

5. **Download Validated Code**
   ```
   User clicks: "⬇ Download for TIA Portal"
   Receives: Tested, validated, production-ready code
   ```

---

## Implementation Priority

### Must-Have (Launch v1.0):
1. ✅ Basic ladder logic interpreter (JavaScript)
2. ✅ Virtual I/O panel (buttons, switches, lamps)
3. ✅ Variable watch window
4. ✅ Step-through debugger
5. ✅ Simple test assertions

### Should-Have (Launch v1.5):
1. ⏳ Physics-based process simulation
2. ⏳ AI test generator
3. ⏳ Trend charts and data logging
4. ⏳ Test coverage reports
5. ⏳ HMI preview

### Nice-to-Have (Future):
1. 📅 Digital twin builder
2. 📅 3D visualization
3. 📅 VR/AR support
4. 📅 Cloud collaboration
5. 📅 Hardware-in-the-loop testing

---

## Technical Architecture

### Frontend (React + TypeScript):
```typescript
// components/Simulator/SimulatorEngine.ts
export class PLCSimulator {
  private memory: PLCMemory;
  private program: IEC61131Program;
  private running: boolean = false;

  constructor() {
    this.memory = new PLCMemory();
  }

  loadProgram(code: string, language: 'LD' | 'ST' | 'FBD') {
    this.program = this.compile(code, language);
  }

  scan(): void {
    // 1. Read inputs
    this.updateInputs();

    // 2. Execute program logic
    this.program.execute(this.memory);

    // 3. Write outputs
    this.updateOutputs();
  }

  setInput(address: string, value: boolean | number) {
    this.memory.setInput(address, value);
  }

  getOutput(address: string): boolean | number {
    return this.memory.getOutput(address);
  }
}

// Usage in React component:
function SimulatorPanel() {
  const [simulator] = useState(new PLCSimulator());
  const [motorRunning, setMotorRunning] = useState(false);

  useEffect(() => {
    simulator.loadProgram(generatedCode, 'LD');

    // Run simulation loop
    const interval = setInterval(() => {
      simulator.scan();
      setMotorRunning(simulator.getOutput('MOTOR_CONTACTOR'));
    }, 100); // 10 Hz scan rate

    return () => clearInterval(interval);
  }, [generatedCode]);

  return (
    <div>
      <button onClick={() => simulator.setInput('START_BUTTON', true)}>
        Start
      </button>
      <div className={motorRunning ? 'led-on' : 'led-off'}>
        Motor: {motorRunning ? 'RUNNING' : 'STOPPED'}
      </div>
    </div>
  );
}
```

### Backend (Python):
```python
# server/simulation/plc_runtime.py
class PLCRuntime:
    """IEC 61131-3 runtime engine"""

    def __init__(self):
        self.inputs = {}
        self.outputs = {}
        self.memory = {}
        self.program = None

    def load_program(self, ast: ProgramAST):
        """Load compiled program"""
        self.program = ast

    def scan(self):
        """Execute one PLC scan cycle"""
        if not self.program:
            return

        # Execute program
        context = ExecutionContext(
            inputs=self.inputs,
            outputs=self.outputs,
            memory=self.memory
        )

        self.program.execute(context)

    def get_scan_time(self) -> float:
        """Return last scan time in ms"""
        return self.last_scan_time
```

---

## Next Steps

1. **Approve Approach**: Choose Option 1 (Quick Start), Option 2 (Professional), or Option 3 (Hybrid)

2. **Prioritize Features**: Which features are most important for launch?

3. **Start Development**: I can immediately begin building:
   - Basic ladder logic interpreter
   - Virtual I/O simulator
   - Test framework
   - UI components

4. **Timeline**:
   - MVP (basic simulation): 1 month
   - Full testing framework: 2 months
   - Physics simulation: 3 months
   - Digital twin: 6 months

**Recommendation**: Start with **Option 3 (Hybrid)** approach:
- Launch web-based simulation in 1 month (fast)
- Add CODESYS integration in 3 months (professional)
- Best of both worlds for different user segments

---

**PLCAutoPilot Simulation & Testing Framework v1.0**
*Last Updated: 2025-12-22*
*Next: Implement basic ladder logic simulator*
