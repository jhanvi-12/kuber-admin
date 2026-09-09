import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, ShieldCheck, Sparkles, Wallet } from 'lucide-react';
import { SERVICES } from '../constants';
import { VehicleIcon, type RideKind } from '../components/icons/RideVehicles';
import PageHero from '../components/PageHero';
import { IMAGES } from '../constants/images';

const serviceDetails = {
  moto: {
    image: IMAGES.kuberRideMoto,
    features: ['Quick pickup in 2–5 minutes', 'Navigate through traffic easily', 'Eco-friendly transportation', 'Ideal for solo commuters'],
    idealFor: ['Solo travelers', 'Short distance trips', 'Quick errands', 'Avoiding traffic jams'],
  },
  auto: {
    image: IMAGES.kuberRideAuto,
    features: ['Weather protection', 'Space for small luggage', 'Comfortable seating for 3', 'Reliable local routes'],
    idealFor: ['Small groups', 'Shopping trips', 'Airport transfers', 'Rainy weather travel'],
  },
  sedan: {
    image: IMAGES.kuberRideCab,
    features: ['Air conditioning', 'Premium comfort', 'Professional drivers', 'Spacious interiors'],
    idealFor: ['Business meetings', 'Family trips', 'Long distance travel', 'Special occasions'],
  },
};

const whyChooseUs = [
  {
    title: '24/7 availability',
    description: 'Round-the-clock service whenever you need a ride',
    icon: Clock,
    well: 'bg-purple-700 text-white',
    card: 'bg-paper',
  },
  {
    title: 'Verified drivers',
    description: 'Background checks and real-time tracking',
    icon: ShieldCheck,
    well: 'bg-white text-purple-700 ring-1 ring-purple-100',
    card: 'bg-purple-50',
  },
  {
    title: 'Quality service',
    description: 'Professional drivers committed to a calm trip',
    icon: Sparkles,
    well: 'bg-ink text-white',
    card: 'bg-paper',
  },
  {
    title: 'Flexible payment',
    description: 'UPI, cards, and cash',
    icon: Wallet,
    well: 'bg-purple-100 text-purple-800',
    card: 'bg-white ring-1 ring-line',
  },
];

const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState('moto');
  const selected = SERVICES.find((s) => s.id === selectedService);
  const details = serviceDetails[selectedService as keyof typeof serviceDetails];

  const kindFor = (id: string): RideKind => (id === 'auto' ? 'auto' : id === 'sedan' ? 'cab' : 'bike');

  const getIcon = (id: string) => <VehicleIcon kind={kindFor(id)} size={72} />;

  return (
    <div>
      <PageHero
        kicker="Rides"
        title="Moto, auto, and cab"
        description="Choose the ride that fits the trip. Book from the Kuber Cab app."
      />

      <section className="section-pad bg-white">
        <div className="site-container">
          <div className="grid gap-5 md:grid-cols-3">
            {SERVICES.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => setSelectedService(service.id)}
                className={`surface-card p-6 text-left ${
                  selectedService === service.id ? 'ring-2 ring-purple-700' : ''
                }`}
              >
                <div className="mb-5">{getIcon(service.id)}</div>
                <h2 className="text-lg font-semibold">{service.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{service.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selected && details && (
        <section className="section-pad bg-paper">
          <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="kicker mb-3">Details</p>
              <h2 className="display text-3xl">{selected.title}</h2>
              <p className="mt-4 text-ink-muted">{selected.description}</p>
              <ul className="mt-8 space-y-3">
                {details.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-ink">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-purple-700" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="/#download" className="btn-primary mt-8">
                Plan a {selected.title.split(' ')[0].toLowerCase()} ride
              </a>
            </div>
            <div className="overflow-hidden rounded-lg">
              <img src={details.image} alt={selected.title} className="aspect-[4/3] w-full object-cover" />
            </div>
          </div>
        </section>
      )}

      <section className="section-pad bg-white">
        <div className="site-container">
          <div className="section-head">
            <p className="kicker mb-3">Why Kuber</p>
            <h2 className="display text-3xl md:text-4xl">Why riders choose Kuber.cab</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {whyChooseUs.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={`flex items-start gap-5 rounded-3xl p-7 md:p-8 ${item.card}`}>
                  <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.well}`}>
                    <Icon className="h-7 w-7" strokeWidth={1.6} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted md:text-base">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link to="/rental-booking" className="btn-secondary">
              Vehicle rentals
            </Link>
            <Link to="/contact" className="btn-ghost">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
