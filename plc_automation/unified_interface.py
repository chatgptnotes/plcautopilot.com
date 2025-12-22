"""
Unified PLC Automation Interface
Single API for all PLC platforms

Platform dispatcher that routes to:
- Schneider: Python API (fastest)
- Siemens: PLCopen XML + TIA import
- Rockwell: PLCopen XML + Studio import
- Mitsubishi: PLCopen XML + GX import
- Universal: PLCopen XML (500+ platforms)
"""

import logging
from enum import Enum
from typing import List, Dict, Optional, Tuple
from pathlib import Path

from .ecostruxure_api import EcoStruxureAPI
from .plcopen_xml import PLCopenXMLGenerator

logger = logging.getLogger(__name__)


class Platform(Enum):
    """Supported PLC platforms"""
    SCHNEIDER = "schneider"
    SIEMENS = "siemens"
    ROCKWELL = "rockwell"
    MITSUBISHI = "mitsubishi"
    CODESYS = "codesys"
    UNIVERSAL = "universal"  # PLCopen XML for any platform


class PLCAutomation:
    """
    Unified interface for PLC automation across all platforms

    This is the main entry point for PLCAutoPilot.
    Automatically routes to the best method for each platform.

    Example:
        # Schneider (uses fast Python API)
        automation = PLCAutomation(Platform.SCHNEIDER)
        automation.create_project("MotorControl", "TM221CE24T")
        automation.add_motor_startstop()
        automation.compile_and_download()

        # Siemens (generates PLCopen XML)
        automation = PLCAutomation(Platform.SIEMENS)
        automation.create_project("MotorControl", "S7-1200")
        automation.add_motor_startstop()
        automation.export_xml("motor_control.xml")
    """

    def __init__(self, platform: Platform = Platform.SCHNEIDER):
        """
        Initialize automation for specific platform

        Args:
            platform: Target PLC platform
        """
        self.platform = platform
        self.project = None
        self.program = None

        # Initialize appropriate backend
        if platform == Platform.SCHNEIDER:
            logger.info("Using Schneider Python API (fastest method)")
            self.backend = EcoStruxureAPI()
            self.method = "api"
        else:
            logger.info(f"Using PLCopen XML for {platform.value} (universal method)")
            self.backend = PLCopenXMLGenerator(
                company_name="PLCAutoPilot",
                product_name="AI Generator",
                product_version="1.4"
            )
            self.method = "xml"

    def create_project(
        self,
        name: str,
        plc_type: str,
        location: Optional[str] = None
    ):
        """
        Create new PLC project

        Args:
            name: Project name
            plc_type: PLC model
                - Schneider: TM221CE24T, TM221CE40T, TM241CE24T, etc.
                - Siemens: S7-1200, S7-1500, S7-300, etc.
                - Rockwell: CompactLogix, ControlLogix, etc.
                - Mitsubishi: FX5U, iQ-R, Q series, etc.
            location: Save location (optional)
        """
        logger.info(f"Creating project: {name} for {self.platform.value} {plc_type}")

        if self.method == "api":
            # Use Schneider API
            self.project = self.backend.create_project(name, plc_type, location)
            self.program = self.project.get_pou("MainProgram")
        else:
            # Use PLCopen XML
            self.project = self.backend.create_project(name)
            self.program = self.project.add_program("MainProgram")

        logger.info(f"Project created successfully")

    def add_variable(
        self,
        name: str,
        var_type: str = "BOOL",
        address: Optional[str] = None
    ):
        """
        Add variable to program

        Args:
            name: Variable name
            var_type: Data type (BOOL, INT, REAL, DINT, etc.)
            address: I/O address (%I0.0, %Q0.0, %MW0, etc.)
        """
        if not self.program:
            logger.error("No project created. Call create_project() first.")
            return

        if self.method == "api":
            self.program.add_variable(name, var_type, address)
        else:
            self.program.add_variable(name, var_type, address)

    def add_rung(
        self,
        contacts: Optional[List[str]] = None,
        normally_closed: Optional[List[str]] = None,
        coil: Optional[str] = None,
        seal_in: Optional[str] = None
    ):
        """
        Add ladder logic rung

        Args:
            contacts: List of NO contact variable names
            normally_closed: List of NC contact variable names
            coil: Coil variable name
            seal_in: Seal-in contact (for latching)
        """
        if not self.program:
            logger.error("No project created. Call create_project() first.")
            return

        if self.method == "api":
            self.program.add_rung(
                contacts=contacts or [],
                coil=coil,
                seal_in=seal_in,
                normally_closed=normally_closed
            )
        else:
            self.program.add_rung(
                contacts=contacts,
                normally_closed=normally_closed,
                coil=coil,
                seal_in=seal_in
            )

    def add_motor_startstop(
        self,
        start_btn: str = "START_BTN",
        stop_btn: str = "STOP_BTN",
        motor_output: str = "MOTOR_RUN",
        led_output: Optional[str] = "GREEN_LED"
    ):
        """
        Add standard motor start/stop circuit with seal-in

        Args:
            start_btn: Start button variable name
            stop_btn: Stop button variable name
            motor_output: Motor contactor output variable
            led_output: Optional indicator LED output
        """
        logger.info("Adding motor start/stop circuit...")

        # Add variables
        self.add_variable(start_btn, "BOOL", "%I0.0")
        self.add_variable(stop_btn, "BOOL", "%I0.1")
        self.add_variable(motor_output, "BOOL", "%Q0.0")

        if led_output:
            self.add_variable(led_output, "BOOL", "%Q0.1")

        # Add main control rung
        self.add_rung(
            contacts=[start_btn],
            normally_closed=[stop_btn],
            coil=motor_output,
            seal_in=motor_output
        )

        # Add LED indicator (if specified)
        if led_output:
            self.add_rung(
                contacts=[motor_output],
                coil=led_output
            )

        logger.info("Motor start/stop circuit added successfully")

    def compile(self) -> bool:
        """
        Compile project

        Returns:
            True if successful
        """
        if not self.project:
            logger.error("No project to compile")
            return False

        if self.method == "api":
            return self.backend.compile()
        else:
            # Finalize XML generation
            self.program.finalize()
            logger.info("PLCopen XML finalized (no compilation needed)")
            return True

    def download(
        self,
        connection: str = "USB",
        plc_ip: Optional[str] = None
    ) -> bool:
        """
        Download to PLC (Schneider only)

        For other platforms, use export_xml() and import manually.

        Args:
            connection: Connection type ("USB", "Ethernet")
            plc_ip: PLC IP address (for Ethernet)

        Returns:
            True if successful
        """
        if self.method == "api":
            return self.backend.download(connection, plc_ip)
        else:
            logger.warning(f"{self.platform.value} requires manual import of XML file")
            logger.info("Use export_xml() to save file, then import in your IDE")
            return False

    def export_xml(self, filename: str):
        """
        Export as PLCopen XML file

        This file can be imported into:
        - Schneider EcoStruxure
        - Siemens TIA Portal
        - Rockwell Studio 5000
        - Mitsubishi GX Works
        - Any CODESYS-based IDE

        Args:
            filename: Output XML filename
        """
        if self.method == "xml":
            self.project.save(filename)
            logger.info(f"PLCopen XML exported: {filename}")
            logger.info(f"Import this file in your {self.platform.value} IDE")
        else:
            logger.warning("XML export only available for PLCopen method")
            logger.info("Schneider projects use native .smbp format")

    def compile_and_download(self) -> bool:
        """
        Convenience method: compile and download in one step

        Returns:
            True if successful
        """
        if self.compile():
            return self.download()
        return False

    def get_stats(self) -> Dict:
        """
        Get project statistics

        Returns:
            Dictionary with project info
        """
        stats = {
            "platform": self.platform.value,
            "method": self.method,
            "project_name": self.project.name if self.project else None,
        }

        if self.program:
            if self.method == "api":
                stats["rungs"] = len(self.program.rungs)
                stats["variables"] = len(self.program.variables)
            else:
                stats["rungs"] = len(self.program.rungs)
                stats["variables"] = len(self.program.variables)

        return stats


# Quick helper functions
def quick_schneider(project_name: str, plc_type: str = "TM221CE24T") -> PLCAutomation:
    """Quick setup for Schneider Electric projects"""
    automation = PLCAutomation(Platform.SCHNEIDER)
    automation.create_project(project_name, plc_type)
    return automation


def quick_siemens(project_name: str, plc_type: str = "S7-1200") -> PLCAutomation:
    """Quick setup for Siemens projects"""
    automation = PLCAutomation(Platform.SIEMENS)
    automation.create_project(project_name, plc_type)
    return automation


def quick_rockwell(project_name: str, plc_type: str = "CompactLogix") -> PLCAutomation:
    """Quick setup for Rockwell projects"""
    automation = PLCAutomation(Platform.ROCKWELL)
    automation.create_project(project_name, plc_type)
    return automation


def quick_mitsubishi(project_name: str, plc_type: str = "FX5U") -> PLCAutomation:
    """Quick setup for Mitsubishi projects"""
    automation = PLCAutomation(Platform.MITSUBISHI)
    automation.create_project(project_name, plc_type)
    return automation


# Example usage
if __name__ == "__main__":
    import time

    print("=" * 70)
    print("PLCAutoPilot Unified Automation Demo")
    print("=" * 70)

    # Example 1: Schneider (fastest - uses Python API)
    print("\n[1] Schneider Electric (Python API method)")
    print("-" * 70)

    start_time = time.time()

    schneider = quick_schneider("MotorControl_Schneider", "TM221CE24T")
    schneider.add_motor_startstop()
    schneider.compile()

    elapsed = time.time() - start_time
    print(f"Time: {elapsed:.2f}s (vs 60+ with PyAutoGUI)")
    print(f"Stats: {schneider.get_stats()}")

    # Example 2: Siemens (PLCopen XML method)
    print("\n[2] Siemens TIA Portal (PLCopen XML method)")
    print("-" * 70)

    start_time = time.time()

    siemens = quick_siemens("MotorControl_Siemens", "S7-1200")
    siemens.add_motor_startstop()
    siemens.compile()
    siemens.export_xml("/Users/murali/1backup/plcautopilot.com/MotorControl_Siemens.xml")

    elapsed = time.time() - start_time
    print(f"Time: {elapsed:.2f}s")
    print(f"Stats: {siemens.get_stats()}")

    # Example 3: Rockwell
    print("\n[3] Rockwell Studio 5000 (PLCopen XML method)")
    print("-" * 70)

    rockwell = quick_rockwell("MotorControl_Rockwell", "CompactLogix")
    rockwell.add_motor_startstop()
    rockwell.compile()
    rockwell.export_xml("/Users/murali/1backup/plcautopilot.com/MotorControl_Rockwell.xml")
    print(f"Stats: {rockwell.get_stats()}")

    print("\n" + "=" * 70)
    print("All platforms supported with single API!")
    print("=" * 70)
