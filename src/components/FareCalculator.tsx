import React, { useState } from 'react';
import { Calculator, Bike, Car } from 'lucide-react';

const FareCalculator: React.FC = () => {
  const [distance, setDistance] = useState<number>(5);
  const [rideType, setRideType] = useState<string>('bike');

  const calculateFare = () => {
    let baseFare = 0;
    let perKmRate = 0;

    switch (rideType) {
      case 'bike':
        baseFare = 30;
        perKmRate = 15;
        break;
      case 'auto':
        baseFare = 50;
        perKmRate = 20;
        break;
      case 'sedan':
        baseFare = 100;
        perKmRate = 25;
        break;
      case 'suv':
        baseFare = 150;
        perKmRate = 30;
        break;
      default:
        baseFare = 30;
        perKmRate = 15;
    }

    return (baseFare + (distance * perKmRate)).toFixed(2);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-purple-50 rounded-2xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-10">
              <div className="flex items-center mb-6">
                <Calculator className="h-8 w-8 text-purple-700 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Fare Calculator</h2>
              </div>

              <p className="text-gray-600 mb-8">
                Estimate your fare before booking your ride. Move the slider to adjust distance and select your preferred ride type.
              </p>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Distance (km): {distance} km
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  value={distance} 
                  onChange={(e) => setDistance(parseInt(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-700"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 km</span>
                  <span>50 km</span>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-2">
                  Ride Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    className={`flex items-center justify-center p-4 rounded-lg border ${
                      rideType === 'bike' ? 'border-purple-700 bg-purple-100 text-purple-700' : 'border-gray-200 bg-white text-gray-700'
                    }`}
                    onClick={() => setRideType('bike')}
                  >
                    <Bike className="h-5 w-5 mr-2" />
                    <span>Bike</span>
                  </button>
                  <button 
                    className={`flex items-center justify-center p-4 rounded-lg border ${
                      rideType === 'auto' ? 'border-purple-700 bg-purple-100 text-purple-700' : 'border-gray-200 bg-white text-gray-700'
                    }`}
                    onClick={() => setRideType('auto')}
                  >
                    <Car className="h-5 w-5 mr-2" />
                    <span>Auto</span>
                  </button>
                  <button 
                    className={`flex items-center justify-center p-4 rounded-lg border ${
                      rideType === 'sedan' ? 'border-purple-700 bg-purple-100 text-purple-700' : 'border-gray-200 bg-white text-gray-700'
                    }`}
                    onClick={() => setRideType('sedan')}
                  >
                    <Car className="h-5 w-5 mr-2" />
                    <span>Sedan</span>
                  </button>
                  <button 
                    className={`flex items-center justify-center p-4 rounded-lg border ${
                      rideType === 'suv' ? 'border-purple-700 bg-purple-100 text-purple-700' : 'border-gray-200 bg-white text-gray-700'
                    }`}
                    onClick={() => setRideType('suv')}
                  >
                    <Car className="h-5 w-5 mr-2" />
                    <span>SUV</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 bg-purple-700 p-8 md:p-10 text-white flex items-center justify-center">
              <div className="text-center">
                <p className="text-purple-200 mb-2">Estimated Fare</p>
                <div className="text-4xl md:text-5xl font-bold mb-4">
                  ₹{calculateFare()}
                </div>
                <p className="text-purple-100 text-sm">
                  *This is an estimate. Actual fare may vary based on traffic, route, and other factors.
                </p>
                <button className="mt-8 bg-white text-purple-700 py-3 px-8 rounded-full font-medium hover:bg-purple-50 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FareCalculator;