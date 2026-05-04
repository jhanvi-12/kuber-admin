import React from 'react';
import { CheckCircle, ChevronRight } from 'lucide-react';

const DriverPartner: React.FC = () => {
  const benefits = [
    'Flexible working hours - be your own boss',
    'Competitive earnings with weekly payouts',
    'Bonus incentives during peak hours',
    'Dedicated support team for partners',
    'Access to exclusive partner benefits and discounts'
  ];

  return (
    <section id="driver" className="py-16 bg-purple-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -right-24 -top-24 w-64 h-64 bg-purple-200 rounded-full opacity-50"></div>
      <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-purple-200 rounded-full opacity-50"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Drive with <span className="text-purple-700">Kuber.cab</span>
            </h2>
            
            <p className="text-gray-600 mb-8">
              Join our growing team of driver partners and enjoy the freedom of flexible work with competitive earnings. Whether you drive full-time or just a few hours a week, Kuber.cab provides opportunities that fit your lifestyle.
            </p>
            
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#register-driver" 
                className="py-3 px-8 bg-purple-700 text-white rounded-full font-medium hover:bg-purple-800 transition-colors flex items-center justify-center"
              >
                Register as Driver <ChevronRight className="ml-1 h-4 w-4" />
              </a>
              <a 
                href="#learn-more" 
                className="py-3 px-8 bg-white text-purple-700 border border-purple-700 rounded-full font-medium hover:bg-purple-50 transition-colors text-center"
              >
                Learn More
              </a>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/8358149/pexels-photo-8358149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Kuber.cab driver partner" 
              className="rounded-xl shadow-xl object-cover h-[500px] w-full"
            />
            
            <div className="absolute -left-6 -bottom-6 bg-white p-4 rounded-lg shadow-lg max-w-xs">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <p className="font-semibold text-gray-900">Weekly Earnings</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">12-15K Rs</p>
                </div>
                <div className="text-green-600 font-medium">+12% ↑</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DriverPartner;