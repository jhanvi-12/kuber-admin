import React from 'react';
import { Link } from 'react-router-dom';

export const LegalSection: React.FC<{
  id: string;
  title: string;
  children: React.ReactNode;
}> = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-28">
    <h2 className="display mb-4 text-2xl">{title}</h2>
    <div className="space-y-4 leading-relaxed text-ink-muted">{children}</div>
  </section>
);

interface LegalPageShellProps {
  icon: React.ReactNode;
  accent?: 'purple' | 'blue' | 'emerald' | 'slate';
  kicker?: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  lastUpdated: string;
  nav: { id: string; title: string }[];
  related?: { to: string; label: string }[];
  grievance: React.ReactNode;
  children: React.ReactNode;
}

const LegalPageShell: React.FC<LegalPageShellProps> = ({
  kicker,
  title,
  titleAccent,
  subtitle,
  lastUpdated,
  nav,
  related,
  grievance,
  children,
}) => {
  return (
    <div className="bg-paper">
      <header className="border-b border-line pt-28 pb-12 md:pt-32 md:pb-16">
        <div className="site-container max-w-3xl">
          {kicker && <p className="kicker mb-4">{kicker}</p>}
          <h1 className="display text-4xl md:text-5xl">
            {title} {titleAccent}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">{subtitle}</p>
          {lastUpdated && <p className="mt-3 text-sm text-ink-faint">Last updated {lastUpdated}</p>}
          {related && related.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {related.map((item) => (
                <Link key={item.to} to={item.to} className="font-medium text-purple-700 hover:underline">
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="site-container grid gap-12 py-12 lg:grid-cols-[220px_minmax(0,42rem)] lg:justify-between lg:py-16">
        <nav className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">On this page</p>
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="block py-1.5 text-sm text-ink-muted hover:text-ink">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="space-y-12">{children}</article>
      </div>

      <div className="border-t border-line bg-white">
        <div className="site-container max-w-3xl py-12">{grievance}</div>
      </div>
    </div>
  );
};

export const GrievanceBlock: React.FC<{
  heading: string;
  intro: string;
  operatorSentence: string;
}> = ({ heading, intro, operatorSentence }) => (
  <div>
    <h2 className="display mb-3 text-2xl">{heading}</h2>
    <p className="mb-6 text-ink-muted">{intro}</p>
    <div className="space-y-1 border-t border-line pt-5 text-sm text-ink">
      <p className="font-semibold">Grievance Officer</p>
      <p>Shivang Brahmbhatt</p>
      <p>{operatorSentence}</p>
      <p>
        Email:{' '}
        <a className="text-purple-700 hover:underline" href="mailto:info.kubercab@gmail.com">
          info.kubercab@gmail.com
        </a>
      </p>
      <p>
        Phone:{' '}
        <a className="text-purple-700 hover:underline" href="tel:+919898002124">
          +91 98980 02124
        </a>
      </p>
      <p>Service area: Ahmedabad and nearby (Gujarat, India)</p>
    </div>
  </div>
);

export default LegalPageShell;
