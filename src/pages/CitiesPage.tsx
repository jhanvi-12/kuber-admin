import React, { useState } from 'react';
import { MapPin, Search, Users, Car, Clock, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { CITIES } from '../constants';

const CitiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const filteredCities = CITIES.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularCities = CITIES.filter(city => city.isPopular);
  const otherCities = CITIES.filter(city => !city.isPopular);

  const cityDetails = {
    'Ahmedabad': {
      image: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'The commercial capital of Gujarat with rich textile heritage and modern infrastructure.',
      stats: { drivers: '12,000+', rides: '1.5M+', rating: '4.8' },
      features: ['Textile Hub', 'Heritage Sites', 'Business Center', 'Cultural Diversity']
    },
    'Surat': {
      image: 'https://images.pexels.com/photos/1098460/pexels-photo-1098460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'The Diamond City of India, known for its diamond cutting and textile industries.',
      stats: { drivers: '8,000+', rides: '800K+', rating: '4.7' },
      features: ['Diamond Industry', 'Textile Manufacturing', 'Business Hub', 'Clean City']
    },
    'Vadodara': {
      image: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'The Cultural Capital of Gujarat with excellent educational institutions and industries.',
      stats: { drivers: '6,000+', rides: '600K+', rating: '4.6' },
      features: ['Educational Hub', 'Industrial Center', 'Cultural Heritage', 'Garden City']
    },
    'Rajkot': {
      image: 'https://images.pexels.com/photos/1098460/pexels-photo-1098460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'The commercial hub of Saurashtra region, known for engineering and jewelry industries.',
      stats: { drivers: '5,000+', rides: '450K+', rating: '4.5' },
      features: ['Engineering Hub', 'Jewelry Industry', 'Business Center', 'Sports Culture']
    }
  };

  const upcomingCities = [
    { name: 'Morbi', launchDate: 'Q2 2024', status: 'Coming Soon' },
    { name: 'Palanpur', launchDate: 'Q3 2024', status: 'Planning' },
    { name: 'Vapi', launchDate: 'Q3 2024', status: 'Planning' },
    { name: 'Gandhidham', launchDate: 'Q4 2024', status: 'Planning' },
    { name: 'Jamnagar', launchDate: 'Q4 2024', status: 'Planning' },
    { name: 'Porbandar', launchDate: 'Q1 2025', status: 'Planning' }
  ];

  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Available in <span className="text-purple-700">Gujarat</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Kuber.cab is serving Gujarat with comprehensive coverage across major cities, towns, and popular areas within Ahmedabad.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for your city..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-purple-700 mb-2">21</div>
              <div className="text-gray-600">Cities</div>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-purple-700 mb-2">50K+</div>
              <div className="text-gray-600">Drivers</div>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-purple-700 mb-2">5M+</div>
              <div className="text-gray-600">Rides</div>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-purple-700 mb-2">4.8</div>
              <div className="text-gray-600">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular <span className="text-purple-700">Cities</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most active cities with the highest number of rides and driver partners.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {popularCities.map((city) => {
              const details = cityDetails[city.name as keyof typeof cityDetails];
              return (
                <div 
                  key={city.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedCity(selectedCity === city.name ? null : city.name)}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={details?.image}
                      alt={city.name}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{city.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">{details?.stats.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{details?.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-700">{details?.stats.drivers}</div>
                        <div className="text-xs text-gray-500">Drivers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-700">{details?.stats.rides}</div>
                        <div className="text-xs text-gray-500">Rides</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">Active</div>
                        <div className="text-xs text-gray-500">Status</div>
                      </div>
                    </div>

                    {selectedCity === city.name && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {details?.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <button className="w-full mt-4 bg-purple-100 text-purple-700 py-2 rounded-lg font-medium hover:bg-purple-200 transition-colors">
                      Book Ride in {city.name}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Cities Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">All Available Cities & Areas</h3>
            
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Ahmedabad Areas</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
                {filteredCities.filter(city => ['Satellite', 'Vastrapur', 'Bopal', 'Prahlad Nagar', 'Navrangpura', 'C.G. Road', 'S.G. Highway', 'Maninagar', 'Ghatlodia', 'Thaltej', 'Bodakdev', 'Ambawadi', 'Paldi', 'Ellisbridge', 'Ashram Road'].includes(city.name)).map((city) => (
                  <div 
                    key={city.id}
                    className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow flex items-center cursor-pointer group border border-purple-100"
                  >
                    <div className="h-3 w-3 rounded-full bg-purple-200 mr-2 group-hover:bg-purple-400"></div>
                    <div>
                      <span className="font-medium text-gray-800 group-hover:text-gray-900 text-sm">{city.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Major Cities</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                {filteredCities.filter(city => city.isPopular).map((city) => (
                  <div 
                    key={city.id}
                    className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow flex items-center cursor-pointer group"
                  >
                    <div className="h-4 w-4 rounded-full bg-purple-600 mr-3 group-hover:bg-purple-700"></div>
                    <div>
                      <span className="font-medium text-gray-800 group-hover:text-gray-900">{city.name}</span>
                      <div className="text-xs text-purple-600 font-medium">Popular</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Other Cities</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
                {filteredCities.filter(city => !city.isPopular && !['Satellite', 'Vastrapur', 'Bopal', 'Prahlad Nagar', 'Navrangpura', 'C.G. Road', 'S.G. Highway', 'Maninagar', 'Ghatlodia', 'Thaltej', 'Bodakdev', 'Ambawadi', 'Paldi', 'Ellisbridge', 'Ashram Road'].includes(city.name)).map((city) => (
                  <div 
                    key={city.id}
                    className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow flex items-center cursor-pointer group"
                  >
                    <div className="h-4 w-4 rounded-full bg-gray-400 mr-3 group-hover:bg-gray-500"></div>
                    <div>
                      <span className="font-medium text-gray-800 group-hover:text-gray-900">{city.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="hidden">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
              {filteredCities.map((city) => (
                <div 
                  key={city.id}
                  className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow flex items-center cursor-pointer group"
                >
                  <MapPin className="h-5 w-5 text-purple-600 mr-3 group-hover:text-purple-700" />
                  <div>
                    <span className="font-medium text-gray-800 group-hover:text-gray-900">{city.name}</span>
                    {city.isPopular && (
                      <div className="text-xs text-purple-600 font-medium">Popular</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            </div>

            {filteredCities.length === 0 && (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No cities found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Coming Soon Cities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Coming <span className="text-purple-700">Soon</span>
              </h2>
              <p className="text-gray-600">
                We're expanding to new cities. Be the first to know when we launch in your area.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {upcomingCities.map((city, index) => (
                <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                  <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{city.name}</h3>
                  <div className="inline-block px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-medium mb-2">
                    {city.status}
                  </div>
                  <p className="text-gray-600 text-sm">{city.launchDate}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className="bg-purple-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Don't see your city?</h3>
                <p className="text-gray-600 mb-6">
                  Let us know where you'd like to see Kuber.cab next. We're always looking to expand to new areas.
                </p>
                <button className="bg-purple-700 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-800 transition-colors">
                  Request Your City
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* City Partnership */}
      <section className="py-16 bg-purple-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Partner with Us
            </h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Are you a city official or business looking to bring Kuber.cab to your area? 
              Let's discuss partnership opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-700 px-8 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors">
                Partnership Inquiry
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-full font-medium hover:bg-purple-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CitiesPage;