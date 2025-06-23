import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Code, Shield, Brain, Zap, Calendar, ArrowRight, Github, Linkedin, Youtube, Settings, Cog } from 'lucide-react';

const Landing = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    { icon: Code, title: "Web Development", color: "from-blue-600 to-blue-800" },
    { icon: Zap, title: "Automation", color: "from-gray-600 to-gray-800" },
    { icon: Brain, title: "AI Solutions", color: "from-blue-700 to-gray-700" },
    { icon: Shield, title: "Cybersecurity", color: "from-gray-700 to-blue-900" }
  ];

  return (
    <div 
      className="full-width-override w-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 text-gray-900 overflow-x-hidden relative" 
      style={{ 
        width: '100vw', 
        marginLeft: 'calc(-50vw + 50%)', 
        marginRight: 'calc(-50vw + 50%)',
        marginTop: '0',
        paddingTop: '0',
        paddingBottom: '100px' // Add padding to extend background
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-10">
        {/* Background Art Image */}
        <div 
          className="absolute inset-0 w-full h-full opacity-15 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/gears.PNG')"
          }}
        />

        {/* Overlay to blend with theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/80 via-blue-50/70 to-gray-200/80" />

        {/* Animated Grid */}
        <div className="absolute inset-0 w-full h-full opacity-10">
          <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div 
                key={i} 
                className="border border-gray-300/20 animate-pulse"
                style={{ animationDelay: `${(i * 0.1) % 3}s` }}
              />
            ))}
          </div>
        </div>
        
        {/* Mouse Follower */}
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-blue-500/20 to-gray-500/20 rounded-full blur-3xl pointer-events-none transition-all duration-150 ease-out z-20"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>

      {/* Hero Section - Added more top padding and adjusted spacing */}
      <main className="w-screen relative z-30 flex flex-col items-center justify-center min-h-screen px-4 md:px-6 lg:px-8 text-center pt-24 sm:pt-32">
        <div className="w-full max-w-none">
          <div>
          <div className={`transition-all duration-1500 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl h-16 sm:h-16 font-bold mb-8 bg-gradient-to-r from-blue-700 to-gray-800 bg-clip-text text-transparent animate-pulse">
              NanGenLabs
            </h1>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl mb-8 h-10 sm:h-10 flex items-center justify-center">
              <span className="animate-pulse">Empowering Digital Transformation with</span>
            </div>
            {/* Rotating Services */}
            <div className="h-16 sm:h-16 flex items-center justify-center mb-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                // return (
                //   <div
                //     key={index}
                //     className={`absolute flex items-center space-x-2 sm:space-x-3 transition-all duration-1000 ${
                //       activeService === index 
                //         ? 'opacity-100 scale-100 rotate-0' 
                //         : 'opacity-0 scale-75 rotate-12'
                //     }`}
                //   >
                //     <Icon size={24} className={`sm:text-2xl bg-gradient-to-r ${service.color} bg-clip-text text-transparent`} />
                //     <span className={`text-xl sm:text-2xl md:text-3xl font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                //       {service.title}
                //     </span>
                //   </div>
                // );
              })}
            </div>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-12 sm:mb-16 leading-relaxed px-4">
              We bridge innovative technology with strategic solutions. Specialized in custom web development, 
              intelligent automation, transformative AI solutions, and comprehensive cybersecurity services including penetration testing that drive business growth and efficiency.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 sm:mb-16 transition-all duration-1500 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <Link href="/ContactUs">
              <button className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full font-semibold text-base sm:text-lg text-white hover:scale-105 transform transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl hover:shadow-blue-500/25 w-full sm:w-auto">
                <Calendar size={18} className="sm:w-5 sm:h-5" />
                <span>Book Consultation</span>
                <ArrowRight size={18} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
            
            <Link href="/Services">
              <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-600 text-blue-600 rounded-full font-semibold text-base sm:text-lg hover:bg-blue-600 hover:text-white hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-blue-500/25 w-full sm:w-auto">
                View Services
              </button>
            </Link>
          </div>

          {/* Social Links */}
          {/* <div className={`flex justify-center space-x-4 sm:space-x-6 mb-8 sm:mb-12 transition-all duration-1500 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
            {[Github, Linkedin, Youtube].map((Icon, index) => (
              <a 
                key={index}
                href="#" 
                className="p-2 sm:p-3 rounded-full bg-gray-200/80 backdrop-blur-md hover:bg-gray-300/80 transition-all duration-300 hover:scale-110 group"
              >
                <Icon size={20} className="sm:w-6 sm:h-6 text-gray-700 group-hover:text-blue-600 transition-colors duration-300" />
              </a>
            ))}
          </div> */}

          {/* Scroll Indicator */}
          <div className={`animate-bounce transition-all duration-1500 delay-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <ChevronDown size={28} className="sm:w-8 sm:h-8 text-blue-600" />
          </div>
        </div>
      </main>

      {/* Services Preview Section - Moved this outside of main to reduce bottom spacing */}
      <section className="w-screen relative z-30 py-16 sm:py-20 px-4 md:px-6 lg:px-8 -mt-8">
        <div className="max-w-none w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-blue-700 to-gray-800 bg-clip-text text-transparent">
            Our Expertise
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index}
                  className="group p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-200 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:bg-white/90 shadow-lg hover:shadow-xl"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${service.color} p-3 sm:p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} className="sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Transform your business with cutting-edge {service.title.toLowerCase()} solutions.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          25% { transform: translateY(-15px) rotate(2deg) scale(1.05); }
          50% { transform: translateY(-25px) rotate(5deg) scale(1.1); }
          75% { transform: translateY(-15px) rotate(2deg) scale(1.05); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-reverse-spin {
          animation: reverse-spin 10s linear infinite;
        }
        
        /* Ensure full width override */
        :global(body) {
          margin: 0;
          padding: 0;
        }
        
        /* Override any parent container constraints */
        .full-width-override {
          width: 100vw !important;
          margin-left: calc(-50vw + 50%) !important;
          margin-right: calc(-50vw + 50%) !important;
        }
      `}</style>
    </div>
  );
};

export default Landing;