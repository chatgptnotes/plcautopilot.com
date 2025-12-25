'use client';

import { useState } from 'react';

export default function HMIGenerator() {
  const [projectName, setProjectName] = useState('');
  const [platform, setPlatform] = useState('siemens-wincc');
  const [screenType, setScreenType] = useState('process-overview');
  const [description, setDescription] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const platforms = [
    { id: 'siemens-wincc', name: 'Siemens WinCC', language: 'VBScript/C#', market: '35%' },
    { id: 'rockwell-factorytalk', name: 'Rockwell FactoryTalk View', language: 'VBA', market: '25%' },
    { id: 'schneider-vijeo', name: 'Schneider Vijeo Designer', language: 'JavaScript', market: '10%' },
    { id: 'mitsubishi-gt', name: 'Mitsubishi GT Designer', language: 'Ladder/Script', market: '15%' },
    { id: 'abb-800xa', name: 'ABB 800xA', language: 'C#/.NET', market: '8%' },
    { id: 'wonderware', name: 'Wonderware InTouch', language: 'QuickScript', market: '12%' },
    { id: 'ignition', name: 'Ignition SCADA', language: 'Python/Jython', market: '5%' },
    { id: 'codesys-visu', name: 'CODESYS Visualization', language: 'IEC 61131-3', market: '500+ brands' }
  ];

  const screenTypes = [
    { id: 'process-overview', name: 'Process Overview', desc: 'Main process monitoring screen' },
    { id: 'tank-level', name: 'Tank Level Control', desc: 'Tank filling and monitoring' },
    { id: 'motor-control', name: 'Motor Control Panel', desc: 'Start/stop/speed control' },
    { id: 'alarm-display', name: 'Alarm Display', desc: 'Real-time alarm management' },
    { id: 'trend-chart', name: 'Trend Chart', desc: 'Historical data visualization' },
    { id: 'recipe-management', name: 'Recipe Management', desc: 'Production recipe selection' },
    { id: 'conveyor-system', name: 'Conveyor System', desc: 'Material handling control' },
    { id: 'temperature-control', name: 'Temperature Control', desc: 'Heating/cooling control' },
    { id: 'custom', name: 'Custom Screen', desc: 'Describe your requirements' }
  ];

  const generateHMICode = async () => {
    setIsGenerating(true);

    // Simulate AI code generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const selectedPlatform = platforms.find(p => p.id === platform);
    const selectedScreen = screenTypes.find(s => s.id === screenType);

    let code = '';

    // Generate platform-specific HMI code
    switch (platform) {
      case 'siemens-wincc':
        code = generateWinCCCode(selectedScreen, description, projectName);
        break;
      case 'rockwell-factorytalk':
        code = generateFactoryTalkCode(selectedScreen, description, projectName);
        break;
      case 'schneider-vijeo':
        code = generateVijeoCode(selectedScreen, description, projectName);
        break;
      case 'mitsubishi-gt':
        code = generateGTDesignerCode(selectedScreen, description, projectName);
        break;
      case 'ignition':
        code = generateIgnitionCode(selectedScreen, description, projectName);
        break;
      case 'codesys-visu':
        code = generateCODESYSVisuCode(selectedScreen, description, projectName);
        break;
      default:
        code = generateGenericHMICode(selectedScreen, description, projectName);
    }

    setGeneratedCode(code);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
            HMI CODE GENERATOR
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI-Powered HMI Screen Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Generate professional HMI/SCADA screens for all major platforms: Siemens WinCC, Rockwell FactoryTalk, Schneider Vijeo, and more
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Configuration</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g., Water Treatment Plant"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  HMI/SCADA Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  {platforms.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.language}) - {p.market}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Screen Type
                </label>
                <select
                  value={screenType}
                  onChange={(e) => setScreenType(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  {screenTypes.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} - {s.desc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description (Natural Language)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your HMI screen requirements in plain English..."
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <button
                onClick={generateHMICode}
                disabled={isGenerating || !projectName}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <span className="material-icons animate-spin">refresh</span>
                    Generating HMI Code...
                  </>
                ) : (
                  <>
                    <span className="material-icons">code</span>
                    Generate HMI Code
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Generated Code</h2>
              {generatedCode && (
                <button
                  onClick={() => navigator.clipboard.writeText(generatedCode)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <span className="material-icons text-sm">content_copy</span>
                  Copy
                </button>
              )}
            </div>

            <div className="bg-gray-800 rounded-lg p-6 h-[600px] overflow-auto">
              {generatedCode ? (
                <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                  {generatedCode}
                </pre>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <span className="material-icons text-6xl mb-4 block">code_off</span>
                    <p>Configure settings and click Generate</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border-2 border-blue-200">
            <span className="material-icons text-blue-600 text-4xl mb-3 block">devices</span>
            <h3 className="text-lg font-bold text-gray-900 mb-2">8+ Platforms</h3>
            <p className="text-gray-600 text-sm">Support for all major HMI/SCADA platforms</p>
          </div>
          <div className="bg-white rounded-xl p-6 border-2 border-green-200">
            <span className="material-icons text-green-600 text-4xl mb-3 block">speed</span>
            <h3 className="text-lg font-bold text-gray-900 mb-2">80% Faster</h3>
            <p className="text-gray-600 text-sm">Reduce HMI development time dramatically</p>
          </div>
          <div className="bg-white rounded-xl p-6 border-2 border-purple-200">
            <span className="material-icons text-purple-600 text-4xl mb-3 block">psychology</span>
            <h3 className="text-lg font-bold text-gray-900 mb-2">AI-Powered</h3>
            <p className="text-gray-600 text-sm">Natural language to production-ready code</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Platform-specific code generators
function generateWinCCCode(screenType: any, description: string, projectName: string) {
  return `' ========================================
' Siemens WinCC HMI Screen
' Project: ${projectName}
' Screen: ${screenType?.name}
' Generated by PLCAutoPilot AI
' ========================================

Option Explicit

' Global Variables
Dim ScreenTitle As String
Dim RefreshInterval As Integer

' Initialize Screen
Sub OnScreenLoad()
    ScreenTitle = "${screenType?.name} - ${projectName}"
    RefreshInterval = 1000 ' 1 second

    ' Set screen properties
    Screen.Title = ScreenTitle
    Screen.BackColor = RGB(240, 240, 240)

    ' Initialize components
    InitializeComponents()

    ' Start refresh timer
    Timer1.Interval = RefreshInterval
    Timer1.Enabled = True
End Sub

' Initialize UI Components
Sub InitializeComponents()
    ' ${description || 'Add your component initialization here'}

    ' Example: Tank Level Display
    TankLevel.Min = 0
    TankLevel.Max = 100
    TankLevel.Value = HMIRuntime.Tags("Tank_Level").Read

    ' Example: Start Button
    StartButton.Text = "Start Process"
    StartButton.BackColor = RGB(0, 200, 0)

    ' Example: Stop Button
    StopButton.Text = "Stop Process"
    StopButton.BackColor = RGB(200, 0, 0)
End Sub

' Timer Event - Refresh Data
Sub Timer1_OnTimer()
    ' Read PLC tags and update display
    UpdateProcessData()
End Sub

' Update Process Data from PLC
Sub UpdateProcessData()
    ' Read values from PLC tags
    TankLevel.Value = HMIRuntime.Tags("Tank_Level").Read
    MotorStatus.Text = HMIRuntime.Tags("Motor_Running").Read
    Temperature.Text = HMIRuntime.Tags("Temperature").Read & " °C"

    ' Update status indicators
    If HMIRuntime.Tags("Alarm_Active").Read Then
        AlarmIndicator.FillColor = RGB(255, 0, 0)
        AlarmIndicator.Flash = True
    Else
        AlarmIndicator.FillColor = RGB(0, 255, 0)
        AlarmIndicator.Flash = False
    End If
End Sub

' Start Button Click Event
Sub StartButton_OnClick()
    ' Write to PLC start command
    HMIRuntime.Tags("Start_Command").Write(True)
    LogEvent("Process started by operator")
End Sub

' Stop Button Click Event
Sub StopButton_OnClick()
    ' Write to PLC stop command
    HMIRuntime.Tags("Stop_Command").Write(True)
    LogEvent("Process stopped by operator")
End Sub

' Log Event to WinCC Alarm System
Sub LogEvent(message As String)
    HMIRuntime.Trace(message)
End Sub

' Screen Cleanup
Sub OnScreenUnload()
    Timer1.Enabled = False
End Sub`;
}

function generateFactoryTalkCode(screenType: any, description: string, projectName: string) {
  return `' ========================================
' Rockwell FactoryTalk View HMI Screen
' Project: ${projectName}
' Screen: ${screenType?.name}
' Generated by PLCAutoPilot AI
' ========================================

' Global Display Settings
Private Declare Function SetDisplayRefreshRate Lib "user32" ()

' Display Load Event
Private Sub Display_OnOpen()
    ' Initialize screen
    Me.Caption = "${screenType?.name} - ${projectName}"
    Me.BackColor = RGB(245, 245, 245)

    ' ${description || 'Configure your display components'}

    ' Set refresh rate
    SetRefreshRate 1000 ' 1 second

    ' Initialize tags
    InitializeTags()
End Sub

' Initialize Tag Connections
Private Sub InitializeTags()
    ' Connect to PLC tags
    TagBrowser1.Path = "PLCController"

    ' Tank Level Animation
    TankGraphic.TagName = "Tank_Level_PV"
    TankGraphic.Min = 0
    TankGraphic.Max = 100

    ' Motor Status Indicator
    MotorLight.BlinkExpression = "[PLCController]Motor_Running"
    MotorLight.OnColor = vbGreen
    MotorLight.OffColor = vbGray

    ' Temperature Display
    TempNumeric.TagName = "Temperature_PV"
    TempNumeric.Format = "0.0"
    TempNumeric.Units = " °C"
End Sub

' Start Button Click
Private Sub StartButton_Click()
    ' Set PLC start bit
    SetTag "Start_Command", True

    ' Log action
    LogixEventLogger.LogAction "Process Started", CurrentUser
End Sub

' Stop Button Click
Private Sub StopButton_Click()
    ' Set PLC stop bit
    SetTag "Stop_Command", True

    ' Confirm with operator
    If MsgBox("Confirm Process Stop?", vbYesNo) = vbYes Then
        SetTag "Emergency_Stop", True
        LogixEventLogger.LogAction "Emergency Stop Activated", CurrentUser
    End If
End Sub

' Emergency Stop Button
Private Sub EStopButton_Click()
    SetTag "Emergency_Stop", True
    SetTag "Alarm_Acknowledge", False
    MsgBox "EMERGENCY STOP ACTIVATED", vbCritical
End Sub

' Helper Function: Set PLC Tag
Private Sub SetTag(tagName As String, value As Variant)
    Application.SetTag "[PLCController]" & tagName, value
End Sub

' Display Close Event
Private Sub Display_OnClose()
    ' Cleanup connections
    TagBrowser1.Disconnect
End Sub`;
}

function generateVijeoCode(screenType: any, description: string, projectName: string) {
  return `// ========================================
// Schneider Vijeo Designer HMI Screen
// Project: ${projectName}
// Screen: ${screenType?.name}
// Generated by PLCAutoPilot AI
// ========================================

// Global Variables
var screenTitle = "${screenType?.name} - ${projectName}";
var refreshInterval = 1000; // 1 second
var plcConnection = null;

// Screen Initialization
function OnScreenActivate() {
    // Set screen properties
    Screen.Title = screenTitle;
    Screen.BackgroundColor = "#F5F5F5";

    // ${description || 'Initialize your screen components'}

    // Connect to PLC
    connectToPLC();

    // Start data refresh
    setInterval(refreshData, refreshInterval);

    // Initialize components
    initializeComponents();
}

// Connect to Modicon PLC
function connectToPLC() {
    plcConnection = new PLCConnection({
        ip: "192.168.1.100",
        port: 502,
        protocol: "Modbus TCP"
    });

    if (plcConnection.connect()) {
        console.log("Connected to PLC successfully");
        StatusLabel.text = "PLC Connected";
        StatusLabel.textColor = "#00FF00";
    } else {
        console.error("Failed to connect to PLC");
        StatusLabel.text = "PLC Disconnected";
        StatusLabel.textColor = "#FF0000";
    }
}

// Initialize UI Components
function initializeComponents() {
    // Tank Level Gauge
    TankLevelGauge.min = 0;
    TankLevelGauge.max = 100;
    TankLevelGauge.unit = "%";
    TankLevelGauge.dataSource = "Tank_Level";

    // Motor Control Panel
    MotorStartButton.enabled = true;
    MotorStartButton.text = "START";
    MotorStartButton.backgroundColor = "#00CC00";
    MotorStartButton.onClick = startMotor;

    MotorStopButton.enabled = true;
    MotorStopButton.text = "STOP";
    MotorStopButton.backgroundColor = "#CC0000";
    MotorStopButton.onClick = stopMotor;

    // Alarm Display
    AlarmList.dataSource = "Alarm_Buffer";
    AlarmList.maxItems = 50;
}

// Refresh Data from PLC
function refreshData() {
    if (plcConnection && plcConnection.isConnected()) {
        // Read tank level
        var tankLevel = plcConnection.readInt("MW100"); // %MW100
        TankLevelGauge.value = tankLevel;
        TankLevelText.text = tankLevel + "%";

        // Read motor status
        var motorRunning = plcConnection.readBit("M0.0"); // %M0.0
        MotorStatusLight.active = motorRunning;
        MotorStatusText.text = motorRunning ? "RUNNING" : "STOPPED";

        // Read temperature
        var temperature = plcConnection.readFloat("MD200"); // %MD200
        TemperatureDisplay.text = temperature.toFixed(1) + " °C";

        // Check alarms
        var alarmActive = plcConnection.readBit("M1.0"); // %M1.0
        if (alarmActive) {
            AlarmIndicator.blink = true;
            AlarmIndicator.color = "#FF0000";
            showAlarmMessage();
        }
    }
}

// Start Motor Function
function startMotor() {
    if (confirm("Start motor operation?")) {
        plcConnection.writeBit("M0.1", true); // %M0.1 - Start command
        logEvent("Motor started by operator: " + getCurrentUser());
    }
}

// Stop Motor Function
function stopMotor() {
    if (confirm("Stop motor operation?")) {
        plcConnection.writeBit("M0.2", true); // %M0.2 - Stop command
        logEvent("Motor stopped by operator: " + getCurrentUser());
    }
}

// Emergency Stop
function emergencyStop() {
    plcConnection.writeBit("M0.3", true); // %M0.3 - E-Stop
    alert("EMERGENCY STOP ACTIVATED!");
    logEvent("EMERGENCY STOP by " + getCurrentUser());
}

// Show Alarm Message
function showAlarmMessage() {
    var alarmText = plcConnection.readString("MW300", 80);
    AlarmMessageBox.text = alarmText;
    AlarmMessageBox.visible = true;
}

// Log Event to Vijeo Historian
function logEvent(message) {
    Historian.log({
        timestamp: new Date(),
        message: message,
        user: getCurrentUser(),
        severity: "INFO"
    });
}

// Get Current User
function getCurrentUser() {
    return Runtime.getCurrentUser().name;
}

// Screen Deactivation
function OnScreenDeactivate() {
    if (plcConnection) {
        plcConnection.disconnect();
    }
}`;
}

function generateGTDesignerCode(screenType: any, description: string, projectName: string) {
  return `(*========================================*)
(* Mitsubishi GT Designer HMI Screen       *)
(* Project: ${projectName}                *)
(* Screen: ${screenType?.name}            *)
(* Generated by PLCAutoPilot AI            *)
(*========================================*)

(* Screen Configuration *)
SCREEN_ID: INT := 100;
SCREEN_NAME: STRING := '${screenType?.name}';
REFRESH_RATE: TIME := T#1s;

(* PLC Device Addresses *)
TANK_LEVEL: D100;          (* Tank level 0-100% *)
MOTOR_STATUS: M100;        (* Motor running status *)
START_COMMAND: M101;       (* Start button *)
STOP_COMMAND: M102;        (* Stop button *)
ESTOP_COMMAND: M103;       (* Emergency stop *)
TEMPERATURE: D200;         (* Temperature value *)
ALARM_ACTIVE: M200;        (* Alarm flag *)

(* ${description || 'Add your screen logic here'} *)

(* Screen Initialization Script *)
PROGRAM Screen_Init
VAR
    InitComplete: BOOL := FALSE;
END_VAR

IF NOT InitComplete THEN
    (* Set screen title *)
    WRITE_STRING(0, 0, '${screenType?.name} - ${projectName}');

    (* Configure gauges *)
    GAUGE_CONFIG(GAUGE_1, 0, 100, D100);

    (* Configure buttons *)
    BUTTON_CONFIG(BTN_START, 'START', M101, COLOR_GREEN);
    BUTTON_CONFIG(BTN_STOP, 'STOP', M102, COLOR_RED);
    BUTTON_CONFIG(BTN_ESTOP, 'E-STOP', M103, COLOR_YELLOW);

    (* Configure numeric displays *)
    NUMERIC_CONFIG(NUM_TEMP, D200, 1, '°C');

    (* Configure alarm indicator *)
    INDICATOR_CONFIG(IND_ALARM, M200, BLINK_FAST, COLOR_RED);

    InitComplete := TRUE;
END_IF;
END_PROGRAM

(* Screen Update Script - Runs every scan *)
PROGRAM Screen_Update
VAR
    TankValue: INT;
    MotorState: BOOL;
    TempValue: INT;
END_VAR

(* Read PLC values *)
TankValue := D100;
MotorState := M100;
TempValue := D200;

(* Update tank level gauge *)
UPDATE_GAUGE(GAUGE_1, TankValue);

(* Update motor status light *)
IF MotorState THEN
    SET_LAMP(LAMP_MOTOR, COLOR_GREEN, NO_BLINK);
ELSE
    SET_LAMP(LAMP_MOTOR, COLOR_GRAY, NO_BLINK);
END_IF;

(* Update temperature display *)
UPDATE_NUMERIC(NUM_TEMP, TempValue);

(* Check alarms *)
IF M200 THEN (* Alarm active *)
    SET_LAMP(IND_ALARM, COLOR_RED, BLINK_FAST);
    SHOW_MESSAGE('ALARM: Check system status');
ELSE
    SET_LAMP(IND_ALARM, COLOR_GREEN, NO_BLINK);
END_IF;

(* Tank level high alarm *)
IF TankValue > 90 THEN
    SET_BIT(M201); (* High level alarm *)
    SHOW_MESSAGE('WARNING: Tank level above 90%');
END_IF;

(* Tank level low alarm *)
IF TankValue < 10 THEN
    SET_BIT(M202); (* Low level alarm *)
    SHOW_MESSAGE('WARNING: Tank level below 10%');
END_IF;

END_PROGRAM

(* Start Button Touch Event *)
PROGRAM BTN_START_Touch
BEGIN
    IF CONFIRM_DIALOG('Start motor operation?') = YES THEN
        SET_BIT(M101);  (* Activate start command *)
        RESET_BIT(M102); (* Reset stop command *)
        LOG_EVENT('Motor started by operator');
    END_IF;
END_PROGRAM

(* Stop Button Touch Event *)
PROGRAM BTN_STOP_Touch
BEGIN
    IF CONFIRM_DIALOG('Stop motor operation?') = YES THEN
        SET_BIT(M102);   (* Activate stop command *)
        RESET_BIT(M101); (* Reset start command *)
        LOG_EVENT('Motor stopped by operator');
    END_IF;
END_PROGRAM

(* Emergency Stop Button Touch Event *)
PROGRAM BTN_ESTOP_Touch
BEGIN
    SET_BIT(M103);  (* Activate E-Stop *)
    SHOW_DIALOG('EMERGENCY STOP ACTIVATED!', DIALOG_ERROR);
    LOG_EVENT('EMERGENCY STOP by operator');
END_PROGRAM

(* Alarm Acknowledge Button *)
PROGRAM BTN_ACK_ALARM_Touch
BEGIN
    RESET_BIT(M200);  (* Clear alarm flag *)
    RESET_BIT(M201);  (* Clear high level alarm *)
    RESET_BIT(M202);  (* Clear low level alarm *)
    LOG_EVENT('Alarms acknowledged');
END_PROGRAM

(*========================================*)
(* End of GT Designer HMI Screen Code    *)
(*========================================*)`;
}

function generateIgnitionCode(screenType: any, description: string, projectName: string) {
  return `# ========================================
# Ignition SCADA HMI Screen
# Project: ${projectName}
# Screen: ${screenType?.name}
# Generated by PLCAutoPilot AI
# Language: Python (Jython)
# ========================================

# Import required modules
from java.awt import Color, Font
from javax.swing import JOptionPane
import system.tag as tag
import system.db as db
import system.util as util

# Global Configuration
SCREEN_TITLE = "${screenType?.name} - ${projectName}"
REFRESH_INTERVAL = 1000  # milliseconds
PLC_DEVICE = "PLCController"

# ${description || 'Add your screen configuration'}

# ========================================
# Screen Lifecycle Events
# ========================================

def runAction(self, event):
    """
    Called when screen is opened
    Initialize components and start polling
    """
    # Set window title
    system.perspective.openPopup("root", SCREEN_TITLE)

    # Initialize components
    initializeComponents(self)

    # Start data refresh timer
    if not system.util.getSystemFlags() & system.util.DESIGNER_FLAG:
        system.util.invokeLater(lambda: refreshData(self), REFRESH_INTERVAL)

    # Log screen access
    logEvent("Screen opened by " + system.security.getUsername())

def initializeComponents(self):
    """
    Initialize all HMI components
    """
    # Tank Level Gauge
    self.getSibling("TankGauge").min = 0
    self.getSibling("TankGauge").max = 100
    self.getSibling("TankGauge").majorTickSpacing = 20

    # Motor Status Indicator
    self.getSibling("MotorStatus").customStates = [
        {"value": 0, "color": Color.GRAY, "label": "STOPPED"},
        {"value": 1, "color": Color.GREEN, "label": "RUNNING"}
    ]

    # Temperature Display
    self.getSibling("TempDisplay").format = "0.0"
    self.getSibling("TempDisplay").units = " °C"

    # Alarm Table
    self.getSibling("AlarmTable").data = []

# ========================================
# Data Refresh Functions
# ========================================

def refreshData(self):
    """
    Periodic data refresh from PLC
    Called every REFRESH_INTERVAL milliseconds
    """
    try:
        # Read tank level
        tankLevel = tag.readBlocking([f"[{PLC_DEVICE}]Tank_Level"])[0].value
        self.getSibling("TankGauge").value = tankLevel
        self.getSibling("TankLevelText").text = f"{tankLevel:.1f}%"

        # Read motor status
        motorRunning = tag.readBlocking([f"[{PLC_DEVICE}]Motor_Running"])[0].value
        self.getSibling("MotorStatus").value = 1 if motorRunning else 0

        # Read temperature
        temperature = tag.readBlocking([f"[{PLC_DEVICE}]Temperature"])[0].value
        self.getSibling("TempDisplay").value = temperature

        # Check temperature limits
        if temperature > 80:
            self.getSibling("TempWarning").visible = True
            self.getSibling("TempWarning").text = "HIGH TEMPERATURE WARNING!"
        else:
            self.getSibling("TempWarning").visible = False

        # Read alarms
        alarmActive = tag.readBlocking([f"[{PLC_DEVICE}]Alarm_Active"])[0].value
        if alarmActive:
            self.getSibling("AlarmIndicator").style.classes = ["alarm-active"]
            updateAlarmTable(self)
        else:
            self.getSibling("AlarmIndicator").style.classes = ["alarm-inactive"]

        # Schedule next refresh
        system.util.invokeLater(lambda: refreshData(self), REFRESH_INTERVAL)

    except Exception as e:
        logError(f"Error refreshing data: {str(e)}")

# ========================================
# Button Click Handlers
# ========================================

def startMotor(self, event):
    """
    Start Motor Button Click Handler
    """
    # Confirm action
    result = system.gui.confirm(
        "Confirm motor start operation?",
        "Start Confirmation"
    )

    if result == JOptionPane.YES_OPTION:
        # Write start command to PLC
        tag.writeBlocking([f"[{PLC_DEVICE}]Start_Command"], [True])

        # Log event
        logEvent("Motor started by " + system.security.getUsername())

        # Show notification
        system.perspective.notify("Motor Started", "success")

def stopMotor(self, event):
    """
    Stop Motor Button Click Handler
    """
    # Confirm action
    result = system.gui.confirm(
        "Confirm motor stop operation?",
        "Stop Confirmation"
    )

    if result == JOptionPane.YES_OPTION:
        # Write stop command to PLC
        tag.writeBlocking([f"[{PLC_DEVICE}]Stop_Command"], [True])

        # Log event
        logEvent("Motor stopped by " + system.security.getUsername())

        # Show notification
        system.perspective.notify("Motor Stopped", "warning")

def emergencyStop(self, event):
    """
    Emergency Stop Button Handler
    """
    # No confirmation for E-Stop
    tag.writeBlocking([f"[{PLC_DEVICE}]Emergency_Stop"], [True])

    # Log critical event
    logEvent("EMERGENCY STOP activated by " + system.security.getUsername())

    # Show critical alert
    system.perspective.notify(
        "EMERGENCY STOP ACTIVATED!",
        "danger",
        duration=10000
    )

    # Alarm sound
    system.sound.playWavFile("emergency_stop.wav")

def acknowledgeAlarms(self, event):
    """
    Acknowledge All Alarms Button Handler
    """
    # Clear alarm flags
    tag.writeBlocking([f"[{PLC_DEVICE}]Alarm_Acknowledge"], [True])

    # Clear alarm table
    self.getSibling("AlarmTable").data = []

    # Log acknowledgement
    logEvent("Alarms acknowledged by " + system.security.getUsername())

# ========================================
# Alarm Management
# ========================================

def updateAlarmTable(self):
    """
    Update alarm table with active alarms
    """
    # Query alarm database
    query = """
        SELECT
            AlarmTime,
            AlarmMessage,
            AlarmSeverity,
            AlarmSource
        FROM AlarmHistory
        WHERE Acknowledged = 0
        ORDER BY AlarmTime DESC
        LIMIT 50
    """

    alarms = system.db.runQuery(query)
    self.getSibling("AlarmTable").data = alarms

# ========================================
# Utility Functions
# ========================================

def logEvent(message):
    """
    Log event to Ignition audit log and database
    """
    # Audit log
    system.util.getLogger("HMI").info(message)

    # Database log
    query = """
        INSERT INTO EventLog (Timestamp, Message, Username)
        VALUES (?, ?, ?)
    """
    system.db.runPrepUpdate(
        query,
        [system.date.now(), message, system.security.getUsername()]
    )

def logError(message):
    """
    Log error to Ignition error log
    """
    system.util.getLogger("HMI").error(message)

# ========================================
# Trend Chart Configuration
# ========================================

def configureTrendChart(self):
    """
    Configure historical trend chart
    """
    chart = self.getSibling("TrendChart")

    # Add tank level pen
    chart.addPen("Tank Level", f"[{PLC_DEVICE}]Tank_Level", Color.BLUE)

    # Add temperature pen
    chart.addPen("Temperature", f"[{PLC_DEVICE}]Temperature", Color.RED)

    # Set time range to last 1 hour
    chart.timeRange = 3600000  # milliseconds

# ========================================
# End of Ignition SCADA Screen Code
# ========================================`;
}

function generateCODESYSVisuCode(screenType: any, description: string, projectName: string) {
  return `(*========================================*)
(* CODESYS Visualization Screen            *)
(* Project: ${projectName}                *)
(* Screen: ${screenType?.name}            *)
(* Generated by PLCAutoPilot AI            *)
(* IEC 61131-3 Compliant                   *)
(*========================================*)

PROGRAM Visualization_Main
VAR
    (* Screen Configuration *)
    ScreenTitle: STRING := '${screenType?.name} - ${projectName}';
    RefreshCycle: TIME := T#1s;

    (* ${description || 'Add your visualization variables'} *)

    (* Process Variables *)
    TankLevel: REAL := 0.0;          (* 0-100% *)
    MotorRunning: BOOL := FALSE;
    Temperature: REAL := 0.0;        (* °C *)
    Pressure: REAL := 0.0;           (* bar *)
    FlowRate: REAL := 0.0;           (* m³/h *)

    (* Command Variables *)
    StartCommand: BOOL := FALSE;
    StopCommand: BOOL := FALSE;
    ResetCommand: BOOL := FALSE;

    (* Alarm Variables *)
    AlarmActive: BOOL := FALSE;
    HighLevelAlarm: BOOL := FALSE;
    LowLevelAlarm: BOOL := FALSE;
    HighTempAlarm: BOOL := FALSE;

    (* Status Variables *)
    SystemStatus: STRING := 'IDLE';
    LastUpdate: DT;

    (* User Interface State *)
    CurrentUser: STRING := '';
    AccessLevel: INT := 0;
END_VAR

(*========================================*)
(* Main Visualization Logic                *)
(*========================================*)

(* Initialize visualization *)
IF NOT Initialized THEN
    InitializeVisualization();
    Initialized := TRUE;
END_IF

(* Read process values from PLC *)
ReadProcessValues();

(* Update visualization elements *)
UpdateVisualization();

(* Handle alarms *)
HandleAlarms();

(* Update timestamp *)
LastUpdate := DT#NOW();

(*========================================*)
(* Function: Initialize Visualization      *)
(*========================================*)
FUNCTION InitializeVisualization : BOOL
VAR
    Result: BOOL := TRUE;
END_VAR

(* Set screen properties *)
VisuElems.SetTitle(ScreenTitle);
VisuElems.SetBackgroundColor(16#F0F0F0);

(* Configure tank gauge *)
TankGauge.Min := 0.0;
TankGauge.Max := 100.0;
TankGauge.Unit := '%';
TankGauge.LowLowLimit := 10.0;
TankGauge.HighHighLimit := 90.0;

(* Configure motor indicator *)
MotorIndicator.ColorOff := 16#808080;  (* Gray *)
MotorIndicator.ColorOn := 16#00FF00;   (* Green *)
MotorIndicator.Blinking := FALSE;

(* Configure buttons *)
StartButton.Text := 'START';
StartButton.BackColor := 16#00CC00;
StartButton.Enabled := TRUE;

StopButton.Text := 'STOP';
StopButton.BackColor := 16#CC0000;
StopButton.Enabled := TRUE;

EStopButton.Text := 'E-STOP';
EStopButton.BackColor := 16#FFFF00;
EStopButton.Enabled := TRUE;

(* Configure alarm display *)
AlarmIndicator.BlinkTime := T#500ms;

(* Load user permissions *)
CurrentUser := VisuElems.GetCurrentUser();
AccessLevel := VisuElems.GetUserAccessLevel();

InitializeVisualization := Result;
END_FUNCTION

(*========================================*)
(* Function: Read Process Values           *)
(*========================================*)
FUNCTION ReadProcessValues : BOOL
VAR_INPUT
END_VAR
VAR
    ReadSuccess: BOOL := TRUE;
END_VAR

(* Read from PLC memory or I/O *)
TankLevel := GVL.TankLevel_PV;
MotorRunning := GVL.Motor_Status;
Temperature := GVL.Temperature_PV;
Pressure := GVL.Pressure_PV;
FlowRate := GVL.FlowRate_PV;

(* Read alarm states *)
AlarmActive := GVL.Alarm_Active;
HighLevelAlarm := GVL.HighLevel_Alarm;
LowLevelAlarm := GVL.LowLevel_Alarm;
HighTempAlarm := GVL.HighTemp_Alarm;

(* Determine system status *)
IF MotorRunning THEN
    SystemStatus := 'RUNNING';
ELSIF AlarmActive THEN
    SystemStatus := 'ALARM';
ELSE
    SystemStatus := 'IDLE';
END_IF

ReadProcessValues := ReadSuccess;
END_FUNCTION

(*========================================*)
(* Function: Update Visualization          *)
(*========================================*)
FUNCTION UpdateVisualization : BOOL
VAR
END_VAR

(* Update tank level gauge *)
TankGauge.Value := TankLevel;
TankLevelText.Text := REAL_TO_STRING(TankLevel);

(* Update motor status *)
MotorIndicator.Active := MotorRunning;
IF MotorRunning THEN
    MotorStatusText.Text := 'RUNNING';
    MotorStatusText.TextColor := 16#00FF00;
ELSE
    MotorStatusText.Text := 'STOPPED';
    MotorStatusText.TextColor := 16#808080;
END_IF

(* Update temperature display *)
TempDisplay.Value := Temperature;
TempText.Text := CONCAT(REAL_TO_STRING(Temperature), ' °C');

(* Update pressure display *)
PressureDisplay.Value := Pressure;
PressureText.Text := CONCAT(REAL_TO_STRING(Pressure), ' bar');

(* Update flow rate *)
FlowDisplay.Value := FlowRate;
FlowText.Text := CONCAT(REAL_TO_STRING(FlowRate), ' m³/h');

(* Update system status *)
StatusText.Text := SystemStatus;
CASE SystemStatus OF
    'RUNNING':
        StatusText.BackColor := 16#00FF00;
    'ALARM':
        StatusText.BackColor := 16#FF0000;
    'IDLE':
        StatusText.BackColor := 16#FFFF00;
END_CASE

UpdateVisualization := TRUE;
END_FUNCTION

(*========================================*)
(* Function: Handle Alarms                 *)
(*========================================*)
FUNCTION HandleAlarms : BOOL
VAR
    AlarmMessage: STRING;
END_VAR

IF AlarmActive THEN
    (* Flash alarm indicator *)
    AlarmIndicator.Blinking := TRUE;
    AlarmIndicator.BackColor := 16#FF0000;

    (* Build alarm message *)
    AlarmMessage := 'ACTIVE ALARMS: ';

    IF HighLevelAlarm THEN
        AlarmMessage := CONCAT(AlarmMessage, 'HIGH LEVEL | ');
    END_IF

    IF LowLevelAlarm THEN
        AlarmMessage := CONCAT(AlarmMessage, 'LOW LEVEL | ');
    END_IF

    IF HighTempAlarm THEN
        AlarmMessage := CONCAT(AlarmMessage, 'HIGH TEMP | ');
    END_IF

    AlarmText.Text := AlarmMessage;
    AlarmText.Visible := TRUE;

    (* Play alarm sound *)
    VisuElems.PlaySound('alarm.wav');
ELSE
    AlarmIndicator.Blinking := FALSE;
    AlarmIndicator.BackColor := 16#00FF00;
    AlarmText.Visible := FALSE;
END_IF

HandleAlarms := TRUE;
END_FUNCTION

(*========================================*)
(* Button Event Handlers                   *)
(*========================================*)

(* Start Button Click *)
ACTION StartButton_OnClick:
    IF AccessLevel >= 2 THEN (* Operator level or higher *)
        IF VisuElems.MessageBox('Start motor operation?', 'Confirm', MB_YESNO) = IDYES THEN
            GVL.Start_Command := TRUE;
            LogEvent('Motor started by ' + CurrentUser);
        END_IF
    ELSE
        VisuElems.MessageBox('Insufficient access rights', 'Access Denied', MB_OK);
    END_IF
END_ACTION

(* Stop Button Click *)
ACTION StopButton_OnClick:
    IF AccessLevel >= 2 THEN
        IF VisuElems.MessageBox('Stop motor operation?', 'Confirm', MB_YESNO) = IDYES THEN
            GVL.Stop_Command := TRUE;
            LogEvent('Motor stopped by ' + CurrentUser);
        END_IF
    ELSE
        VisuElems.MessageBox('Insufficient access rights', 'Access Denied', MB_OK);
    END_IF
END_ACTION

(* Emergency Stop Button Click *)
ACTION EStopButton_OnClick:
    (* No access check for E-Stop *)
    GVL.Emergency_Stop := TRUE;
    VisuElems.MessageBox('EMERGENCY STOP ACTIVATED!', 'CRITICAL', MB_OK);
    LogEvent('EMERGENCY STOP by ' + CurrentUser);
END_ACTION

(* Reset Button Click *)
ACTION ResetButton_OnClick:
    IF AccessLevel >= 3 THEN (* Supervisor level *)
        IF VisuElems.MessageBox('Reset all alarms?', 'Confirm', MB_YESNO) = IDYES THEN
            GVL.Alarm_Acknowledge := TRUE;
            LogEvent('Alarms reset by ' + CurrentUser);
        END_IF
    ELSE
        VisuElems.MessageBox('Insufficient access rights', 'Access Denied', MB_OK);
    END_IF
END_ACTION

(*========================================*)
(* Utility Functions                       *)
(*========================================*)

(* Log Event to Data Logger *)
FUNCTION LogEvent : BOOL
VAR_INPUT
    Message: STRING;
END_VAR
VAR
    LogEntry: LogEntry_t;
END_VAR

LogEntry.Timestamp := DT#NOW();
LogEntry.Message := Message;
LogEntry.Username := CurrentUser;
LogEntry.Severity := 'INFO';

DataLogger.Write(LogEntry);

LogEvent := TRUE;
END_FUNCTION

(*========================================*)
(* End of CODESYS Visualization Code      *)
(*========================================*)
END_PROGRAM`;
}

function generateGenericHMICode(screenType: any, description: string, projectName: string) {
  return `/*========================================
 * Generic HMI Screen Template
 * Project: ${projectName}
 * Screen: ${screenType?.name}
 * Generated by PLCAutoPilot AI
 * Platform-Independent Design
 *========================================*/

// Configuration
const CONFIG = {
    projectName: "${projectName}",
    screenName: "${screenType?.name}",
    refreshRate: 1000, // ms
    plcIP: "192.168.1.100",
    plcPort: 502
};

// ${description || 'Add your screen configuration'}

// Global Variables
let plcConnection = null;
let tankLevel = 0;
let motorRunning = false;
let temperature = 0;
let alarmActive = false;

// Initialize HMI Screen
function initializeScreen() {
    console.log("Initializing HMI Screen: " + CONFIG.screenName);

    // Connect to PLC
    connectToPLC();

    // Setup UI components
    setupComponents();

    // Start data polling
    setInterval(updateScreen, CONFIG.refreshRate);

    // Log screen access
    logEvent("Screen opened");
}

// Connect to PLC
function connectToPLC() {
    plcConnection = new PLCConnection({
        ip: CONFIG.plcIP,
        port: CONFIG.plcPort,
        protocol: "Modbus TCP"
    });

    if (plcConnection.connect()) {
        showStatus("Connected to PLC", "success");
    } else {
        showStatus("Failed to connect to PLC", "error");
    }
}

// Setup UI Components
function setupComponents() {
    // Tank Level Gauge
    createGauge("tankGauge", {
        min: 0,
        max: 100,
        unit: "%",
        label: "Tank Level"
    });

    // Motor Status Indicator
    createIndicator("motorStatus", {
        label: "Motor Status",
        onColor: "#00FF00",
        offColor: "#808080"
    });

    // Temperature Display
    createNumericDisplay("tempDisplay", {
        label: "Temperature",
        unit: "°C",
        decimals: 1
    });

    // Control Buttons
    createButton("startBtn", "START", startMotor, "#00CC00");
    createButton("stopBtn", "STOP", stopMotor, "#CC0000");
    createButton("estopBtn", "E-STOP", emergencyStop, "#FFFF00");
}

// Update Screen Data
function updateScreen() {
    if (plcConnection && plcConnection.isConnected()) {
        // Read values from PLC
        tankLevel = plcConnection.read("Tank_Level");
        motorRunning = plcConnection.read("Motor_Running");
        temperature = plcConnection.read("Temperature");
        alarmActive = plcConnection.read("Alarm_Active");

        // Update UI elements
        updateGauge("tankGauge", tankLevel);
        updateIndicator("motorStatus", motorRunning);
        updateNumericDisplay("tempDisplay", temperature);

        // Handle alarms
        if (alarmActive) {
            showAlarm("System alarm detected!");
        }
    }
}

// Start Motor Function
function startMotor() {
    if (confirm("Start motor operation?")) {
        plcConnection.write("Start_Command", true);
        logEvent("Motor started");
        showNotification("Motor Started", "success");
    }
}

// Stop Motor Function
function stopMotor() {
    if (confirm("Stop motor operation?")) {
        plcConnection.write("Stop_Command", true);
        logEvent("Motor stopped");
        showNotification("Motor Stopped", "warning");
    }
}

// Emergency Stop Function
function emergencyStop() {
    plcConnection.write("Emergency_Stop", true);
    logEvent("EMERGENCY STOP activated");
    showNotification("EMERGENCY STOP ACTIVATED!", "danger");
}

// Utility Functions
function logEvent(message) {
    const timestamp = new Date().toISOString();
    console.log(\`[\${timestamp}] \${message}\`);
}

function showNotification(message, type) {
    // Platform-specific notification implementation
    alert(message);
}

function showAlarm(message) {
    // Platform-specific alarm display
    console.error("ALARM: " + message);
}

function showStatus(message, type) {
    console.log(\`STATUS [\${type}]: \${message}\`);
}

// Initialize on load
window.onload = initializeScreen;

/*========================================
 * End of Generic HMI Screen Code
 *========================================*/`;
}
