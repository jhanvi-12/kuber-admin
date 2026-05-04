import React from 'react';
import { Car, Bike, Clock, Star, ArrowRight, Percent, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RentalOffers: React.FC = () => {
  const navigate = useNavigate();

  const offers = [
    {
      id: 'car-weekend',
      type: 'car',
      title: 'Weekend Car Rental',
      subtitle: 'Perfect for Family Trips',
      discount: '25% OFF',
      originalPrice: '₹3,000',
      offerPrice: '₹2,250',
      duration: 'per day',
      features: ['AC Cars', 'Free Fuel', '24/7 Support', 'Insurance Included'],
      image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gradient: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'bike-daily',
      type: 'bike',
      title: 'Daily Bike Rental',
      subtitle: 'Beat the Traffic',
      discount: '30% OFF',
      originalPrice: '₹1,200',
      offerPrice: '₹840',
      duration: 'per day',
      features: ['Fuel Efficient', 'Easy Parking', 'Quick Booking', 'Helmet Included'],
      image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gradient: 'from-green-500 to-teal-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    }
  ];

  const handleBookNow = () => {
    navigate('/rental-booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full opacity-20 -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-200 rounded-full opacity-20 translate-x-24 translate-y-24"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6">
            <Percent className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Special <span className="text-purple-700">Rental Offers</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Get the best deals on car and bike rentals. Perfect for daily commutes, weekend trips, or special occasions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <Clock className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-gray-700">Limited Time Offers</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-gray-700">Premium Vehicles</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <Calendar className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-gray-700">Flexible Booking</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {offers.map((offer) => (
            <div 
              key={offer.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Offer Header */}
              <div className={`bg-gradient-to-r ${offer.gradient} p-6 text-white relative`}>
                <div className="absolute top-4 right-4">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white font-bold text-sm">{offer.discount}</span>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {offer.type === 'car' ? 
                    <Car className="h-8 w-8 mr-3" /> : 
                    <Bike className="h-8 w-8 mr-3" />
                  }
                  <div>
                    <h3 className="text-2xl font-bold">{offer.title}</h3>
                    <p className="text-white text-opacity-90">{offer.subtitle}</p>
                  </div>
                </div>
                
                {/* Pricing */}
                <div className="flex items-end">
                  <div className="mr-4">
                    <span className="text-white text-opacity-70 line-through text-lg">{offer.originalPrice}</span>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">{offer.offerPrice}</span>
                      <span className="text-white text-opacity-90 ml-2">{offer.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black from-opacity-20 to-transparent"></div>
              </div>

              {/* Features */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">What's Included:</h4>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {offer.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-3 ${offer.textColor.replace('text-', 'bg-')}`}></div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleBookNow}
                  className={`w-full ${offer.buttonColor} text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group`}
                >
                  Book Now & Save {offer.discount}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need a Custom Rental Plan?
            </h3>
            <p className="text-gray-600 mb-6">
              Looking for long-term rentals or corporate packages? We have special rates for extended bookings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBookNow}
                className="bg-purple-700 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-800 transition-colors"
              >
                Explore All Vehicles
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="border border-purple-700 text-purple-700 px-8 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors"
              >
                Contact for Custom Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentalOffers;