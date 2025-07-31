// Footer.jsx
import React from 'react';

const Footer = () => {
  const footerLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/about' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' }
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Links Section */}
        <div className="flex flex-wrap justify-center items-center space-x-6 mb-6">
          {footerLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200 mb-2 sm:mb-0"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Horizontal Rule */}
        <hr className="border-gray-600 mb-6" />

        {/* Copyright Section */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            © 2025 VyaparSetu. All Rights Reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Connecting businesses across India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
