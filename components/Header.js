"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsLoaded(true);
  }, []);

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <header className="absolute top-0 left-0 w-full z-50">
        <nav className="w-full px-4 md:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-gray-800 bg-clip-text text-transparent cursor-pointer">
                NanGenLabs
              </div>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
                Home
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
                Services
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
                Contact
              </Link>
            </div>

            {/* CTA Button */}
            {/* <div className="hidden md:block">
              <Link href="/ContactUs">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full font-semibold text-sm">
                  Book Now
                </button>
              </Link>
            </div> */}
            
            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-700">
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <nav className={`w-full px-4 md:px-6 lg:px-8 py-6 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-gray-800 bg-clip-text text-transparent cursor-pointer">
              NanGenLabs
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/Services" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link href="/ContactUs" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>

          {/* CTA Button */}
          {/* <div className="hidden md:block">
            <Link href="/ContactUs">
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full font-semibold text-sm hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
                Book Now
              </button>
            </Link>
          </div> */}
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 w-full bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-b-2xl shadow-xl mx-4 mt-2">
            <div className="px-6 py-6 space-y-4">
              <Link href="/" className="block text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/Services" className="block text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2" onClick={() => setIsMenuOpen(false)}>
                Services
              </Link>
              <Link href="/ContactUs" className="block text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              {/* <div className="pt-4">
                <Link href="/ContactUs" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full font-semibold hover:scale-105 transform transition-all duration-300">
                    Book Now
                  </button>
                </Link>
              </div> */}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;