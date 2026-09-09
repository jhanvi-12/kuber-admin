import React from 'react';
import GooglePlayButton from './GooglePlayButton';
import { PLAY_STORE_DRIVER } from '../constants';
import { IMAGES } from '../constants/images';

const DriverPartner: React.FC = () => {
  return (
    <section id="driver" className="bg-white px-5 py-10 md:px-10 md:py-16 lg:px-16 lg:py-20">
      <div className="overflow-hidden rounded-[1.75rem] bg-purple-700 lg:rounded-[2rem]">
        <div className="grid items-center lg:grid-cols-2">
          <div className="px-8 py-16 text-white md:px-12 md:py-20 lg:px-16">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">Drive with Kuber</h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-purple-100 md:text-lg">
              Join as a Kuber Pilot in the driver app — not on this website. Flexible hours, weekly payouts, and partner support.
            </p>
            <GooglePlayButton href={PLAY_STORE_DRIVER} variant="light" className="mt-10" />
          </div>
          <div className="overflow-hidden">
            <img
              src={IMAGES.kuberRideCab}
              alt="Kuber Cab driver"
              className="aspect-[16/10] w-full object-cover lg:aspect-auto lg:h-full lg:min-h-[460px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DriverPartner;
