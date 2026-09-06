import React from 'react';
import { Link } from 'react-router-dom';
import { CITIES } from '../constants';

const Cities: React.FC = () => {
  const popular = CITIES.filter((city) => city.isPopular);

  return (
    <section id="cities" className="bg-white py-16 md:py-24">
      <div className="site-container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
              Ahmedabad and nearby Gujarat
            </h2>
            <p className="mt-3 max-w-lg text-ink-muted">
              Rider service is offered in Ahmedabad and nearby areas. These are the major cities we list on this site.
            </p>
          </div>
          <Link to="/cities" className="text-sm font-semibold text-purple-700 hover:text-purple-900">
            See all cities and areas
          </Link>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((city) => (
            <li key={city.id} className="rounded-xl border border-line bg-paper px-5 py-4 font-medium text-ink">
              {city.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Cities;
