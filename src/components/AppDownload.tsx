import React from 'react';
import { CheckCircle, Smartphone } from 'lucide-react';
import GooglePlayIcon from './icons/GooglePlayIcon';
import { PLAY_STORE_RIDER } from '../constants';

const AppDownload: React.FC = () => {
  const features = [
    'Book rides with just a few taps',
    'Track your driver in real-time',
    'Multiple payment options',
    'Save favorite locations',
    '24/7 customer support',
    'Ride history and digital receipts'
  ];

  return (
    <section id="download" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="relative mx-auto w-[280px] h-[560px] bg-gray-900 rounded-[3rem] overflow-hidden border-[8px] border-gray-900 shadow-xl">
              <div className="absolute top-0 w-[120px] h-[30px] bg-gray-900 left-1/2 transform -translate-x-1/2 rounded-b-2xl z-10"></div>
              <img 
                src="https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Kuber.cab mobile app" 
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 bg-purple-100 p-3 rounded-lg shadow-md transform -rotate-6">
              <div className="flex items-center">
                <Smartphone className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-700">Fast booking</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-purple-100 p-3 rounded-lg shadow-md transform rotate-6">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-700">Easy payments</span>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Download the <span className="text-purple-700">Kuber.cab</span> App
            </h2>
            
            <p className="text-gray-600 mb-8">
              Get the full Kuber.cab experience with our mobile app. Book rides, track your driver, make payments, and more – all from your smartphone.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm">{feature}</p>
                </div>
              ))}
            </div>
            
            <p className="text-gray-600 mb-4">Download now on Google Play:</p>
            
            <a 
              href={PLAY_STORE_RIDER}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center py-3 px-6 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-colors max-w-xs"
            >
              <GooglePlayIcon className="mr-2 h-6 w-6" />
              <div>
                <div className="text-xs">GET IT ON</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;