import React from 'react';
import { Link } from 'react-router-dom';
import { BikeVehicle, AutoVehicle, CabVehicle } from './icons/RideVehicles';

const cards = [
  {
    id: 'moto',
    title: 'Bike',
    description: 'Beat the traffic with moto rides',
    art: <BikeVehicle />,
  },
  {
    id: 'auto',
    title: 'Auto',
    description: 'Comfortable auto rides for city travel',
    art: <AutoVehicle />,
  },
  {
    id: 'cab',
    title: 'Cab',
    description: 'Comfortable sedans when you need space',
    art: <CabVehicle />,
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="bg-white section-pad">
      <div className="site-container">
        <div className="section-head mx-auto text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl lg:text-5xl">
            Services available
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-ink-muted md:text-lg">
            Bike, Auto, and Cab — the ride types in Kuber Cab.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 lg:gap-14">
          {cards.map((card) => (
            <Link key={card.id} to="/services" className="group text-center">
              {card.art}
              <h3 className="mt-5 text-2xl font-extrabold text-ink">{card.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
