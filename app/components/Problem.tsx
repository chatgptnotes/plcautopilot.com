import Icon from './Icon';

export default function Problem() {
  const problems = [
    { icon: 'schedule', title: 'Weeks of Manual Coding', desc: 'Converting specifications to ladder logic takes 40+ hours per project' },
    { icon: 'autorenew', title: 'Repetitive Work', desc: 'Writing the same patterns for motors, conveyors, and safety interlocks' },
    { icon: 'warning', title: 'Safety Risks', desc: 'Manual coding increases the chance of critical safety errors' },
    { icon: 'groups', title: 'Talent Shortage', desc: 'Experienced PLC programmers are expensive and hard to find' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            The Challenge Every Automation Engineer Faces
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            PLC programming is tedious, time-consuming, and error-prone
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="mb-4">
                <Icon name={problem.icon} className="text-5xl text-blue-600" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3">{problem.title}</h3>
              <p className="text-gray-600">{problem.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
