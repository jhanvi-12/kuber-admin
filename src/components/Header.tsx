import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import KuberLogo from './KuberLogo';

const NAV = [
  { to: '/services', label: 'Rides' },
  { to: '/rental-booking', label: 'Rentals' },
  { to: '/drive-with-us', label: 'Drive' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const planRideHref = isHome ? '#download' : '/#download';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const go = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        isScrolled || isMenuOpen
          ? 'border-line bg-white/95 backdrop-blur-md'
          : 'border-transparent bg-white'
      }`}
    >
      <div className="site-container flex h-16 items-center justify-between md:h-[4.5rem]">
        <Link to="/" className="flex items-center" aria-label="Kuber.cab home">
          <KuberLogo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-purple-700' : 'text-ink-muted hover:text-ink'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href={planRideHref} className="rounded-full bg-purple-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-purple-800">
            Download App
          </a>
        </div>

        <button
          type="button"
          className="p-2 text-ink lg:hidden"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-line bg-white lg:hidden">
          <nav className="site-container flex flex-col py-4">
            {NAV.map((item) => (
              <button
                key={item.to}
                type="button"
                onClick={() => go(item.to)}
                className="min-h-12 border-b border-line py-3 text-left text-base font-medium text-ink"
              >
                {item.label}
              </button>
            ))}
            <a href={planRideHref} className="btn-primary mt-4 rounded-full" onClick={() => setIsMenuOpen(false)}>
              Download App
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
