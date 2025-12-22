// TypeScript type definitions for Digital Twin simulation

export interface PLCMemory {
  inputs: Record<string, boolean | number>;
  outputs: Record<string, boolean | number>;
  flags: Record<string, boolean | number>;
  timers: Record<string, Timer>;
  counters: Record<string, Counter>;
}

export interface Timer {
  preset: number;
  accumulated: number;
  done: boolean;
  running: boolean;
}

export interface Counter {
  preset: number;
  accumulated: number;
  done: boolean;
}

export interface Variable {
  name: string;
  value: any;
  type: 'BOOL' | 'INT' | 'REAL' | 'TIME' | 'STRING';
  address?: string;
}

export interface MotorState {
  rpm: number;
  targetRPM: number;
  running: boolean;
  current: number;      // Amps
  temperature: number;  // Celsius
  vibration: number;    // 0-100 scale
  torque: number;       // N·m
}

export interface ConveyorState {
  speed: number;        // m/s
  position: number;     // meters
  parts: Part[];
  entrySensor: boolean;
  exitSensor: boolean;
  running: boolean;
}

export interface Part {
  id: string;
  position: number;     // meters from start
  width: number;        // meters
  height: number;       // meters
  weight: number;       // kg
}

export interface TankState {
  level: number;        // meters
  percentage: number;   // 0-100
  volume: number;       // liters
  pressure: number;     // Pascal
  temperature: number;  // Celsius
  levelLow: boolean;
  levelHigh: boolean;
  overflow: boolean;
}

export interface ValveState {
  position: number;     // 0-100% open
  flowRate: number;     // L/min
  opening: boolean;
  closing: boolean;
  fullyOpen: boolean;
  fullyClosed: boolean;
}

export interface SensorState {
  value: boolean | number;
  triggered: boolean;
  lastTrigger: number;  // timestamp
}

export interface EquipmentConfig {
  id: string;
  type: 'motor' | 'conveyor' | 'tank' | 'valve' | 'sensor' | 'cylinder' | 'pump';
  name: string;
  position: { x: number; y: number; z?: number };
  parameters: Record<string, any>;
}

export interface MotorConfig {
  maxRPM: number;
  inertia: number;      // kg·m²
  torque: number;       // N·m
  ratedCurrent: number; // Amps
  ratedPower: number;   // kW
}

export interface ConveyorConfig {
  length: number;       // meters
  width: number;        // meters
  maxSpeed: number;     // m/s
  pulleyDiameter: number; // meters
  motorGearRatio: number;
}

export interface TankConfig {
  capacity: number;     // liters
  diameter: number;     // meters
  height: number;       // meters
  fluidDensity: number; // kg/L
  inletDiameter: number; // meters
  outletDiameter: number; // meters
}

export interface SimulationConfig {
  scanRate: number;     // Hz (PLC scan frequency)
  physicsRate: number;  // Hz (Physics update frequency)
  equipment: EquipmentConfig[];
  connections: Connection[];
}

export interface Connection {
  from: { equipmentId: string; port: string };
  to: { equipmentId: string; port: string };
  type: 'digital' | 'analog' | 'mechanical' | 'fluid';
}

export interface DataPoint {
  timestamp: number;
  values: Record<string, number>;
}

export interface SimulationState {
  running: boolean;
  elapsedTime: number;  // seconds
  scanCount: number;
  equipment: Map<string, EquipmentState>;
  plcMemory: PLCMemory;
}

export type EquipmentState = MotorState | ConveyorState | TankState | ValveState | SensorState;

export interface PhysicsUpdate {
  deltaTime: number;
  forces: Vector3[];
  velocities: Vector3[];
  positions: Vector3[];
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface LadderRung {
  id: string;
  elements: LadderElement[];
  comment?: string;
}

export interface LadderElement {
  type: 'contact' | 'coil' | 'timer' | 'counter' | 'math' | 'compare';
  address: string;
  normallyOpen?: boolean;
  parameters?: Record<string, any>;
}

export interface CompiledProgram {
  rungs: CompiledRung[];
  variables: Variable[];
  metadata: {
    name: string;
    author: string;
    version: string;
    compiled: Date;
  };
}

export interface CompiledRung {
  execute(memory: PLCMemory): void;
}

// Test Report Types
export interface TestResult {
  scenarioId: string;
  passed: boolean;
  duration: number;
  timestamp: Date;
  errorMessage?: string;
}

export interface TestScenario {
  id: string;
  name: string;
  description: string;
  category: 'functional' | 'safety' | 'performance' | 'edge_case' | 'stress';
  priority: 'critical' | 'high' | 'medium' | 'low';
  steps: TestStep[];
  expectedResult: string;
  actualResult: string;
  status: 'PASS' | 'FAIL' | 'SKIP';
  duration: number;
  timestamp: Date;
}

export interface TestStep {
  step: number;
  action: string;
  expectedOutcome: string;
  actualOutcome: string;
  passed: boolean;
}
