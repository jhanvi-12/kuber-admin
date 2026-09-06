import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Users } from 'lucide-react';
import PageHero from '../components/PageHero';

const values = [
  {
    icon: Shield,
    title: 'Safety first',
    text: 'Driver checks, trip tracking, SOS, and the option to share a live trip.',
  },
  {
    icon: Award,
    title: 'Reliable service',
    text: 'Moto, auto, and cab options so everyday travel stays simple.',
  },
  {
    icon: Users,
    title: 'Local focus',
    text: 'Built for Ahmedabad and nearby Gujarat — not a pan-India claim.',
  },
];

const AboutPage: React.FC = () => {
  return (
    <div>
      <PageHero
        kicker="About"
        title="A local ride service with a clear job."
        description="Kuber.cab is operated by Shivang Brahmbhatt, trading as Kuber Mobility. We connect riders with moto, auto, and cab trips, and we offer vehicle rentals."
      />

      <section className="section-pad bg-white">
        <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="display text-3xl">Our story</h2>
            <div className="mt-6 space-y-4 text-ink-muted leading-relaxed">
              <p>
                Founded in 2023, Kuber.cab started from a simple idea: make city travel easier to book and easier to trust.
              </p>
              <p>
                The rider app is Kuber Cab. Drivers use the companion app, Kuber Pilot. Together they support everyday commutes, airport trips, and self-drive rentals.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg">
            <img
              src="https://images.pexels.com/photos/7433822/pexels-photo-7433822.jpeg?auto=compress&cs=tinysrgb&w=1260"
              alt="Kuber.cab"
              className="aspect-[5/4] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="site-container">
          <h2 className="display mb-10 text-3xl">What we stand for</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="border-t border-line pt-6">
                <Icon className="h-5 w-5 text-purple-700" />
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="site-container grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-12">
          <img
            src="/shivang-brahmbhatt.png?v=2"
            alt="Shivang R. Brahmbhatt"
            className="h-56 w-44 rounded-2xl object-cover object-[center_18%] shadow-card md:h-64 md:w-52"
          />
          <div>
            <p className="kicker mb-2">Leadership</p>
            <h2 className="display text-3xl">Shivang R. Brahmbhatt</h2>
            <p className="mt-1 text-sm font-medium text-purple-700">CEO &amp; Grievance Officer</p>
            <p className="mt-4 max-w-xl text-ink-muted leading-relaxed">
              Leading Kuber.cab with a focus on safe, reliable mobility in Ahmedabad and nearby Gujarat.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="site-container flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
          <h2 className="display text-2xl text-white md:text-3xl">Ride with us, or drive with us.</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/drive-with-us" className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-ink hover:bg-paper">
              Drive with us
            </Link>
            <a href="/#download" className="rounded-md border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Plan a ride
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
