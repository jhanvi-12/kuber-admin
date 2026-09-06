import React from 'react';
import { ShieldCheck, MapPinned, Siren, Share2 } from 'lucide-react';

const features = [
  { icon: ShieldCheck, title: 'Verified drivers', text: 'Background checks before a driver goes online.' },
  { icon: MapPinned, title: 'Live tracking', text: 'Follow your ride in real time in the app.' },
  { icon: Share2, title: 'Share trip', text: 'Send your live trip to someone you trust.' },
  { icon: Siren, title: 'SOS support', text: 'Emergency assistance from the rider app.' },
];

const Safety: React.FC = () => {
  return (
    <section className="bg-white section-pad">
      <div className="site-container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="overflow-hidden rounded-3xl">
          <img
            src="/kuber-safety.png"
            alt="Live trip tracking and safety tools in the Kuber Cab app"
            className="aspect-[5/4] w-full object-cover object-center"
          />
        </div>
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl lg:text-5xl">Your safety, our priority</h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted md:text-lg">Features already in the Kuber Cab rider app.</p>
          <ul className="mt-10 space-y-7">
            {features.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold text-ink">{title}</span>
                  <span className="text-sm text-ink-muted">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Safety;
