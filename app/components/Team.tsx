import Icon from './Icon';

export default function Team() {
  const team = [
    {
      name: 'Dr. Murali BK',
      role: 'Founder & Owner',
      credentials: 'AI & Industrial Automation Expert',
      education: 'Advanced Studies in AI & Machine Learning',
      experience: 'Expert in AI-driven Industrial Automation Systems',
      company: 'PLCAutoPilot',
      location: 'Technology & Business Leadership',
      icon: 'person',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Meet the Founder
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Combining deep industrial expertise with cutting-edge AI technology
          </p>
        </div>

        <div className="flex justify-center max-w-2xl mx-auto">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name={member.icon} className="text-4xl text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-lg text-blue-600 font-semibold mb-2">{member.role}</p>
                  <p className="text-gray-700 font-medium mb-3">{member.credentials}</p>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <Icon name="school" className="text-base text-gray-400 flex-shrink-0 mt-0.5" />
                      <span>{member.education}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="work" className="text-base text-gray-400 flex-shrink-0 mt-0.5" />
                      <span>{member.experience}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="business" className="text-base text-gray-400 flex-shrink-0 mt-0.5" />
                      <span>{member.company}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="location_on" className="text-base text-gray-400 flex-shrink-0 mt-0.5" />
                      <span>{member.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg max-w-3xl mx-auto">
            <p className="text-gray-700 leading-relaxed">
              <strong>Our Mission:</strong> Bridging the gap between traditional industrial automation and modern AI technology.
              With deep roots in PLC programming and industrial control systems, combined with cutting-edge AI research,
              we are uniquely positioned to transform how automation engineers work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
