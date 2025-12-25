"""
Motor Start/Stop Program for TM221CE40T
Creates a complete motor control program using the EcoStruxure API

Features:
- Start button (momentary) with seal-in circuit
- Stop button (NC - normally closed for safety)
- Motor output
- Overload protection input
- Run indicator light

I/O Assignment for TM221CE40T:
- %I0.0: START_BTN (Start Push Button - NO)
- %I0.1: STOP_BTN (Stop Push Button - NC)
- %I0.2: OVERLOAD (Thermal Overload Contact - NC)
- %Q0.0: MOTOR (Motor Contactor Output)
- %Q0.1: RUN_LIGHT (Motor Running Indicator)
"""

import os
import sys

# Add parent directory to path to import ecostruxure_api
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from ecostruxure_api import EcoStruxureAPI, MockProject, MockPOU

def create_motor_startstop_program():
    """
    Create a motor start/stop program for TM221CE40T PLC

    Standard motor control circuit with:
    - Momentary start button
    - NC stop button (fail-safe)
    - Overload protection
    - Seal-in circuit (latching)
    - Run indicator
    """

    print("=" * 60)
    print("Motor Start/Stop Program Generator")
    print("Target PLC: TM221CE40T")
    print("=" * 60)

    # Initialize API
    api = EcoStruxureAPI()

    # Create project for TM221CE40T
    project_location = os.path.join(
        os.path.expanduser("~"),
        "OneDrive",
        "Documents",
        "motor_startstop_tm221ce40t.smbp"
    )

    project = api.create_project(
        name="Motor_StartStop",
        plc_type="TM221CE40T",
        location=project_location
    )

    # Get main program
    main_pou = project.get_pou("MainProgram")

    # ========================================
    # Define Variables (I/O Mapping)
    # ========================================
    print("\nConfiguring I/O Variables...")

    # Inputs
    main_pou.add_variable("START_BTN", "BOOL", "%I0.0")    # Start button (NO)
    main_pou.add_variable("STOP_BTN", "BOOL", "%I0.1")     # Stop button (NC)
    main_pou.add_variable("OVERLOAD", "BOOL", "%I0.2")     # Thermal overload (NC)

    # Outputs
    main_pou.add_variable("MOTOR", "BOOL", "%Q0.0")        # Motor contactor
    main_pou.add_variable("RUN_LIGHT", "BOOL", "%Q0.1")    # Running indicator

    # Internal Memory
    main_pou.add_variable("MOTOR_RUN", "BOOL", "%M0")      # Motor run status (internal)

    # ========================================
    # Rung 1: Motor Start/Stop with Seal-in
    # ========================================
    # Logic:
    #   START_BTN (NO) in series with STOP_BTN (NC) and OVERLOAD (NC)
    #   MOTOR_RUN provides seal-in (latching)
    #
    # Ladder:
    #   |--[START_BTN]--+--]/[STOP_BTN]--]/[OVERLOAD]--(MOTOR_RUN)--|
    #   |               |                                           |
    #   |--[MOTOR_RUN]--+                                           |
    #
    print("\nCreating Rung 1: Motor Start/Stop Circuit...")

    main_pou.add_rung(
        contacts=["START_BTN"],           # Start button (NO contact)
        coil="MOTOR_RUN",                 # Internal motor run bit
        seal_in="MOTOR_RUN",              # Seal-in with own output
        normally_closed=["STOP_BTN", "OVERLOAD"]  # NC contacts (fail-safe)
    )

    # ========================================
    # Rung 2: Motor Output
    # ========================================
    # Logic: MOTOR_RUN drives the actual motor contactor
    #
    # Ladder:
    #   |--[MOTOR_RUN]--(MOTOR)--|
    #
    print("Creating Rung 2: Motor Output...")

    main_pou.add_rung(
        contacts=["MOTOR_RUN"],
        coil="MOTOR"
    )

    # ========================================
    # Rung 3: Run Indicator Light
    # ========================================
    # Logic: When motor is running, turn on indicator light
    #
    # Ladder:
    #   |--[MOTOR_RUN]--(RUN_LIGHT)--|
    #
    print("Creating Rung 3: Run Indicator Light...")

    main_pou.add_rung(
        contacts=["MOTOR_RUN"],
        coil="RUN_LIGHT"
    )

    # ========================================
    # Compile Project
    # ========================================
    print("\n" + "-" * 40)
    print("Compiling project...")

    if api.compile():
        print("Compilation successful!")

        # Save project
        project.save()
        print(f"\nProject saved to: {project_location}")

        # ========================================
        # Optional: Download to PLC
        # ========================================
        print("\n" + "-" * 40)
        print("Ready to download to PLC")
        print("Connection options: USB or Ethernet")

        # Uncomment to download:
        # if api.download("USB"):
        #     print("Download successful!")
        #     api.set_run_mode()
        #     print("PLC set to RUN mode!")

    else:
        print("Compilation failed!")
        return False

    # ========================================
    # Print Summary
    # ========================================
    print("\n" + "=" * 60)
    print("PROGRAM SUMMARY")
    print("=" * 60)
    print(f"""
PLC Model: TM221CE40T
Project:   Motor_StartStop

I/O ASSIGNMENT:
--------------
INPUTS:
  %I0.0 - START_BTN    (Start Push Button - Normally Open)
  %I0.1 - STOP_BTN     (Stop Push Button - Normally Closed)
  %I0.2 - OVERLOAD     (Thermal Overload - Normally Closed)

OUTPUTS:
  %Q0.0 - MOTOR        (Motor Contactor)
  %Q0.1 - RUN_LIGHT    (Running Indicator Light)

INTERNAL:
  %M0   - MOTOR_RUN    (Motor Run Status Bit)

LADDER LOGIC:
-------------
Rung 1: Motor Start/Stop with Seal-in
  |--[START_BTN]--+--]/[STOP_BTN]--]/[OVERLOAD]--(MOTOR_RUN)--|
  |               |                                            |
  |--[MOTOR_RUN]--+                                            |

Rung 2: Motor Output
  |--[MOTOR_RUN]--(MOTOR)--|

Rung 3: Run Indicator
  |--[MOTOR_RUN]--(RUN_LIGHT)--|

OPERATION:
----------
1. Press START_BTN to start motor (MOTOR_RUN latches via seal-in)
2. Press STOP_BTN to stop motor (breaks the circuit)
3. Overload trip stops motor automatically (safety feature)
4. RUN_LIGHT indicates motor is running

SAFETY FEATURES:
----------------
- Stop button is NC (fail-safe: broken wire = motor stops)
- Overload contact is NC (fail-safe: trip = motor stops)
- Seal-in circuit requires manual restart after stop/trip
""")
    print("=" * 60)
    print(f"Project file: {project_location}")
    print("=" * 60)

    return True


if __name__ == "__main__":
    create_motor_startstop_program()
