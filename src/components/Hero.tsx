import React from 'react';
import { IMAGES } from '../constants/images';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="site-container relative z-10 flex min-h-[88svh] items-center pt-28 pb-16 lg:min-h-[760px] lg:pt-24 lg:pb-20">
        <div className="max-w-[28rem] lg:max-w-[32rem]">
          <h1 className="text-[2.75rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.75rem]">
            Bike taxi,
            <br />
            Auto &amp; Cab
          </h1>
          <p className="mt-5 text-lg text-ink-muted">
            Book a ride in Ahmedabad and nearby Gujarat.
          </p>
          <a
            href="#download"
            className="mt-8 inline-flex rounded-full bg-purple-700 px-10 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-purple-800"
          >
            Download App
          </a>
        </div>
      </div>

      <div className="hero-rapido-art relative h-[300px] w-full sm:h-[380px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[55%]">
        <img
          src={IMAGES.kuberHeroComposite}
          alt="Kuber Cab bike, auto and cab"
          className="h-full w-full object-cover object-[center_center]"
        />
      </div>
    </section>
  );
};

export default Hero;
