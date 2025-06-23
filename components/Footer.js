import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer 
      className="py-1 relative"
      style={{ 
        width: '100vw', 
        marginLeft: 'calc(-50vw + 50%)', 
        marginRight: 'calc(-50vw + 50%)',
        marginTop: '-50px', // Pull it up to overlap with landing page background
        background: 'transparent'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-30">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-700 mb-4 md:mb-0">
            © 2025 NanGenLabs Inc.
          </div>
          
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;