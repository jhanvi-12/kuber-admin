import React from 'react';
import {
  ArrowRight,
  CalendarRange,
  Car,
  BadgeIndianRupee,
  ClipboardCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const highlights = [
  {
    icon: CalendarRange,
    title: 'Flexible Rental Plans',
    description: 'Daily, weekly, or custom durations to match your schedule.',
  },
  {
    icon: Car,
    title: 'Well-Maintained Vehicles',
    description: 'Clean, serviced cars and bikes ready for every trip.',
  },
  {
    icon: BadgeIndianRupee,
    title: 'Affordable Pricing',
    description: 'Clear rates with no hidden charges on the rentals page.',
  },
  {
    icon: ClipboardCheck,
    title: 'Easy Booking Process',
    description: 'Select your vehicle and complete booking in a few steps.',
  },
];

const RentalOffers: React.FC = () => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate('/rental-booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="rentals" className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/30 to-white -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Vehicle <span className="text-purple-700">Rentals</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Choose from a wide range of well-maintained vehicles for local travel,
            outstation trips, business needs, and daily commutes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          {highlights.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white rounded-xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md hover:border-purple-100 transition-all"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 mb-4">
                <Icon className="h-6 w-6 text-purple-700" strokeWidth={1.75} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={handleViewMore}
            className="inline-flex items-center justify-center gap-2 py-3.5 px-10 bg-purple-700 text-white rounded-xl font-semibold hover:bg-purple-800 transition-colors shadow-lg shadow-purple-700/20"
          >
            View More
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RentalOffers;
