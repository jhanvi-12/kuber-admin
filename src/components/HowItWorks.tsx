import React from 'react';
import { IMAGES } from '../constants/images';

const steps = [
  {
    n: '1',
    title: 'Open the app',
    text: 'Enter pickup and drop, then choose moto, auto, or cab.',
    image: IMAGES.howStepOpenApp,
    alt: 'Booking a ride in the Kuber Cab app',
  },
  {
    n: '2',
    title: 'Get a driver',
    text: 'A nearby verified driver is matched to your trip.',
    image: IMAGES.howStepGetDriver,
    alt: 'Verified Kuber driver arriving for pickup',
  },
  {
    n: '3',
    title: 'Ride & pay',
    text: 'Track the journey. Pay with UPI, card, or cash.',
    image: IMAGES.howStepRidePay,
    alt: 'Paying for a Kuber ride from the phone',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-paper section-pad">
      <div className="site-container">
        <div className="section-head mx-auto text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl lg:text-5xl">How to book a ride</h2>
        </div>
        <ol className="grid gap-10 md:grid-cols-3 md:gap-12">
          {steps.map((step) => (
            <li key={step.n} className="text-center">
              <div className="overflow-hidden rounded-2xl bg-paper">
                <img src={step.image} alt={step.alt} className="aspect-[4/3] w-full object-cover" />
              </div>
              <p className="mt-5 text-4xl font-extrabold text-purple-700">{step.n}</p>
              <h3 className="mt-2 text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;
