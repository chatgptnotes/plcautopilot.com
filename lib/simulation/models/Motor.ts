// Motor Physics Model - Simulates realistic motor behavior
// Includes acceleration, deceleration, current draw, temperature

import type { MotorState, MotorConfig } from '../types';

export class Motor {
  private rpm: number = 0;
  private targetRPM: number;
  private inertia: number;      // kg·m²
  private torque: number;        // N·m
  private ratedCurrent: number;  // Amps
  private ratedPower: number;    // kW
  private temperature: number = 25; // Celsius (ambient)
  private running: boolean = false;
  private id: string;

  constructor(id: string, config: MotorConfig) {
    this.id = id;
    this.targetRPM = config.maxRPM;
    this.inertia = config.inertia;
    this.torque = config.torque;
    this.ratedCurrent = config.ratedCurrent;
    this.ratedPower = config.ratedPower;
  }

  /**
   * Update motor physics for one time step
   */
  update(motorOn: boolean, deltaTime: number): MotorState {
    this.running = motorOn;

    if (motorOn) {
      this.accelerate(deltaTime);
      this.heatUp(deltaTime);
    } else {
      this.decelerate(deltaTime);
      this.coolDown(deltaTime);
    }

    return this.getState();
  }

  /**
   * Accelerate motor toward target RPM
   */
  private accelerate(dt: number): void {
    if (this.rpm < this.targetRPM) {
      // Calculate angular acceleration: α = τ / I
      const angularAcceleration = this.torque / this.inertia;

      // Convert to RPM/s
      const rpmAcceleration = (angularAcceleration * 60) / (2 * Math.PI);

      // Update RPM
      this.rpm += rpmAcceleration * dt;

      // Clamp to target
      if (this.rpm > this.targetRPM) {
        this.rpm = this.targetRPM;
      }
    }
  }

  /**
   * Decelerate motor due to friction
   */
  private decelerate(dt: number): void {
    if (this.rpm > 0) {
      // Exponential decay due to friction
      // RPM(t) = RPM(0) * e^(-k*t)
      const frictionCoefficient = 0.5; // Adjustable damping
      this.rpm *= Math.exp(-frictionCoefficient * dt);

      // Stop completely when very slow
      if (this.rpm < 1) {
        this.rpm = 0;
      }
    }
  }

  /**
   * Motor heats up during operation
   */
  private heatUp(dt: number): void {
    // Temperature rise proportional to load
    const loadPercent = this.rpm / this.targetRPM;
    const heatRate = 5 * loadPercent; // °C per second at full load

    this.temperature += heatRate * dt;

    // Clamp to max operating temperature
    const maxTemp = 80; // °C
    if (this.temperature > maxTemp) {
      this.temperature = maxTemp;
    }
  }

  /**
   * Motor cools down when stopped
   */
  private coolDown(dt: number): void {
    const ambientTemp = 25; // °C
    const coolingRate = 2; // °C per second

    if (this.temperature > ambientTemp) {
      const tempDiff = this.temperature - ambientTemp;
      this.temperature -= Math.min(tempDiff, coolingRate * dt);
    }
  }

  /**
   * Calculate current draw based on load
   */
  private calculateCurrent(): number {
    if (!this.running || this.rpm === 0) {
      return 0;
    }

    const loadPercent = this.rpm / this.targetRPM;

    // Starting current is higher (locked rotor current)
    if (loadPercent < 0.1) {
      return this.ratedCurrent * 6; // 6x starting current
    }

    // Normal running current
    return this.ratedCurrent * loadPercent;
  }

  /**
   * Calculate vibration based on RPM stability
   */
  private calculateVibration(): number {
    // Vibration increases near resonant frequencies
    const resonantRPM = 1200; // Example resonant frequency
    const distanceFromResonance = Math.abs(this.rpm - resonantRPM);

    // Vibration is inverse to distance from resonance
    const baseVibration = 100 / (1 + distanceFromResonance / 100);

    // Add randomness for realistic behavior
    const noise = (Math.random() - 0.5) * 10;

    return Math.max(0, Math.min(100, baseVibration + noise));
  }

  /**
   * Get current motor state
   */
  getState(): MotorState {
    return {
      rpm: Math.round(this.rpm),
      targetRPM: this.targetRPM,
      running: this.running,
      current: parseFloat(this.calculateCurrent().toFixed(2)),
      temperature: parseFloat(this.temperature.toFixed(1)),
      vibration: parseFloat(this.calculateVibration().toFixed(1)),
      torque: this.torque
    };
  }

  /**
   * Set target RPM (speed control)
   */
  setTargetRPM(rpm: number): void {
    this.targetRPM = Math.max(0, Math.min(rpm, this.targetRPM));
  }

  /**
   * Get motor ID
   */
  getId(): string {
    return this.id;
  }

  /**
   * Reset motor to initial state
   */
  reset(): void {
    this.rpm = 0;
    this.temperature = 25;
    this.running = false;
  }
}
