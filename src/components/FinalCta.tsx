import React from 'react';
import GooglePlayButton from './GooglePlayButton';
import { PLAY_STORE_DRIVER, PLAY_STORE_RIDER } from '../constants';

const FinalCta: React.FC = () => {
  return (
    <section id="download" className="bg-white section-pad">
      <div className="site-container">
        <div className="section-head mx-auto text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl lg:text-5xl">
            Ride and drive from your phone
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-muted md:text-lg">
            Book a ride in Kuber Cab, or go online in the Kuber Pilot driver app.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="rounded-2xl border border-line bg-paper p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-purple-700">Riders</p>
            <h3 className="mt-3 text-2xl font-extrabold text-ink">Kuber Cab app</h3>
            <p className="mt-2 text-sm text-ink-muted">
              Choose bike, auto, or cab. Track your trip. Pay with UPI, card, or cash.
            </p>
            <GooglePlayButton href={PLAY_STORE_RIDER} className="mt-6" />
          </div>

          <div className="rounded-2xl border border-line bg-paper p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-purple-700">Drivers</p>
            <h3 className="mt-3 text-2xl font-extrabold text-ink">Kuber Pilot app</h3>
            <p className="mt-2 text-sm text-ink-muted">
              Driver signup is only in the app. Download Kuber Pilot, verify, then accept trips.
            </p>
            <GooglePlayButton href={PLAY_STORE_DRIVER} className="mt-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
