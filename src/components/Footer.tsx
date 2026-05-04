import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white pt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center mb-6">
              <img 
                src="/kuber-cab-sb.png" 
                alt="Kuber.cab" 
                className="h-16 w-auto filter brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 mb-6">
              Premium ride-hailing service dedicated to providing safe, reliable, and comfortable transportation for all your needs.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Facebook className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Twitter className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Instagram className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Youtube className="h-5 w-5" />} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink onClick={() => handleNavigation('/services')}>Our Services</FooterLink>
              <FooterLink onClick={() => handleNavigation('/rental-booking')}>Vehicle Rentals</FooterLink>
              <FooterLink onClick={() => handleNavigation('/drive-with-us')}>Become a Driver</FooterLink>
              <FooterLink href="#download">Download App</FooterLink>
              <FooterLink onClick={() => handleNavigation('/cities')}>Cities</FooterLink>
              <FooterLink onClick={() => handleNavigation('/faq')}>FAQ</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <FooterLink onClick={() => handleNavigation('/about')}>About Us</FooterLink>
              <FooterLink href="#careers">Careers</FooterLink>
              <FooterLink href="#press">Press</FooterLink>
              <FooterLink onClick={() => handleNavigation('/contact')}>Contact Us</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Duffnala, Shahibag, Ahmedabad, Gujarat 380004</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400">+91 98980 02124</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400">info.kubercab@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Kuber.cab. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <button onClick={() => handleNavigation('/terms-conditions')} className="hover:text-purple-400 transition-colors">Terms of Service</button>
              <button onClick={() => handleNavigation('/privacy-policy')} className="hover:text-purple-400 transition-colors">Privacy Policy</button>
              <button onClick={() => handleNavigation('/cookie-policy')} className="hover:text-purple-400 transition-colors">Cookie Policy</button>
              <a href="#sitemap" className="hover:text-purple-400 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink: React.FC<{ href: string; icon: React.ReactNode }> = ({ href, icon }) => {
  return (
    <a 
      href={href} 
      className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
    >
      {icon}
    </a>
  );
};

const FooterLink: React.FC<{ to?: string; href?: string; onClick?: () => void; children: React.ReactNode }> = ({ to, href, onClick, children }) => {
  if (onClick) {
    return (
      <li>
        <button 
          onClick={onClick}
          className="text-gray-400 hover:text-purple-400 transition-colors"
        >
          {children}
        </button>
      </li>
    );
  }
  
  if (to) {
    return (
      <li>
        <Link 
          to={to} 
          className="text-gray-400 hover:text-purple-400 transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {children}
        </Link>
      </li>
    );
  }
  
  return (
    <li>
      <a 
        href={href} 
        className="text-gray-400 hover:text-purple-400 transition-colors"
      >
        {children}
      </a>
    </li>
  );
};

export default Footer;