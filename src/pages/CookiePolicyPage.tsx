import React from 'react';
import { Mail } from 'lucide-react';
import PageHero from '../components/PageHero';

const CookiePolicyPage: React.FC = () => {
  const cookieTypes = [
    {
      title: 'Essential Cookies',
      description:
        'These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.',
      examples: ['Session management', 'Security features', 'Basic functionality'],
    },
    {
      title: 'Performance Cookies',
      description:
        'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      examples: ['Analytics data', 'Usage patterns', 'Performance metrics'],
    },
    {
      title: 'Functional Cookies',
      description:
        'These cookies enable enhanced functionality and personalization, such as remembering your preferences and choices.',
      examples: ['User preferences', 'Language settings', 'Customization options'],
    },
    {
      title: 'Marketing Cookies',
      description:
        'These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad.',
      examples: ['Ad targeting', 'Campaign tracking', 'Behavioral data'],
    },
  ];

  return (
    <div>
      <PageHero
        kicker="Legal"
        title="Cookie Policy"
        description="Learn about how we use cookies to improve your experience on our website and protect your privacy."
      />

      <div className="site-container max-w-3xl space-y-14 py-14 md:py-16">
        <section>
          <h2 className="display text-2xl">What Are Cookies?</h2>
          <p className="mt-4 leading-relaxed text-ink-muted">
            Cookies are small text files that are placed on your device when you visit our website. They help us
            provide you with a better experience by remembering your preferences and understanding how you use our
            service. Think of them as helpful digital notes that make your browsing experience smoother and more
            personalized.
          </p>
        </section>

        <section>
          <h2 className="display text-2xl">Types of Cookies We Use</h2>
          <p className="mt-3 text-ink-muted">
            We use different types of cookies for various purposes to enhance your experience
          </p>
          <div className="mt-8 space-y-8">
            {cookieTypes.map((cookie) => (
              <div key={cookie.title} className="border-t border-line pt-6">
                <h3 className="text-lg font-semibold">{cookie.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{cookie.description}</p>
                <p className="mt-3 text-sm font-medium text-ink">Examples:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-muted">
                  {cookie.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="display text-2xl">How We Use Cookies</h2>
          <ul className="mt-6 space-y-4 text-ink-muted">
            <li>
              <span className="font-medium text-ink">Understand Usage. </span>
              Analyze how you interact with our website
            </li>
            <li>
              <span className="font-medium text-ink">Remember Preferences. </span>
              Save your settings and preferences
            </li>
            <li>
              <span className="font-medium text-ink">Improve Services. </span>
              Enhance our website and services
            </li>
            <li>
              <span className="font-medium text-ink">Relevant Advertising. </span>
              Show you more relevant content and ads
            </li>
            <li>
              <span className="font-medium text-ink">Security. </span>
              Ensure website security and prevent fraud
            </li>
            <li>
              <span className="font-medium text-ink">Performance. </span>
              Monitor and improve website performance
            </li>
          </ul>
        </section>

        <section>
          <h2 className="display text-2xl">Managing Your Cookie Preferences</h2>
          <p className="mt-4 font-medium">You have control over cookies</p>
          <ul className="mt-6 space-y-4 text-ink-muted">
            <li>
              <span className="font-medium text-ink">Browser Settings. </span>
              Modify your browser settings to accept or reject cookies
            </li>
            <li>
              <span className="font-medium text-ink">Third-party Tools. </span>
              Use various tools to manage cookies across all websites
            </li>
            <li>
              <span className="font-medium text-ink">Our Consent Tool. </span>
              Adjust your preferences using our cookie consent banner
            </li>
          </ul>
        </section>

        <section>
          <h2 className="display text-2xl">Third-Party Cookies</h2>
          <p className="mt-4 leading-relaxed text-ink-muted">
            Some cookies are placed by third-party services that appear on our pages. We do not control these
            third-party cookies and recommend reviewing their privacy policies.
          </p>
          <p className="mt-4 text-sm text-ink-muted">
            Note: Third-party cookies are governed by the respective third party&apos;s privacy policy, not this Cookie
            Policy.
          </p>
        </section>

        <section className="border-t border-line pt-10">
          <div className="flex items-start gap-3">
            <Mail className="mt-1 h-5 w-5 text-purple-700" />
            <div>
              <h2 className="display text-2xl">Questions About Our Cookie Policy?</h2>
              <p className="mt-3 text-ink-muted">
                If you have any questions about our Cookie Policy, we&apos;re here to help clarify things for you.
              </p>
              <p className="mt-4 text-sm">
                Email:{' '}
                <a href="mailto:info.kubercab@gmail.com" className="text-purple-700 hover:underline">
                  info.kubercab@gmail.com
                </a>
              </p>
              <p className="text-sm text-ink-muted">Address: Duffnala, Shahibag, Ahmedabad, Gujarat 380004</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
