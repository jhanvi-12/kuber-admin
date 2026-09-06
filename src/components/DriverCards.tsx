import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PLAY_STORE_DRIVER } from '../constants';

const cards = [
  {
    title: 'Drive and earn on your schedule',
    text: 'Make money with bike, auto, or cab rides. Use your own vehicle and go online when it suits you.',
    cta: 'Get the Kuber Pilot app',
    href: PLAY_STORE_DRIVER,
    external: true,
    image: '/driver-card-schedule.png',
    alt: 'Kuber Pilot in an auto',
  },
  {
    title: 'Go online when you want',
    text: 'Open Kuber Pilot, go online, and accept nearby trip requests. Pause whenever you need to.',
    cta: 'Get details',
    href: '/drive-with-us#how-to-start',
    external: false,
    image: '/driver-card-online.png',
    alt: 'Going online on a bike ride',
  },
  {
    title: 'Get paid weekly',
    text: 'Competitive earnings on a weekly cycle, with partner support after you verify in the app.',
    cta: 'See how to start',
    href: '/drive-with-us#how-to-start',
    external: false,
    image: '/driver-card-payout.png',
    alt: 'Weekly earnings on a phone',
  },
];

const DriverCards: React.FC<{ className?: string }> = ({ className = 'bg-paper' }) => {
  const location = useLocation();

  const goToStart = (event: React.MouseEvent, href: string) => {
    if (!href.includes('#how-to-start') || location.pathname !== '/drive-with-us') return;
    event.preventDefault();
    document.getElementById('how-to-start')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section className={`${className} section-pad`}>
      <div className="site-container">
        <div className="section-head">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl lg:text-5xl">
            More ways to drive with Kuber
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted md:text-lg">
            Signup is only in the Kuber Pilot app on Google Play. There is no driver registration form on this website.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          {cards.map((card) => {
            const body = (
              <>
                <img src={card.image} alt={card.alt} className="aspect-[16/10] w-full object-cover" />
                <div className="pt-6">
                  <h3 className="text-xl font-extrabold tracking-tight text-ink md:text-2xl">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">{card.text}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-700">
                    {card.cta}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </>
            );

            return card.external ? (
              <a key={card.title} href={card.href} target="_blank" rel="noopener noreferrer" className="group block">
                {body}
              </a>
            ) : (
              <Link
                key={card.title}
                to={card.href}
                className="group block"
                onClick={(event) => goToStart(event, card.href)}
              >
                {body}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DriverCards;
