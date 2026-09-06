import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AutoVehicle, BikeVehicle, CabVehicle } from './icons/RideVehicles';

const items = [
  {
    to: '/services',
    title: 'Ride',
    text: 'Book bike, auto, or cab in the Kuber Cab app.',
    cta: 'See ride options',
    art: (
      <div className="flex -space-x-3">
        <BikeVehicle variant="avatar" />
        <AutoVehicle variant="avatar" />
        <CabVehicle variant="avatar" />
      </div>
    ),
  },
  {
    to: '/rental-booking',
    title: 'Rentals',
    text: 'Hire a vehicle for a day, a week, or a longer trip.',
    cta: 'Book a rental',
    art: <CabVehicle variant="avatar" />,
  },
  {
    to: '/drive-with-us',
    title: 'Drive',
    text: 'Download Kuber Pilot. Signup is in the driver app, not on the website.',
    cta: 'Get the driver app',
    art: <CabVehicle variant="avatar" className="bg-purple-100 ring-purple-200" />,
  },
  {
    to: '/cities',
    title: 'Coverage',
    text: 'Ahmedabad and nearby Gujarat — see where we list service.',
    cta: 'Browse cities',
    art: <AutoVehicle variant="avatar" />,
  },
];

const Explore: React.FC = () => {
  return (
    <section className="bg-paper section-pad">
      <div className="site-container">
        <div className="section-head">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl lg:text-5xl">
            What you can do with Kuber
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted md:text-lg">
            Rides in the app, vehicle rentals on the website, and a driver programme for Kuber Pilots.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group flex items-start gap-5 rounded-2xl border border-line bg-white p-7 shadow-card transition-shadow hover:shadow-lift md:p-8"
            >
              {item.art}
              <div className="min-w-0">
                <h3 className="text-xl font-extrabold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.text}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-700">
                  {item.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explore;
