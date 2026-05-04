import React from 'react';
import { MapPin } from 'lucide-react';
import { CITIES } from '../constants';

const Cities: React.FC = () => {
  const popularCities = CITIES.filter(city => city.isPopular);
  const otherCities = CITIES.filter(city => !city.isPopular);

  return (
    <section id="cities" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Available in <span className="text-purple-700">Gujarat</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kuber.cab is serving Gujarat with comprehensive coverage across major cities, towns, and popular areas within Ahmedabad.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Popular Cities</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {popularCities.map((city) => (
              <div 
                key={city.id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex items-center justify-center cursor-pointer group"
              >
                <MapPin className="h-5 w-5 text-purple-600 mr-2 group-hover:text-purple-700" />
                <span className="font-medium text-gray-800 group-hover:text-gray-900">{city.name}</span>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-6">All Cities</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {CITIES.map((city) => (
              <div 
                key={city.id}
                className="flex items-center"
              >
                <MapPin className="h-4 w-4 text-purple-600 mr-2" />
                <span className="text-gray-700">{city.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Don't see your city?</p>
            <button className="py-2 px-6 bg-purple-100 text-purple-700 rounded-full font-medium hover:bg-purple-200 transition-colors">
              Request Kuber.cab in your city
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cities;