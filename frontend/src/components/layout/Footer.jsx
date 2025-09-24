import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'FAQs', href: '/faqs' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' }
    ],
    social: [
      { name: 'Facebook', href: '#', icon: Facebook },
      { name: 'Twitter', href: '#', icon: Twitter },
      { name: 'Instagram', href: '#', icon: Instagram },
      { name: 'YouTube', href: '#', icon: Youtube }
    ]
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Hydro360
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Empowering communities through efficient water resource management.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">
              Contact Us
            </h3>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400 flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                info@hydro360.com
              </p>
              <div className="flex space-x-4">
                {footerLinks.social.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <link.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-600 dark:text-gray-400">
            &copy; {year} Hydro360. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
