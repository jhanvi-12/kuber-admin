import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { CITIES } from '../constants';
import PageHero from '../components/PageHero';

const CitiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = CITIES.filter((city) => city.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const popular = filtered.filter((c) => c.isPopular);
  const other = filtered.filter((c) => !c.isPopular);

  return (
    <div>
      <PageHero
        kicker="Coverage"
        title="Ahmedabad and nearby Gujarat"
        description="Kuber.cab currently offers the rider service in Ahmedabad and nearby areas. Browse the list of cities and neighbourhoods we list on this site."
      >
        <div className="relative mt-8 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            type="search"
            placeholder="Search a city or area"
            className="field-input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </PageHero>

      <section className="section-pad bg-white">
        <div className="site-container">
          {popular.length > 0 && (
            <>
              <h2 className="display mb-6 text-2xl">Major cities</h2>
              <ul className="mb-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {popular.map((city) => (
                  <li key={city.id} className="surface-card flex items-center gap-3 px-5 py-4">
                    <MapPin className="h-4 w-4 text-purple-700" />
                    <span className="font-medium">{city.name}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {other.length > 0 && (
            <>
              <h2 className="display mb-6 text-2xl">Areas and towns</h2>
              <ul className="flex flex-wrap gap-2">
                {other.map((city) => (
                  <li key={city.id} className="rounded-md border border-line bg-paper px-3 py-1.5 text-sm text-ink">
                    {city.name}
                  </li>
                ))}
              </ul>
            </>
          )}

          {filtered.length === 0 && (
            <p className="text-ink-muted">No matching city. Try another name, or contact us.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default CitiesPage;
