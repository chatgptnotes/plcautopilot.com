"""
Test Suite for PLC Automation
Validates fast API and PLCopen XML generation
"""

import sys
import time
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from plc_automation import PLCAutomation, Platform, EcoStruxureAPI, PLCopenXMLGenerator


class TestEcoStruxureAPI(unittest.TestCase):
    """Test Schneider Electric API wrapper"""

    def test_api_initialization(self):
        """Test API initialization"""
        api = EcoStruxureAPI()
        self.assertIsNotNone(api)

    def test_project_creation(self):
        """Test project creation"""
        api = EcoStruxureAPI()
        project = api.create_project("Test_Project", "TM221CE24T")
        self.assertIsNotNone(project)
        self.assertEqual(project.name, "Test_Project")

    def test_add_variables(self):
        """Test variable addition"""
        api = EcoStruxureAPI()
        project = api.create_project("Test_Vars", "TM221CE24T")
        pou = project.get_pou("MainProgram")

        pou.add_variable("TEST_VAR", "BOOL", "%I0.0")
        self.assertEqual(len(pou.variables), 1)
        self.assertEqual(pou.variables[0]["name"], "TEST_VAR")

    def test_add_rungs(self):
        """Test ladder rung addition"""
        api = EcoStruxureAPI()
        project = api.create_project("Test_Rungs", "TM221CE24T")
        pou = project.get_pou("MainProgram")

        pou.add_rung(contacts=["INPUT1"], coil="OUTPUT1")
        self.assertEqual(len(pou.rungs), 1)

    def test_compilation(self):
        """Test project compilation"""
        api = EcoStruxureAPI()
        project = api.create_project("Test_Compile", "TM221CE24T")
        pou = project.get_pou("MainProgram")
        pou.add_rung(contacts=["START"], coil="MOTOR")

        result = api.compile()
        self.assertTrue(result)


class TestPLCopenXML(unittest.TestCase):
    """Test PLCopen XML generator"""

    def test_xml_generation(self):
        """Test XML generation"""
        generator = PLCopenXMLGenerator()
        self.assertIsNotNone(generator)

    def test_project_creation(self):
        """Test project creation"""
        generator = PLCopenXMLGenerator()
        project = generator.create_project("Test_XML_Project")
        self.assertIsNotNone(project)

    def test_program_addition(self):
        """Test program addition"""
        generator = PLCopenXMLGenerator()
        project = generator.create_project("Test_Program")
        program = project.add_program("MainProgram")
        self.assertIsNotNone(program)
        self.assertEqual(program.name, "MainProgram")

    def test_variable_addition(self):
        """Test variable declaration"""
        generator = PLCopenXMLGenerator()
        project = generator.create_project("Test_Vars_XML")
        program = project.add_program("MainProgram")

        program.add_variable("TEST_VAR", "BOOL", "%I0.0")
        self.assertEqual(len(program.variables), 1)

    def test_rung_addition(self):
        """Test rung addition"""
        generator = PLCopenXMLGenerator()
        project = generator.create_project("Test_Rungs_XML")
        program = project.add_program("MainProgram")

        program.add_rung(contacts=["INPUT1"], coil="OUTPUT1")
        self.assertEqual(len(program.rungs), 1)

    def test_xml_output(self):
        """Test XML string generation"""
        generator = PLCopenXMLGenerator()
        project = generator.create_project("Test_XML_Output")
        program = project.add_program("MainProgram")
        program.add_rung(contacts=["START"], coil="MOTOR")
        program.finalize()

        xml_string = generator.to_xml_string()
        self.assertIn("<?xml", xml_string)
        self.assertIn("plcopen.org", xml_string)
        self.assertIn("MainProgram", xml_string)


class TestUnifiedInterface(unittest.TestCase):
    """Test unified automation interface"""

    def test_schneider_automation(self):
        """Test Schneider platform automation"""
        automation = PLCAutomation(Platform.SCHNEIDER)
        automation.create_project("Test_Schneider", "TM221CE24T")
        automation.add_motor_startstop()

        stats = automation.get_stats()
        self.assertEqual(stats["platform"], "schneider")
        self.assertEqual(stats["method"], "api")
        self.assertGreater(stats["rungs"], 0)

    def test_siemens_automation(self):
        """Test Siemens platform automation"""
        automation = PLCAutomation(Platform.SIEMENS)
        automation.create_project("Test_Siemens", "S7-1200")
        automation.add_motor_startstop()

        stats = automation.get_stats()
        self.assertEqual(stats["platform"], "siemens")
        self.assertEqual(stats["method"], "xml")

    def test_rockwell_automation(self):
        """Test Rockwell platform automation"""
        automation = PLCAutomation(Platform.ROCKWELL)
        automation.create_project("Test_Rockwell", "CompactLogix")
        automation.add_motor_startstop()

        stats = automation.get_stats()
        self.assertEqual(stats["platform"], "rockwell")
        self.assertEqual(stats["method"], "xml")

    def test_multi_platform_motor_circuit(self):
        """Test same circuit across all platforms"""
        platforms = [
            (Platform.SCHNEIDER, "TM221CE24T"),
            (Platform.SIEMENS, "S7-1200"),
            (Platform.ROCKWELL, "CompactLogix"),
            (Platform.MITSUBISHI, "FX5U")
        ]

        for platform, plc_type in platforms:
            automation = PLCAutomation(platform)
            automation.create_project(f"Test_{platform.value}", plc_type)
            automation.add_motor_startstop()

            stats = automation.get_stats()
            self.assertEqual(stats["rungs"], 2)  # Motor + LED
            self.assertEqual(stats["variables"], 4)  # START, STOP, MOTOR, LED


class TestPerformance(unittest.TestCase):
    """Test performance improvements"""

    def test_schneider_speed(self):
        """Test Schneider automation speed"""
        start_time = time.time()

        automation = PLCAutomation(Platform.SCHNEIDER)
        automation.create_project("Speed_Test_Schneider", "TM221CE24T")
        automation.add_motor_startstop()
        automation.compile()

        elapsed = time.time() - start_time

        # Should complete in under 5 seconds (vs 60+ with PyAutoGUI)
        self.assertLess(elapsed, 5.0, f"Too slow: {elapsed:.2f}s")
        print(f"\nSchneider automation: {elapsed:.2f}s (target: <5s)")

    def test_xml_generation_speed(self):
        """Test XML generation speed"""
        start_time = time.time()

        automation = PLCAutomation(Platform.SIEMENS)
        automation.create_project("Speed_Test_XML", "S7-1200")
        automation.add_motor_startstop()
        automation.compile()

        elapsed = time.time() - start_time

        # Should complete in under 2 seconds
        self.assertLess(elapsed, 2.0, f"Too slow: {elapsed:.2f}s")
        print(f"PLCopen XML generation: {elapsed:.2f}s (target: <2s)")


def run_tests():
    """Run all tests"""
    print("=" * 70)
    print("PLCAutoPilot Fast Automation Test Suite")
    print("=" * 70)
    print()

    # Create test suite
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()

    # Add all test classes
    suite.addTests(loader.loadTestsFromTestCase(TestEcoStruxureAPI))
    suite.addTests(loader.loadTestsFromTestCase(TestPLCopenXML))
    suite.addTests(loader.loadTestsFromTestCase(TestUnifiedInterface))
    suite.addTests(loader.loadTestsFromTestCase(TestPerformance))

    # Run tests
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)

    # Summary
    print()
    print("=" * 70)
    print(f"Tests run: {result.testsRun}")
    print(f"Successes: {result.testsRun - len(result.failures) - len(result.errors)}")
    print(f"Failures: {len(result.failures)}")
    print(f"Errors: {len(result.errors)}")
    print("=" * 70)

    return 0 if result.wasSuccessful() else 1


if __name__ == "__main__":
    sys.exit(run_tests())
