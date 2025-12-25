import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-base sm:text-lg md:text-xl font-bold">PLCAutoPilot</span>
            </Link>
            <p className="text-gray-400">
              Universal AI-powered PLC programming for all major platforms: Siemens, Rockwell, Mitsubishi, Schneider, and 500+ brands.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#platforms" className="text-gray-400 hover:text-white transition-colors">Platforms</Link></li>
              <li><Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#demo" className="text-gray-400 hover:text-white transition-colors">Demo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#security" className="text-gray-400 hover:text-white transition-colors">Security</Link></li>
              <li><Link href="#compliance" className="text-gray-400 hover:text-white transition-colors">Compliance</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm space-y-2">
          <p>&copy; 2025 PLCAutoPilot. All rights reserved.</p>
          <p>Founded by Dr. Murali BK | Powered by Dr.M Hope Softwares | A Bettroi Product</p>
          <p>Universal Multi-Platform Support: Siemens, Rockwell, Mitsubishi, Schneider, ABB, and 500+ PLC Brands</p>
          <p className="text-xs text-gray-500 mt-4">
            PLCAutoPilot v1.3 | Last Updated: 2025-12-23 | Multi-Platform AI Support Now Available |
            <a href="https://github.com/chatgptnotes/plcautopilot.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 ml-1">
              github.com/chatgptnotes/plcautopilot.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
