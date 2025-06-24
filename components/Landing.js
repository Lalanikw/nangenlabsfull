import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Code, Shield, Brain, Zap, Calendar, ArrowRight, Github, Linkedin, Youtube, Settings, Cog } from 'lucide-react';
import Image from 'next/image';

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
      <main className="w-screen relative z-30 flex flex-col items-center justify-center min-h-screen px-4 md:px-6 lg:px-8 text-center pt-1 sm:pt-1">
        <div className="w-full max-w-none mt-10">
          <div>
          <div className={`transition-all duration-1500 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl h-16 sm:h-16 font-bold mb-8 mt-20 bg-gradient-to-r from-blue-700 to-gray-800 bg-clip-text text-transparent animate-pulse">
              NanGenLabs
            </h1>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl mb-8 h-10 sm:h-10 flex items-center justify-center">
              <span className="animate-pulse">Empowering Digital Transformation with</span>
            </div>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-12 sm:mb-16 leading-relaxed px-4">
              We bridge innovative technology with strategic solutions. Specialized in custom web development, 
              intelligent automation, transformative AI solutions, and comprehensive cybersecurity services including penetration testing that drive business growth and efficiency.
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className={`animate-bounce transition-all duration-1500 delay-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <ChevronDown size={28} className="sm:w-10 sm:h-10 text-blue-600" />
          </div>
        </div>
      
        <section className="w-screen relative z-30 py-1 sm:py-1 px-4 md:px-6 lg:px-8 mt-20">
        <div className="max-w-none w-full">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-blue-700 to-gray-800 bg-clip-text text-transparent">
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
        <div className="p-5">
      <Link href="/Services">
              <button className="px-6 sm:px-8 py-1 sm:py-1 border-2 border-blue-600 text-blue-600 rounded-full font-semibold text-base sm:text-lg hover:bg-blue-600 hover:text-white hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-blue-500/25 w-full sm:w-auto">
                View Services
              </button>
          </Link>
          </div>
        </section>
        
      </main>

      {/* Portfolio Section - Circle Design with Images */}
      <section className="w-screen relative z-30 py-16 sm:py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-none w-full">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-gray-800 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Showcasing our latest work across different industries
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 max-w-6xl mx-auto">
            {/* GoTravelSriLanka Circle */}
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop&crop=center" 
                      alt="Beautiful beach in Sri Lanka" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-blue-600 flex items-center justify-center" style={{display: 'none'}}>
                      <span className="text-white font-bold text-2xl">GT</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">GoTravelSriLanka</h3>
              <p className="text-blue-600 font-medium text-sm mb-3">Travel Information Hub</p>
              <p className="text-gray-600 text-sm mb-4 max-w-xs mx-auto">
              Complete Sri Lanka travel guide with locations, VISA information, and essential resources for travelers
              </p>
              
              <a 
                href="https://gotravelsrilanka.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full hover:scale-105 transform transition-all duration-300 shadow-md"
              >
                Visit Sri Lanka <ArrowRight size={14} className="ml-1" />
              </a>
            </div>

            {/* AllergySolutionsHub Circle */}
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-700 to-gray-700 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    
                    <img
                      src="/allerylogo.jpg" 
                      alt="Pollen and flower allergy concept" 
                      className="w-auto h-auto object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-blue-700 flex items-center justify-center" style={{display: 'none'}}>
                      <span className="text-white font-bold text-2xl">AS</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">Allergy Medicine Clinic</h3>
              <p className="text-blue-700 font-medium text-sm mb-3">Healthcare Platform, booking App</p>
              <p className="text-gray-600 text-sm mb-4 max-w-xs mx-auto">
              Specialized allergy clinic platform for patient information, doctor consultations, and appointment booking
              </p>
              
              <a 
                href="https://www.allergysolutionshub.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-full hover:scale-105 transform transition-all duration-300 shadow-md"
              >
                Allergy Solutions <ArrowRight size={14} className="ml-1" />
              </a>
            </div>

            {/* TouchMap Circle */}
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-600 to-gray-800  group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=150&h=150&fit=crop&crop=center" 
                      alt="Map of United States" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gray-600 flex items-center justify-center" style={{display: 'none'}}>
                      <span className="text-white font-bold text-2xl">TM</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">TouchMap</h3>
              <p className="text-gray-600 font-medium text-sm mb-3">Data Privacy Law Map</p>
              <p className="text-gray-600 text-sm mb-4 max-w-xs mx-auto">
              Interactive US map showing state-by-state data privacy laws and regulatory information
              </p>
              
              <a 
                href="https://touchmap.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-full hover:scale-105 transform transition-all duration-300 shadow-md"
              >
                DataTrace | Privacy <ArrowRight size={14} className="ml-1" />
              </a>
            </div>
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