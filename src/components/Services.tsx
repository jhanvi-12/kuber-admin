import React from 'react';
import { Bike, Car, Plus, Star } from 'lucide-react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'bike':
        return <Bike size={48} className="text-purple-600" />;
      case 'car':
      default:
        return <Car size={48} className="text-purple-600" />;
    }
  };

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-purple-700">Services</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect ride option that suits your needs. From quick bike rides to spacious SUVs, we've got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100"
            >
              <div className="mb-6">
                {getIcon(service.icon)}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-6">
                {service.description}
              </p>

              <div className="space-y-2">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <Star className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <button className="mt-6 w-full py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors flex items-center justify-center">
                Learn More <Plus className="ml-1 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">Looking for something else?</p>
          <a 
            href="#contact" 
            className="inline-block py-3 px-8 bg-purple-700 text-white rounded-full font-medium hover:bg-purple-800 transition-colors"
          >
            Contact Us for Custom Solutions
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;