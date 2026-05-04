import React from 'react';
import { MapPin } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden">
      {/* Background pattern/gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white -z-10"></div>
      <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.pexels.com/photos/1624504/pexels-photo-1624504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-no-repeat bg-right-top opacity-10 -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col space-y-6">
            <div className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium animate-pulse">
              Now available in Gujarat
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Premium Ride-Hailing <span className="text-purple-700">Service</span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-lg">
              Experience comfort, reliability, and professional service with Kuber.cab's premium ride-hailing solutions for all your transportation needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#services" 
                className="py-3 px-8 bg-purple-700 text-white rounded-full font-medium hover:bg-purple-800 transition-colors text-center"
              >
                Explore Our Services
              </a>
              <a 
                href="#contact" 
                className="py-3 px-8 bg-white text-purple-700 border border-purple-700 rounded-full font-medium hover:bg-purple-50 transition-colors text-center"
              >
                Contact Us
              </a>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                <span>4.8/5 Rider Rating</span>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-blue-500 mr-2"></div>
                <span>10M+ Rides</span>
              </div>
            </div>
          </div>
          
          {/* Hero image */}
          <div className="hidden md:block relative">
            <img 
              src="https://images.pexels.com/photos/7433822/pexels-photo-7433822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Kuber.cab ride experience" 
              className="rounded-xl shadow-2xl object-cover h-[500px] w-full transform translate-x-4 translate-y-4"
            />
            <div className="absolute -left-4 -bottom-4 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-purple-600 mr-2" />
                <div>
                  <p className="font-medium text-gray-900">Available in Your City</p>
                  <p className="text-sm text-gray-500">Professional Drivers • 24/7 Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;