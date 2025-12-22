'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-slide-in-left">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold animate-fade-in">
              Automating the Automation
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight animate-fade-in-up">
              Transform Specs Into Production-Ready{' '}
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                PLC Code
              </span>{' '}
              in Minutes
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              The world&apos;s first AI-powered PLC autopilot that works with ALL major platforms:
              Siemens, Rockwell, Mitsubishi, Schneider Electric, and 500+ CODESYS brands. Complete automation solutions for PLC, SCADA, and industrial controls.
              Reduce project time by 80% while maintaining IEC 61508 safety standards.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/generator"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg font-semibold text-center hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Try Generator Now
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-12 pt-8 border-t border-gray-200">
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-600">80%</div>
                <div className="text-xs sm:text-sm text-gray-600">Faster Development</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-600">99.9%</div>
                <div className="text-xs sm:text-sm text-gray-600">Code Accuracy</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-600">100%</div>
                <div className="text-xs sm:text-sm text-gray-600">Safety Verified</div>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 hover:shadow-blue-500/20">
              <div className="bg-gray-800 px-5 py-3 flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-gray-400 text-sm font-medium">ConveyorControl.ld</span>
              </div>
              <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-2 overflow-x-auto">
                <div className="flex gap-3 sm:gap-6 min-w-max">
                  <span className="text-gray-500">1</span>
                  <span className="text-gray-300">
                    |--[<span className="text-blue-400">START_BTN</span>]--[<span className="text-blue-400">SAFETY_OK</span>]--( <span className="text-green-400">MOTOR_RUN</span> )
                  </span>
                </div>
                <div className="flex gap-3 sm:gap-6 min-w-max">
                  <span className="text-gray-500">2</span>
                  <span className="text-gray-300">|</span>
                </div>
                <div className="flex gap-3 sm:gap-6 items-center bg-blue-500/10 -mx-4 sm:-mx-6 px-4 sm:px-6 py-1 min-w-max">
                  <span className="text-gray-500">3</span>
                  <span className="text-gray-300">
                    |--[/<span className="text-blue-400">ESTOP</span>]--[/<span className="text-blue-400">FAULT</span>]--(<span className="text-green-400">ENABLE</span>)
                  </span>
                  <span className="ml-auto text-xs bg-red-500 text-white px-2 py-1 rounded font-bold whitespace-nowrap">
                    SAFETY CRITICAL
                  </span>
                </div>
                <div className="flex gap-3 sm:gap-6 min-w-max">
                  <span className="text-gray-500">4</span>
                  <span className="text-gray-300">|</span>
                </div>
                <div className="flex gap-3 sm:gap-6 min-w-max">
                  <span className="text-gray-500">5</span>
                  <span className="text-gray-300">
                    |--[<span className="text-blue-400">SENSOR_1</span>]--[<span className="text-blue-400">TIMER_DN</span>]--( <span className="text-green-400">OUTPUT_1</span> )
                  </span>
                </div>
              </div>
              <div className="bg-blue-500/10 px-5 py-3 flex items-center gap-2 text-blue-400 text-sm font-semibold">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                AI Generated & Verified
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
