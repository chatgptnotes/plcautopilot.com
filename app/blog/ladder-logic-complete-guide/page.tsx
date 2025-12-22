import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Icon from '../../components/Icon';

export const metadata = {
  title: "Ladder Logic Complete Guide: Master Industrial Programming | PLCAutoPilot",
  description: "Comprehensive guide to ladder logic programming. Learn relay logic, timers, counters, sequencing, and professional programming techniques for industrial automation.",
  keywords: ["ladder logic programming", "relay logic", "PLC timers", "PLC counters", "ladder diagram tutorial", "industrial control programming"],
};

export default function LadderLogicGuide() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">
        <article className="max-w-4xl mx-auto px-6 py-12">
          {/* Article Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                Programming
              </span>
              <span className="text-sm text-gray-500">January 10, 2025</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">22 min read</span>
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
              Ladder Logic Complete Guide: Master Industrial Programming
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Comprehensive guide to ladder logic programming. Learn relay logic foundations, timers, counters, sequencing, and professional programming techniques used in industrial automation worldwide.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-blue-50 rounded-2xl p-8 mb-12 border-2 border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="list" className="text-3xl text-blue-600" />
              Table of Contents
            </h2>
            <ul className="space-y-2 ml-6">
              <li><a href="#history" className="text-blue-600 hover:text-blue-800 font-medium">1. History of Ladder Logic</a></li>
              <li><a href="#fundamentals" className="text-blue-600 hover:text-blue-800 font-medium">2. Ladder Logic Fundamentals</a></li>
              <li><a href="#contacts-coils" className="text-blue-600 hover:text-blue-800 font-medium">3. Contacts and Coils Deep Dive</a></li>
              <li><a href="#timers" className="text-blue-600 hover:text-blue-800 font-medium">4. Timer Instructions</a></li>
              <li><a href="#counters" className="text-blue-600 hover:text-blue-800 font-medium">5. Counter Instructions</a></li>
              <li><a href="#comparison" className="text-blue-600 hover:text-blue-800 font-medium">6. Comparison and Math Operations</a></li>
              <li><a href="#advanced-patterns" className="text-blue-600 hover:text-blue-800 font-medium">7. Advanced Programming Patterns</a></li>
              <li><a href="#sequencing" className="text-blue-600 hover:text-blue-800 font-medium">8. Sequential Control Logic</a></li>
              <li><a href="#optimization" className="text-blue-600 hover:text-blue-800 font-medium">9. Code Optimization Techniques</a></li>
              <li><a href="#common-mistakes" className="text-blue-600 hover:text-blue-800 font-medium">10. Common Mistakes to Avoid</a></li>
            </ul>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <section id="history" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="history" className="text-4xl text-blue-600" />
                History of Ladder Logic
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ladder logic programming has its roots in electrical relay control systems that dominated industrial automation before the advent of programmable controllers. In the 1960s, automotive manufacturers needed a more flexible alternative to hardwired relay panels that required extensive rewiring for production changes.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                In 1968, General Motors issued a specification for a programmable controller, leading to the development of the first PLC by Modicon (Model 084). The programming language needed to be familiar to plant electricians who understood relay ladder diagrams, so ladder logic was born as a graphical representation of relay control logic.
              </p>
              <div className="bg-gray-50 rounded-xl p-6 my-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Why Ladder Logic Endures:</h3>
                <ul className="space-y-2 ml-6">
                  <li className="text-gray-700"><strong>Visual Clarity:</strong> Easy to visualize power flow through logic</li>
                  <li className="text-gray-700"><strong>Familiar to Electricians:</strong> Resembles traditional electrical schematics</li>
                  <li className="text-gray-700"><strong>Easy Troubleshooting:</strong> Problems are visually apparent during online monitoring</li>
                  <li className="text-gray-700"><strong>Industry Standard:</strong> Supported by all major PLC manufacturers worldwide</li>
                  <li className="text-gray-700"><strong>Proven Reliability:</strong> Over 50 years of successful industrial applications</li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section id="fundamentals" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="foundation" className="text-4xl text-blue-600" />
                Ladder Logic Fundamentals
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ladder logic programs consist of rungs arranged between two vertical power rails, resembling a ladder. Each rung represents a control statement, and power flows from left to right when conditions are met.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">The Anatomy of a Rung</h3>
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 my-6 border-2 border-blue-200">
                <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300">
                  <pre className="text-gray-800">
{`Left Rail    Input Logic         Output      Right Rail
   |                                          |
   |------[ ]------[ ]-------( )--------------|
   |                                          |

Components:
- Left Rail: Represents positive power supply
- Input Logic: Contacts that must be TRUE for power flow
- Output: Coil that energizes when power flows through
- Right Rail: Represents negative/ground return`}
                  </pre>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Power Flow Concept</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Understanding power flow is essential to ladder logic. Power flows from the left rail through contacts (inputs) to coils (outputs) and returns to the right rail. For an output to energize, there must be a continuous path of TRUE conditions from left to right.
              </p>
              <div className="bg-gray-50 rounded-xl p-6 my-6 border-2 border-gray-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Series vs. Parallel Logic</h4>
                <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300 mb-4">
                  <pre className="text-gray-800">
{`Series (AND Logic):
|--[ A ]--[ B ]--( Output )--|
Output is TRUE only when A AND B are both TRUE

Parallel (OR Logic):
|--[ A ]--+
          |--( Output )--|
|--[ B ]--+
Output is TRUE when A OR B is TRUE

Combined Logic:
|--[ A ]--[ B ]--+
                 |--( Output )--|
|--[ C ]--[ D ]--+
Output = (A AND B) OR (C AND D)`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="contacts-coils" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="electrical_services" className="text-4xl text-blue-600" />
                Contacts and Coils Deep Dive
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Contacts and coils are the building blocks of ladder logic. Mastering their behavior and proper usage is fundamental to creating reliable control programs.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Normally Open Contact (NO)</h3>
                  <p className="text-gray-700 mb-3"><strong>Symbol:</strong> --| |--</p>
                  <p className="text-gray-700 mb-3"><strong>Behavior:</strong> Passes power when the referenced bit is TRUE (1)</p>
                  <div className="bg-white rounded-lg p-3 font-mono text-xs border border-gray-300">
                    <pre className="text-gray-800">{`|--[ StartButton ]--( Motor )--|`}</pre>
                  </div>
                  <p className="text-gray-700 mt-3 text-sm">Use when you want something to happen when a condition becomes TRUE</p>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Normally Closed Contact (NC)</h3>
                  <p className="text-gray-700 mb-3"><strong>Symbol:</strong> --|/|--</p>
                  <p className="text-gray-700 mb-3"><strong>Behavior:</strong> Passes power when the referenced bit is FALSE (0)</p>
                  <div className="bg-white rounded-lg p-3 font-mono text-xs border border-gray-300">
                    <pre className="text-gray-800">{`|--[/EmergencyStop]--( Motor )--|`}</pre>
                  </div>
                  <p className="text-gray-700 mt-3 text-sm">Use for stop buttons, safety interlocks, and inverted logic</p>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Output Coil</h3>
                  <p className="text-gray-700 mb-3"><strong>Symbol:</strong> --( )--</p>
                  <p className="text-gray-700 mb-3"><strong>Behavior:</strong> Sets the referenced bit to TRUE when power flows through the rung</p>
                  <div className="bg-white rounded-lg p-3 font-mono text-xs border border-gray-300">
                    <pre className="text-gray-800">{`|--[ Input ]--( OutputCoil )--|`}</pre>
                  </div>
                  <p className="text-gray-700 mt-3 text-sm">Standard output for motors, valves, and other actuators</p>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Latch/Unlatch Coils</h3>
                  <p className="text-gray-700 mb-3"><strong>Symbol:</strong> --(L)-- and --(U)--</p>
                  <p className="text-gray-700 mb-3"><strong>Behavior:</strong> Latch sets and holds, Unlatch resets</p>
                  <div className="bg-white rounded-lg p-3 font-mono text-xs border border-gray-300">
                    <pre className="text-gray-800">{`|--[ Start ]--( L Motor )--|
|--[ Stop ]---( U Motor )--|`}</pre>
                  </div>
                  <p className="text-gray-700 mt-3 text-sm">Alternative to seal-in logic, retains state through power cycles</p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 my-6 border-l-4 border-yellow-500">
                <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Icon name="warning" className="text-2xl text-yellow-600" />
                  Important: One Output Per Coil Rule
                </h4>
                <p className="text-gray-700 mb-3">
                  Never use the same output coil in multiple rungs. This creates unpredictable behavior as the last rung in the scan cycle will override previous rungs.
                </p>
                <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300">
                  <pre className="text-red-600">
{`BAD - Do Not Do This:
|--[ A ]--( Motor )--|
|--[ B ]--( Motor )--|  <- Last scan wins!

GOOD - Use This Instead:
|--[ A ]--+
          |--( Motor )--|
|--[ B ]--+`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="timers" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="timer" className="text-4xl text-blue-600" />
                Timer Instructions
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Timers are essential for controlling time-dependent operations. Modern PLCs support three main timer types, each suited for specific applications.
              </p>

              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">TON - Timer On-Delay</h3>
                  <p className="text-gray-700 mb-4">
                    The most commonly used timer. Starts timing when the rung becomes TRUE and sets the done bit when the preset time elapses.
                  </p>
                  <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300 mb-4">
                    <pre className="text-gray-800">
{`|--[ StartButton ]--[TON Timer1]--|
                     Preset: T#5s
                     Elapsed: T#0s
                     Done: FALSE

|--[Timer1.Done]--( Light )--|

Operation:
- Press StartButton: Timer begins counting
- After 5 seconds: Timer1.Done goes TRUE
- Release StartButton: Timer resets immediately`}
                    </pre>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Common Applications:</h4>
                    <ul className="space-y-1 ml-6 text-gray-700">
                      <li>Delayed motor start after process begins</li>
                      <li>Alarm delay to prevent nuisance alarms</li>
                      <li>Timed process steps in sequences</li>
                      <li>Debouncing rapid input changes</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">TOF - Timer Off-Delay</h3>
                  <p className="text-gray-700 mb-4">
                    Provides a delay after the input goes FALSE. Output remains TRUE for the preset time after the trigger condition ends.
                  </p>
                  <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300 mb-4">
                    <pre className="text-gray-800">
{`|--[ Sensor ]--[TOF Timer2]--|
                Preset: T#10s

|--[Timer2.Q]--( Fan )--|

Operation:
- Sensor TRUE: Fan runs immediately
- Sensor FALSE: Fan continues for 10 more seconds
- After 10s: Fan stops`}
                    </pre>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Common Applications:</h4>
                    <ul className="space-y-1 ml-6 text-gray-700">
                      <li>Cooling fan run-on after machine stops</li>
                      <li>Conveyor overrun to clear products</li>
                      <li>Pump coast-down timing</li>
                      <li>Light delay after occupancy detection</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">TP - Pulse Timer</h3>
                  <p className="text-gray-700 mb-4">
                    Generates a fixed-duration pulse output regardless of how long the input remains TRUE. One-shot operation.
                  </p>
                  <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300 mb-4">
                    <pre className="text-gray-800">
{`|--[ TriggerButton ]--[TP Timer3]--|
                       Preset: T#2s

|--[Timer3.Q]--( Valve )--|

Operation:
- Press TriggerButton: Valve opens for exactly 2s
- Hold button: Valve still closes after 2s
- Multiple presses ignored until pulse completes`}
                    </pre>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Common Applications:</h4>
                    <ul className="space-y-1 ml-6 text-gray-700">
                      <li>Timed chemical injection pulses</li>
                      <li>Fixed-duration alarm acknowledgment</li>
                      <li>Metered material dispensing</li>
                      <li>One-shot control signals</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6 my-8 border-l-4 border-green-500">
                <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Icon name="tips_and_updates" className="text-2xl text-green-600" />
                  Timer Best Practices
                </h4>
                <ul className="space-y-2 ml-6">
                  <li className="text-gray-700"><strong>Use retentive timers (RTO)</strong> when timing must continue through power cycles</li>
                  <li className="text-gray-700"><strong>Always provide manual reset</strong> capability for timers in critical processes</li>
                  <li className="text-gray-700"><strong>Document preset values</strong> with engineering units in comments</li>
                  <li className="text-gray-700"><strong>Consider cascading timers</strong> for very long time periods to avoid overflow</li>
                  <li className="text-gray-700"><strong>Test timer accuracy</strong> under full scan load conditions</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section id="counters" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="calculate" className="text-4xl text-blue-600" />
                Counter Instructions
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Counters track the number of events or cycles in industrial processes. They are essential for production counting, batch processing, and maintenance scheduling.
              </p>

              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">CTU - Count Up Counter</h3>
                  <p className="text-gray-700 mb-4">
                    Increments the count value on each rising edge of the input. Done bit sets when count reaches preset.
                  </p>
                  <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300 mb-4">
                    <pre className="text-gray-800">
{`|--[ ProductSensor ]--[R_TRIG]--[CTU Counter1]--|
                                  Preset: 100
                                  Count: 0

|--[Counter1.Done]--( BatchComplete )--|

|--[ ResetButton ]--[CTR Counter1]--|

Operation:
- Each product triggers count increment
- At count = 100: BatchComplete energizes
- ResetButton clears counter back to 0`}
                    </pre>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Practical Example: Bottle Filling Line</h4>
                    <div className="bg-white rounded-lg p-3 font-mono text-xs border border-gray-300 mt-2">
                      <pre className="text-gray-800">
{`(* Count bottles into cases *)
|--[BottleSensor]--[R_TRIG]-[CTU CaseCount]--|
                              Preset: 24

(* Stop filler when case full *)
|--[CaseCount.Done]--( StopFiller )--|

(* Eject full case and reset *)
|--[CaseCount.Done]--[TON T#2s]--(EjectCase)--|
|--[EjectCase]--[CTR CaseCount]--|`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">CTD - Count Down Counter</h3>
                  <p className="text-gray-700 mb-4">
                    Decrements from a preset value. Done bit is TRUE until count reaches zero.
                  </p>
                  <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300 mb-4">
                    <pre className="text-gray-800">
{`|--[ LoadButton ]--[LD Counter2]--|
                    Preset: 50

|--[ DispensePulse ]--[CTD Counter2]--|

|--[Counter2.Done]--( AllowDispense )--|
|--[/Counter2.Done]--( EmptyAlarm )--|

Operation:
- LoadButton sets count to 50
- Each dispense decrements counter
- At count = 0: Done goes FALSE, alarm activates`}
                    </pre>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">CTUD - Up/Down Counter</h3>
                  <p className="text-gray-700 mb-4">
                    Combines both up and down counting in a single instruction. Ideal for tracking bidirectional operations.
                  </p>
                  <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300 mb-4">
                    <pre className="text-gray-800">
{`|--[EntryGate]--[CTUD InventoryCount]--|
|--[ExitGate]---+    Preset: 1000

|--[InventoryCount > 900]--( FullWarning )--|
|--[InventoryCount < 100]--( LowWarning )--|

Application: Parking garage vehicle counting
- Entry gate increments count
- Exit gate decrements count
- Warnings at high/low occupancy`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 my-8 border-l-4 border-yellow-500">
                <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Icon name="warning" className="text-2xl text-yellow-600" />
                  Critical Counter Considerations
                </h4>
                <ul className="space-y-2 ml-6">
                  <li className="text-gray-700"><strong>Use edge detection (R_TRIG/F_TRIG)</strong> to prevent multiple counts from continuous signals</li>
                  <li className="text-gray-700"><strong>Implement overflow protection</strong> when counts can exceed data type limits</li>
                  <li className="text-gray-700"><strong>Use retentive counters</strong> for production totals that must survive power cycles</li>
                  <li className="text-gray-700"><strong>Provide manual preset</strong> and reset capabilities for operators</li>
                  <li className="text-gray-700"><strong>Log counter values</strong> to HMI/SCADA for production tracking</li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section id="comparison" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="compare" className="text-4xl text-blue-600" />
                Comparison and Math Operations
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Comparison instructions enable conditional logic based on numeric values, while math operations process analog signals and perform calculations.
              </p>

              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-2 border-gray-300 rounded-lg">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold">Comparison</th>
                      <th className="px-6 py-3 text-left font-semibold">Symbol</th>
                      <th className="px-6 py-3 text-left font-semibold">TRUE When</th>
                      <th className="px-6 py-3 text-left font-semibold">Example Use</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-4 font-semibold">Equal</td>
                      <td className="px-6 py-4 font-mono">[A = B]</td>
                      <td className="px-6 py-4">A equals B</td>
                      <td className="px-6 py-4">Position verification</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-6 py-4 font-semibold">Not Equal</td>
                      <td className="px-6 py-4 font-mono">[A &lt;&gt; B]</td>
                      <td className="px-6 py-4">A not equal to B</td>
                      <td className="px-6 py-4">Change detection</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-4 font-semibold">Greater Than</td>
                      <td className="px-6 py-4 font-mono">[A &gt; B]</td>
                      <td className="px-6 py-4">A greater than B</td>
                      <td className="px-6 py-4">High alarm detection</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-6 py-4 font-semibold">Greater/Equal</td>
                      <td className="px-6 py-4 font-mono">[A &gt;= B]</td>
                      <td className="px-6 py-4">A greater or equal B</td>
                      <td className="px-6 py-4">Threshold checking</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-4 font-semibold">Less Than</td>
                      <td className="px-6 py-4 font-mono">[A &lt; B]</td>
                      <td className="px-6 py-4">A less than B</td>
                      <td className="px-6 py-4">Low alarm detection</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-semibold">Less/Equal</td>
                      <td className="px-6 py-4 font-mono">[A &lt;= B]</td>
                      <td className="px-6 py-4">A less or equal B</td>
                      <td className="px-6 py-4">Limit checking</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 my-6 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Temperature Control Example</h3>
                <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300">
                  <pre className="text-gray-800">
{`(* High Temperature Alarm *)
|--[Temperature > HighLimit]--( HighTempAlarm )--|

(* Low Temperature Alarm *)
|--[Temperature < LowLimit]--( LowTempAlarm )--|

(* Temperature in Normal Range *)
|--[Temperature >= LowLimit]--[Temperature <= HighLimit]--(NormalRange)--|

(* Deadband Control - Prevent Rapid Cycling *)
|--[Temperature < (Setpoint - Deadband)]--( HeaterOn )--|
|--[Temperature > (Setpoint + Deadband)]--( CoolerOn )--|`}
                  </pre>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 my-6 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Math Operations</h3>
                <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300">
                  <pre className="text-gray-800">
{`(* Analog Scaling - Convert 0-10V to 0-100% *)
ScaledValue := (AnalogInput - 0.0) / (10.0 - 0.0) * 100.0;

(* Flow Rate Calculation *)
FlowRate := TankVolume / FillTime;

(* Production Rate per Hour *)
ProductionRate := (ProductCount * 3600) / ElapsedSeconds;

(* Average of Multiple Sensors *)
AverageTemp := (Sensor1 + Sensor2 + Sensor3 + Sensor4) / 4.0;

(* Efficiency Calculation *)
Efficiency := (ActualOutput / TheoreticalMax) * 100.0;`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section id="advanced-patterns" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="auto_awesome" className="text-4xl text-blue-600" />
                Advanced Programming Patterns
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Professional PLC programmers use proven design patterns that solve common control challenges reliably and efficiently.
              </p>

              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">One-Shot (Rising Edge Detection)</h3>
                  <p className="text-gray-700 mb-4">
                    Generates a single scan cycle pulse when an input transitions from FALSE to TRUE. Essential for event counting and triggering.
                  </p>
                  <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300">
                    <pre className="text-gray-800">
{`(* Method 1: Using R_TRIG Function Block *)
|--[ Sensor ]--[R_TRIG EdgeDetect]--( Pulse )--|

(* Method 2: Manual Implementation *)
|--[ Sensor ]--[/SensorOld]--( Pulse )--|
|--[ Sensor ]--( SensorOld )--|  (* Update old state *)

Benefits:
- Prevents multiple triggers from continuous signals
- Critical for accurate counting
- Reduces unnecessary processing`}
                    </pre>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Oscillator / Flasher Circuit</h3>
                  <p className="text-gray-700 mb-4">
                    Creates a periodic on/off signal for attention-getting indicators or timed pulse generation.
                  </p>
                  <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300">
                    <pre className="text-gray-800">
{`(* 1 Second Flasher *)
|--[/Flash1s]--[TON FlashTimer T#1s]--( Flash1s )--|
|--[ Flash1s]--[CTR FlashTimer]--|

(* Alarm with Flashing Light *)
|--[ AlarmActive ]--[ Flash1s ]--( AlarmLight )--|

Applications:
- Warning lights and beacons
- Attention-getting HMI elements
- Periodic sampling or logging
- Heartbeat signals for diagnostics`}
                    </pre>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">First Scan Initialization</h3>
                  <p className="text-gray-700 mb-4">
                    Executes setup code only on the first PLC scan after power-up or mode change. Critical for proper system initialization.
                  </p>
                  <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300">
                    <pre className="text-gray-800">
{`(* First Scan Bit *)
|--[/FirstScanDone]--( FirstScan )--|
|--( FirstScanDone )--|  (* Set permanently after first scan *)

(* Initialize Default Values *)
|--[ FirstScan ]--[MOVE 75 TO TempSetpoint]--|
|--[ FirstScan ]--[MOVE 50 TO SpeedSetpoint]--|
|--[ FirstScan ]--( ResetAlarms )--|

(* Load Recipe on Startup *)
|--[ FirstScan ]--[CALL LoadDefaultRecipe]--|`}
                    </pre>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Retentive Start/Stop with Status</h3>
                  <p className="text-gray-700 mb-4">
                    Enhanced motor control with run status feedback, safety interlocks, and fault handling.
                  </p>
                  <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300">
                    <pre className="text-gray-800">
{`(* Motor Start Logic *)
|--[ StartPB ]--+--[/StopPB]--[/EStop]--[/MotorFault]--( MotorRun )--|
                |
                +--[ MotorRun ]--[ MotorRunning ]--+

(* Fault Detection *)
|--[ MotorRun ]--[/MotorRunning]--[TON T#5s]--( MotorFault )--|

(* Runtime Accumulation *)
|--[ MotorRunning ]--[CTU RunHours]--|  (* Increment every hour *)

(* Maintenance Due *)
|--[ RunHours > MaintenanceLimit ]--( MaintenanceDue )--|`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section id="sequencing" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="linear_scale" className="text-4xl text-blue-600" />
                Sequential Control Logic
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Sequential control manages multi-step processes where operations must occur in a specific order. This is fundamental to batch processing, machine cycles, and automated sequences.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 my-6 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">State-Based Sequencing Pattern</h3>
                <p className="text-gray-700 mb-4">
                  The most reliable method for sequential control uses state variables and transition conditions.
                </p>
                <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300">
                  <pre className="text-gray-800">
{`(* Automated Wash Cycle Example *)

(* State 0: Idle *)
|--[ State = 0 ]--[ StartButton ]--[MOVE 1 TO State]--|

(* State 1: Fill Tank *)
|--[ State = 1 ]--( FillValve )--|
|--[ State = 1 ]--[ LevelHigh ]--[MOVE 2 TO State]--|

(* State 2: Wash Cycle *)
|--[ State = 2 ]--( AgitatorMotor )--|
|--[ State = 2 ]--[TON T#120s]--[MOVE 3 TO State]--|

(* State 3: Drain *)
|--[ State = 3 ]--( DrainValve )--|
|--[ State = 3 ]--[ LevelLow ]--[MOVE 4 TO State]--|

(* State 4: Rinse Fill *)
|--[ State = 4 ]--( FillValve )--|
|--[ State = 4 ]--[ LevelHigh ]--[MOVE 5 TO State]--|

(* State 5: Rinse *)
|--[ State = 5 ]--( AgitatorMotor )--|
|--[ State = 5 ]--[TON T#60s]--[MOVE 6 TO State]--|

(* State 6: Final Drain *)
|--[ State = 6 ]--( DrainValve )--|
|--[ State = 6 ]--[ LevelLow ]--[MOVE 7 TO State]--|

(* State 7: Dry Cycle *)
|--[ State = 7 ]--( SpinMotor )--|
|--[ State = 7 ]--[TON T#180s]--[MOVE 0 TO State]--|

(* Emergency Stop - Any State *)
|--[ EStop ]--[MOVE 0 TO State]--|`}
                  </pre>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6 my-6 border-l-4 border-green-500">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Sequencing Best Practices</h4>
                <ul className="space-y-2 ml-6">
                  <li className="text-gray-700">Document each state with clear descriptions and timing requirements</li>
                  <li className="text-gray-700">Include manual override capability for maintenance and testing</li>
                  <li className="text-gray-700">Add timeout detection for each state to prevent lockups</li>
                  <li className="text-gray-700">Log state transitions for troubleshooting and optimization</li>
                  <li className="text-gray-700">Provide clear operator feedback on current state and progress</li>
                </ul>
              </div>
            </section>

            {/* Section 9 */}
            <section id="optimization" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="speed" className="text-4xl text-blue-600" />
                Code Optimization Techniques
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Optimized ladder logic executes faster, uses less memory, and is easier to maintain. Apply these proven optimization strategies.
              </p>

              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">1. Minimize Scan Time</h3>
                  <ul className="space-y-2 ml-6">
                    <li className="text-gray-700">Place frequently TRUE conditions first in series logic</li>
                    <li className="text-gray-700">Use parallel branches instead of multiple rungs when possible</li>
                    <li className="text-gray-700">Avoid complex math in every scan - use conditionals</li>
                    <li className="text-gray-700">Group related logic to reduce cross-references</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">2. Reduce Memory Usage</h3>
                  <ul className="space-y-2 ml-6">
                    <li className="text-gray-700">Use smallest appropriate data types (BOOL vs INT vs REAL)</li>
                    <li className="text-gray-700">Reuse temporary variables for intermediate calculations</li>
                    <li className="text-gray-700">Create function blocks for repeated logic sequences</li>
                    <li className="text-gray-700">Eliminate unused tags and remove dead code</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">3. Improve Maintainability</h3>
                  <ul className="space-y-2 ml-6">
                    <li className="text-gray-700">Use descriptive tag names that explain purpose</li>
                    <li className="text-gray-700">Add rung comments for complex logic explanations</li>
                    <li className="text-gray-700">Organize code into logical sections with clear headers</li>
                    <li className="text-gray-700">Create standardized templates for common operations</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 10 */}
            <section id="common-mistakes" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="error_outline" className="text-4xl text-blue-600" />
                Common Mistakes to Avoid
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Learn from these frequent programming errors to write more reliable ladder logic from the start.
              </p>

              <div className="space-y-6">
                <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Double Coil Usage</h3>
                  <p className="text-gray-700 mb-3">Using the same output coil in multiple rungs creates unpredictable behavior.</p>
                  <div className="bg-white rounded-lg p-3 font-mono text-xs border border-gray-300">
                    <pre className="text-red-600">
{`WRONG:
|--[ A ]--( Motor )--|
|--[ B ]--( Motor )--|  <- Overwrites previous rung!

RIGHT:
|--[ A ]--+
          |--( Motor )--|
|--[ B ]--+`}
                    </pre>
                  </div>
                </div>

                <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Missing Edge Detection on Counters</h3>
                  <p className="text-gray-700 mb-3">Continuous signals without edge detection cause multiple unwanted counts.</p>
                  <div className="bg-white rounded-lg p-3 font-mono text-xs border border-gray-300">
                    <pre className="text-red-600">
{`WRONG:
|--[ Sensor ]--[CTU Counter]--|  <- Counts every scan!

RIGHT:
|--[ Sensor ]--[R_TRIG]--[CTU Counter]--|`}
                    </pre>
                  </div>
                </div>

                <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">No Emergency Stop Logic</h3>
                  <p className="text-gray-700 mb-3">Failing to include hardware-independent emergency stops is a critical safety violation.</p>
                  <div className="bg-white rounded-lg p-3 font-mono text-xs border border-gray-300">
                    <pre className="text-green-600">
{`ALWAYS INCLUDE:
|--[ Start ]--+--[/EStop]--( Motor )--|
              |
              +--[ Motor ]--+

E-Stop should be hardwired AND in PLC logic`}
                    </pre>
                  </div>
                </div>

                <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Insufficient Documentation</h3>
                  <p className="text-gray-700">Undocumented code becomes unmaintainable. Future you (and others) will thank you for clear comments.</p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <div className="bg-gray-50 rounded-2xl p-8 my-12 border-2 border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ladder logic remains the backbone of industrial automation programming. By mastering the fundamental elements - contacts, coils, timers, counters - and applying professional programming patterns, you can create robust control systems that operate reliably for decades.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The key to expertise is practice combined with continuous learning. Start with simple projects, apply best practices from day one, and gradually tackle more complex challenges. Always prioritize safety, document thoroughly, and test exhaustively before deploying to production.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Modern tools like PLCAutoPilot can significantly accelerate your ladder logic development by generating code from specifications, but understanding the fundamentals covered in this guide ensures you can review, optimize, and troubleshoot any PLC program with confidence.
              </p>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-8 text-white my-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="rocket_launch" className="text-3xl" />
                Accelerate Your Ladder Logic Development
              </h3>
              <p className="text-lg mb-6 opacity-90">
                PLCAutoPilot transforms your control requirements into production-ready ladder logic in minutes, following all the best practices covered in this guide.
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
                  <p className="text-gray-600 text-sm">Master PLC programming from basics to advanced with comprehensive examples.</p>
                </Link>
                <Link href="/blog/modicon-programming-guide" className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all group">
                  <Icon name="memory" className="text-3xl text-blue-600 mb-3" />
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600">Modicon Programming Guide</h4>
                  <p className="text-gray-600 text-sm">Complete guide to Schneider Electric Modicon PLC programming.</p>
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
