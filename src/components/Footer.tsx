import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import KuberLogo from './KuberLogo';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  const go = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="site-container py-16 md:py-20 lg:py-24">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex" aria-label="Kuber.cab home">
              <KuberLogo variant="white" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              Moto, auto, and cab rides in Ahmedabad and nearby Gujarat. Operated by Shivang Brahmbhatt, trading as Kuber Mobility.
            </p>
          </div>

          <FooterCol title="Rides">
            <FooterBtn onClick={() => go('/services')}>Ride options</FooterBtn>
            <FooterBtn onClick={() => go('/rental-booking')}>Vehicle rentals</FooterBtn>
            <FooterBtn onClick={() => go('/cities')}>Cities</FooterBtn>
          </FooterCol>

          <FooterCol title="Company">
            <FooterBtn onClick={() => go('/about')}>About</FooterBtn>
            <FooterBtn onClick={() => go('/drive-with-us')}>Drive with us</FooterBtn>
            <FooterBtn onClick={() => go('/contact')}>Contact</FooterBtn>
            <FooterBtn onClick={() => go('/faq')}>Help</FooterBtn>
          </FooterCol>

          <FooterCol title="Legal">
            <FooterBtn onClick={() => go('/privacy-policy')}>Privacy Policy</FooterBtn>
            <FooterBtn onClick={() => go('/terms-conditions')}>Terms &amp; Conditions</FooterBtn>
            <FooterBtn onClick={() => go('/cookie-policy')}>Cookie Policy</FooterBtn>
            <FooterBtn onClick={() => go('/driver/privacy-policy')}>Driver Privacy</FooterBtn>
            <FooterBtn onClick={() => go('/driver/terms-conditions')}>Driver Terms</FooterBtn>
          </FooterCol>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {year} Kuber.cab. All rights reserved.</p>
          <p>Duffnala, Shahibag, Ahmedabad, Gujarat 380004</p>
        </div>
      </div>
    </footer>
  );
};

const FooterCol: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/45">{title}</h3>
    <ul className="space-y-2.5">{children}</ul>
  </div>
);

const FooterBtn: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <li>
    <button type="button" onClick={onClick} className="text-sm text-white/70 transition-colors hover:text-white">
      {children}
    </button>
  </li>
);

export default Footer;
