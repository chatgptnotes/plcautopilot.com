import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, CheckCircle } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const AboutUs = () => {
  const navigate = useNavigate();
  const [sectionsVisible, setSectionsVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const conditions = [
    {
      title: "ADHD",
      description: "Attention deficit hyperactivity or inactivity disease"
    },
    {
      title: "ANXIETY/DEPRESSION",
      description: "Highly useful in corelating and measuring the levels with clinical diagnosis ofcourse"
    },
    {
      title: "AUTISM",
      description: "Valuable in understanding the autistic spectrum or learning disease"
    },
    {
      title: "DEMENTIA",
      description: "Very valuable with the conflit analysis for diagnosing and quantifying the types of dementia"
    },
    {
      title: "MENTAL WELLNESS",
      description: "To understand the optimum functioning of the brain and the mental functions"
    },
    {
      title: "PTSD",
      description: "Understanding the post traumatic stress disease better and mapping some biomarkers for assisting in therapy."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
      `}</style>

      {/* Main Content */}
      <div className="w-full pt-16">
        {/* Hero Section */}
        <section
          ref={(el) => (sectionRefs.current.hero = el)}
          data-section="hero"
          className={`bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 px-4 transition-all duration-1000 ${
            sectionsVisible.hero ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={sectionsVisible.hero ? 'animate-slideInLeft' : 'opacity-0'}>
                <h1 className="text-5xl md:text-6xl font-bold text-[#4A90E2] mb-6 leading-tight">
                  Brain Health &<br />Longevity Management
                </h1>
                <p className="text-lg text-gray-700 mb-4">
                  Unlock your brain's full potential with personalized wellness through cutting edge precision analysis.
                </p>
                <p className="text-lg text-gray-700">
                  NeuroSense EEG Intelligence is a pioneering company at the forefront of neurotechnology, specializing in advanced brain mapping techniques using electroencephalography (EEG) and Quantitative analysis using the world's credible and reliable databases.
                </p>
              </div>
              <div className={`relative ${sectionsVisible.hero ? 'animate-slideInRight' : 'opacity-0'}`}>
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#4A90E2] to-[#357ABD] text-white px-6 py-3 rounded-lg shadow-xl animate-pulse">
                  <p className="font-semibold">We have Mapped over</p>
                  <p className="text-2xl font-bold">1000 Brains & Counting</p>
                </div>
                <div className="mt-16 flex justify-center">
                  <Brain className="w-64 h-64 text-[#4A90E2] drop-shadow-2xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Precision Brain Analysis Section */}
        <section
          ref={(el) => (sectionRefs.current.precision = el)}
          data-section="precision"
          className={`py-20 px-4 bg-white transition-all duration-1000 ${
            sectionsVisible.precision ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-6xl mx-auto text-center">
            <h2 className={`text-4xl md:text-5xl font-bold text-[#4A90E2] mb-8 ${sectionsVisible.precision ? 'animate-fadeInUp' : 'opacity-0'}`}>
              Precision Brain Analysis For All
            </h2>
            <div className={`space-y-6 text-lg text-gray-700 max-w-5xl mx-auto ${sectionsVisible.precision ? 'animate-fadeIn delay-200' : 'opacity-0'}`}>
              <p className="leading-relaxed">
                Precision brain analysis transforms brain health by providing detailed insights into brain function, leading to more accurate diagnoses and personalized treatment plans. It enhances neuropsychiatric care with targeted interventions and reduces trial and error in treatment.
              </p>
              <p className="leading-relaxed">
                For neuropsychiatric conditions, it enables customized care based on specific brain patterns, improving treatment outcomes. In brain wellness, it supports cognitive optimization and preventive care by identifying strengths and risks early, promoting overall well being.
              </p>
              <p className="leading-relaxed font-semibold">
                Our dedicated 20 page analysis Neuro Sense Report is detailed and intuitive. We focus on individualized, holistic, and integrative recommendations.
              </p>
            </div>
            <button
              onClick={() => navigate('/register')}
              className={`mt-10 bg-gradient-to-r from-[#4A90E2] to-[#357ABD] hover:from-[#357ABD] hover:to-[#4A90E2] text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl ${sectionsVisible.precision ? 'animate-fadeInUp delay-300' : 'opacity-0'}`}
            >
              CONTACT US
            </button>
          </div>
        </section>

        {/* Get Your Brain Mapped Section */}
        <section
          ref={(el) => (sectionRefs.current.steps = el)}
          data-section="steps"
          className={`py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50 transition-all duration-1000 ${
            sectionsVisible.steps ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl md:text-5xl font-bold text-[#4A90E2] text-center mb-16 ${sectionsVisible.steps ? 'animate-fadeInUp' : 'opacity-0'}`}>
              Get Your Brain Mapped For A<br />Bright Future
            </h2>

            <div className="space-y-12">
              {/* Step 01 */}
              <div className={`bg-white rounded-2xl shadow-xl p-8 border-l-4 border-[#4A90E2] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${sectionsVisible.steps ? 'animate-fadeInUp delay-100' : 'opacity-0'}`}>
                <div className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div className="text-[#4A90E2]">
                      <p className="text-sm font-semibold mb-1">STEP</p>
                      <p className="text-6xl font-bold">01</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      Measure EEG The Comprehensive Package
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Capture comprehensive EEG data with our full package, designed for both clinical and wellness applications. Our advanced EEG recording system ensures high quality, reliable measurements, offering a detailed view of brainwave activity across multiple channels. With this complete setup, you can uncover vital information about brain function and detect potential abnormalities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 02 */}
              <div className={`bg-white rounded-2xl shadow-xl p-8 border-l-4 border-[#4A90E2] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${sectionsVisible.steps ? 'animate-fadeInUp delay-300' : 'opacity-0'}`}>
                <div className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div className="text-[#4A90E2]">
                      <p className="text-sm font-semibold mb-1">STEP</p>
                      <p className="text-6xl font-bold">02</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      Upload EEG & allow us to run your report
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Easily upload your EEG data in the standard .EDF (European Data Format) to our platform for expert analysis. The .EDF format ensures compatibility and consistency, allowing us to process and interpret your brainwave data efficiently. Once uploaded, our team of specialists will analyze the data to uncover meaningful patterns and insights that are critical for both diagnostic and wellness purposes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 03 */}
              <div className={`bg-white rounded-2xl shadow-xl p-8 border-l-4 border-[#4A90E2] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${sectionsVisible.steps ? 'animate-fadeInUp delay-500' : 'opacity-0'}`}>
                <div className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div className="text-[#4A90E2]">
                      <p className="text-sm font-semibold mb-1">STEP</p>
                      <p className="text-6xl font-bold">03</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      Get a Detailed Neurosense Report
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Receive an in depth QEEG report that provides a comprehensive overview of your brain's electrical activity. Our reports include detailed maps, statistical analyses, and comparisons with normative databases, highlighting areas that may require attention. This detailed analysis supports accurate diagnosis and helps in crafting personalized treatment or wellness plans to optimize brain health and function.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conditions Section */}
        <section
          ref={(el) => (sectionRefs.current.conditions = el)}
          data-section="conditions"
          className={`py-20 px-4 bg-white transition-all duration-1000 ${
            sectionsVisible.conditions ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl md:text-5xl font-bold text-[#4A90E2] text-center mb-8 ${sectionsVisible.conditions ? 'animate-fadeInUp' : 'opacity-0'}`}>
              Conditions Where Neuro Sense<br />is Indicated
            </h2>
            <p className={`text-center text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed ${sectionsVisible.conditions ? 'animate-fadeIn delay-200' : 'opacity-0'}`}>
              We use a non invasive EEG analysis tool for brain wellness and neuropsychiatric practice. Our hardware is easy to use and point of care. Our software analyzes brainwave patterns to identify abnormalities and optimize brain function. We help monitor conditions like ADHD, depression, and anxiety by offering personalized insights into brain health, promoting overall mental well being. The findings from NeuroSense provide valuable support in adding integrative and Neuromodulation practices in your routine.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {conditions.map((condition, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 ${
                    sectionsVisible.conditions ? `animate-fadeInUp delay-${(index + 3) * 100}` : 'opacity-0'
                  }`}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[#4A90E2] to-[#357ABD] rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{condition.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {condition.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-[#4A90E2] to-[#357ABD] hover:from-[#357ABD] hover:to-[#4A90E2] text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                CONTACT US
              </button>
            </div>
          </div>
        </section>

        {/* Objective Measurement Section */}
        <section
          ref={(el) => (sectionRefs.current.objective = el)}
          data-section="objective"
          className={`py-20 px-4 bg-gradient-to-r from-[#4A90E2] to-[#357ABD] relative overflow-hidden transition-all duration-1000 ${
            sectionsVisible.objective ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>
          <div className="max-w-5xl mx-auto text-white relative z-10">
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-center ${sectionsVisible.objective ? 'animate-fadeInUp' : 'opacity-0'}`}>
              Objective Measurement Matters
            </h2>
            <div className={`text-lg leading-relaxed ${sectionsVisible.objective ? 'animate-fadeIn delay-200' : 'opacity-0'}`}>
              <p className="mb-4 text-center">
                Objective clinical measurements, such as X rays or electrocardiograms, are utilized in treating, diagnosing, and managing various medical conditions across different medical modalities. <span className="font-bold bg-white/20 px-2 py-1 rounded">Yet, they remain mostly absent in Neuropsychiatric care</span>. Objective measurements are crucial because they provide quantifiable and reliable data to ensure consistent and evidence based healthcare practices.
              </p>
            </div>
          </div>
        </section>

        {/* Neuro Sense Booking Section */}
        <section
          ref={(el) => (sectionRefs.current.booking = el)}
          data-section="booking"
          className={`py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50 transition-all duration-1000 ${
            sectionsVisible.booking ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl md:text-5xl font-bold text-[#4A90E2] text-center mb-16 ${sectionsVisible.booking ? 'animate-fadeInUp' : 'opacity-0'}`}>
              Neuro Sense Booking
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Only Data Processing */}
              <div className={`bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-transparent hover:border-[#4A90E2] transition-all duration-300 transform hover:-translate-y-2 ${sectionsVisible.booking ? 'animate-fadeInUp delay-200' : 'opacity-0'}`}>
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <Brain className="w-24 h-24 text-[#4A90E2]" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Only Data Processing (QEEG)</h3>
                  <div className="mb-4">
                    <span className="text-gray-400 line-through text-lg">AED1,550.00</span>
                    <span className="text-3xl font-bold text-[#4A90E2] ml-2">AED1,050.00</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-[#4A90E2] to-[#357ABD] hover:from-[#357ABD] hover:to-[#4A90E2] text-white py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Book Now
                  </button>
                </div>
              </div>

              {/* Neurosense Full QEEG */}
              <div className={`bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-transparent hover:border-[#4A90E2] transition-all duration-300 transform hover:-translate-y-2 relative ${sectionsVisible.booking ? 'animate-fadeInUp delay-400' : 'opacity-0'}`}>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-2 rounded-full text-sm font-semibold z-10 shadow-lg">
                  Now Available
                </div>
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <Brain className="w-24 h-24 text-[#4A90E2]" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Neurosense Full QEEG</h3>
                  <div className="mb-4">
                    <span className="text-gray-400 line-through text-lg">AED3,000.00</span>
                    <span className="text-3xl font-bold text-[#4A90E2] ml-2">AED2,500.00</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-[#4A90E2] to-[#357ABD] hover:from-[#357ABD] hover:to-[#4A90E2] text-white py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Report Sections */}
        <section
          ref={(el) => (sectionRefs.current.reports = el)}
          data-section="reports"
          className={`py-20 px-4 bg-white transition-all duration-1000 ${
            sectionsVisible.reports ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
              {/* A Detailed Report */}
              <div className={sectionsVisible.reports ? 'animate-slideInLeft' : 'opacity-0'}>
                <h3 className="text-3xl font-bold text-[#4A90E2] mb-4">A Detailed Report</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  The Neuro Sense Report delivers comprehensive insights into cognitive function, emotional regulation, sleep analysis, neurological markers, and peak performance optimization. It also provides recommendations for meditation, diet, neurofeedback therapies, the types of medications, and much more.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#4A90E2]" />
                    <span className="text-gray-700">Comprehensive cognitive analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#4A90E2]" />
                    <span className="text-gray-700">Personalized treatment recommendations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#4A90E2]" />
                    <span className="text-gray-700">Detailed statistical analyses</span>
                  </div>
                </div>
              </div>
              <div className={sectionsVisible.reports ? 'animate-slideInRight' : 'opacity-0'}>
                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-xl">
                  <Brain className="w-full h-64 text-[#4A90E2]" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`order-2 md:order-1 ${sectionsVisible.reports ? 'animate-slideInLeft delay-300' : 'opacity-0'}`}>
                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-xl">
                  <Brain className="w-full h-64 text-[#4A90E2]" />
                </div>
              </div>
              <div className={`order-1 md:order-2 ${sectionsVisible.reports ? 'animate-slideInRight delay-300' : 'opacity-0'}`}>
                <h3 className="text-3xl font-bold text-[#4A90E2] mb-4">
                  Personalized Recommendations<br />& Insights
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Neurosense utilizes your brain information to provide tailored suggestions and analysis. Get personalized insights for supplements, medications, meditation, and a range of neuro modulation services to optimize your overall well being.
                </p>
                <button
                  onClick={() => navigate('/register')}
                  className="bg-gradient-to-r from-[#4A90E2] to-[#357ABD] hover:from-[#357ABD] hover:to-[#4A90E2] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  CONTACT US
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          ref={(el) => (sectionRefs.current.testimonials = el)}
          data-section="testimonials"
          className={`py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50 transition-all duration-1000 ${
            sectionsVisible.testimonials ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-4xl md:text-5xl font-bold text-[#4A90E2] mb-16 ${sectionsVisible.testimonials ? 'animate-fadeInUp' : 'opacity-0'}`}>
              Neurosense EEG Testimonials
            </h2>
            <div className={`bg-white rounded-2xl p-10 shadow-2xl border-t-4 border-[#4A90E2] ${sectionsVisible.testimonials ? 'animate-fadeInUp delay-200' : 'opacity-0'}`}>
              <p className="text-sm text-gray-500 mb-2 font-semibold">Mahadev TS</p>
              <div className="h-1 w-16 bg-yellow-400 mx-auto mb-6 rounded-full"></div>
              <p className="text-lg text-gray-800 italic leading-relaxed">
                "NeuroSense has elevated my performance to new heights. The precision brain analysis and customized neuro modulation services have optimized my cognitive functions and mental resilience. Whether it's enhancing focus during high stakes projects or improving overall productivity, NeuroSense has been instrumental in achieving peak performance."
              </p>
              <div className="flex justify-center gap-2 mt-8">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-2 bg-[#4A90E2] rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Neurosense Academy */}
        <section
          ref={(el) => (sectionRefs.current.academy = el)}
          data-section="academy"
          className={`py-20 px-4 bg-gradient-to-r from-[#4A90E2] to-[#357ABD] text-white relative overflow-hidden transition-all duration-1000 ${
            sectionsVisible.academy ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={sectionsVisible.academy ? 'animate-slideInLeft' : 'opacity-0'}>
                <h2 className="text-4xl font-bold mb-6">Neurosense Academy</h2>
                <p className="text-lg leading-relaxed mb-8">
                  NeuroSense Academy is a premier institution offering specialized courses in neuroscience, including QEEG and brain based interventions. Our programs provide students with a deep understanding of brain function, supported by experienced faculty and state of the art facilities. We are committed to delivering top tier education and preparing students for successful careers in this dynamic field. Join us to take the first step toward a rewarding journey in neuroscience.
                </p>
                <button
                  onClick={() => navigate('/register')}
                  className="bg-white text-[#4A90E2] hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  CONTACT US
                </button>
              </div>
              <div className={sectionsVisible.academy ? 'animate-slideInRight' : 'opacity-0'}>
                <div className="bg-white/20 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
                  <Brain className="w-full h-64 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section
          ref={(el) => (sectionRefs.current.cta = el)}
          data-section="cta"
          className={`py-20 px-4 bg-white transition-all duration-1000 ${
            sectionsVisible.cta ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-6xl mx-auto text-center">
            <h2 className={`text-4xl md:text-5xl font-bold text-[#4A90E2] mb-6 ${sectionsVisible.cta ? 'animate-fadeInUp' : 'opacity-0'}`}>
              Precision Brain Analysis for All
            </h2>
            <p className={`text-lg text-gray-700 mb-12 ${sectionsVisible.cta ? 'animate-fadeIn delay-200' : 'opacity-0'}`}>
              Let's come together to advance brain health through precision analysis.
            </p>
            <div className={`flex justify-center gap-4 mb-12 flex-wrap ${sectionsVisible.cta ? 'animate-fadeInUp delay-300' : 'opacity-0'}`}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#4A90E2] shadow-lg hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <Brain className="w-12 h-12 text-[#4A90E2]" />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/register')}
              className={`bg-gradient-to-r from-[#4A90E2] to-[#357ABD] hover:from-[#357ABD] hover:to-[#4A90E2] text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl ${sectionsVisible.cta ? 'animate-fadeInUp delay-400' : 'opacity-0'}`}
            >
              CONTACT US
            </button>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
