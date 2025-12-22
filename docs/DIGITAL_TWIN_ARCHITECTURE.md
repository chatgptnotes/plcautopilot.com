# PLCAutoPilot Digital Twin Architecture

## Overview

The PLCAutoPilot Digital Twin system provides real-time visualization and simulation of PLC-controlled processes. It enables users to test, validate, and optimize their automation code before deploying to physical hardware.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    WEB APPLICATION                          │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           User Interface (React)                   │    │
│  │  ┌──────────┐  ┌──────────┐  ┌─────────────┐     │    │
│  │  │ Code     │  │ Digital  │  │ Variable    │     │    │
│  │  │ Editor   │  │ Twin     │  │ Monitor     │     │    │
│  │  └────┬─────┘  │ Canvas   │  └──────┬──────┘     │    │
│  │       │        └────┬─────┘         │            │    │
│  └───────┼─────────────┼───────────────┼────────────┘    │
│          │             │               │                  │
│          ▼             ▼               ▼                  │
│  ┌──────────────────────────────────────────────────┐    │
│  │         Digital Twin Engine (TypeScript)         │    │
│  │                                                   │    │
│  │  ┌──────────────┐    ┌──────────────┐           │    │
│  │  │ PLC Runtime  │───▶│ Physics      │           │    │
│  │  │ (IEC 61131-3)│    │ Engine       │           │    │
│  │  └──────┬───────┘    └──────┬───────┘           │    │
│  │         │                   │                    │    │
│  │         ▼                   ▼                    │    │
│  │  ┌──────────────────────────────────┐           │    │
│  │  │   Process Models                 │           │    │
│  │  │   - Motor                        │           │    │
│  │  │   - Conveyor                     │           │    │
│  │  │   - Tank                         │           │    │
│  │  │   - Valve                        │           │    │
│  │  │   - Sensor                       │           │    │
│  │  └──────────────┬───────────────────┘           │    │
│  │                 │                                │    │
│  │                 ▼                                │    │
│  │  ┌──────────────────────────────────┐           │    │
│  │  │   Visualization Layer            │           │    │
│  │  │   - 2D Canvas (SVG)              │           │    │
│  │  │   - 3D Graphics (Three.js)       │           │    │
│  │  │   - Animations                   │           │    │
│  │  └──────────────────────────────────┘           │    │
│  └──────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## Core Components

### 1. PLC Runtime Engine

**Purpose**: Execute PLC programs in JavaScript/TypeScript

**File**: `lib/simulation/PLCRuntime.ts`

```typescript
class PLCRuntime {
  private memory: PLCMemory;
  private program: CompiledProgram;
  private scanCycle: number = 10; // ms

  scan(): void {
    // 1. Read inputs from process models
    this.readInputs();

    // 2. Execute program logic
    this.executeProgram();

    // 3. Write outputs to process models
    this.writeOutputs();
  }
}
```

**Features**:
- Ladder logic interpreter
- Structured text executor
- Function block diagram support
- Timer/counter emulation
- Memory management (I/O, flags, registers)

---

### 2. Physics Engine

**Purpose**: Simulate real-world physics for equipment

**File**: `lib/simulation/PhysicsEngine.ts`

```typescript
class PhysicsEngine {
  update(deltaTime: number): void {
    // Update all physical processes
    this.motors.forEach(motor => motor.update(deltaTime));
    this.conveyors.forEach(conv => conv.update(deltaTime));
    this.tanks.forEach(tank => tank.update(deltaTime));
  }
}
```

**Simulated Physics**:
- Motor acceleration/deceleration (torque, inertia, friction)
- Conveyor movement (speed, position, parts)
- Tank filling/draining (flow rate, level, pressure)
- Valve opening/closing (position, flow coefficient)
- Temperature changes (heating, cooling, ambient loss)

---

### 3. Process Models

**Purpose**: Virtual equipment that behaves like real hardware

#### Motor Model

```typescript
class Motor {
  private rpm: number = 0;
  private targetRPM: number = 1750;
  private inertia: number = 0.5; // kg·m²
  private torque: number = 10;   // N·m

  update(motorOn: boolean, dt: number): MotorState {
    if (motorOn) {
      // Accelerate toward target RPM
      const acceleration = this.torque / this.inertia;
      this.rpm += acceleration * dt * 60; // Convert to RPM
      this.rpm = Math.min(this.rpm, this.targetRPM);
    } else {
      // Decelerate with friction
      this.rpm *= Math.exp(-dt * 0.5); // Exponential decay
    }

    return {
      rpm: this.rpm,
      current: this.calculateCurrent(),
      temperature: this.calculateTemperature(),
      vibration: this.calculateVibration()
    };
  }
}
```

#### Conveyor Model

```typescript
class Conveyor {
  private position: number = 0;
  private speed: number = 0; // m/s
  private parts: Part[] = [];

  update(motorRPM: number, dt: number): ConveyorState {
    // Convert motor RPM to belt speed
    this.speed = (motorRPM * this.pulleyDiameter * Math.PI) / 60;

    // Move all parts
    this.parts.forEach(part => {
      part.position += this.speed * dt;
    });

    // Remove parts that exited
    this.parts = this.parts.filter(p => p.position < this.length);

    return {
      speed: this.speed,
      partsCount: this.parts.length,
      entrySensor: this.checkEntrySensor(),
      exitSensor: this.checkExitSensor()
    };
  }
}
```

#### Tank Model

```typescript
class Tank {
  private level: number = 0; // meters
  private capacity: number = 1000; // liters

  update(inletValveOpen: boolean, outletValveOpen: boolean, dt: number): TankState {
    // Calculate flow rates
    const inflowRate = inletValveOpen ? 50 : 0; // L/min
    const outflowRate = outletValveOpen ? 30 : 0; // L/min

    // Update level
    const netFlow = (inflowRate - outflowRate) / 60; // L/s
    const volumeChange = netFlow * dt;
    const levelChange = volumeChange / this.area; // Convert to height

    this.level += levelChange;
    this.level = Math.max(0, Math.min(this.level, this.maxLevel));

    return {
      level: this.level,
      percentage: (this.level / this.maxLevel) * 100,
      volume: this.level * this.area,
      pressure: this.level * 9.81 * this.fluidDensity,
      levelLow: this.level < 0.2,
      levelHigh: this.level > 0.8
    };
  }
}
```

---

### 4. Visualization Layer

#### 2D Canvas (SVG-based)

**File**: `components/DigitalTwin/Canvas2D.tsx`

```typescript
function Canvas2D({ equipment }: { equipment: Equipment[] }) {
  return (
    <svg width="800" height="600" viewBox="0 0 800 600">
      {equipment.map(item => {
        switch (item.type) {
          case 'motor':
            return <MotorSVG key={item.id} {...item.state} />;
          case 'conveyor':
            return <ConveyorSVG key={item.id} {...item.state} />;
          case 'tank':
            return <TankSVG key={item.id} {...item.state} />;
        }
      })}
    </svg>
  );
}
```

**Equipment SVG Components**:

```typescript
function MotorSVG({ rpm, running }: MotorState) {
  const rotation = (rpm / 1750) * 360; // Normalize to 0-360°

  return (
    <g>
      {/* Motor body */}
      <rect x="100" y="100" width="60" height="80"
            fill={running ? '#4CAF50' : '#999'} />

      {/* Rotating shaft */}
      <circle cx="130" cy="140" r="20"
              fill="#FFD700"
              transform={`rotate(${rotation} 130 140)`} />

      {/* RPM indicator */}
      <text x="130" y="200" textAnchor="middle">
        {Math.round(rpm)} RPM
      </text>
    </g>
  );
}

function ConveyorSVG({ speed, parts, entrySensor, exitSensor }: ConveyorState) {
  return (
    <g>
      {/* Belt */}
      <rect x="200" y="150" width="400" height="20"
            fill="#808080" opacity="0.8" />

      {/* Moving pattern to show motion */}
      <defs>
        <pattern id="beltPattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="20" y2="20" stroke="#666" />
        </pattern>
      </defs>
      <rect x="200" y="150" width="400" height="20"
            fill="url(#beltPattern)"
            opacity={speed > 0 ? 1 : 0.3} />

      {/* Parts on belt */}
      {parts.map((part, i) => (
        <rect key={i}
              x={200 + (part.position / 5) * 400}
              y="140"
              width="30"
              height="40"
              fill="#8B4513" />
      ))}

      {/* Sensors */}
      <circle cx="220" cy="180" r="8"
              fill={entrySensor ? '#00FF00' : '#666'} />
      <circle cx="580" cy="180" r="8"
              fill={exitSensor ? '#00FF00' : '#666'} />

      {/* Speed indicator */}
      <text x="400" y="200" textAnchor="middle">
        {speed.toFixed(2)} m/s
      </text>
    </g>
  );
}

function TankSVG({ level, percentage, levelLow, levelHigh }: TankState) {
  const tankHeight = 300;
  const fluidHeight = (percentage / 100) * tankHeight;

  return (
    <g>
      {/* Tank outline */}
      <rect x="650" y="100" width="100" height={tankHeight}
            fill="none" stroke="#333" strokeWidth="3" />

      {/* Fluid */}
      <rect x="650"
            y={100 + tankHeight - fluidHeight}
            width="100"
            height={fluidHeight}
            fill="#1E90FF"
            opacity="0.7" />

      {/* Level indicators */}
      <line x1="640" y1="340" x2="650" y2="340"
            stroke={levelLow ? '#FF0000' : '#666'} strokeWidth="2" />
      <text x="630" y="345" textAnchor="end" fontSize="12">Low</text>

      <line x1="640" y1="160" x2="650" y2="160"
            stroke={levelHigh ? '#FF0000' : '#666'} strokeWidth="2" />
      <text x="630" y="165" textAnchor="end" fontSize="12">High</text>

      {/* Percentage */}
      <text x="700" y="430" textAnchor="middle" fontSize="16">
        {percentage.toFixed(1)}%
      </text>
    </g>
  );
}
```

---

### 5. Virtual I/O Panel

**File**: `components/DigitalTwin/IOPanel.tsx`

```typescript
function IOPanel({ plc }: { plc: PLCRuntime }) {
  const [inputs, setInputs] = useState(plc.getInputs());
  const [outputs, setOutputs] = useState(plc.getOutputs());

  const toggleInput = (address: string) => {
    plc.setInput(address, !inputs[address]);
    setInputs(plc.getInputs());
  };

  return (
    <div className="io-panel">
      <div className="inputs-section">
        <h3>Inputs</h3>
        {Object.entries(inputs).map(([address, value]) => (
          <div key={address} className="io-item">
            <button
              onClick={() => toggleInput(address)}
              className={value ? 'btn-active' : 'btn-inactive'}
            >
              {address}
            </button>
            <span className={value ? 'led-on' : 'led-off'}>●</span>
          </div>
        ))}
      </div>

      <div className="outputs-section">
        <h3>Outputs</h3>
        {Object.entries(outputs).map(([address, value]) => (
          <div key={address} className="io-item">
            <span>{address}</span>
            <span className={value ? 'led-on' : 'led-off'}>●</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### 6. Variable Monitor

**File**: `components/DigitalTwin/VariableMonitor.tsx`

```typescript
function VariableMonitor({ plc }: { plc: PLCRuntime }) {
  const [variables, setVariables] = useState<Variable[]>([]);
  const [history, setHistory] = useState<DataPoint[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = plc.getAllVariables();
      setVariables(current);

      // Add to history for trend chart
      setHistory(prev => [...prev.slice(-100), {
        time: Date.now(),
        ...current
      }]);
    }, 100);

    return () => clearInterval(interval);
  }, [plc]);

  return (
    <div className="variable-monitor">
      <div className="current-values">
        <h3>Current Values</h3>
        <table>
          <thead>
            <tr>
              <th>Variable</th>
              <th>Value</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {variables.map(v => (
              <tr key={v.name}>
                <td>{v.name}</td>
                <td className="mono">{formatValue(v.value)}</td>
                <td>{v.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="trend-chart">
        <h3>Trends</h3>
        <LineChart data={history} />
      </div>
    </div>
  );
}
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1-2) ✅ Starting Now
- [x] PLC Runtime engine (ladder logic interpreter)
- [x] Basic process models (motor, conveyor, tank)
- [x] 2D SVG visualization
- [x] Virtual I/O panel
- [x] Variable monitor

**Deliverables**:
- Working motor start/stop simulation
- Conveyor with moving parts
- Tank filling/draining
- Real-time variable monitoring

### Phase 2: Enhanced Features (Week 3-4)
- [ ] More equipment models (valves, pumps, sensors, cylinders)
- [ ] Advanced physics (temperature, pressure, flow)
- [ ] Multiple process templates
- [ ] Save/load simulations
- [ ] Export simulation videos

### Phase 3: 3D Visualization (Month 2)
- [ ] Three.js integration
- [ ] 3D equipment models
- [ ] Camera controls (orbit, pan, zoom)
- [ ] Lighting and shadows
- [ ] Material textures

### Phase 4: Advanced Digital Twin (Month 3)
- [ ] Factory builder (drag-and-drop)
- [ ] Multi-PLC coordination
- [ ] OPC UA server (connect to real PLCs)
- [ ] Cloud deployment
- [ ] VR/AR viewing

---

## Data Flow

```
User Actions → PLC Inputs → PLC Scan → PLC Outputs → Process Models → Physics Update → Visualization
     ↑                                                                                        ↓
     └────────────────────────── User sees results ──────────────────────────────────────────┘
```

### Example: Motor Start Simulation

1. **User Action**: Clicks "START" button
2. **PLC Input**: `START_BUTTON = TRUE`
3. **PLC Scan**: Executes ladder logic
   ```
   ──┤ ├──────┤/├──────┤ ├──────( )─
   START    STOP     RUN      MOTOR
   ```
4. **PLC Output**: `MOTOR_CONTACTOR = TRUE`
5. **Process Model**: Motor.update(motorOn=true)
6. **Physics**: Motor accelerates to 1750 RPM over 2 seconds
7. **Visualization**: Motor icon spins, RPM counter increases
8. **User Sees**: Animated motor with real-time RPM display

**Timing**: All updates happen at 10Hz (100ms intervals) for smooth animation

---

## File Structure

```
plcautopilot-nextjs/
├── lib/
│   └── simulation/
│       ├── PLCRuntime.ts          # Core PLC execution engine
│       ├── PhysicsEngine.ts       # Physics calculations
│       ├── models/
│       │   ├── Motor.ts           # Motor physics model
│       │   ├── Conveyor.ts        # Conveyor physics model
│       │   ├── Tank.ts            # Tank physics model
│       │   ├── Valve.ts           # Valve physics model
│       │   └── Sensor.ts          # Sensor model
│       └── types.ts               # TypeScript type definitions
├── components/
│   └── DigitalTwin/
│       ├── Canvas2D.tsx           # 2D visualization canvas
│       ├── Canvas3D.tsx           # 3D visualization (Three.js)
│       ├── IOPanel.tsx            # Virtual I/O panel
│       ├── VariableMonitor.tsx    # Variable watch window
│       ├── ProcessDiagram.tsx     # Process flow diagram
│       └── equipment/
│           ├── MotorSVG.tsx       # Motor SVG component
│           ├── ConveyorSVG.tsx    # Conveyor SVG component
│           └── TankSVG.tsx        # Tank SVG component
└── app/
    └── simulator/
        └── page.tsx               # Main simulator page
```

---

## Performance Optimization

### Target Performance:
- **Scan Rate**: 10Hz (100ms) for smooth visualization
- **Physics Update**: 60Hz (16.6ms) for accurate calculations
- **Rendering**: 30 FPS minimum for animations

### Optimization Strategies:
1. **Web Workers**: Run physics calculations in separate thread
2. **Canvas Optimization**: Use requestAnimationFrame for smooth rendering
3. **Lazy Loading**: Load 3D models only when needed
4. **Memory Management**: Limit trend history to last 1000 points
5. **Throttling**: Update non-critical UI elements at lower frequency

---

## API Design

### Digital Twin Controller

```typescript
class DigitalTwinController {
  private plc: PLCRuntime;
  private physics: PhysicsEngine;
  private equipment: Equipment[];

  constructor(config: TwinConfig) {
    this.plc = new PLCRuntime(config.program);
    this.physics = new PhysicsEngine();
    this.loadEquipment(config.equipment);
  }

  // Start simulation
  start(): void {
    this.running = true;
    this.mainLoop();
  }

  // Stop simulation
  stop(): void {
    this.running = false;
  }

  // Main simulation loop
  private mainLoop(): void {
    const deltaTime = this.calculateDeltaTime();

    // 1. Run PLC scan
    this.plc.scan();

    // 2. Update physics
    this.physics.update(deltaTime);

    // 3. Update equipment models
    this.updateEquipment(deltaTime);

    // 4. Continue loop
    if (this.running) {
      requestAnimationFrame(() => this.mainLoop());
    }
  }

  // Set input value
  setInput(address: string, value: any): void {
    this.plc.setInput(address, value);
  }

  // Get output value
  getOutput(address: string): any {
    return this.plc.getOutput(address);
  }

  // Get all equipment states
  getEquipmentStates(): EquipmentState[] {
    return this.equipment.map(e => e.getState());
  }
}
```

### Usage Example

```typescript
// Create digital twin
const twin = new DigitalTwinController({
  program: ladderLogicCode,
  equipment: [
    { type: 'motor', id: 'M1', params: { maxRPM: 1750 } },
    { type: 'conveyor', id: 'C1', params: { length: 5.0, speed: 1.5 } },
    { type: 'tank', id: 'T1', params: { capacity: 1000 } }
  ]
});

// Start simulation
twin.start();

// Toggle input
twin.setInput('START_BUTTON', true);

// Monitor outputs
setInterval(() => {
  const motorRunning = twin.getOutput('MOTOR_CONTACTOR');
  console.log('Motor:', motorRunning ? 'ON' : 'OFF');
}, 1000);
```

---

## Next Steps

1. **Implement Core Engine**: Build PLC Runtime and Physics Engine
2. **Create Process Models**: Motor, Conveyor, Tank with realistic physics
3. **Build Visualization**: 2D SVG components for each equipment type
4. **Integrate with Generator**: Add "Simulate" button to code generator
5. **User Testing**: Get feedback on simulation accuracy and usability

---

**PLCAutoPilot Digital Twin v1.0**
*Last Updated: 2025-12-22*
*Status: Phase 1 Implementation Starting*
