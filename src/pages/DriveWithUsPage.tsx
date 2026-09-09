import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import PageHero from '../components/PageHero';
import GooglePlayButton from '../components/GooglePlayButton';
import StartSlider from '../components/StartSlider';
import DriverCards from '../components/DriverCards';
import { PLAY_STORE_DRIVER } from '../constants';
import { IMAGES } from '../constants/images';

const DriveWithUsPage: React.FC = () => {
  const requirements = [
    'Valid driving licence',
    'Vehicle registration documents',
    'Insurance papers',
    'Aadhaar card and PAN card',
    'Background verification as required',
  ];

  const steps = [
    {
      n: '01',
      title: 'Download',
      text: 'Install Kuber Pilot from Google Play. You cannot apply from this website.',
      image: IMAGES.driverStepDownload,
      alt: 'Download the Kuber Pilot driver app',
    },
    {
      n: '02',
      title: 'Register',
      text: 'Create your account and upload documents in the driver app.',
      image: IMAGES.driverStepRegister,
      alt: 'Register and upload documents in the app',
    },
    {
      n: '03',
      title: 'Verify',
      text: 'Complete checks and orientation in the app.',
      image: IMAGES.driverStepVerify,
      alt: 'Verification complete in Kuber Pilot',
    },
    {
      n: '04',
      title: 'Go online',
      text: 'Start accepting trip requests as a Kuber Pilot.',
      image: IMAGES.driverStepOnline,
      alt: 'Go online and accept trips',
    },
  ];

  const [startIndex, setStartIndex] = useState(0);

  return (
    <div>
      <PageHero
        kicker="Kuber Pilot"
        title="Drive with Kuber.cab"
        description="Applications are only in the Kuber Pilot driver app. Download it, register, and go online in Ahmedabad and nearby Gujarat."
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <GooglePlayButton href={PLAY_STORE_DRIVER} />
          <a href="#how-to-start" className="btn-secondary rounded-full">
            How to get started
          </a>
        </div>
      </PageHero>

      <DriverCards className="bg-white" />

      <section id="how-to-start" className="section-pad scroll-mt-24 bg-paper md:scroll-mt-28">
        <div className="site-container">
          <h2 className="display mb-10 text-3xl">How to get started</h2>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]">
            <StartSlider slides={steps} index={startIndex} onIndexChange={setStartIndex} />
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {steps.map((step, i) => (
                <li key={step.n}>
                  <button
                    type="button"
                    onClick={() => setStartIndex(i)}
                    className={`w-full rounded-xl border px-5 py-4 text-left transition-colors ${
                      startIndex === i ? 'border-purple-600 bg-white' : 'border-line bg-white/70 hover:border-purple-300'
                    }`}
                  >
                    <p className="font-display text-2xl text-purple-700">{step.n}</p>
                    <h3 className="mt-2 font-semibold">{step.title}</h3>
                    <p className="mt-1.5 text-sm text-ink-muted">{step.text}</p>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="display text-3xl">What you need</h2>
            <ul className="mt-6 space-y-3 text-ink-muted">
              {requirements.map((item) => (
                <li key={item} className="border-b border-line pb-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-lg">
            <img
              src={IMAGES.cabDriverHero}
              alt="Kuber Pilot driver"
              className="aspect-[5/4] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section id="download-driver" className="section-pad bg-paper">
        <div className="site-container grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="display text-3xl">Get the Kuber Pilot app</h2>
            <p className="mt-4 max-w-md text-ink-muted">
              We do not take driver applications on the website. Download Kuber Pilot, complete signup in the app, and wait for verification.
            </p>
            <GooglePlayButton href={PLAY_STORE_DRIVER} className="mt-8" />
          </div>
          <div>
            <h3 className="font-semibold">Questions about driving?</h3>
            <ul className="mt-6 space-y-5 text-sm text-ink-muted">
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-purple-700" />
                <a href="tel:+919898002124" className="hover:text-ink">
                  +91 98980 02124
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-purple-700" />
                <a href="mailto:info.kubercab@gmail.com" className="hover:text-ink">
                  info.kubercab@gmail.com
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-purple-700" />
                <span>Duffnala, Shahibag, Ahmedabad, Gujarat 380004</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DriveWithUsPage;
