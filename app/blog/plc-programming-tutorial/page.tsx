import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Icon from '../../components/Icon';

export const metadata = {
  title: "Complete PLC Programming Tutorial 2025: From Basics to Advanced | PLCAutoPilot",
  description: "Master PLC programming from scratch. Learn ladder logic, function blocks, structured text, and real-world applications with step-by-step examples and best practices.",
  keywords: ["PLC programming tutorial", "ladder logic programming", "PLC basics", "industrial automation programming", "Modicon programming", "Machine Expert tutorial"],
};

export default function PLCProgrammingTutorial() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is PLC programming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PLC programming is the process of creating logical instructions that tell Programmable Logic Controllers how to control machinery and industrial processes. PLCs execute programs in continuous scan cycles, reading inputs, executing logic, and updating outputs thousands of times per second."
        }
      },
      {
        "@type": "Question",
        "name": "What programming languages are used for PLCs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The IEC 61131-3 standard defines five programming languages for PLCs: Ladder Diagram (LD), Function Block Diagram (FBD), Structured Text (ST), Instruction List (IL), and Sequential Function Chart (SFC). Ladder logic is the most widely used, accounting for 60-70% of industrial applications."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to learn PLC programming?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Basic PLC programming can be learned in 2-3 months with dedicated study and practice. Becoming proficient typically requires 6-12 months of hands-on experience. Mastering advanced topics like motion control, safety systems, and complex process automation may take 2-3 years."
        }
      },
      {
        "@type": "Question",
        "name": "What is the salary range for PLC programmers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PLC programmer salaries range from $60,000 to $120,000+ annually depending on experience and specialization. Entry-level positions start around $60K, mid-level programmers earn $80K-$100K, and senior PLC engineers with safety and motion control expertise can earn $120K or more."
        }
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Complete PLC Programming Tutorial 2025: From Basics to Advanced",
    "description": "Master PLC programming from scratch. Learn ladder logic, function blocks, structured text, and real-world applications with step-by-step examples and best practices.",
    "author": {
      "@type": "Person",
      "name": "Dr. Murali BK"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PLCAutoPilot",
      "logo": {
        "@type": "ImageObject",
        "url": "https://plcautopilot.com/favicon.svg"
      }
    },
    "datePublished": "2025-01-15",
    "dateModified": "2025-01-15"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-white pt-24">
        <article className="max-w-4xl mx-auto px-6 py-12">
          {/* Article Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                Tutorial
              </span>
              <span className="text-sm text-gray-500">January 15, 2025</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">25 min read</span>
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
              Complete PLC Programming Tutorial 2025: From Basics to Advanced
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Master PLC programming from scratch. Learn ladder logic, function blocks, structured text, and real-world applications with step-by-step examples and professional best practices.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-blue-50 rounded-2xl p-8 mb-12 border-2 border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="list" className="text-3xl text-blue-600" />
              Table of Contents
            </h2>
            <ul className="space-y-2 ml-6">
              <li><a href="#what-is-plc" className="text-blue-600 hover:text-blue-800 font-medium">1. What is PLC Programming?</a></li>
              <li><a href="#why-learn" className="text-blue-600 hover:text-blue-800 font-medium">2. Why Learn PLC Programming?</a></li>
              <li><a href="#getting-started" className="text-blue-600 hover:text-blue-800 font-medium">3. Getting Started: Essential Concepts</a></li>
              <li><a href="#ladder-logic" className="text-blue-600 hover:text-blue-800 font-medium">4. Ladder Logic Fundamentals</a></li>
              <li><a href="#data-types" className="text-blue-600 hover:text-blue-800 font-medium">5. Data Types and Memory Organization</a></li>
              <li><a href="#programming-languages" className="text-blue-600 hover:text-blue-800 font-medium">6. IEC 61131-3 Programming Languages</a></li>
              <li><a href="#real-world-examples" className="text-blue-600 hover:text-blue-800 font-medium">7. Real-World Programming Examples</a></li>
              <li><a href="#best-practices" className="text-blue-600 hover:text-blue-800 font-medium">8. Professional Best Practices</a></li>
              <li><a href="#troubleshooting" className="text-blue-600 hover:text-blue-800 font-medium">9. Debugging and Troubleshooting</a></li>
              <li><a href="#next-steps" className="text-blue-600 hover:text-blue-800 font-medium">10. Next Steps and Resources</a></li>
            </ul>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <section id="what-is-plc" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="help_outline" className="text-4xl text-blue-600" />
                What is PLC Programming?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                A Programmable Logic Controller (PLC) is an industrial computer designed to control manufacturing processes, assembly lines, robotic devices, and any activity requiring high reliability, ease of programming, and process fault diagnosis. PLC programming is the process of creating logical instructions that tell the PLC how to control machinery and processes.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Unlike traditional computers, PLCs are built to withstand harsh industrial environments including extreme temperatures, dust, moisture, and electrical noise. They execute programs in a continuous scan cycle, reading inputs, executing logic, and updating outputs thousands of times per second.
              </p>
              <div className="bg-gray-50 rounded-xl p-6 my-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Key Characteristics of PLCs:</h3>
                <ul className="space-y-2 ml-6">
                  <li className="text-gray-700"><strong>Rugged Design:</strong> Built for industrial environments with temperature ranges from -20°C to 70°C</li>
                  <li className="text-gray-700"><strong>Real-Time Operation:</strong> Scan cycles typically range from 1-100 milliseconds</li>
                  <li className="text-gray-700"><strong>Modular Architecture:</strong> Expandable with I/O modules, communication cards, and specialty modules</li>
                  <li className="text-gray-700"><strong>Reliable Operation:</strong> Mean Time Between Failures (MTBF) often exceeds 500,000 hours</li>
                  <li className="text-gray-700"><strong>Easy Troubleshooting:</strong> Built-in diagnostics and online monitoring capabilities</li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section id="why-learn" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="trending_up" className="text-4xl text-blue-600" />
                Why Learn PLC Programming?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                PLC programming skills are in high demand across industries worldwide. As manufacturing becomes increasingly automated, the need for skilled PLC programmers continues to grow. According to industry reports, PLC programmer salaries range from $60,000 to $120,000+ annually depending on experience and specialization.
              </p>
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-100">
                  <Icon name="work" className="text-4xl text-blue-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Career Opportunities</h3>
                  <p className="text-gray-700">Strong demand across automotive, food processing, pharmaceuticals, oil and gas, water treatment, and manufacturing sectors.</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-100">
                  <Icon name="attach_money" className="text-4xl text-blue-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Competitive Salaries</h3>
                  <p className="text-gray-700">Entry-level positions start at $60K, senior PLC engineers can earn $120K+ with comprehensive benefits packages.</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-100">
                  <Icon name="public" className="text-4xl text-blue-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Global Relevance</h3>
                  <p className="text-gray-700">PLC skills are transferable worldwide with standardized programming languages defined by IEC 61131-3.</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-100">
                  <Icon name="psychology" className="text-4xl text-blue-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Problem Solving</h3>
                  <p className="text-gray-700">Develop critical thinking skills by solving complex automation challenges and optimizing industrial processes.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="getting-started" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="rocket_launch" className="text-4xl text-blue-600" />
                Getting Started: Essential Concepts
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Before diving into programming, you need to understand fundamental PLC concepts and terminology. These building blocks form the foundation of all PLC programming work.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">The PLC Scan Cycle</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                PLCs operate in a continuous three-step scan cycle that repeats thousands of times per second:
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 my-6 border-2 border-blue-200">
                <ol className="space-y-4">
                  <li className="text-gray-700">
                    <strong className="text-blue-600">Step 1 - Input Scan:</strong> The PLC reads all input values from sensors, switches, and field devices, storing them in an input image table. This snapshot ensures consistent data throughout the scan cycle.
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-blue-600">Step 2 - Program Execution:</strong> The PLC executes your program logic from top to bottom, using the input image data to make decisions and calculate output values.
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-blue-600">Step 3 - Output Scan:</strong> The PLC writes calculated output values to all physical outputs, controlling motors, valves, lights, and other actuators.
                  </li>
                </ol>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Input and Output Types</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Understanding I/O types is crucial for successful PLC programming:
              </p>
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-2 border-gray-300 rounded-lg">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold">Type</th>
                      <th className="px-6 py-3 text-left font-semibold">Description</th>
                      <th className="px-6 py-3 text-left font-semibold">Common Applications</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-4 font-semibold text-gray-900">Digital Input</td>
                      <td className="px-6 py-4 text-gray-700">ON/OFF signals (24VDC typical)</td>
                      <td className="px-6 py-4 text-gray-700">Push buttons, limit switches, proximity sensors</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">Digital Output</td>
                      <td className="px-6 py-4 text-gray-700">ON/OFF control signals</td>
                      <td className="px-6 py-4 text-gray-700">Solenoid valves, motor starters, indicator lights</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-4 font-semibold text-gray-900">Analog Input</td>
                      <td className="px-6 py-4 text-gray-700">Variable signals (0-10V, 4-20mA)</td>
                      <td className="px-6 py-4 text-gray-700">Temperature sensors, pressure transmitters, flow meters</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">Analog Output</td>
                      <td className="px-6 py-4 text-gray-700">Variable control signals</td>
                      <td className="px-6 py-4 text-gray-700">Variable frequency drives, control valves, process controllers</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 4 */}
            <section id="ladder-logic" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="account_tree" className="text-4xl text-blue-600" />
                Ladder Logic Fundamentals
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ladder Logic is the most widely used PLC programming language. It gets its name from its resemblance to relay ladder diagrams used in electrical control systems. The visual nature makes it intuitive for electricians and easy to troubleshoot.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Basic Ladder Logic Elements</h3>

              <div className="bg-gray-50 rounded-xl p-6 my-6 border-2 border-gray-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4">1. Normally Open Contact (--| |--)</h4>
                <p className="text-gray-700 mb-3">
                  Allows current flow when the referenced bit is TRUE (1). Think of it as a normally open switch that closes when energized.
                </p>
                <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300">
                  <pre className="text-gray-800">
{`|--[ I0.0 ]--( Q0.0 )--|
   Input     Output

When I0.0 is TRUE, Q0.0 turns ON`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 my-6 border-2 border-gray-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4">2. Normally Closed Contact (--|/|--)</h4>
                <p className="text-gray-700 mb-3">
                  Allows current flow when the referenced bit is FALSE (0). Opens when energized, blocking current flow.
                </p>
                <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300">
                  <pre className="text-gray-800">
{`|--[/I0.1 ]--( Q0.1 )--|
   Input      Output

When I0.1 is FALSE, Q0.1 turns ON`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 my-6 border-2 border-gray-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4">3. Output Coil (--( )--)</h4>
                <p className="text-gray-700 mb-3">
                  Energizes when power flows through the rung, setting the referenced bit to TRUE.
                </p>
                <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300">
                  <pre className="text-gray-800">
{`|--[ I0.0 ]--[ I0.1 ]--( Q0.0 )--|
   Start     Running    Motor

Motor runs when Start AND Running are both TRUE`}
                  </pre>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Common Ladder Logic Patterns</h3>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 my-6 border-2 border-blue-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Start/Stop Circuit (Seal-In Logic)</h4>
                <p className="text-gray-700 mb-3">
                  The most fundamental pattern in PLC programming. Creates a latching circuit that starts with a momentary button and stops with another.
                </p>
                <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300">
                  <pre className="text-gray-800">
{`|--[ Start ]--+--[ Stop ]--(Motor)--|
              |               |
              +--[Motor]-------+

Rung Explanation:
- Press Start: Motor energizes
- Motor contact seals in the circuit
- Release Start: Motor continues running
- Press Stop: Motor de-energizes`}
                  </pre>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 my-6 border-2 border-blue-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Interlock Logic</h4>
                <p className="text-gray-700 mb-3">
                  Prevents two outputs from being active simultaneously, essential for safety systems.
                </p>
                <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300">
                  <pre className="text-gray-800">
{`|--[ Forward ]--[/Reverse]--(MotorFwd)--|
|--[ Reverse ]--[/Forward]--(MotorRev)--|

Ensures motor cannot run forward and reverse simultaneously`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="data-types" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="storage" className="text-4xl text-blue-600" />
                Data Types and Memory Organization
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Modern PLCs support various data types to handle different kinds of information efficiently. Understanding data types is crucial for writing efficient, maintainable code.
              </p>

              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-2 border-gray-300 rounded-lg">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold">Data Type</th>
                      <th className="px-6 py-3 text-left font-semibold">Size</th>
                      <th className="px-6 py-3 text-left font-semibold">Range</th>
                      <th className="px-6 py-3 text-left font-semibold">Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-4 font-semibold text-gray-900">BOOL</td>
                      <td className="px-6 py-4 text-gray-700">1 bit</td>
                      <td className="px-6 py-4 text-gray-700">0 or 1</td>
                      <td className="px-6 py-4 text-gray-700">Digital I/O, flags, status bits</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">INT</td>
                      <td className="px-6 py-4 text-gray-700">16 bits</td>
                      <td className="px-6 py-4 text-gray-700">-32,768 to 32,767</td>
                      <td className="px-6 py-4 text-gray-700">Counters, setpoints, basic math</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-4 font-semibold text-gray-900">DINT</td>
                      <td className="px-6 py-4 text-gray-700">32 bits</td>
                      <td className="px-6 py-4 text-gray-700">-2,147,483,648 to 2,147,483,647</td>
                      <td className="px-6 py-4 text-gray-700">Large counters, timestamps</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">REAL</td>
                      <td className="px-6 py-4 text-gray-700">32 bits</td>
                      <td className="px-6 py-4 text-gray-700">±1.18 × 10^-38 to ±3.40 × 10^38</td>
                      <td className="px-6 py-4 text-gray-700">Analog values, PID control, calculations</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-6 py-4 font-semibold text-gray-900">STRING</td>
                      <td className="px-6 py-4 text-gray-700">Variable</td>
                      <td className="px-6 py-4 text-gray-700">Up to 255 characters</td>
                      <td className="px-6 py-4 text-gray-700">Messages, product codes, diagnostics</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">ARRAY</td>
                      <td className="px-6 py-4 text-gray-700">Variable</td>
                      <td className="px-6 py-4 text-gray-700">Multiple elements</td>
                      <td className="px-6 py-4 text-gray-700">Recipe data, batch values, data logging</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 my-6 border-l-4 border-yellow-500">
                <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Icon name="lightbulb" className="text-2xl text-yellow-600" />
                  Best Practice: Variable Naming
                </h4>
                <p className="text-gray-700 mb-3">
                  Use descriptive, standardized names for all variables. Good naming conventions make code self-documenting and easier to maintain.
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="text-gray-700"><strong>Good:</strong> ConveyorMotorRun, TankLevelHigh, BatchCounter</li>
                  <li className="text-gray-700"><strong>Bad:</strong> M1, X, Counter1</li>
                  <li className="text-gray-700"><strong>Prefixes:</strong> Use I_ for inputs, Q_ for outputs, M_ for memory bits</li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section id="programming-languages" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="code" className="text-4xl text-blue-600" />
                IEC 61131-3 Programming Languages
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The IEC 61131-3 standard defines five programming languages for PLCs. Each has specific strengths and ideal use cases.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">1. Ladder Diagram (LD)</h3>
                  <p className="text-gray-700 mb-2"><strong>Best For:</strong> Digital logic, discrete manufacturing, simple sequences</p>
                  <p className="text-gray-700 mb-2"><strong>Advantages:</strong> Visual, easy to understand, familiar to electricians</p>
                  <p className="text-gray-700"><strong>Usage:</strong> 60-70% of industrial applications</p>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">2. Function Block Diagram (FBD)</h3>
                  <p className="text-gray-700 mb-2"><strong>Best For:</strong> Process control, analog processing, complex calculations</p>
                  <p className="text-gray-700 mb-2"><strong>Advantages:</strong> Data flow visualization, reusable blocks</p>
                  <p className="text-gray-700"><strong>Usage:</strong> 15-20% of industrial applications</p>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">3. Structured Text (ST)</h3>
                  <p className="text-gray-700 mb-2"><strong>Best For:</strong> Complex math, algorithms, data manipulation</p>
                  <p className="text-gray-700 mb-2"><strong>Advantages:</strong> Powerful, efficient, Pascal-like syntax</p>
                  <p className="text-gray-700"><strong>Usage:</strong> 10-15% of industrial applications</p>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">4. Sequential Function Chart (SFC)</h3>
                  <p className="text-gray-700 mb-2"><strong>Best For:</strong> Batch processes, state machines, sequential operations</p>
                  <p className="text-gray-700 mb-2"><strong>Advantages:</strong> Clear process flow, easy validation</p>
                  <p className="text-gray-700"><strong>Usage:</strong> 5-10% of industrial applications</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 my-6 border-2 border-gray-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Structured Text Example: Temperature Control</h4>
                <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300">
                  <pre className="text-gray-800">
{`(* Temperature Control Logic *)
IF Temperature > HighLimit THEN
    HeaterOutput := FALSE;
    CoolingValve := TRUE;
ELSIF Temperature < LowLimit THEN
    HeaterOutput := TRUE;
    CoolingValve := FALSE;
ELSE
    (* Maintain current state in deadband *)
    HeaterOutput := HeaterOutput;
    CoolingValve := CoolingValve;
END_IF;

(* Calculate heating percentage *)
IF HeaterOutput THEN
    HeatingPercent := ((HighLimit - Temperature) /
                      (HighLimit - LowLimit)) * 100.0;
ELSE
    HeatingPercent := 0.0;
END_IF;`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section id="real-world-examples" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="construction" className="text-4xl text-blue-600" />
                Real-World Programming Examples
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Let me show you practical examples that you will encounter in real industrial applications.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 my-6 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Example 1: Conveyor System Control</h3>
                <p className="text-gray-700 mb-4">
                  A three-zone conveyor system with product detection and automatic routing.
                </p>
                <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300">
                  <pre className="text-gray-800">
{`(* Zone 1 Conveyor Control *)
|--[ Start ]--+--[/Stop]--[/EStop]--[Zone1Run]--|
              |                         |
              +-------[Zone1Run]---------+

(* Product Detection and Transfer *)
|--[ProductSensor1]--[Zone1Run]--(TransferPulse)--|

(* Zone 2 Start with Delay *)
|--[TransferPulse]--[TON T#2s]--(Zone2Run)--|

(* Emergency Stop - All Zones *)
|--[/EStop]--(Zone1Run)--|
|--[/EStop]--(Zone2Run)--|
|--[/EStop]--(Zone3Run)--|`}
                  </pre>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 my-6 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Example 2: Tank Filling with Level Control</h3>
                <p className="text-gray-700 mb-4">
                  Automatic tank filling with high/low level switches and pump protection.
                </p>
                <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300">
                  <pre className="text-gray-800">
{`(* Pump Start Conditions *)
|--[/LevelHigh]--[AutoMode]--[FillRequest]--(PumpRun)--|

(* Pump Stop Conditions *)
|--[LevelHigh]+[/AutoMode]+[EStop]--(PumpStop)--|

(* Safety Interlock - No pump if tank overflow *)
|--[OverflowAlarm]--(/PumpRun)--|

(* Alarm Logic *)
|--[LevelHigh]--[TON T#10s]--(HighLevelAlarm)--|
|--[OverflowSensor]--(OverflowAlarm)--|

(* Pump Runtime Counter *)
|--[PumpRun]--[CTU C#999999]--(PumpHours)--|`}
                  </pre>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 my-6 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Example 3: Production Counter with Reset</h3>
                <p className="text-gray-700 mb-4">
                  Counts products on a production line with batch sizing and automatic reset.
                </p>
                <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300">
                  <pre className="text-gray-800">
{`(* Product Counter Logic *)
|--[ProductSensor]--[R_TRIG]--(CountPulse)--|

(* Count Up *)
|--[CountPulse]--[CTU ProductCount]--|
    Preset: BatchSize
    Output: BatchComplete

(* Batch Complete - Stop Line *)
|--[BatchComplete]--(ConveyorStop)--|
|--[BatchComplete]--(BatchCompleteLight)--|

(* Manual Reset *)
|--[ResetButton]--[BatchComplete]--(CTR ProductCount)--|

(* Daily Total Counter *)
|--[CountPulse]--[CTU DailyTotal]--|
    No Preset (counts indefinitely)

(* Auto Reset at Midnight *)
|--[MidnightPulse]--(CTR DailyTotal)--|`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section id="best-practices" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="verified" className="text-4xl text-blue-600" />
                Professional Best Practices
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Following industry best practices ensures your code is safe, maintainable, and performs reliably in production environments.
              </p>

              <div className="space-y-6">
                <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Icon name="security" className="text-2xl text-green-600" />
                    1. Safety First Always
                  </h3>
                  <ul className="space-y-2 ml-6">
                    <li className="text-gray-700">Implement hardware emergency stops independent of PLC logic</li>
                    <li className="text-gray-700">Use safety-rated PLCs for critical applications (SIL 2/3)</li>
                    <li className="text-gray-700">Include watchdog timers to detect processor faults</li>
                    <li className="text-gray-700">Design for fail-safe operation - outputs de-energize on failure</li>
                    <li className="text-gray-700">Document all safety interlocks and test regularly</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Icon name="description" className="text-2xl text-green-600" />
                    2. Comprehensive Documentation
                  </h3>
                  <ul className="space-y-2 ml-6">
                    <li className="text-gray-700">Add comments to every rung explaining its purpose</li>
                    <li className="text-gray-700">Create I/O lists with device descriptions and locations</li>
                    <li className="text-gray-700">Maintain version control with detailed change logs</li>
                    <li className="text-gray-700">Include electrical drawings and wiring diagrams</li>
                    <li className="text-gray-700">Document all timers, counters, and setpoint values</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Icon name="cleaning_services" className="text-2xl text-green-600" />
                    3. Code Organization
                  </h3>
                  <ul className="space-y-2 ml-6">
                    <li className="text-gray-700">Organize code into logical sections with clear boundaries</li>
                    <li className="text-gray-700">Use function blocks for reusable code segments</li>
                    <li className="text-gray-700">Keep scan time under 50ms for responsive control</li>
                    <li className="text-gray-700">Separate safety logic from production logic</li>
                    <li className="text-gray-700">Create standardized templates for common operations</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Icon name="build" className="text-2xl text-green-600" />
                    4. Testing and Validation
                  </h3>
                  <ul className="space-y-2 ml-6">
                    <li className="text-gray-700">Test all code offline using simulation before deployment</li>
                    <li className="text-gray-700">Verify every I/O point during commissioning</li>
                    <li className="text-gray-700">Test emergency stop functions under load</li>
                    <li className="text-gray-700">Simulate fault conditions and verify alarms</li>
                    <li className="text-gray-700">Conduct Factory Acceptance Tests (FAT) before shipment</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 9 */}
            <section id="troubleshooting" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="bug_report" className="text-4xl text-blue-600" />
                Debugging and Troubleshooting
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Even experienced programmers encounter issues. Here are systematic approaches to diagnose and fix PLC problems.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 my-6 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Common Issues and Solutions</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">Problem: Output does not turn ON</h4>
                    <p className="text-gray-700 mb-2"><strong>Diagnose:</strong></p>
                    <ul className="ml-6 space-y-1 text-gray-700">
                      <li>Check if rung conditions are TRUE using online monitoring</li>
                      <li>Verify output module status LEDs</li>
                      <li>Measure voltage at output terminals</li>
                      <li>Check for blown fuses or tripped breakers</li>
                      <li>Verify wiring connections and field device</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">Problem: Program scan time too long</h4>
                    <p className="text-gray-700 mb-2"><strong>Solutions:</strong></p>
                    <ul className="ml-6 space-y-1 text-gray-700">
                      <li>Optimize math-intensive calculations</li>
                      <li>Use interrupts for time-critical tasks</li>
                      <li>Reduce unnecessary network communication</li>
                      <li>Consider upgrading to faster PLC processor</li>
                      <li>Split program across multiple tasks</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">Problem: Intermittent faults</h4>
                    <p className="text-gray-700 mb-2"><strong>Investigation:</strong></p>
                    <ul className="ml-6 space-y-1 text-gray-700">
                      <li>Check for electrical noise sources nearby</li>
                      <li>Verify proper grounding and shielding</li>
                      <li>Review fault logs and timestamps</li>
                      <li>Monitor for voltage fluctuations</li>
                      <li>Check for loose connections or corroded terminals</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 my-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Debugging Tools and Techniques</h3>
                <ul className="space-y-3 ml-6">
                  <li className="text-gray-700">
                    <strong>Online Monitoring:</strong> Watch program execution in real-time, see which rungs are TRUE/FALSE
                  </li>
                  <li className="text-gray-700">
                    <strong>Force I/O:</strong> Manually set inputs/outputs for testing (use with extreme caution!)
                  </li>
                  <li className="text-gray-700">
                    <strong>Data Logging:</strong> Record variable values over time to identify patterns
                  </li>
                  <li className="text-gray-700">
                    <strong>Breakpoints:</strong> Pause execution at specific program locations
                  </li>
                  <li className="text-gray-700">
                    <strong>Cross-Reference:</strong> Find all instances where a variable is used
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 10 */}
            <section id="next-steps" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="explore" className="text-4xl text-blue-600" />
                Next Steps and Resources
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have now learned the fundamentals of PLC programming. Here is how to continue your journey to becoming a proficient PLC programmer.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl p-6">
                  <Icon name="school" className="text-4xl mb-3" />
                  <h3 className="text-xl font-bold mb-3">Continue Learning</h3>
                  <ul className="space-y-2">
                    <li>Practice with PLC simulation software (Machine Expert, LogixPro)</li>
                    <li>Work through vendor-specific training courses</li>
                    <li>Join online PLC programming communities</li>
                    <li>Study real industrial projects and code examples</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl p-6">
                  <Icon name="workspace_premium" className="text-4xl mb-3" />
                  <h3 className="text-xl font-bold mb-3">Get Certified</h3>
                  <ul className="space-y-2">
                    <li>Schneider Electric Certified Trainer programs</li>
                    <li>Rockwell Automation certification paths</li>
                    <li>SIEMENS PLC certification courses</li>
                    <li>ISA Certified Automation Professional (CAP)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-8 text-white my-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="smart_toy" className="text-3xl" />
                  Accelerate Your PLC Programming with PLCAutoPilot
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  Ready to take your PLC programming to the next level? PLCAutoPilot uses AI to transform your specifications into production-ready ladder logic code in minutes.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <Icon name="check_circle" className="text-xl" />
                    Generate ladder logic from plain English descriptions
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="check_circle" className="text-xl" />
                    Automatic hardware configuration for Modicon PLCs
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="check_circle" className="text-xl" />
                    Built-in IEC 61508 safety compliance
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="check_circle" className="text-xl" />
                    HMI screen generation and tag mapping
                  </li>
                </ul>
                <Link
                  href="/"
                  className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Try PLCAutoPilot Free
                </Link>
              </div>
            </section>

            {/* Conclusion */}
            <div className="bg-gray-50 rounded-2xl p-8 my-12 border-2 border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                PLC programming is a valuable skill that opens doors to exciting career opportunities in industrial automation. By mastering the fundamentals covered in this tutorial - ladder logic, data types, programming languages, and best practices - you have built a strong foundation for success.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Remember that becoming proficient takes practice. Start with simple projects, gradually increase complexity, and always prioritize safety. Use simulation software to experiment without risk, and do not hesitate to consult vendor documentation and experienced programmers.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The industrial automation field is evolving rapidly with AI, IoT, and Industry 4.0 technologies. Stay curious, keep learning, and embrace new tools like PLCAutoPilot that can accelerate your development workflow while maintaining the highest quality standards.
              </p>
            </div>

            {/* Related Articles */}
            <div className="mt-12 pt-8 border-t-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/blog/ladder-logic-complete-guide" className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all group">
                  <Icon name="code" className="text-3xl text-blue-600 mb-3" />
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600">Ladder Logic Complete Guide</h4>
                  <p className="text-gray-600 text-sm">Deep dive into ladder logic programming with advanced techniques and professional patterns.</p>
                </Link>
                <Link href="/blog/modicon-programming-guide" className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all group">
                  <Icon name="memory" className="text-3xl text-blue-600 mb-3" />
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600">Modicon Programming Guide</h4>
                  <p className="text-gray-600 text-sm">Complete tutorial for Schneider Electric Modicon PLCs from M221 to M580.</p>
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
