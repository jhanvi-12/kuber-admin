import React, { useState } from 'react';
import { Bike, Car, Clock, Shield, Star, CheckCircle, ArrowRight, Users, MapPin, CreditCard } from 'lucide-react';
import { SERVICES } from '../constants';

const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState('bike');

  const getIcon = (iconName: string, size: number = 48) => {
    switch (iconName) {
      case 'bike':
        return <Bike size={size} className="text-purple-600" />;
      case 'car':
      default:
        return <Car size={size} className="text-purple-600" />;
    }
  };

  const serviceDetails = {
    bike: {
      image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: ['Quick pickup in 2-5 minutes', 'Navigate through traffic easily', 'Eco-friendly transportation', 'Affordable rates starting ₹30'],
      idealFor: ['Solo travelers', 'Short distance trips', 'Quick errands', 'Avoiding traffic jams']
    },
    auto: {
      image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: ['Weather protection', 'Space for small luggage', 'Comfortable seating for 3', 'Fixed pricing, no surge'],
      idealFor: ['Small groups', 'Shopping trips', 'Airport transfers', 'Rainy weather travel']
    },
    sedan: {
      image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: ['Air conditioning', 'Premium comfort', 'Professional drivers', 'Spacious interiors'],
      idealFor: ['Business meetings', 'Family trips', 'Long distance travel', 'Special occasions']
    },
    suv: {
      image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: ['Group travel up to 6 people', 'Large luggage space', 'Premium experience', 'Airport transfers'],
      idealFor: ['Group outings', 'Airport trips', 'Family vacations', 'Corporate events']
    }
  };

  const whyChooseUs = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: '24/7 Availability',
      description: 'Round-the-clock service whenever you need a ride'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Safety First',
      description: 'Verified drivers and real-time tracking for your security'
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: 'Quality Service',
      description: 'Professional drivers committed to excellent service'
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: 'Flexible Payment',
      description: 'Multiple payment options including UPI, cards, and cash'
    }
  ];

  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
              <Car className="h-8 w-8 text-purple-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-purple-700">Services</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Choose from our range of transportation options designed to meet every need. 
              From quick bike rides to spacious SUVs, we have the perfect ride for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <Users className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-gray-700">1M+ Happy Riders</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <MapPin className="h-5 w-5 text-blue-600 mr-2" />
               <span className="text-gray-700">Gujarat</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <Clock className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-gray-700">24/7 Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {SERVICES.map((service) => (
              <div 
                key={service.id}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-2 cursor-pointer ${
                  selectedService === service.id ? 'border-purple-500 bg-purple-50' : 'border-gray-100'
                }`}
                onClick={() => setSelectedService(service.id)}
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

                <div className="space-y-2 mb-6">
                  {service.benefits.slice(0, 2).map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${
                  selectedService === service.id 
                    ? 'bg-purple-700 text-white' 
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}>
                  {selectedService === service.id ? 'Selected' : 'Select'} 
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-6">
                  <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                    Service Details
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {SERVICES.find(s => s.id === selectedService)?.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {SERVICES.find(s => s.id === selectedService)?.description}
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                  <div className="space-y-3">
                    {serviceDetails[selectedService as keyof typeof serviceDetails]?.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Ideal For</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {serviceDetails[selectedService as keyof typeof serviceDetails]?.idealFor.map((use, index) => (
                      <div key={index} className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                        <Star className="h-4 w-4 text-yellow-500 mr-2" />
                        <span className="text-gray-700 text-sm">{use}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="bg-purple-700 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-800 transition-colors">
                  Book {SERVICES.find(s => s.id === selectedService)?.title} Now
                </button>
              </div>

              <div className="relative">
                <img 
                  src={serviceDetails[selectedService as keyof typeof serviceDetails]?.image}
                  alt={SERVICES.find(s => s.id === selectedService)?.title}
                  className="rounded-xl shadow-xl object-cover h-[500px] w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Available Now</p>
                      <p className="text-sm text-gray-500">Book instantly</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-purple-700">Kuber.cab</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best transportation experience with safety, reliability, and comfort.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                  <div className="text-purple-600">{item.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience Premium Transportation?
            </h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Download our app and book your first ride today. Join millions of satisfied customers who trust Kuber.cab.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-700 px-8 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors">
                Download App
              </button>
              <button className="bg-purple-600 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-500 transition-colors">
                Book a Ride Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;