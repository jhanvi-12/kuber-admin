import React from 'react';
import { Apple, CheckCircle, Smartphone } from 'lucide-react';

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
            
            <p className="text-gray-600 mb-4">Download now on:</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#app-store" 
                className="flex items-center justify-center py-3 px-6 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-colors"
              >
                <Apple className="h-6 w-6 mr-2" />
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
              
              <a 
                href="#play-store" 
                className="flex items-center justify-center py-3 px-6 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-colors"
              >
                <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.609 22.186c-.181.181-.29.423-.29.681V1.133c0 .258.109.5.29.681zm10.831 11.852l2.769-2.769L5.826 4.696l8.614 8.97zm0-3.34L5.826 19.304l11.383-6.201-2.769-2.777zm4.596-2.753l-3.838 2.083 3.838 2.083c.437.238.708.687.708 1.182s-.271.944-.708 1.182l-3.838 2.083 3.838 2.083c.437.238.708.687.708 1.182 0 .748-.607 1.355-1.355 1.355-.245 0-.485-.067-.697-.193l-14.027-7.63c-.457-.248-.739-.725-.739-1.244 0-.519.282-.996.739-1.244l14.027-7.63c.212-.126.452-.193.697-.193.748 0 1.355.607 1.355 1.355 0 .495-.271.944-.708 1.182z" />
                </svg>
                <div>
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;