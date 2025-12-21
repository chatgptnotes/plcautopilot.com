import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Icon from '../../components/Icon';

export const metadata = {
  title: "IEC 61508 Safety Standards: Complete Implementation Guide for PLC Programming | PLCAutoPilot",
  description: "Master functional safety in PLC programming. Complete guide to IEC 61508 SIL requirements, safety interlocks, compliance verification, and safety-rated PLC implementation across all major platforms.",
  keywords: ["IEC 61508", "functional safety", "SIL certification", "safety PLC programming", "safety interlocks", "safety rated PLC", "ISO 13849", "safety integrity level", "machine safety"],
};

export default function IEC61508Safety() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is IEC 61508?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "IEC 61508 is the international standard for electrical, electronic, and programmable electronic safety-related systems. It defines requirements for achieving functional safety through Safety Integrity Levels (SIL 1-4), with SIL 4 being the highest level of safety."
        }
      },
      {
        "@type": "Question",
        "name": "What are the SIL levels in IEC 61508?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SIL (Safety Integrity Level) ranges from SIL 1 to SIL 4. SIL 1 requires 10⁻¹ to 10⁻² probability of failure per hour (lowest), SIL 2 requires 10⁻² to 10⁻³, SIL 3 requires 10⁻³ to 10⁻⁴, and SIL 4 requires 10⁻⁴ to 10⁻⁵ (highest safety level)."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need IEC 61508 certified PLCs for safety applications?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For safety-critical applications, yes. IEC 61508 certified PLCs (like Siemens S7-1500F, Rockwell GuardLogix, or Schneider M580 Safety) are required for SIL 2 and above applications. These controllers have certified hardware and software for safety functions."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between IEC 61508 and ISO 13849?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "IEC 61508 is the base functional safety standard for all industries. ISO 13849 is machinery-specific and uses Performance Levels (PLa-PLe) instead of SIL. They are harmonized: PL e roughly equals SIL 3, PL d equals SIL 2, and PL c equals SIL 1."
        }
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "IEC 61508 Safety Standards: Complete Implementation Guide",
    "description": "Master functional safety in PLC programming with complete IEC 61508 implementation guide",
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
    "datePublished": "2024-12-20",
    "dateModified": "2024-12-20"
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
                Safety
              </span>
              <span className="text-sm text-gray-500">December 20, 2024</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">20 min read</span>
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
              IEC 61508 Safety Standards: Complete Implementation Guide
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Master functional safety in PLC programming. Complete guide to SIL requirements, safety interlocks, compliance verification, and implementing safety-rated systems across Siemens, Rockwell, Schneider, and other major platforms.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-blue-50 rounded-2xl p-8 mb-12 border-2 border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="list" className="text-3xl text-blue-600" />
              Table of Contents
            </h2>
            <ul className="space-y-2 ml-6">
              <li><a href="#overview" className="text-blue-600 hover:text-blue-800 font-medium">1. IEC 61508 Overview</a></li>
              <li><a href="#sil-levels" className="text-blue-600 hover:text-blue-800 font-medium">2. Understanding SIL Levels</a></li>
              <li><a href="#risk-assessment" className="text-blue-600 hover:text-blue-800 font-medium">3. Risk Assessment and SIL Determination</a></li>
              <li><a href="#safety-plcs" className="text-blue-600 hover:text-blue-800 font-medium">4. Safety-Rated PLC Platforms</a></li>
              <li><a href="#programming" className="text-blue-600 hover:text-blue-800 font-medium">5. Safety PLC Programming</a></li>
              <li><a href="#validation" className="text-blue-600 hover:text-blue-800 font-medium">6. Validation and Testing</a></li>
              <li><a href="#documentation" className="text-blue-600 hover:text-blue-800 font-medium">7. Safety Documentation Requirements</a></li>
              <li><a href="#common-functions" className="text-blue-600 hover:text-blue-800 font-medium">8. Common Safety Functions</a></li>
              <li><a href="#maintenance" className="text-blue-600 hover:text-blue-800 font-medium">9. Proof Testing and Maintenance</a></li>
              <li><a href="#compliance" className="text-blue-600 hover:text-blue-800 font-medium">10. Achieving Compliance</a></li>
            </ul>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <section id="overview" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="shield" className="text-4xl text-blue-600" />
                IEC 61508 Overview
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                IEC 61508, titled &ldquo;Functional Safety of Electrical/Electronic/Programmable Electronic Safety-related Systems,&rdquo; is the foundational international standard for functional safety. Published in seven parts, it provides a framework for ensuring safety-critical systems operate reliably to prevent harm to people, property, and the environment.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                For PLC programmers, IEC 61508 defines stringent requirements for safety system design, implementation, validation, and ongoing maintenance. Compliance is mandatory for industries including oil and gas, chemical processing, pharmaceuticals, nuclear power, and any application where system failure could cause serious injury or death.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 my-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">The Seven Parts of IEC 61508</h3>
                <ul className="space-y-2 ml-6">
                  <li className="text-gray-700"><strong>Part 1:</strong> General requirements for safety lifecycle</li>
                  <li className="text-gray-700"><strong>Part 2:</strong> Requirements for E/E/PE safety-related systems</li>
                  <li className="text-gray-700"><strong>Part 3:</strong> Software requirements (most relevant for PLC programming)</li>
                  <li className="text-gray-700"><strong>Part 4:</strong> Definitions and abbreviations</li>
                  <li className="text-gray-700"><strong>Part 5:</strong> Examples of methods for determination of SIL</li>
                  <li className="text-gray-700"><strong>Part 6:</strong> Guidelines on application of Parts 2 and 3</li>
                  <li className="text-gray-700"><strong>Part 7:</strong> Overview of techniques and measures</li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section id="sil-levels" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="assessment" className="text-4xl text-blue-600" />
                Understanding SIL Levels
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Safety Integrity Level (SIL) is a measure of risk reduction provided by a safety function. Higher SIL levels require more stringent design, validation, and testing to achieve lower probability of dangerous failure.
              </p>

              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-2 border-gray-300 rounded-lg text-sm">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">SIL Level</th>
                      <th className="px-4 py-3 text-left font-semibold">Probability of Failure per Hour</th>
                      <th className="px-4 py-3 text-left font-semibold">Risk Reduction Factor</th>
                      <th className="px-4 py-3 text-left font-semibold">Typical Applications</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold text-gray-900">SIL 1</td>
                      <td className="px-4 py-3 text-gray-700">10⁻¹ to 10⁻²</td>
                      <td className="px-4 py-3 text-gray-700">10 to 100</td>
                      <td className="px-4 py-3 text-gray-700">Minor injury risk, equipment protection</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">SIL 2</td>
                      <td className="px-4 py-3 text-gray-700">10⁻² to 10⁻³</td>
                      <td className="px-4 py-3 text-gray-700">100 to 1,000</td>
                      <td className="px-4 py-3 text-gray-700">Serious injury risk, standard machinery</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold text-gray-900">SIL 3</td>
                      <td className="px-4 py-3 text-gray-700">10⁻³ to 10⁻⁴</td>
                      <td className="px-4 py-3 text-gray-700">1,000 to 10,000</td>
                      <td className="px-4 py-3 text-gray-700">Fatal injury risk, critical processes</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">SIL 4</td>
                      <td className="px-4 py-3 text-gray-700">10⁻⁴ to 10⁻⁵</td>
                      <td className="px-4 py-3 text-gray-700">10,000 to 100,000</td>
                      <td className="px-4 py-3 text-gray-700">Catastrophic risk, nuclear, aviation</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 my-6 border-l-4 border-yellow-500">
                <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Icon name="info" className="text-2xl text-yellow-600" />
                  ISO 13849 Performance Level Equivalents
                </h4>
                <p className="text-gray-700 mb-3">
                  For machinery applications, ISO 13849-1 uses Performance Levels (PL) instead of SIL:
                </p>
                <ul className="space-y-1 ml-6 text-gray-700">
                  <li><strong>PL e:</strong> Roughly equivalent to SIL 3</li>
                  <li><strong>PL d:</strong> Roughly equivalent to SIL 2</li>
                  <li><strong>PL c:</strong> Roughly equivalent to SIL 1</li>
                  <li><strong>PL a/b:</strong> Lower than SIL 1</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section id="risk-assessment" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="analytics" className="text-4xl text-blue-600" />
                Risk Assessment and SIL Determination
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Before implementing safety functions, you must conduct a thorough risk assessment to determine the required SIL level for each safety function.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 my-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Risk Assessment Process</h3>
                <ol className="space-y-4 ml-6">
                  <li className="text-gray-700">
                    <strong className="text-blue-600">Step 1: Hazard Identification</strong><br/>
                    Identify all potential hazards in normal operation, maintenance, and fault conditions.
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-blue-600">Step 2: Risk Analysis</strong><br/>
                    Evaluate severity of harm and probability of occurrence for each hazard.
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-blue-600">Step 3: Risk Evaluation</strong><br/>
                    Determine if risk is tolerable or requires reduction through safety functions.
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-blue-600">Step 4: SIL Assignment</strong><br/>
                    Assign appropriate SIL level based on required risk reduction.
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-blue-600">Step 5: Safety Requirements Specification</strong><br/>
                    Document detailed requirements for each safety function.
                  </li>
                </ol>
              </div>
            </section>

            {/* Section 4 */}
            <section id="safety-plcs" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="verified_user" className="text-4xl text-blue-600" />
                Safety-Rated PLC Platforms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Safety applications require certified safety PLCs with hardware and software validated to IEC 61508. Here are the major safety PLC platforms:
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Siemens Safety PLCs</h3>
                  <ul className="space-y-2 ml-6 text-sm text-gray-700">
                    <li><strong>S7-1500F/FH:</strong> SIL 3 / PLe certified</li>
                    <li><strong>S7-1200F:</strong> SIL 2 / PLd certified</li>
                    <li><strong>Software:</strong> TIA Portal Safety (F-programming)</li>
                    <li><strong>Features:</strong> Integrated standard + safety logic</li>
                    <li><strong>Safety I/O:</strong> PROFIsafe communication</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-white rounded-xl p-6 border-2 border-red-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Rockwell Safety PLCs</h3>
                  <ul className="space-y-2 ml-6 text-sm text-gray-700">
                    <li><strong>GuardLogix:</strong> SIL 3 / PLe certified</li>
                    <li><strong>Compact GuardLogix:</strong> SIL 3 / PLe certified</li>
                    <li><strong>Software:</strong> Studio 5000 with Safety</li>
                    <li><strong>Features:</strong> Integrated motion + safety</li>
                    <li><strong>Safety I/O:</strong> CIP Safety over EtherNet/IP</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border-2 border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Schneider Safety PLCs</h3>
                  <ul className="space-y-2 ml-6 text-sm text-gray-700">
                    <li><strong>M580 Safety:</strong> SIL 3 / PLe certified</li>
                    <li><strong>M262 Safety:</strong> SIL 2 / PLd certified</li>
                    <li><strong>Software:</strong> Control Expert Safety or Machine Expert Safety</li>
                    <li><strong>Features:</strong> Hot-standby safety systems</li>
                    <li><strong>Safety I/O:</strong> PROFIsafe or Modbus Safety</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border-2 border-purple-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Other Safety Platforms</h3>
                  <ul className="space-y-2 ml-6 text-sm text-gray-700">
                    <li><strong>Omron NX-SL:</strong> SIL 3 / PLe certified</li>
                    <li><strong>ABB AC500-S:</strong> SIL 3 / PLe certified</li>
                    <li><strong>Pilz PSS4000:</strong> SIL 3 / PLe certified</li>
                    <li><strong>SICK:</strong> Dedicated safety controllers</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="programming" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="code" className="text-4xl text-blue-600" />
                Safety PLC Programming
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Safety programming follows strict rules and uses certified function blocks to ensure reliable operation.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 my-6 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Example: Emergency Stop Safety Function (Siemens S7-1500F)</h3>
                <div className="bg-white rounded-lg p-4 font-mono text-sm border border-gray-300">
                  <pre className="text-gray-800">
{`// Safety Program - Emergency Stop
// SIL 3 / PLe certified function

FUNCTION_BLOCK FB_EmergencyStop
VAR_INPUT
    EStop_Ch1 : BOOL;  // E-Stop input channel 1
    EStop_Ch2 : BOOL;  // E-Stop input channel 2 (redundant)
    Reset : BOOL;      // Manual reset button
END_VAR
VAR_OUTPUT
    SafeOutput : BOOL; // Safe motor enable
    Error : BOOL;      // Discrepancy error
END_VAR
VAR
    F_FDBACK : F_FDBACK;  // Certified feedback monitoring
END_VAR

// Emergency stop with redundant channels
IF (EStop_Ch1 AND EStop_Ch2) THEN
    SafeOutput := TRUE;  // Both channels OK
ELSE
    SafeOutput := FALSE; // At least one E-Stop active
END_IF;

// Channel discrepancy monitoring
IF (EStop_Ch1 XOR EStop_Ch2) THEN
    Error := TRUE;  // Channels disagree - fault condition
    SafeOutput := FALSE;
END_IF;

// Reset only allowed when both channels released
IF Reset AND EStop_Ch1 AND EStop_Ch2 THEN
    Error := FALSE;
END_IF;

END_FUNCTION_BLOCK`}
                  </pre>
                </div>
              </div>

              <div className="bg-red-50 rounded-xl p-6 my-6 border-l-4 border-red-500">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Safety Programming Rules</h4>
                <ul className="space-y-2 ml-6">
                  <li className="text-gray-700">Use ONLY certified safety function blocks from manufacturer library</li>
                  <li className="text-gray-700">Implement redundancy for SIL 2 and above (dual-channel inputs)</li>
                  <li className="text-gray-700">Include cross-monitoring to detect faults between channels</li>
                  <li className="text-gray-700">Safety logic must be fail-safe (outputs de-energize on failure)</li>
                  <li className="text-gray-700">Require manual reset after safety function activation</li>
                  <li className="text-gray-700">No conditional resets that could bypass safety</li>
                  <li className="text-gray-700">Safety and standard logic execute in separate CPU partitions</li>
                </ul>
              </div>
            </section>

            {/* Section 6 - Validation */}
            <section id="validation" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="check_circle" className="text-4xl text-blue-600" />
                Validation and Testing
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                IEC 61508 requires rigorous testing to verify safety functions operate correctly under all conditions, including fault scenarios.
              </p>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Required Testing Activities</h3>
                  <ul className="space-y-2 ml-6">
                    <li className="text-gray-700"><strong>Unit Testing:</strong> Test individual safety function blocks</li>
                    <li className="text-gray-700"><strong>Integration Testing:</strong> Verify interaction between safety functions</li>
                    <li className="text-gray-700"><strong>System Testing:</strong> Complete system validation with all I/O</li>
                    <li className="text-gray-700"><strong>Fault Injection:</strong> Test response to sensor failures, communication errors</li>
                    <li className="text-gray-700"><strong>Stress Testing:</strong> Verify performance under extreme conditions</li>
                    <li className="text-gray-700"><strong>Proof Testing:</strong> Periodic testing to detect dangerous failures</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section id="documentation" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="description" className="text-4xl text-blue-600" />
                Safety Documentation Requirements
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Comprehensive documentation is mandatory for IEC 61508 compliance and certification.
              </p>

              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-2 border-gray-300 rounded-lg text-sm">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Document</th>
                      <th className="px-4 py-3 text-left font-semibold">Purpose</th>
                      <th className="px-4 py-3 text-left font-semibold">Required For</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold">Safety Requirements Specification</td>
                      <td className="px-4 py-3 text-gray-700">Detailed safety function requirements</td>
                      <td className="px-4 py-3 text-gray-700">All SIL levels</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-4 py-3 font-semibold">Safety Plan</td>
                      <td className="px-4 py-3 text-gray-700">Overall safety lifecycle management</td>
                      <td className="px-4 py-3 text-gray-700">All SIL levels</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 font-semibold">FMEDA Report</td>
                      <td className="px-4 py-3 text-gray-700">Failure modes and diagnostic analysis</td>
                      <td className="px-4 py-3 text-gray-700">SIL 2-4</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-4 py-3 font-semibold">Validation Report</td>
                      <td className="px-4 py-3 text-gray-700">Test results and verification</td>
                      <td className="px-4 py-3 text-gray-700">All SIL levels</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold">Safety Manual</td>
                      <td className="px-4 py-3 text-gray-700">Operation and maintenance procedures</td>
                      <td className="px-4 py-3 text-gray-700">All SIL levels</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 8 */}
            <section id="common-functions" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="functions" className="text-4xl text-blue-600" />
                Common Safety Functions
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                IEC 61508 defines standard safety functions commonly implemented across industries. Here are the most critical ones:
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-red-50 to-white rounded-xl p-6 border-2 border-red-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Emergency Stop (E-Stop)</h3>
                  <p className="text-gray-700 mb-3">
                    Immediately halts all machine motion when activated. Requires dual-channel monitoring for SIL 2+ and manual reset.
                  </p>
                  <ul className="space-y-1 ml-6 text-sm text-gray-700">
                    <li><strong>SIL Rating:</strong> Typically SIL 3 / PLe</li>
                    <li><strong>Inputs:</strong> Redundant emergency stop buttons (2 channels)</li>
                    <li><strong>Outputs:</strong> Motor contactors, drive enables</li>
                    <li><strong>Response Time:</strong> &lt; 50ms</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-white rounded-xl p-6 border-2 border-yellow-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Safety Light Curtain</h3>
                  <p className="text-gray-700 mb-3">
                    Optical sensors detect personnel entering hazardous zones and trigger safe machine stop.
                  </p>
                  <ul className="space-y-1 ml-6 text-sm text-gray-700">
                    <li><strong>SIL Rating:</strong> SIL 2-3 / PLd-PLe</li>
                    <li><strong>Inputs:</strong> Safety light curtain OSSDs (Output Signal Switching Devices)</li>
                    <li><strong>Functions:</strong> Muting, blanking, cascading</li>
                    <li><strong>Response Time:</strong> Calculated from stopping time + light curtain response</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Safety Door Interlock</h3>
                  <p className="text-gray-700 mb-3">
                    Monitors guard doors and prevents machine operation when doors are open, or stops motion when doors open.
                  </p>
                  <ul className="space-y-1 ml-6 text-sm text-gray-700">
                    <li><strong>SIL Rating:</strong> SIL 2-3 / PLd-PLe</li>
                    <li><strong>Inputs:</strong> Safety door switches with coded magnets</li>
                    <li><strong>Functions:</strong> Guard locking, escape release</li>
                    <li><strong>Variants:</strong> Type 2 (monitoring only), Type 4 (locking)</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border-2 border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Safe Torque Off (STO)</h3>
                  <p className="text-gray-700 mb-3">
                    Removes power from drive motor, preventing unintended motion. Most common safety function in modern drives.
                  </p>
                  <ul className="space-y-1 ml-6 text-sm text-gray-700">
                    <li><strong>SIL Rating:</strong> SIL 2-3 / PLd-PLe</li>
                    <li><strong>Application:</strong> Integrated in VFDs and servo drives</li>
                    <li><strong>Standards:</strong> IEC 61800-5-2 for drive safety</li>
                    <li><strong>Activation:</strong> Via safety PLC or hardwired safety relay</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border-2 border-purple-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Two-Hand Control</h3>
                  <p className="text-gray-700 mb-3">
                    Requires simultaneous activation of two buttons to start machine operation, ensuring operator hands are clear of danger zone.
                  </p>
                  <ul className="space-y-1 ml-6 text-sm text-gray-700">
                    <li><strong>SIL Rating:</strong> SIL 2-3 / PLd-PLe</li>
                    <li><strong>Inputs:</strong> Dual palm buttons with time synchronization</li>
                    <li><strong>Timing:</strong> Both inputs within 0.5 seconds</li>
                    <li><strong>Types:</strong> Type IIIA, IIIB, IIIC per ISO 13851</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border-2 border-orange-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Safety Interlock Sequence</h3>
                  <p className="text-gray-700 mb-3">
                    Enforces specific operational sequences to prevent hazardous conditions (e.g., pressurized system must depressurize before access).
                  </p>
                  <ul className="space-y-1 ml-6 text-sm text-gray-700">
                    <li><strong>SIL Rating:</strong> SIL 1-3 depending on hazard severity</li>
                    <li><strong>Application:</strong> Chemical processes, pressure vessels, robotics</li>
                    <li><strong>Logic:</strong> State machine with condition monitoring</li>
                    <li><strong>Bypass:</strong> Maintenance bypass with key switch (logged)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 9 */}
            <section id="maintenance" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="build" className="text-4xl text-blue-600" />
                Proof Testing and Maintenance
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Safety systems degrade over time. IEC 61508 requires periodic proof testing to detect dangerous undetected failures and maintain the required SIL rating.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 my-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Proof Test Intervals</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 rounded-lg text-sm">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">SIL Level</th>
                        <th className="px-4 py-3 text-left font-semibold">Typical Interval</th>
                        <th className="px-4 py-3 text-left font-semibold">Maximum Interval</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="border-b border-gray-200">
                        <td className="px-4 py-3 font-semibold">SIL 1</td>
                        <td className="px-4 py-3 text-gray-700">12 months</td>
                        <td className="px-4 py-3 text-gray-700">24 months</td>
                      </tr>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <td className="px-4 py-3 font-semibold">SIL 2</td>
                        <td className="px-4 py-3 text-gray-700">6 months</td>
                        <td className="px-4 py-3 text-gray-700">12 months</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-semibold">SIL 3</td>
                        <td className="px-4 py-3 text-gray-700">3 months</td>
                        <td className="px-4 py-3 text-gray-700">6 months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 my-6 border-l-4 border-orange-500">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Proof Test Procedures</h4>
                <ol className="space-y-3 ml-6">
                  <li className="text-gray-700">
                    <strong className="text-orange-600">Functional Testing:</strong> Activate each safety input and verify correct safety response
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-orange-600">Redundancy Testing:</strong> Test each channel independently to verify discrepancy detection
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-orange-600">Timing Verification:</strong> Measure safety function response time against specifications
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-orange-600">Diagnostic Coverage:</strong> Verify built-in diagnostic functions detect faults
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-orange-600">Documentation:</strong> Record all test results, failures, and corrective actions
                  </li>
                  <li className="text-gray-700">
                    <strong className="text-orange-600">Component Replacement:</strong> Replace components showing wear or exceeding service life
                  </li>
                </ol>
              </div>

              <div className="bg-red-50 rounded-xl p-6 my-6 border-l-4 border-red-500">
                <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Icon name="warning" className="text-2xl text-red-600" />
                  Critical Maintenance Requirements
                </h4>
                <ul className="space-y-2 ml-6 text-gray-700">
                  <li>Never bypass or disable safety functions without proper lock-out/tag-out procedures</li>
                  <li>Maintain detailed logs of all proof tests and maintenance activities</li>
                  <li>Use only certified replacement components with same or higher SIL rating</li>
                  <li>Revalidate safety functions after any program modifications or component changes</li>
                  <li>Ensure maintenance personnel are trained and authorized for safety system work</li>
                </ul>
              </div>
            </section>

            {/* Section 10 */}
            <section id="compliance" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Icon name="verified" className="text-4xl text-blue-600" />
                Achieving IEC 61508 Compliance
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Full IEC 61508 compliance requires a systematic approach throughout the entire safety lifecycle.
              </p>

              <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 my-6 border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Compliance Checklist</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon name="check_circle" className="text-2xl text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Hazard and Risk Analysis Complete</h4>
                      <p className="text-sm text-gray-600">All hazards identified, risks evaluated, SIL levels assigned</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="check_circle" className="text-2xl text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Safety Requirements Specification</h4>
                      <p className="text-sm text-gray-600">Detailed functional requirements for each safety function</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="check_circle" className="text-2xl text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Certified Safety Hardware</h4>
                      <p className="text-sm text-gray-600">Safety PLCs, I/O modules, and field devices with proper SIL certification</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="check_circle" className="text-2xl text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Safety-Compliant Programming</h4>
                      <p className="text-sm text-gray-600">Using only certified function blocks, proper redundancy, fail-safe logic</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="check_circle" className="text-2xl text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Comprehensive Validation</h4>
                      <p className="text-sm text-gray-600">Unit, integration, system, and fault injection testing completed</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="check_circle" className="text-2xl text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Complete Documentation</h4>
                      <p className="text-sm text-gray-600">Safety plan, FMEDA, validation reports, safety manual</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="check_circle" className="text-2xl text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Third-Party Certification</h4>
                      <p className="text-sm text-gray-600">Independent assessment by TÜV, UL, or other notified body</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="check_circle" className="text-2xl text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900">Ongoing Maintenance Program</h4>
                      <p className="text-sm text-gray-600">Proof testing schedule, component lifecycle tracking</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 my-6 border-l-4 border-blue-500">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Certification Bodies</h4>
                <p className="text-gray-700 mb-3">
                  Independent third-party certification validates IEC 61508 compliance:
                </p>
                <ul className="space-y-2 ml-6 text-gray-700">
                  <li><strong>TÜV (Germany):</strong> Most recognized for industrial safety certification</li>
                  <li><strong>UL (USA):</strong> Underwriters Laboratories - North America focus</li>
                  <li><strong>FM Approvals:</strong> Factory Mutual - insurance-backed certification</li>
                  <li><strong>Exida:</strong> Specialized in functional safety and cybersecurity</li>
                  <li><strong>SGS:</strong> Global testing and certification services</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 my-6 border-2 border-purple-200">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Multi-Platform Compliance</h4>
                <p className="text-gray-700 mb-3">
                  All major PLC platforms support IEC 61508 compliance, but implementation varies:
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <h5 className="font-bold text-gray-900 mb-2">Siemens TIA Portal Safety</h5>
                    <p className="text-gray-600">Built-in safety program editor, automatic SIL verification, F-program compilation</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <h5 className="font-bold text-gray-900 mb-2">Rockwell Studio 5000 Safety</h5>
                    <p className="text-gray-600">Integrated safety task, GuardLogix certified blocks, SIL/PLr calculator</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <h5 className="font-bold text-gray-900 mb-2">Schneider Machine Expert Safety</h5>
                    <p className="text-gray-600">Unity Safety or Machine Expert Safety editor, M580 Safety platform</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <h5 className="font-bold text-gray-900 mb-2">CODESYS Safety</h5>
                    <p className="text-gray-600">Platform-independent safety runtime, multiple hardware vendors supported</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <div className="bg-gray-50 rounded-2xl p-8 my-12 border-2 border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                IEC 61508 compliance is essential for safety-critical PLC applications. By following the standard requirements for risk assessment, using certified safety PLCs, implementing proper safety programming practices, and maintaining rigorous documentation, you can achieve the necessary Safety Integrity Levels while protecting people and assets.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Modern AI-powered tools like PLCAutoPilot can assist with safety programming by generating certified function block implementations, ensuring proper redundancy, and automating documentation—but always under the supervision of qualified safety engineers and subject to full validation and certification processes.
              </p>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-8 text-white my-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="security" className="text-3xl" />
                Safety-Compliant PLC Programming with PLCAutoPilot
              </h3>
              <p className="text-lg mb-6 opacity-90">
                PLCAutoPilot generates IEC 61508-compliant safety logic using certified function blocks from all major platforms. Accelerate safety system development while maintaining full compliance.
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Learn About Safety Features
              </Link>
            </div>

            {/* Related Articles */}
            <div className="mt-12 pt-8 border-t-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Link href="/blog/plc-programming-tutorial" className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all group">
                  <Icon name="school" className="text-3xl text-blue-600 mb-3" />
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600">Complete PLC Programming Tutorial</h4>
                  <p className="text-gray-600 text-sm">Master fundamental PLC programming before safety applications.</p>
                </Link>
                <Link href="/blog/universal-plc-programming-guide" className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all group">
                  <Icon name="memory" className="text-3xl text-blue-600 mb-3" />
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600">Universal PLC Programming Guide</h4>
                  <p className="text-gray-600 text-sm">Learn safety PLC platforms across all major brands.</p>
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
