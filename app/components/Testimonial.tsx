import Icon from './Icon';

export default function Testimonial() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-gray-800 p-12 rounded-3xl border border-gray-700">
          <div className="mb-6">
            <Icon name="format_quote" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-blue-500" />
          </div>
          <blockquote className="text-2xl text-white mb-8 leading-relaxed">
            What used to take me 3 weeks now takes 2 days. PLCAutoPilot generates clean, well-structured ladder logic
            that I can actually trust. The safety interlock highlighting is brilliant.
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
              MC
            </div>
            <div>
              <div className="text-lg font-bold text-white">Michael Chen</div>
              <div className="text-gray-400">Senior Controls Engineer, Manufacturing Systems Inc.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
