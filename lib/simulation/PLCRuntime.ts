// PLC Runtime Engine - Executes ladder logic programs in JavaScript
// Simulates a real PLC scan cycle

import type { PLCMemory, Timer, Counter, Variable } from './types';

export class PLCRuntime {
  private memory: PLCMemory;
  private scanCycleMs: number = 10; // 10ms = 100Hz scan rate
  private running: boolean = false;
  private scanCount: number = 0;
  private lastScanTime: number = 0;

  constructor(scanCycleMs: number = 10) {
    this.scanCycleMs = scanCycleMs;
    this.memory = this.initializeMemory();
  }

  /**
   * Initialize PLC memory with default values
   */
  private initializeMemory(): PLCMemory {
    return {
      inputs: {},
      outputs: {},
      flags: {},
      timers: {},
      counters: {}
    };
  }

  /**
   * Start the PLC scan cycle
   */
  start(): void {
    this.running = true;
  }

  /**
   * Stop the PLC scan cycle
   */
  stop(): void {
    this.running = false;
  }

  /**
   * Execute one PLC scan cycle
   */
  scan(): void {
    if (!this.running) return;

    const startTime = performance.now();

    // Standard PLC scan cycle:
    // 1. Read inputs (already in memory from process models)
    // 2. Execute program logic
    this.executeProgram();
    // 3. Update timers and counters
    this.updateTimers();
    this.updateCounters();
    // 4. Write outputs (will be read by process models)

    this.lastScanTime = performance.now() - startTime;
    this.scanCount++;
  }

  /**
   * Execute the PLC program logic
   * This is a simplified interpreter for basic ladder logic patterns
   */
  private executeProgram(): void {
    // This will be expanded to execute actual compiled ladder logic
    // For now, we'll support common patterns

    // Example: Motor Start/Stop logic
    // IF START_BUTTON AND NOT STOP_BUTTON AND NOT ESTOP THEN MOTOR_ON
    this.executeMotorStartStop();

    // Add more logic patterns as needed
  }

  /**
   * Execute motor start/stop logic (common pattern)
   */
  private executeMotorStartStop(): void {
    const startButton = this.getInput('START_BUTTON') as boolean;
    const stopButton = this.getInput('STOP_BUTTON') as boolean;
    const estop = this.getInput('EMERGENCY_STOP') as boolean;
    const motorContactor = this.getOutput('MOTOR_CONTACTOR') as boolean;

    // Latching logic: SR latch with priority to stop
    if (estop || stopButton) {
      // Reset (priority)
      this.setOutput('MOTOR_CONTACTOR', false);
      this.setOutput('RUNNING_LAMP', false);
    } else if (startButton) {
      // Set
      this.setOutput('MOTOR_CONTACTOR', true);
      this.setOutput('RUNNING_LAMP', true);
    } else {
      // Maintain state (latch)
      // Motor stays on even after button release
    }
  }

  /**
   * Update all timers
   */
  private updateTimers(): void {
    Object.keys(this.memory.timers).forEach(name => {
      const timer = this.memory.timers[name];

      if (timer.running) {
        timer.accumulated += this.scanCycleMs;

        if (timer.accumulated >= timer.preset) {
          timer.done = true;
          timer.accumulated = timer.preset;
          timer.running = false;
        }
      }
    });
  }

  /**
   * Update all counters
   */
  private updateCounters(): void {
    // Counters are updated by count-up/count-down instructions
    // Not automatically updated each scan
  }

  /**
   * Set input value (called by process models)
   */
  setInput(address: string, value: boolean | number): void {
    this.memory.inputs[address] = value;
  }

  /**
   * Get input value
   */
  getInput(address: string): boolean | number {
    return this.memory.inputs[address] ?? false;
  }

  /**
   * Set output value
   */
  setOutput(address: string, value: boolean | number): void {
    this.memory.outputs[address] = value;
  }

  /**
   * Get output value (read by process models)
   */
  getOutput(address: string): boolean | number {
    return this.memory.outputs[address] ?? false;
  }

  /**
   * Set flag (internal memory bit)
   */
  setFlag(address: string, value: boolean | number): void {
    this.memory.flags[address] = value;
  }

  /**
   * Get flag value
   */
  getFlag(address: string): boolean | number {
    return this.memory.flags[address] ?? false;
  }

  /**
   * Start a timer
   */
  startTimer(name: string, preset: number): void {
    if (!this.memory.timers[name]) {
      this.memory.timers[name] = {
        preset,
        accumulated: 0,
        done: false,
        running: false
      };
    }

    this.memory.timers[name].running = true;
  }

  /**
   * Reset a timer
   */
  resetTimer(name: string): void {
    if (this.memory.timers[name]) {
      this.memory.timers[name].accumulated = 0;
      this.memory.timers[name].done = false;
      this.memory.timers[name].running = false;
    }
  }

  /**
   * Check if timer is done
   */
  isTimerDone(name: string): boolean {
    return this.memory.timers[name]?.done ?? false;
  }

  /**
   * Count up
   */
  countUp(name: string, preset: number): void {
    if (!this.memory.counters[name]) {
      this.memory.counters[name] = {
        preset,
        accumulated: 0,
        done: false
      };
    }

    this.memory.counters[name].accumulated++;

    if (this.memory.counters[name].accumulated >= preset) {
      this.memory.counters[name].done = true;
    }
  }

  /**
   * Reset counter
   */
  resetCounter(name: string): void {
    if (this.memory.counters[name]) {
      this.memory.counters[name].accumulated = 0;
      this.memory.counters[name].done = false;
    }
  }

  /**
   * Get all inputs (for monitoring)
   */
  getInputs(): Record<string, boolean | number> {
    return { ...this.memory.inputs };
  }

  /**
   * Get all outputs (for monitoring)
   */
  getOutputs(): Record<string, boolean | number> {
    return { ...this.memory.outputs };
  }

  /**
   * Get all variables for monitoring
   */
  getAllVariables(): Variable[] {
    const variables: Variable[] = [];

    // Add inputs
    Object.entries(this.memory.inputs).forEach(([name, value]) => {
      variables.push({
        name,
        value,
        type: typeof value === 'boolean' ? 'BOOL' : 'INT',
        address: `%I${name}`
      });
    });

    // Add outputs
    Object.entries(this.memory.outputs).forEach(([name, value]) => {
      variables.push({
        name,
        value,
        type: typeof value === 'boolean' ? 'BOOL' : 'INT',
        address: `%Q${name}`
      });
    });

    // Add flags
    Object.entries(this.memory.flags).forEach(([name, value]) => {
      variables.push({
        name,
        value,
        type: typeof value === 'boolean' ? 'BOOL' : 'INT',
        address: `%M${name}`
      });
    });

    // Add timers
    Object.entries(this.memory.timers).forEach(([name, timer]) => {
      variables.push({
        name: `${name}.ACC`,
        value: timer.accumulated,
        type: 'TIME',
        address: `%T${name}`
      });
      variables.push({
        name: `${name}.DN`,
        value: timer.done,
        type: 'BOOL',
        address: `%T${name}.DN`
      });
    });

    // Add counters
    Object.entries(this.memory.counters).forEach(([name, counter]) => {
      variables.push({
        name: `${name}.ACC`,
        value: counter.accumulated,
        type: 'INT',
        address: `%C${name}`
      });
      variables.push({
        name: `${name}.DN`,
        value: counter.done,
        type: 'BOOL',
        address: `%C${name}.DN`
      });
    });

    return variables;
  }

  /**
   * Get scan statistics
   */
  getStats() {
    return {
      scanCount: this.scanCount,
      lastScanTime: this.lastScanTime,
      scanRate: 1000 / this.scanCycleMs,
      running: this.running
    };
  }

  /**
   * Reset the PLC (clear all memory)
   */
  reset(): void {
    this.memory = this.initializeMemory();
    this.scanCount = 0;
    this.lastScanTime = 0;
  }

  /**
   * Load a program (simplified - will be expanded)
   */
  loadProgram(program: any): void {
    // TODO: Implement program compilation and loading
    // For now, the logic is hardcoded in executeProgram()
    console.log('Program loaded:', program);
  }

  /**
   * Execute ladder logic rung
   * Format: [contact1, contact2, ...] -> coil
   */
  executeLadderRung(contacts: string[], coil: string, normallyOpen: boolean[] = []): void {
    // Evaluate all contacts in series (AND logic)
    let result = true;

    contacts.forEach((contact, i) => {
      const contactValue = this.getInput(contact) || this.getOutput(contact) || this.getFlag(contact);
      const isNO = normallyOpen[i] !== false; // default normally open

      if (isNO) {
        result = result && (contactValue as boolean);
      } else {
        result = result && !(contactValue as boolean);
      }
    });

    // Energize coil if contacts allow
    if (coil.startsWith('%Q')) {
      this.setOutput(coil.substring(2), result);
    } else if (coil.startsWith('%M')) {
      this.setFlag(coil.substring(2), result);
    }
  }

  /**
   * Execute multiple rungs in parallel (OR logic)
   */
  executeParallelRungs(rungs: Array<{ contacts: string[], coil: string, normallyOpen?: boolean[] }>): void {
    let result = false;

    rungs.forEach(rung => {
      let rungResult = true;

      rung.contacts.forEach((contact, i) => {
        const contactValue = this.getInput(contact) || this.getOutput(contact) || this.getFlag(contact);
        const isNO = rung.normallyOpen?.[i] !== false;

        if (isNO) {
          rungResult = rungResult && (contactValue as boolean);
        } else {
          rungResult = rungResult && !(contactValue as boolean);
        }
      });

      result = result || rungResult;
    });

    const coil = rungs[0].coil;
    if (coil.startsWith('%Q')) {
      this.setOutput(coil.substring(2), result);
    } else if (coil.startsWith('%M')) {
      this.setFlag(coil.substring(2), result);
    }
  }
}
