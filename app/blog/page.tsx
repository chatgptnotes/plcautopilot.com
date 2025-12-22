import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Icon from '../components/Icon';

export const metadata = {
  title: "PLC Programming Blog - Expert Tips & Tutorials | PLCAutoPilot",
  description: "Comprehensive PLC programming tutorials, ladder logic guides for all major brands: Schneider, Siemens, Rockwell, Omron, Mitsubishi. Industrial automation insights and AI-driven solutions.",
  keywords: ["PLC programming blog", "ladder logic tutorials", "Siemens PLC programming", "Allen-Bradley programming", "Modicon programming", "Omron PLC", "Mitsubishi PLC", "industrial automation", "automation engineering", "PLC code examples"],
};

export default function BlogPage() {
  const posts = [
    {
      slug: "plc-programming-tutorial",
      title: "Complete PLC Programming Tutorial 2025: From Basics to Advanced",
      excerpt: "Master PLC programming from scratch. Learn ladder logic, function blocks, structured text, and real-world applications with step-by-step examples.",
      category: "Tutorial",
      date: "January 15, 2025",
      readTime: "25 min read",
      icon: "school",
      featured: true
    },
    {
      slug: "ladder-logic-complete-guide",
      title: "Ladder Logic Complete Guide: Master Industrial Programming",
      excerpt: "Comprehensive guide to ladder logic programming. Learn relay logic, timers, counters, sequencing, and professional programming techniques.",
      category: "Programming",
      date: "January 10, 2025",
      readTime: "22 min read",
      icon: "code",
      featured: true
    },
    {
      slug: "universal-plc-programming-guide",
      title: "Universal PLC Programming Guide: Siemens, Rockwell, Schneider & More",
      excerpt: "Complete guide to programming all major PLC brands. Master TIA Portal, Studio 5000, CODESYS, GX Works3, and Sysmac Studio. Compare platforms and choose the right one.",
      category: "Hardware",
      date: "January 5, 2025",
      readTime: "32 min read",
      icon: "memory",
      featured: true
    },
    {
      slug: "ai-plc-programming",
      title: "AI in PLC Programming: The Complete 2025 Guide",
      excerpt: "How artificial intelligence is transforming PLC programming. Learn about automated code generation, optimization, and the future of industrial automation.",
      category: "AI & Automation",
      date: "December 28, 2024",
      readTime: "18 min read",
      icon: "smart_toy"
    },
    {
      slug: "iec-61508-safety",
      title: "IEC 61508 Safety Standards: Complete Implementation Guide",
      excerpt: "Master functional safety in PLC programming. Complete guide to SIL levels 1-4, safety PLCs (Siemens S7-1500F, GuardLogix), proof testing, and compliance certification.",
      category: "Safety",
      date: "December 20, 2024",
      readTime: "20 min read",
      icon: "shield"
    },
    {
      slug: "hmi-scada-integration",
      title: "HMI and SCADA Integration: Complete PLC Connectivity Guide",
      excerpt: "Learn HMI and SCADA integration with all major PLCs. Master OPC UA, Modbus TCP, FactoryTalk View, WinCC, Ignition SCADA, and Wonderware with real configuration examples.",
      category: "Integration",
      date: "December 21, 2024",
      readTime: "18 min read",
      icon: "dashboard"
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16 bg-gradient-to-br from-blue-50 to-white rounded-3xl p-12">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              PLC Programming & Automation Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Expert tutorials, in-depth guides, and best practices for industrial automation engineers.
              Master PLC programming, ladder logic, and accelerate your automation projects.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#featured" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                Featured Posts
              </Link>
              <Link href="#all-posts" className="px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-all">
                All Articles
              </Link>
            </div>
          </div>

          {/* Featured Posts */}
          <div id="featured" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Icon name="star" className="text-4xl text-yellow-500" />
              Featured Tutorials
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {posts.filter(post => post.featured).map((post, index) => (
                <Link
                  key={index}
                  href={`/blog/${post.slug}`}
                  className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-2xl transition-all transform hover:-translate-y-1"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white">
                    <Icon name={post.icon} className="text-5xl mb-4" />
                    <span className="text-sm font-semibold opacity-90">{post.category}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                      <div className="flex items-center gap-1 text-blue-600 font-semibold">
                        Read Full Guide
                        <Icon name="arrow_forward" className="text-sm" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* All Posts */}
          <div id="all-posts" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">All Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post, index) => (
                <article key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={post.icon} className="text-2xl text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-500">{post.date}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{post.readTime}</span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-sm text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1"
                        >
                          Read More
                          <Icon name="arrow_forward" className="text-xs" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-3xl p-12 text-center text-white">
            <Icon name="mail" className="text-6xl mb-4 mx-auto" />
            <h2 className="text-3xl font-bold mb-4">Get Weekly PLC Programming Tips</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join 5,000+ automation engineers receiving expert tutorials, code examples, and industry insights every week.
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your work email"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 text-lg focus:ring-2 focus:ring-white"
                required
              />
              <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors whitespace-nowrap">
                Subscribe Free
              </button>
            </form>
            <p className="text-sm mt-4 opacity-75">No spam. Unsubscribe anytime. 100% free forever.</p>
          </div>

          {/* Categories */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {['Tutorial', 'Programming', 'Hardware', 'AI & Automation', 'Safety', 'Integration'].map((category, index) => (
                <Link
                  key={index}
                  href={`/blog?category=${category.toLowerCase()}`}
                  className="bg-gray-50 p-6 rounded-xl text-center hover:bg-blue-50 hover:border-2 hover:border-blue-500 transition-all group"
                >
                  <p className="font-semibold text-gray-900 group-hover:text-blue-600">
                    {category}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
