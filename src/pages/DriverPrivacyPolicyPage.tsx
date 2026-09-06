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
  { id: 'delete-account', title: 'How to delete your Kuber Pilot account' },
  { id: 'security', title: 'Security' },
  { id: 'your-choices', title: 'Your choices' },
  { id: 'children', title: 'Children' },
  { id: 'changes', title: 'Changes' },
];

const DriverPrivacyPolicyPage: React.FC = () => {
  return (
    <LegalPageShell
      icon={<Shield className="h-8 w-8" />}
      accent="emerald"
      kicker="Kuber Pilot – Driver App"
      title="Privacy"
      titleAccent="Policy"
      subtitle="This policy is only for Kuber Pilot, the driver app. It explains how we handle a pilot’s account, vehicle documents, location while using the app, and subscription payments."
      lastUpdated="6 September 2026"
      nav={NAV}
      related={[
        { to: '/driver/terms-conditions', label: 'Kuber Pilot Terms & Conditions' },
        { to: '/privacy-policy', label: 'Kuber Cab (rider) Privacy Policy' },
      ]}
      grievance={
        <GrievanceBlock
          heading="Contact and grievance officer"
          intro="For privacy questions, document review, or account deletion, write to Shivang Brahmbhatt, Grievance Officer."
          operatorSentence="Kuber Pilot is operated by Shivang Brahmbhatt, trading as Kuber Mobility."
        />
      }
    >
      <LegalSection id="who-we-are" title="1. Who we are">
        <p>
          Kuber Pilot is operated by Shivang Brahmbhatt, trading as Kuber Mobility. This is a personal Google Play
          listing, not a registered company. The Android app label is{' '}
          <strong>Kuber Pilot - Driver App1</strong> (package{' '}
          <code className="text-sm bg-gray-100 px-1 rounded">com.app.kuberDriver</code>).
        </p>
        <p>
          The app is for <strong>pilots (drivers)</strong> who accept passenger trips requested from the separate
          Kuber Cab rider app. Service area is <strong>Ahmedabad and nearby areas in Gujarat, India</strong>. We do
          not claim pan-India operations.
        </p>
        <p>
          Passengers should read the{' '}
          <Link to="/privacy-policy" className="text-emerald-800 font-medium hover:underline">
            Kuber Cab Privacy Policy
          </Link>
          . This document does not cover the rider app.
        </p>
      </LegalSection>

      <LegalSection id="scope" title="2. What this policy covers">
        <p>
          It covers personal information processed when you register, complete document onboarding, go online,
          receive trip requests, navigate, complete trips, view earnings or history, pay platform/subscription fees
          through Razorpay, or ask us to delete your Kuber Pilot account.
        </p>
        <p>
          This page is published at{' '}
          <a className="text-emerald-800 hover:underline" href="https://kubercab.in/driver/privacy-policy">
            https://kubercab.in/driver/privacy-policy
          </a>
          . Driver terms are at{' '}
          <Link to="/driver/terms-conditions" className="text-emerald-800 font-medium hover:underline">
            https://kubercab.in/driver/terms-conditions
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="data-safety" title="3. Play Store data safety summary">
        <p>
          This summary is meant to match Google Play’s Data safety form for Kuber Pilot. We do <strong>not sell</strong>{' '}
          personal data. We do <strong>not</strong> use this data to sell ads. This app is <strong>not</strong> the
          passenger checkout; riders pay you outside the app (cash or UPI).
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Precise location:</strong> while you use the app (no ACCESS_BACKGROUND_LOCATION). Used to show
            you on the map, match trips, and send location during an active job.
          </li>
          <li>
            <strong>Photos:</strong> profile photo and photos of driving licence (front and back), vehicle RC,
            insurance, and vehicle / plate as required for onboarding. Camera is used to capture these images.
          </li>
          <li>
            <strong>Personal info:</strong> name, email, mobile number, driving licence number and expiry, vehicle
            details and plate.
          </li>
          <li>
            <strong>Financial info:</strong> subscription / platform fee payments through Razorpay (payment ids and
            status). We do not store full card numbers when Razorpay tokenizes the payment.
          </li>
          <li>
            <strong>Device IDs:</strong> FCM / device token for ride-request and status notifications.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="information-we-collect" title="4. Information we collect">
        <h3 className="text-lg font-semibold text-gray-900">Account</h3>
        <p>
          Full name, email, mobile number, credentials (password hashed on the server), email OTP, login, password
          reset, logout, and profile edits. Optional FCM/device token. Profile photo.
        </p>
        <h3 className="text-lg font-semibold text-gray-900">Identity and vehicle documents (not Aadhaar)</h3>
        <p>
          The app does not collect Aadhaar. For onboarding we collect driving licence number and expiry, DL photo
          front and back, vehicle RC, insurance, vehicle photo, and licence plate / vehicle details. New accounts
          stay under review until documents are verified. If verification is rejected, you may resubmit.
        </p>
        <h3 className="text-lg font-semibold text-gray-900">Location and trips</h3>
        <p>
          Precise location while the app is in use: map position, trip matching, and location sharing during an
          active job. Trip records, earnings/history as shown in the app, and ride-request behaviour (accept /
          complete).
        </p>
        <h3 className="text-lg font-semibold text-gray-900">Subscription payments</h3>
        <p>
          When you pay platform or subscription fees in-app, Razorpay processes the payment. We receive metadata
          such as Razorpay payment ids, amount, and success/failure status. We do not store full card numbers if
          Razorpay tokenizes them.
        </p>
        <h3 className="text-lg font-semibold text-gray-900">Device</h3>
        <p>
          Notifications, vibration, full-screen intent for incoming ride alerts, and an optional request to ignore
          battery optimizations so alerts are not killed. A foreground service typed as mediaPlayback keeps a
          ride-request ringtone playing. That service is <strong>not</strong> background location tracking. Local
          session is stored on the device. Real-time updates use our API and sockets; push uses Firebase Cloud
          Messaging.
        </p>
      </LegalSection>

      <LegalSection id="how-we-use" title="5. How we use information">
        <ul className="list-disc pl-6 space-y-2">
          <li>Create your pilot account and verify identity and vehicle fitness for the platform.</li>
          <li>Let you go online, receive requests, navigate with Google Maps, and complete trips.</li>
          <li>Show earnings/history and process subscription fees via Razorpay.</li>
          <li>Send ride alerts (notification, sound, full-screen intent) if you allow those permissions.</li>
          <li>Share with the matched rider only what they need for the trip (for example name, vehicle, plate, phone).</li>
          <li>Investigate fraud, expired documents, or safety issues.</li>
        </ul>
        <p>We do not sell personal data and we do not use Kuber Pilot data to sell advertising.</p>
      </LegalSection>

      <LegalSection id="permissions" title="6. App permissions">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Precise location (while in use):</strong> required to go online, match trips, and share location
            on an active job. We do not use ACCESS_BACKGROUND_LOCATION.
          </li>
          <li>
            <strong>Notifications / overlay-style full-screen intent / vibration:</strong> incoming ride requests.
          </li>
          <li>
            <strong>Ignore battery optimizations (optional):</strong> so the system is less likely to silence ride
            alerts.
          </li>
          <li>
            <strong>Foreground service (mediaPlayback):</strong> keep the ride-request ringtone playing. Not used as
            a hidden GPS tracker.
          </li>
          <li>
            <strong>Camera:</strong> capture document and profile photos.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="sharing" title="7. Who we share information with">
        <p>We do not sell your personal information.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Matched riders:</strong> name, vehicle, plate, and phone as shown in the rider app so they can
            identify and call you for that trip only — not for marketing.
          </li>
          <li>
            <strong>Processors:</strong> Google (Maps and Firebase/FCM), Razorpay (subscription payments), and the
            hosting provider for our API.
          </li>
          <li>
            <strong>Lawful requests:</strong> if Indian law or a competent authority requires disclosure.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="retention" title="8. How long we keep information">
        <p>
          We keep your account, documents, trip, and earnings records while the account is open so you can work and
          we can verify you. When you delete the account, the next section applies. Deletion is not a “freeze” that
          keeps the same login waiting forever.
        </p>
      </LegalSection>

      <LegalSection id="delete-account" title="9. How to delete your Kuber Pilot account">
        <p>
          In the app: <strong>Settings → Delete account</strong>. Deletion is blocked during an active ride; you
          must finish or cancel the job first.
        </p>
        <p>
          Web / email path (for Google Play’s external deletion requirement): email{' '}
          <a className="text-emerald-800 font-medium hover:underline" href="mailto:info.kubercab@gmail.com">
            info.kubercab@gmail.com
          </a>{' '}
          from your registered email, name Shivang Brahmbhatt in the message, and ask to delete your Kuber Pilot
          account. Include your registered mobile number.
        </p>
        <p>What happens when deletion starts:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            The account is <strong>closed immediately</strong>. You cannot log in. Tokens are revoked.
          </li>
          <li>
            The same email and mobile <strong>cannot register for 30 days</strong>.
          </li>
          <li>
            After 30 days, signup is a <strong>new user id</strong>. Old trips and earnings are{' '}
            <strong>not restored</strong>.
          </li>
          <li>
            As warned in the app, your <strong>profile, trip history, and earnings are permanently removed</strong>{' '}
            from the Kuber Pilot account. We do not keep an anonymized earnings ledger after deletion.
          </li>
          <li>
            Personal data is deleted or irreversibly anonymized <strong>within 30 days</strong>, including name,
            email, phone, profile photo, live location traces, FCM/device tokens, and in-app trip/earnings views.
          </li>
        </ul>
        <p>
          <strong>Documents:</strong> driving licence images and number, RC, insurance, and vehicle photos are
          deleted within the same 30 days unless we must keep a copy for an ongoing fraud investigation, a motor
          vehicle incident involving your account, or a lawful request from an Indian authority. In those limited
          cases we keep only what is needed for that matter and delete it when the matter ends. We do not keep
          Aadhaar because the app does not collect it.
        </p>
      </LegalSection>

      <LegalSection id="security" title="10. Security">
        <p>
          API traffic uses HTTPS. Credentials are hashed. Razorpay handles card/UPI checkout for subscription fees.
          Report suspected account misuse to Shivang Brahmbhatt at info.kubercab@gmail.com or +91 98980 02124.
        </p>
      </LegalSection>

      <LegalSection id="your-choices" title="11. Your choices (India)">
        <p>
          You can edit profile details in the app, resubmit documents if rejected, and revoke optional Android
          permissions in system settings (understanding that going online needs location while the app is in use).
          Access, correction, and deletion requests: info.kubercab@gmail.com, addressed to Shivang Brahmbhatt.
        </p>
        <p>
          These choices are intended to align with applicable Indian data protection requirements, including the
          Digital Personal Data Protection Act, 2023, as it applies to this service.
        </p>
      </LegalSection>

      <LegalSection id="children" title="12. Children">
        <p>
          Kuber Pilot is for licensed drivers who can contract in India. It is not for children. If an underage
          account is created, email info.kubercab@gmail.com and we will close it.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="13. Changes to this policy">
        <p>
          We may update this page when the driver app changes. The “Last updated” date will change. Current URL:{' '}
          <a className="text-emerald-800 hover:underline" href="https://kubercab.in/driver/privacy-policy">
            https://kubercab.in/driver/privacy-policy
          </a>
          . Related terms:{' '}
          <Link to="/driver/terms-conditions" className="text-emerald-800 font-medium hover:underline">
            https://kubercab.in/driver/terms-conditions
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  );
};

export default DriverPrivacyPolicyPage;
