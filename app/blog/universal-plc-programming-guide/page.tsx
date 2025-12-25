import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Icon from '../../components/Icon';

export const metadata = {
  title: "Modicon Programming Guide: M221 to M580 Complete Tutorial | PLCAutoPilot",
  description: "Complete guide to programming Schneider Electric Modicon PLCs. Compare all models from M221 to M580, learn best practices, and master Machine Expert and Control Expert software.",
  keywords: ["Modicon programming", "M221 programming", "M241 programming", "M258 programming", "M340 programming", "M580 programming", "Machine Expert", "Control Expert", "Schneider Electric PLC"],
};

export default function ModiconProgrammingGuide() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">
        <article className="max-w-4xl mx-auto px-6 py-12">
          {/* Article Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                Hardware
              </span>
              <span className="text-sm text-gray-500">January 5, 2025</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">28 min read</span>
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
              Modicon Programming Guide: M221 to M580 Complete Tutorial
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Complete guide to programming Schneider Electric Modicon PLCs. Compare all models from M221 to M580, learn platform-specific features, master Machine Expert and Control Expert software, and implement professional programming practices.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-blue-50 rounded-2xl p-8 mb-12 border-2 border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="list" className="text-3xl text-blue-600" />
              Table of Contents
            </h2>
            <ul className="space-y-2 ml-6">
              <li><a href="#modicon-overview" className="text-blue-600 hover:text-blue-800 font-medium">1. Modicon Platform Overview</a></li>
              <li><a href="#choosing-plc" className="text-blue-600 hover:text-blue-800 font-medium">2. Choosing the Right Modicon PLC</a></li>
              <li><a href="#software-tools" className="text-blue-600 hover:text-blue-800 font-medium">3. Programming Software Tools</a></li>
              <li><a href="#m221-guide" className="text-blue-600 hover:text-blue-800 font-medium">4. M221 Logic Controller Programming</a></li>
              <li><a href="#m241-m251-guide" className="text-blue-600 hover:text-blue-800 font-medium">5. M241 and M251 Programming</a></li>
              <li><a href="#m258-guide" className="text-blue-600 hover:text-blue-800 font-medium">6. M258 Advanced Features</a></li>
              <li><a href="#m340-guide" className="text-blue-600 hover:text-blue-800 font-medium">7. M340 Industrial Controller</a></li>
              <li><a href="#m580-guide" className="text-blue-600 hover:text-blue-800 font-medium">8. M580 High-End Programming</a></li>
              <li><a href="#networking" className="text-blue-600 hover:text-blue-800 font-medium">9. Industrial Networking and Communication</a></li>
              <li><a href="#best-practices" className="text-blue-600 hover:text-blue-800 font-medium">10. Modicon Programming Best Practices</a></li>
            </ul>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <section id="modicon-overview" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="memory" className="text-4xl text-blue-600" />
                Modicon Platform Overview
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Schneider Electric Modicon programmable logic controllers represent over 50 years of industrial automation innovation. From the original Modicon 084 (the world first PLC) to today advanced M580 ePAC platform, Modicon PLCs power critical automation systems worldwide across every industry sector.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The current Modicon portfolio offers scalable solutions from compact M221 controllers for basic machine control to powerful M580 safety PLCs for complex process automation. All platforms share common programming languages per IEC 61131-3, but each offers unique capabilities optimized for specific application requirements.
              </p>
              <div className="bg-gray-50 rounded-xl p-6 my-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Modicon Platform Strengths:</h3>
                <ul className="space-y-2 ml-6">
                  <li className="text-gray-700"><strong>Unified Programming:</strong> EcoStruxure Machine Expert and Control Expert provide consistent development environment</li>
                  <li className="text-gray-700"><strong>Scalability:</strong> Seamless migration path from M221 to M580 as requirements grow</li>
                  <li className="text-gray-700"><strong>Industrial Networking:</strong> Native support for Modbus, CANopen, Ethernet/IP, and OPC UA</li>
                  <li className="text-gray-700"><strong>Safety Integration:</strong> Built-in safety functions up to SIL 3 / PLe on M580 and M262</li>
                  <li className="text-gray-700"><strong>Cybersecurity:</strong> Integrated security features including user authentication and encrypted communication</li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section id="choosing-plc" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="compare_arrows" className="text-4xl text-blue-600" />
                Choosing the Right Modicon PLC
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Selecting the appropriate Modicon controller depends on your application requirements, I/O count, performance needs, and communication protocols. Here is a comprehensive comparison to guide your selection.
              </p>

              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-2 border-gray-300 rounded-lg text-sm">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Model</th>
                      <th className="px-4 py-3 text-left font-semibold">Application</th>
                      <th className="px-4 py-3 text-left font-semibold">Max I/O</th>
                      <th className="px-4 py-3 text-left font-semibold">Memory</th>
                      <th className="px-4 py-3 text-left font-semibold">Communications</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold text-gray-900">M221</td>
                      <td className="px-4 py-3 text-gray-700">Simple machines, OEM equipment</td>
                      <td className="px-4 py-3 text-gray-700">260</td>
                      <td className="px-4 py-3 text-gray-700">100KB</td>
                      <td className="px-4 py-3 text-gray-700">Ethernet, Serial, CANopen</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">M241</td>
                      <td className="px-4 py-3 text-gray-700">Medium machines, packaging</td>
                      <td className="px-4 py-3 text-gray-700">264</td>
                      <td className="px-4 py-3 text-gray-700">256KB</td>
                      <td className="px-4 py-3 text-gray-700">Ethernet, Modbus, CANopen</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold text-gray-900">M251</td>
                      <td className="px-4 py-3 text-gray-700">Advanced machines, motion</td>
                      <td className="px-4 py-3 text-gray-700">584</td>
                      <td className="px-4 py-3 text-gray-700">1MB</td>
                      <td className="px-4 py-3 text-gray-700">Dual Ethernet, Modbus, CANopen</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">M258</td>
                      <td className="px-4 py-3 text-gray-700">Complex machines, robotics</td>
                      <td className="px-4 py-3 text-gray-700">1042</td>
                      <td className="px-4 py-3 text-gray-700">2MB</td>
                      <td className="px-4 py-3 text-gray-700">Dual Ethernet, EtherCAT, Modbus</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold text-gray-900">M340</td>
                      <td className="px-4 py-3 text-gray-700">Process control, infrastructure</td>
                      <td className="px-4 py-3 text-gray-700">1024+</td>
                      <td className="px-4 py-3 text-gray-700">4-16MB</td>
                      <td className="px-4 py-3 text-gray-700">Ethernet, Modbus, DLR</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">M580</td>
                      <td className="px-4 py-3 text-gray-700">High-end process, safety critical</td>
                      <td className="px-4 py-3 text-gray-700">3072+</td>
                      <td className="px-4 py-3 text-gray-700">64MB</td>
                      <td className="px-4 py-3 text-gray-700">Dual Ethernet, Modbus, OPC UA, DLR</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                  <Icon name="factory" className="text-3xl text-green-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Choose M221/M241 When:</h3>
                  <ul className="space-y-1 ml-6 text-gray-700 text-sm">
                    <li>Simple to medium machine control</li>
                    <li>Budget-conscious OEM applications</li>
                    <li>Standalone operation or simple networking</li>
                    <li>Less than 300 I/O points total</li>
                    <li>Standard ladder logic programming</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                  <Icon name="precision_manufacturing" className="text-3xl text-green-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Choose M251/M258 When:</h3>
                  <ul className="space-y-1 ml-6 text-gray-700 text-sm">
                    <li>Advanced machine control with motion</li>
                    <li>Multi-axis coordinated motion required</li>
                    <li>Real-time Ethernet fieldbus needed</li>
                    <li>300-1000 I/O points</li>
                    <li>Complex program logic and data handling</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <Icon name="account_tree" className="text-3xl text-blue-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Choose M340 When:</h3>
                  <ul className="space-y-1 ml-6 text-gray-700 text-sm">
                    <li>Process automation and control</li>
                    <li>Infrastructure applications</li>
                    <li>Legacy Unity Pro migration</li>
                    <li>1000+ I/O with distributed architecture</li>
                    <li>Redundant configurations needed</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <Icon name="security" className="text-3xl text-blue-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Choose M580 When:</h3>
                  <ul className="space-y-1 ml-6 text-gray-700 text-sm">
                    <li>Safety-critical applications (SIL 3)</li>
                    <li>Hot-standby redundancy required</li>
                    <li>Cybersecurity is paramount</li>
                    <li>Large-scale process control</li>
                    <li>Maximum performance and reliability</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="software-tools" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="computer" className="text-4xl text-blue-600" />
                Programming Software Tools
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Schneider Electric provides two primary development environments for Modicon PLCs, both built on the CODESYS platform with Schneider-specific enhancements.
              </p>

              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">EcoStruxure Machine Expert (Formerly SoMachine)</h3>
                  <p className="text-gray-700 mb-4">
                    Modern, unified software platform for M221, M241, M251, and M258 controllers. Features intuitive interface, integrated HMI design, and streamlined development workflow.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-300">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Icon name="check_circle" className="text-green-600" />
                        Key Features
                      </h4>
                      <ul className="space-y-1 ml-6 text-sm text-gray-700">
                        <li>All 5 IEC 61131-3 languages supported</li>
                        <li>Integrated motion control configuration</li>
                        <li>Built-in HMI screen editor (Vijeo Designer)</li>
                        <li>Powerful simulation environment</li>
                        <li>Direct tag access from HMI</li>
                        <li>Online code changes while running</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-300">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Icon name="tips_and_updates" className="text-yellow-600" />
                        Best Practices
                      </h4>
                      <ul className="space-y-1 ml-6 text-sm text-gray-700">
                        <li>Use structured project organization</li>
                        <li>Leverage function blocks for reusable code</li>
                        <li>Configure device tree before programming</li>
                        <li>Utilize simulation for offline testing</li>
                        <li>Version control with embedded Git support</li>
                        <li>Create application libraries</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">EcoStruxure Control Expert (Formerly Unity Pro)</h3>
                  <p className="text-gray-700 mb-4">
                    Proven platform for M340 and M580 controllers. Optimized for process automation with extensive library of pre-built functions and diagnostics.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-300">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Icon name="check_circle" className="text-green-600" />
                        Key Features
                      </h4>
                      <ul className="space-y-1 ml-6 text-sm text-gray-700">
                        <li>Ladder, FBD, ST, IL programming</li>
                        <li>Extensive DFB library (derived function blocks)</li>
                        <li>Hot standby redundancy configuration</li>
                        <li>Advanced diagnostics and monitoring</li>
                        <li>Distributed I/O configuration</li>
                        <li>Safety logic programming (M580)</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-300">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Icon name="tips_and_updates" className="text-yellow-600" />
                        Best Practices
                      </h4>
                      <ul className="space-y-1 ml-6 text-sm text-gray-700">
                        <li>Organize code in sections and subroutines</li>
                        <li>Use DFBs for complex, reusable logic</li>
                        <li>Configure I/O scanning for optimal performance</li>
                        <li>Implement structured exception handling</li>
                        <li>Leverage data typing for safety</li>
                        <li>Document with structured comments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="m221-guide" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="developer_board" className="text-4xl text-blue-600" />
                M221 Logic Controller Programming
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The M221 represents the entry point to Modicon programming, ideal for OEM machines and simple automation tasks. Despite its compact size, the M221 offers robust features and easy programming.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 my-6 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">M221 Specifications and Capabilities</h3>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-3 text-center border border-gray-300">
                    <Icon name="memory" className="text-2xl text-blue-600 mb-1" />
                    <p className="text-sm font-semibold text-gray-900">Program Memory</p>
                    <p className="text-lg font-bold text-blue-600">100 KB</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center border border-gray-300">
                    <Icon name="speed" className="text-2xl text-blue-600 mb-1" />
                    <p className="text-sm font-semibold text-gray-900">Scan Time</p>
                    <p className="text-lg font-bold text-blue-600">0.15 ms/K</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center border border-gray-300">
                    <Icon name="settings_input_component" className="text-2xl text-blue-600 mb-1" />
                    <p className="text-sm font-semibold text-gray-900">Max I/O</p>
                    <p className="text-lg font-bold text-blue-600">260 Points</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-6">
                  <li className="text-gray-700"><strong>I/O Options:</strong> 16 to 40 embedded I/O, expandable with cartridges</li>
                  <li className="text-gray-700"><strong>Communications:</strong> Ethernet, Serial (RS232/RS485), CANopen, TMC2</li>
                  <li className="text-gray-700"><strong>Special Functions:</strong> High-speed counting (100kHz), PWM output, PID control</li>
                  <li className="text-gray-700"><strong>HMI Support:</strong> Direct connection to Vijeo Designer panels</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 my-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">M221 Programming Example: Simple Conveyor Control</h3>
                <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300">
                  <pre className="text-gray-800">
{`(* M221 Conveyor Control Program *)
(* Hardware: M221-16IO with Ethernet *)

(* Variable Declarations *)
VAR
  StartButton : BOOL AT %I0.0;
  StopButton  : BOOL AT %I0.1;
  EStop       : BOOL AT %I0.2;
  PhotoEye    : BOOL AT %I0.3;

  ConveyorRun : BOOL AT %Q0.0;
  ProductCount: CTU;
  RunTimer    : TON;
END_VAR

(* Main Program *)
|--[ StartButton ]--+--[/StopButton]--[/EStop]--( ConveyorRun )--|
                    |
                    +----[ ConveyorRun ]-------+

(* Product Counter *)
|--[ PhotoEye ]--[R_TRIG]--[CTU ProductCount]--|
                            Preset: 100

(* Batch Complete *)
|--[ ProductCount.Q ]--(/ConveyorRun)--|

(* Runtime Hours *)
|--[ ConveyorRun ]--[TON RunTimer T#3600s]--[CTU RunHours]--|`}
                  </pre>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 my-6 border-l-4 border-yellow-500">
                <h4 className="text-xl font-bold text-gray-900 mb-3">M221 Tips and Limitations</h4>
                <ul className="space-y-2 ml-6">
                  <li className="text-gray-700"><strong>Tip:</strong> Use embedded web server for remote diagnostics and monitoring</li>
                  <li className="text-gray-700"><strong>Tip:</strong> Leverage high-speed counters for encoder inputs</li>
                  <li className="text-gray-700"><strong>Limitation:</strong> No hot-swap I/O modules</li>
                  <li className="text-gray-700"><strong>Limitation:</strong> Single program task only</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section id="m241-m251-guide" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="settings" className="text-4xl text-blue-600" />
                M241 and M251 Programming
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The M241 and M251 controllers target medium to advanced machine automation with enhanced processing power, expanded memory, and advanced motion control capabilities.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border-2 border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">M241 Features</h3>
                  <ul className="space-y-2 ml-6 text-gray-700">
                    <li><Icon name="check" className="text-green-600 mr-1" />264 I/O points maximum</li>
                    <li><Icon name="check" className="text-green-600 mr-1" />256KB program memory</li>
                    <li><Icon name="check" className="text-green-600 mr-1" />2 communication ports (Ethernet + Serial or CANopen)</li>
                    <li><Icon name="check" className="text-green-600 mr-1" />8 axes motion control (pulse train or CANopen)</li>
                    <li><Icon name="check" className="text-green-600 mr-1" />Removable SD card for data logging</li>
                    <li><Icon name="check" className="text-green-600 mr-1" />Built-in web server with dashboards</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border-2 border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">M251 Enhanced Features</h3>
                  <ul className="space-y-2 ml-6 text-gray-700">
                    <li><Icon name="check" className="text-green-600 mr-1" />584 I/O points maximum</li>
                    <li><Icon name="check" className="text-green-600 mr-1" />1MB program memory</li>
                    <li><Icon name="check" className="text-green-600 mr-1" />Dual Ethernet ports</li>
                    <li><Icon name="check" className="text-green-600 mr-1" />16 axes motion control</li>
                    <li><Icon name="check" className="text-green-600 mr-1" />Advanced motion functions (electronic cam, gearing)</li>
                    <li><Icon name="check" className="text-green-600 mr-1" />Faster scan time (0.08 ms/K instruction)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 my-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">M241/M251 Motion Control Example</h3>
                <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300">
                  <pre className="text-gray-800">
{`(* Two-Axis Pick and Place Motion *)
PROGRAM PickAndPlace
VAR
  Axis_X : AXIS_REF;  (* Horizontal axis *)
  Axis_Z : AXIS_REF;  (* Vertical axis *)

  MC_Power_X   : MC_Power;
  MC_MoveAbs_X : MC_MoveAbsolute;
  MC_MoveAbs_Z : MC_MoveAbsolute;

  PickPosition : LREAL := 150.0;  (* mm *)
  PlacePosition: LREAL := 350.0;  (* mm *)
  PickHeight   : LREAL := 50.0;   (* mm *)
  MoveSpeed    : LREAL := 200.0;  (* mm/s *)
END_VAR

(* Enable axes *)
MC_Power_X(Axis := Axis_X, Enable := TRUE);

(* Move to pick position *)
IF StartCycle THEN
  MC_MoveAbs_X(
    Axis := Axis_X,
    Execute := TRUE,
    Position := PickPosition,
    Velocity := MoveSpeed
  );
END_IF;

(* Lower to pick *)
IF MC_MoveAbs_X.Done THEN
  MC_MoveAbs_Z(
    Axis := Axis_Z,
    Execute := TRUE,
    Position := PickHeight,
    Velocity := 50.0
  );
END_IF;`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Section 6 - M258 */}
            <section id="m258-guide" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="rocket_launch" className="text-4xl text-blue-600" />
                M258 Advanced Features
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The M258 represents the pinnacle of machine control, featuring EtherCAT real-time networking, advanced motion capabilities, and support for the most demanding applications.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 my-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">M258 Key Specifications</h3>
                <div className="grid md:grid-cols-4 gap-3 mb-4">
                  <div className="bg-white rounded-lg p-3 text-center border border-gray-300">
                    <p className="text-sm font-semibold text-gray-900 mb-1">I/O Capacity</p>
                    <p className="text-2xl font-bold text-blue-600">1042</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center border border-gray-300">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Memory</p>
                    <p className="text-2xl font-bold text-blue-600">2 MB</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center border border-gray-300">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Motion Axes</p>
                    <p className="text-2xl font-bold text-blue-600">32</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center border border-gray-300">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Scan Time</p>
                    <p className="text-2xl font-bold text-blue-600">0.04ms/K</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-6">
                  <li className="text-gray-700"><strong>EtherCAT Master:</strong> 100+ slaves, microsecond cycle times</li>
                  <li className="text-gray-700"><strong>Dual Ethernet:</strong> Separate machine and plant networks</li>
                  <li className="text-gray-700"><strong>CNC Functions:</strong> Interpolation, path planning, velocity profiling</li>
                  <li className="text-gray-700"><strong>Safety:</strong> Integration with safety drives and I/O via EtherCAT</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-6 my-6 border-l-4 border-green-500">
                <h4 className="text-xl font-bold text-gray-900 mb-3">M258 Ideal Applications</h4>
                <ul className="space-y-2 ml-6">
                  <li className="text-gray-700">High-speed packaging machines with servo coordination</li>
                  <li className="text-gray-700">Robotic work cells with multiple coordinated axes</li>
                  <li className="text-gray-700">CNC machines and material processing equipment</li>
                  <li className="text-gray-700">Electronic assembly and test systems</li>
                  <li className="text-gray-700">Applications requiring deterministic real-time control</li>
                </ul>
              </div>
            </section>

            {/* Section 7 - M340 */}
            <section id="m340-guide" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="account_tree" className="text-4xl text-blue-600" />
                M340 Industrial Controller
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The M340 platform serves process automation and infrastructure applications with distributed architecture, redundancy options, and extensive I/O capabilities.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 my-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">M340 Architecture Benefits</h3>
                <ul className="space-y-2 ml-6">
                  <li className="text-gray-700"><strong>Modular Design:</strong> Mix analog, digital, specialty I/O modules as needed</li>
                  <li className="text-gray-700"><strong>Hot Swap:</strong> Replace I/O modules without stopping the system</li>
                  <li className="text-gray-700"><strong>Distributed I/O:</strong> Place I/O close to field devices using remote drops</li>
                  <li className="text-gray-700"><strong>Redundancy:</strong> Hot-standby CPU for critical processes</li>
                  <li className="text-gray-700"><strong>Power Options:</strong> 24VDC or 120/230VAC power supplies</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 my-6 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">M340 Typical Process Control Structure</h3>
                <div className="bg-white rounded-lg p-4 font-mono text-xs border border-gray-300">
                  <pre className="text-gray-800">
{`(* Water Treatment PID Control - M340 *)
PROGRAM WaterTreatment
VAR
  pHSensor      : REAL;  (* 0-14 pH *)
  pHSetpoint    : REAL := 7.2;
  ChemPumpSpeed : REAL;  (* 0-100% *)

  PID_pH : PID;
END_VAR

(* Read analog input - 4-20mA scaled to 0-14 pH *)
pHSensor := SCALE_4_20mA(%IW0, 0.0, 14.0);

(* PID Control *)
PID_pH(
  PV := pHSensor,
  SP := pHSetpoint,
  Kp := 2.0,
  Ti := 60.0,  (* seconds *)
  Td := 10.0,  (* seconds *)
  OUT => ChemPumpSpeed
);

(* Limit output to safe range *)
ChemPumpSpeed := LIMIT(0.0, ChemPumpSpeed, 100.0);

(* Write to analog output *)
%QW0 := SCALE_TO_4_20mA(ChemPumpSpeed, 0.0, 100.0);`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Section 8 - M580 */}
            <section id="m580-guide" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="security" className="text-4xl text-blue-600" />
                M580 High-End Programming
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The M580 ePAC (Ethernet Programmable Automation Controller) represents Schneider top-tier platform for safety-critical, high-availability process control with advanced cybersecurity features.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 my-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">M580 Advanced Capabilities</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Safety Integration (SIL 3 / PLe)</h4>
                    <ul className="space-y-1 ml-6 text-sm text-gray-700">
                      <li>Safety logic on same controller as standard logic</li>
                      <li>Safe torque-off (STO) integration</li>
                      <li>Safety I/O and drive integration</li>
                      <li>Certified safety function blocks</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Cybersecurity Features</h4>
                    <ul className="space-y-1 ml-6 text-sm text-gray-700">
                      <li>Role-based access control</li>
                      <li>SSL/TLS encrypted communication</li>
                      <li>Audit trail logging</li>
                      <li>Network intrusion prevention</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Performance</h4>
                    <ul className="space-y-1 ml-6 text-sm text-gray-700">
                      <li>64MB program memory</li>
                      <li>3072+ I/O points</li>
                      <li>1ms scan time capability</li>
                      <li>Hot-standby bumpless transfer</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Communications</h4>
                    <ul className="space-y-1 ml-6 text-sm text-gray-700">
                      <li>Dual Ethernet with DLR ring</li>
                      <li>Native OPC UA server</li>
                      <li>Modbus TCP/IP master/slave</li>
                      <li>HART integration</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 my-6 border-l-4 border-yellow-500">
                <h4 className="text-xl font-bold text-gray-900 mb-3">M580 Safety Programming Considerations</h4>
                <ul className="space-y-2 ml-6">
                  <li className="text-gray-700">Safety and standard logic share hardware but execute in separate partitions</li>
                  <li className="text-gray-700">Safety code certified to IEC 61508 and must pass validation</li>
                  <li className="text-gray-700">Use pre-certified safety function blocks from library</li>
                  <li className="text-gray-700">Safety I/O requires specific certified modules</li>
                  <li className="text-gray-700">Regular safety system proof testing required per SIL level</li>
                </ul>
              </div>
            </section>

            {/* Section 9 - Networking */}
            <section id="networking" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="lan" className="text-4xl text-blue-600" />
                Industrial Networking and Communication
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Modern Modicon PLCs support multiple industrial protocols for device integration, SCADA connectivity, and distributed control.
              </p>

              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-2 border-gray-300 rounded-lg text-sm">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Protocol</th>
                      <th className="px-4 py-3 text-left font-semibold">Use Case</th>
                      <th className="px-4 py-3 text-left font-semibold">Supported Models</th>
                      <th className="px-4 py-3 text-left font-semibold">Key Benefits</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold">Modbus TCP/IP</td>
                      <td className="px-4 py-3">SCADA, HMI, device communication</td>
                      <td className="px-4 py-3">All models</td>
                      <td className="px-4 py-3">Universal, simple, widely supported</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-4 py-3 font-semibold">EtherCAT</td>
                      <td className="px-4 py-3">Motion control, fast I/O</td>
                      <td className="px-4 py-3">M258</td>
                      <td className="px-4 py-3">Microsecond cycle, deterministic</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold">CANopen</td>
                      <td className="px-4 py-3">Distributed I/O, drives</td>
                      <td className="px-4 py-3">M221, M241, M251, M258</td>
                      <td className="px-4 py-3">Cost-effective, robust</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-4 py-3 font-semibold">OPC UA</td>
                      <td className="px-4 py-3">Enterprise integration, Industry 4.0</td>
                      <td className="px-4 py-3">M580</td>
                      <td className="px-4 py-3">Secure, platform-independent</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold">Ethernet/IP</td>
                      <td className="px-4 py-3">Multi-vendor device integration</td>
                      <td className="px-4 py-3">M241, M251, M258, M340, M580</td>
                      <td className="px-4 py-3">CIP protocol, widespread adoption</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 10 - Best Practices */}
            <section id="best-practices" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="verified" className="text-4xl text-blue-600" />
                Modicon Programming Best Practices
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Follow these proven guidelines to create maintainable, efficient, and reliable Modicon PLC programs.
              </p>

              <div className="space-y-6">
                <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">1. Project Organization</h3>
                  <ul className="space-y-2 ml-6">
                    <li className="text-gray-700">Use POUs (Program Organization Units) to structure code logically</li>
                    <li className="text-gray-700">Create separate programs for machine states, safety, communications</li>
                    <li className="text-gray-700">Build function block libraries for reusable components</li>
                    <li className="text-gray-700">Implement consistent naming conventions across projects</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">2. Performance Optimization</h3>
                  <ul className="space-y-2 ml-6">
                    <li className="text-gray-700">Optimize I/O scanning - only scan modules when data changes</li>
                    <li className="text-gray-700">Use appropriate task priorities for time-critical operations</li>
                    <li className="text-gray-700">Implement conditional execution for complex calculations</li>
                    <li className="text-gray-700">Monitor scan time and optimize bottlenecks</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">3. Documentation Standards</h3>
                  <ul className="space-y-2 ml-6">
                    <li className="text-gray-700">Document all function blocks with description and parameter explanations</li>
                    <li className="text-gray-700">Include version history and change logs in project properties</li>
                    <li className="text-gray-700">Create I/O assignment documents with physical locations</li>
                    <li className="text-gray-700">Maintain network topology diagrams with IP addressing</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <div className="bg-gray-50 rounded-2xl p-8 my-12 border-2 border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Schneider Electric Modicon platform offers unparalleled scalability from simple machine control with the M221 to safety-critical process automation with the M580. By understanding each platform strengths and selecting the appropriate controller for your application requirements, you can build robust automation systems that deliver reliable performance for decades.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Mastering Modicon programming requires understanding both the hardware capabilities and software tools. Whether you are using Machine Expert for modern machine control or Control Expert for process automation, following best practices ensures your programs are maintainable, efficient, and safe.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Tools like PLCAutoPilot can dramatically accelerate Modicon development by automatically generating optimized ladder logic, configuring I/O, and creating HMI screens tailored to your specific Modicon model and application requirements.
              </p>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-8 text-white my-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="smart_toy" className="text-3xl" />
                Automate Your Modicon Programming
              </h3>
              <p className="text-lg mb-6 opacity-90">
                PLCAutoPilot generates production-ready code for all Modicon platforms - M221, M241, M251, M258, M340, and M580. Simply describe your requirements and get optimized ladder logic in minutes.
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Try PLCAutoPilot Free
              </Link>
            </div>

            {/* Related Articles */}
            <div className="mt-12 pt-8 border-t-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/blog/plc-programming-tutorial" className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all group">
                  <Icon name="school" className="text-3xl text-blue-600 mb-3" />
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600">Complete PLC Programming Tutorial</h4>
                  <p className="text-gray-600 text-sm">Master PLC programming fundamentals with comprehensive examples.</p>
                </Link>
                <Link href="/blog/ladder-logic-complete-guide" className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all group">
                  <Icon name="code" className="text-3xl text-blue-600 mb-3" />
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600">Ladder Logic Complete Guide</h4>
                  <p className="text-gray-600 text-sm">Deep dive into ladder logic programming techniques.</p>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
