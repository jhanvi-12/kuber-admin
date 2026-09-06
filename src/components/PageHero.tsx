import React from 'react';

interface PageHeroProps {
  kicker?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const PageHero: React.FC<PageHeroProps> = ({ kicker, title, description, children }) => {
  return (
    <section className="border-b border-line bg-paper pt-28 pb-12 md:pt-32 md:pb-16">
      <div className="site-container max-w-3xl">
        {kicker && <p className="kicker mb-4">{kicker}</p>}
        <h1 className="display text-4xl md:text-5xl leading-[1.12]">{title}</h1>
        {description && (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
};

export default PageHero;
