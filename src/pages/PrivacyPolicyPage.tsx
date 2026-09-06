import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import LegalPageShell, { GrievanceBlock, LegalSection } from '../components/LegalPageShell';

const NAV = [
  { id: 'who-we-are', title: 'Who we are' },
  { id: 'scope', title: 'What this policy covers' },
  { id: 'data-safety', title: 'Play Store data summary' },
  { id: 'information-we-collect', title: 'Information we collect' },
  { id: 'how-we-use', title: 'How we use information' },
  { id: 'permissions', title: 'App permissions' },
  { id: 'sharing', title: 'Sharing and processors' },
  { id: 'retention', title: 'Retention' },
  { id: 'delete-account', title: 'How to delete your account' },
  { id: 'security', title: 'Security' },
  { id: 'your-choices', title: 'Your choices' },
  { id: 'children', title: 'Children' },
  { id: 'changes', title: 'Changes' },
];

const PrivacyPolicyPage: React.FC = () => {
  return (
    <LegalPageShell
      icon={<Shield className="h-8 w-8" />}
      accent="purple"
      kicker="Kuber Cab – Ride Booking App"
      title="Privacy"
      titleAccent="Policy"
      subtitle="This policy explains how the Kuber Cab rider app collects, uses, and deletes personal information. It applies only to passengers (customers) who book rides."
      lastUpdated="6 September 2026"
      nav={NAV}
      related={[
        { to: '/terms-conditions', label: 'Rider Terms & Conditions' },
        { to: '/driver/privacy-policy', label: 'Kuber Pilot (driver) Privacy Policy' },
      ]}
      grievance={
        <GrievanceBlock
          heading="Contact and grievance officer"
          intro="For privacy questions, account deletion, or a complaint, write to Shivang Brahmbhatt, Grievance Officer."
          operatorSentence="Kuber Cab is operated by Shivang Brahmbhatt, trading as Kuber Mobility."
        />
      }
    >
      <LegalSection id="who-we-are" title="1. Who we are">
        <p>
          Kuber Cab is operated by Shivang Brahmbhatt, trading as Kuber Mobility. This is a personal Google Play
          listing, not a registered company. The Android app is <strong>Kuber Cab - Ride Booking App</strong>{' '}
          (package <code className="text-sm bg-gray-100 px-1 rounded">com.app.kuberCab</code>).
        </p>
        <p>
          We currently offer the rider service in <strong>Ahmedabad and nearby areas in Gujarat, India</strong>. We
          do not claim pan-India coverage.
        </p>
        <p>
          A companion driver app (Kuber Pilot) exists so pilots can accept trips. This Privacy Policy is{' '}
          <strong>only for the rider app</strong>. Drivers should read the{' '}
          <Link to="/driver/privacy-policy" className="text-purple-700 font-medium hover:underline">
            Kuber Pilot Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="scope" title="2. What this policy covers">
        <p>
          It covers personal information processed when you register, log in, book and track a ride, use coupons,
          rate a trip, share an invoice, call a pilot, share a trip, or use SOS in the Kuber Cab Android app, and
          when you contact us at info.kubercab@gmail.com.
        </p>
        <p>
          The website at kubercab.in may also host this policy. If you only visit these public pages, we may process
          limited technical data needed to serve the page (for example, standard web server logs). This policy is
          written mainly for the rider app.
        </p>
      </LegalSection>

      <LegalSection id="data-safety" title="3. Play Store data safety summary">
        <p>
          This summary is meant to match how we describe data in Google Play’s Data safety form. We do{' '}
          <strong>not sell</strong> personal data. We do <strong>not</strong> collect contacts. The rider app does{' '}
          <strong>not</strong> take in-app payments from passengers.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Precise location:</strong> collected while you use the app (not a background-location
            permission). Used to set pickup, find nearby pilots, and show your trip on the map.
          </li>
          <li>
            <strong>Photos:</strong> optional profile photo from the camera or a gallery picker. The app is not a
            general photo-library product.
          </li>
          <li>
            <strong>Personal info:</strong> name, email address, and mobile number.
          </li>
          <li>
            <strong>Device IDs:</strong> optional Firebase Cloud Messaging (FCM) / device token so we can send ride
            status notifications.
          </li>
        </ul>
        <p>
          Account credentials (password) are stored in hashed form on our servers. We describe them as credentials,
          not as a readable password.
        </p>
      </LegalSection>

      <LegalSection id="information-we-collect" title="4. Information we collect">
        <h3 className="text-lg font-semibold text-gray-900">Account</h3>
        <p>
          When you register we collect full name, email, mobile number, and credentials. We send an email OTP to
          verify your email. You can log in with email or phone plus password, reset a forgotten password, change
          password, log out, and edit your profile (name, email, profile photo).
        </p>
        <h3 className="text-lg font-semibold text-gray-900">Ride booking</h3>
        <p>
          Pickup and drop addresses and coordinates, fare estimate and fare breakdown, optional promo coupons, ride
          IDs and status, live search for a pilot, trip tracking, the ride OTP / verification code, cancellation
          events, ratings and reviews after a trip, ride history, and invoice PDFs you generate or share.
        </p>
        <p>
          While a trip is assigned we show you the pilot’s name, vehicle details, number plate, and phone number so
          you can call them. We also support sharing the trip with someone you choose, and SOS which places a call
          to India’s emergency number 112 from your device.
        </p>
        <h3 className="text-lg font-semibold text-gray-900">Location</h3>
        <p>
          We collect precise location <strong>only while the app is in use</strong>. We do not request Android
          background location permission. Before the system permission prompt, the app shows an in-app explanation
          of why location is needed.
        </p>
        <h3 className="text-lg font-semibold text-gray-900">Device and session</h3>
        <p>
          Notification permission (if you allow it), camera access for a profile photo, and gallery access only to
          pick a profile photo. A local session is stored on your device using Hive. Ride status and driver location
          during a trip are delivered over HTTPS to api.kubercab.in and through Socket.IO. Push notifications use
          Firebase Cloud Messaging.
        </p>
        <h3 className="text-lg font-semibold text-gray-900">What we do not collect in this app</h3>
        <p>
          We do not collect Aadhaar. We do not run an in-app payment gateway, wallet, or card checkout for riders.
          Fare is paid to the pilot (cash or UPI to the driver). Coupons only change the fare shown in the app.
        </p>
      </LegalSection>

      <LegalSection id="how-we-use" title="5. How we use information">
        <ul className="list-disc pl-6 space-y-2">
          <li>Create and secure your account (including email OTP, login, and password reset).</li>
          <li>Let you book, estimate fares, apply coupons, match with a nearby pilot, and track the trip.</li>
          <li>Show the ride OTP, enable cancel, ratings, history, invoice sharing, calling the pilot, and trip share.</li>
          <li>Send ride-related push notifications if you grant notification permission.</li>
          <li>Respond to support emails and phone calls, and handle account deletion requests.</li>
          <li>Detect abuse such as fake bookings and protect the safety of riders and pilots.</li>
        </ul>
        <p>We do not use your rider data to sell advertising audiences, and we do not sell personal data.</p>
      </LegalSection>

      <LegalSection id="permissions" title="6. App permissions">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Precise location (while in use):</strong> pickup, nearby pilots, and live trip map. Core booking
            features will not work correctly if you refuse location while trying to book or track a ride.
          </li>
          <li>
            <strong>Notifications:</strong> ride status and assignment alerts. You can refuse; you may miss updates
            unless you keep the app open.
          </li>
          <li>
            <strong>Camera and photos/media (profile only):</strong> optional profile photo. You can skip a photo.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="sharing" title="7. Who we share information with">
        <p>We do not sell your personal information.</p>
        <p>We share only what is needed to run the service:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Pilots (drivers):</strong> details needed to complete your booking (typically pickup/drop,
            rider name/phone for the trip, and ride OTP as implemented in the product).
          </li>
          <li>
            <strong>People you choose:</strong> if you share a trip or an invoice PDF.
          </li>
          <li>
            <strong>Processors:</strong> Google (Maps, Places, Directions, and Firebase Cloud Messaging); the
            hosting provider for our API at api.kubercab.in. They process data on our instructions to provide those
            services.
          </li>
          <li>
            <strong>Lawful requests:</strong> if Indian law or a competent authority requires disclosure.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="retention" title="8. How long we keep information">
        <p>
          We keep account and ride records while your account is open so you can see history, invoices, and support
          a trip. When you delete your account, the rules in the next section apply. We do not describe deletion as
          a freeze or a permanent deactivation that keeps the same account waiting.
        </p>
      </LegalSection>

      <LegalSection id="delete-account" title="9. How to delete your account">
        <p>
          You can delete your Kuber Cab rider account from the app:{' '}
          <strong>Settings → Delete account</strong>. You can also email{' '}
          <a className="text-purple-700 font-medium hover:underline" href="mailto:info.kubercab@gmail.com">
            info.kubercab@gmail.com
          </a>{' '}
          from the same email or mobile you registered with and ask us to delete the account. This web/email path
          is provided so Google Play users can request deletion without using the in-app flow.
        </p>
        <p>What happens when deletion starts:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            The account is <strong>closed immediately</strong>. You cannot log in. Session tokens are revoked.
          </li>
          <li>
            The same email address and mobile number <strong>cannot register again for 30 days</strong>.
          </li>
          <li>
            After 30 days, a signup with that email or mobile is a <strong>new user id</strong>. Old rides are{' '}
            <strong>not restored</strong>.
          </li>
          <li>
            Personal data is deleted or irreversibly anonymized <strong>within 30 days</strong>, including name,
            email, phone, profile photo, live location records, and device IDs / FCM tokens.
          </li>
        </ul>
        <p>
          If you have an active ride, finish or cancel it first. The app may block logout or deletion until the
          trip is complete so the pilot and you are not left mid-trip without an account.
        </p>
        <p>
          Email deletion requests: write to Shivang Brahmbhatt at info.kubercab@gmail.com with the subject “Delete
          Kuber Cab account” and the registered mobile number. We will confirm when the account is closed.
        </p>
      </LegalSection>

      <LegalSection id="security" title="10. Security">
        <p>
          Traffic to our API uses HTTPS. Passwords are stored as hashed credentials. A session is kept locally on
          the device (Hive). No method of transmission or storage is perfectly secure. If you believe your account
          was misused, contact Shivang Brahmbhatt at info.kubercab@gmail.com or +91 98980 02124.
        </p>
      </LegalSection>

      <LegalSection id="your-choices" title="11. Your choices (India)">
        <p>
          You can edit name, email, and profile photo in the app, change your password, and log out. You can
          withdraw consent for optional permissions in Android settings (location, notifications, camera/photos),
          understanding that booking and tracking need location while the app is in use.
        </p>
        <p>
          To access or correct account details we hold, email info.kubercab@gmail.com. For deletion, use the
          section above. These choices are intended to align with applicable Indian data protection requirements,
          including the Digital Personal Data Protection Act, 2023, as it applies to this service.
        </p>
      </LegalSection>

      <LegalSection id="children" title="12. Children">
        <p>
          Kuber Cab is aimed at adults who can enter a contract under Indian law. Do not create an account if you
          are not legally able to do so. If you believe a child registered, email info.kubercab@gmail.com and we
          will close the account.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="13. Changes to this policy">
        <p>
          We may update this page when the app changes. The “Last updated” date at the top will change. Continued
          use after an update means you should read the new version. Material changes will be posted on this URL:{' '}
          <a className="text-purple-700 hover:underline" href="https://kubercab.in/privacy-policy">
            https://kubercab.in/privacy-policy
          </a>
          .
        </p>
        <p>
          Related terms:{' '}
          <Link to="/terms-conditions" className="text-purple-700 font-medium hover:underline">
            https://kubercab.in/terms-conditions
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  );
};

export default PrivacyPolicyPage;
