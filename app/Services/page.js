import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Code, Zap, Brain, Shield, ArrowRight, Calendar, CheckCircle, Globe, Database, Cpu, Lock } from 'lucide-react';

function ServicesPage() {
  const services = [
    {
      id: 'web-development',
      title: 'Web Development',
      icon: Code,
      shortDesc: 'Full-stack web solutions from concept to deployment',
      description: 'Transform your digital presence with our comprehensive web development services. We craft modern, responsive websites and robust web applications using cutting-edge technologies.',
      features: [
        'Custom Frontend Development (React, Next.js)',
        'Backend Development (Node.js, Python)',
        'Database Design & Optimization (MongoDB)',
        'API Development & Integration',
        'E-commerce Solutions (WooCommerce)',
        'Performance Optimization & SEO',
        'Cloud Deployment'
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'Python', 'AWS'],
      color: 'from-blue-600 to-blue-800',
      
    },
    
    {
      id: 'ai-solutions',
      title: 'AI Solutions',
      icon: Brain,
      shortDesc: 'Intelligent systems powered by machine learning',
      description: 'Harness the power of artificial intelligence to solve complex business challenges. Our AI solutions include machine learning models, natural language processing, and intelligent automation.',
      features: [
        'Machine Learning Model Development',
        'Natural Language Processing (NLP)',
        'Computer Vision & Image Recognition',
        'Predictive Analytics & Forecasting',
        'Chatbots & Virtual Assistants',
        'Recommendation Systems',
        'AI-Powered Data Analysis',
        'Custom AI Integration'
      ],
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'Antropic', 'Hugging Face'],
      color: 'from-blue-700 to-gray-700'
    },
    {
      id: 'automation',
      title: 'Automation Solutions',
      icon: Zap,
      shortDesc: 'Streamline operations with intelligent automation',
      description: 'Boost productivity and reduce manual tasks with our custom automation solutions. From workflow automation to robotic process automation (RPA), we help businesses operate more efficiently.',
      features: [
        'Business Process Automation (BPA)',
        'Robotic Process Automation (RPA)',
        'Workflow Optimization & Design',
        'Email & Marketing Automation',
        'Document Processing Automation',
        'Custom Bot Development'
      ],
      technologies: ['Python'],
      color: 'from-gray-600 to-gray-800'
    },
    {
      id: 'penetration-testing',
      title: 'Penetration Testing',
      icon: Shield,
      shortDesc: 'Comprehensive security assessments and vulnerability analysis',
      description: 'Protect your digital assets with our thorough penetration testing services. We identify vulnerabilities before malicious actors do, providing detailed reports and remediation strategies.',
      features: [
        'Web Application Security Testing',
        'Network Infrastructure Assessment',
        'Mobile Application Security',
        'API Security Testing',
        'Social Engineering Assessments',
        'Wireless Network Security',
        'Cloud Security Evaluation',
        'Compliance & Regulatory Testing'
      ],
      technologies: ['Metasploit', 'Burp Suite', 'Nmap', 'OWASP'],
      color: 'from-gray-700 to-blue-900'
    }
  ];

  const ServiceCard = ({ service, index }) => {
    const Icon = service.icon;
    
    return (
      <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-gray-200 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-xl group">
        <div className="flex items-start space-x-4 mb-6">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={32} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.shortDesc}</p>
          </div>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>

        <div className="mb-6">
          <h4 className="font-semibold mb-3 flex items-center">
            <CheckCircle size={18} className="text-green-600 mr-2" />
            Key Features
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {service.features.slice(0, 6).map((feature, idx) => (
              <div key={idx} className="flex items-center text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-3">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((tech, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            {service.duration}
          </div>
          <div className="font-semibold text-blue-600">
            {service.price}
          </div>
        </div>

        <Link href={`/appointment?service=${service.id}`}>
          <button className={`w-full px-6 py-3 bg-gradient-to-r ${service.color} text-white rounded-full font-semibold hover:scale-105 transform transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl`}>
            <Calendar size={18} />
            <span>Book Consultation</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </Link>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-20">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-gray-800 to-blue-900 bg-clip-text text-transparent mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive technology solutions to accelerate your business growth. 
            From web development to AI implementation, we deliver cutting-edge solutions 
            tailored to your specific needs.
          </p>
          
          {/* Services Image */}
          <div className="flex justify-center mb-12">
            <Image 
              className="rounded-2xl shadow-xl border border-gray-200/50" 
              src="/servicePage.PNG" 
              alt="NanGenLabs Services Overview" 
              width={400} 
              height={200}
              priority
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">10+</div>
              <div className="text-sm text-gray-600">Projects Completed</div>
            </div>
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-gray-200">
              <div className="text-xl font-bold text-blue-600">Guaranteed</div>
              <div className="text-sm text-gray-600">Client Satisfaction</div>
            </div>
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">2+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-12 border border-gray-200 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-gray-800 bg-clip-text text-transparent mb-4">
              Our Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a structured approach to ensure project success and client satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Globe, title: 'Discovery', desc: 'Understanding your requirements and goals' },
              { icon: Database, title: 'Planning', desc: 'Strategic planning and architecture design' },
              { icon: Cpu, title: 'Development', desc: 'Building and implementing the solution' },
              { icon: Lock, title: 'Deployment', desc: 'Testing, security, and go-live support' }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Let's discuss how our services can help you achieve your goals
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/appointment">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:scale-105 transform transition-all duration-300 flex items-center space-x-2 shadow-xl">
                <Calendar size={20} />
                <span>Schedule Consultation</span>
                <ArrowRight size={20} />
              </button>
            </Link>
            
            <Link href="/contact">
              <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 hover:scale-105 transform transition-all duration-300">
                Get Quote
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
