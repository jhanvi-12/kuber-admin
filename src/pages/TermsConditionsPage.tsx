import React from 'react';
import { Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import LegalPageShell, { GrievanceBlock, LegalSection } from '../components/LegalPageShell';

const NAV = [
  { id: 'agreement', title: 'Agreement' },
  { id: 'eligibility', title: 'Eligibility and account' },
  { id: 'the-service', title: 'What Kuber Cab is' },
  { id: 'bookings', title: 'Bookings and conduct' },
  { id: 'payments', title: 'Paying the driver' },
  { id: 'cancel', title: 'Cancellation and no-show' },
  { id: 'permissions', title: 'Permissions' },
  { id: 'suspension', title: 'Suspension' },
  { id: 'liability', title: 'Liability' },
  { id: 'law', title: 'Governing law' },
  { id: 'privacy', title: 'Privacy' },
];

const TermsConditionsPage: React.FC = () => {
  return (
    <LegalPageShell
      icon={<Scale className="h-8 w-8" />}
      accent="blue"
      kicker="Kuber Cab – Ride Booking App"
      title="Terms &"
      titleAccent="Conditions"
      subtitle="These terms govern your use of the Kuber Cab rider app as a passenger booking rides in Ahmedabad and nearby areas."
      lastUpdated="6 September 2026"
      nav={NAV}
      related={[
        { to: '/privacy-policy', label: 'Rider Privacy Policy' },
        { to: '/driver/terms-conditions', label: 'Kuber Pilot (driver) Terms' },
      ]}
      grievance={
        <GrievanceBlock
          heading="Contact and grievance officer"
          intro="Questions about these terms, a booking dispute, or a complaint should go to Shivang Brahmbhatt, Grievance Officer."
          operatorSentence="Kuber Cab is operated by Shivang Brahmbhatt, trading as Kuber Mobility."
        />
      }
    >
      <LegalSection id="agreement" title="1. Agreement">
        <p>
          Kuber Cab is operated by Shivang Brahmbhatt, trading as Kuber Mobility. These Terms and Conditions
          (“Terms”) apply to the Android app <strong>Kuber Cab - Ride Booking App</strong> (package{' '}
          <code className="text-sm bg-gray-100 px-1 rounded">com.app.kuberCab</code>) and to related rider pages on
          kubercab.in.
        </p>
        <p>
          By creating an account or booking a ride you agree to these Terms. If you do not agree, do not use the
          app. A separate driver app, Kuber Pilot, has its own terms.
        </p>
      </LegalSection>

      <LegalSection id="eligibility" title="2. Eligibility and accurate accounts">
        <p>
          You must be legally able to enter a contract in India. You must provide a real full name, working email,
          and mobile number. You must keep credentials confidential. You may verify email with OTP, log in with
          email or phone plus password, reset or change password, log out, and edit profile details.
        </p>
        <p>
          Do not create multiple accounts to evade a suspension or the 30-day re-registration rule after deletion.
          We may refuse or close accounts that use false details.
        </p>
        <p>
          Account deletion is described in the{' '}
          <Link to="/privacy-policy#delete-account" className="text-blue-700 font-medium hover:underline">
            Privacy Policy (How to delete your account)
          </Link>
          . Logout and deletion may be blocked while a ride is active until you complete or cancel it.
        </p>
      </LegalSection>

      <LegalSection id="the-service" title="3. What Kuber Cab is (and is not)">
        <p>
          Kuber Cab is a <strong>booking and matching platform</strong>. It lets you request a ride, see a fare
          estimate, optionally apply a promo coupon, search for a nearby “pilot” (driver), track the trip, use a
          ride OTP/verification code, call the pilot, share the trip, share an invoice PDF, rate the trip, and view
          history.
        </p>
        <p>
          Shivang Brahmbhatt, trading as Kuber Mobility, does <strong>not</strong> operate every vehicle that
          appears in the app and is <strong>not</strong> the taxi operator of each pilot’s car. Pilots provide the
          transport using their own vehicles. We do not guarantee that a pilot will always be available in Ahmedabad
          or nearby areas.
        </p>
        <p>
          Maps, pickup/drop search, and estimates use Google Maps, Places, and Directions. Live ride status and
          driver location use our HTTPS API (api.kubercab.in) and Socket.IO. Push alerts use Firebase Cloud
          Messaging.
        </p>
      </LegalSection>

      <LegalSection id="bookings" title="4. Acceptable use and fake bookings">
        <p>You agree to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Book only trips you intend to take, with a truthful pickup and drop.</li>
          <li>Be reachable on the registered mobile number.</li>
          <li>Treat the pilot and the vehicle with ordinary care and lawful behaviour.</li>
          <li>Use SOS (call 112) only for genuine emergencies.</li>
          <li>Not harass, threaten, or misuse a pilot’s phone number shown for the trip.</li>
        </ul>
        <p>
          You must not place fake, prank, or duplicate bookings, interfere with matching, scrape the service, or use
          the app for any illegal purpose. We may cancel trips and suspend accounts for abuse or fraud.
        </p>
      </LegalSection>

      <LegalSection id="payments" title="5. You pay the driver">
        <p>
          The rider app has <strong>no in-app payment gateway</strong>. There is no rider wallet, card checkout, or
          Razorpay flow in Kuber Cab. You pay the fare <strong>directly to the pilot</strong> (cash or UPI to the
          driver). Coupons only adjust the fare shown in the app; they are not a cash wallet.
        </p>
        <p>
          Fare estimates are estimates. The amount due is the fare shown for the completed trip (including any
          coupon adjustment displayed). Disputes about cash/UPI paid to the driver should be raised promptly with
          the pilot and, if needed, with Shivang Brahmbhatt at info.kubercab@gmail.com.
        </p>
      </LegalSection>

      <LegalSection id="cancel" title="6. Cancellation, no-show, and active rides">
        <p>
          You may cancel before or after a pilot is assigned, as the app allows. Repeated cancellations or not
          being present at pickup (no-show) may lead to warnings or account suspension so that pilots are not
          stranded.
        </p>
        <p>
          If a ride is active, you may be unable to log out or delete your account until the trip is finished or
          cancelled. That is to protect both you and the pilot during an ongoing job.
        </p>
      </LegalSection>

      <LegalSection id="permissions" title="7. Location and notifications">
        <p>
          Precise location <strong>while the app is in use</strong> is required for pickup, finding nearby pilots,
          and showing the trip on the map. We do not require background location permission. The app explains why
          location is needed before the Android prompt.
        </p>
        <p>
          Notification permission is needed for timely ride alerts. Camera or gallery is only for an optional
          profile photo. If you deny location while booking, core features will fail.
        </p>
      </LegalSection>

      <LegalSection id="suspension" title="8. Suspension and changes">
        <p>
          We may suspend or close an account for fake bookings, fraud, abuse of pilots or staff, safety incidents,
          or other serious breach of these Terms. We may change features, fares estimates, coupon rules, or stop
          offering the app in an area. We will not invent city coverage beyond Ahmedabad and nearby Gujarat.
        </p>
      </LegalSection>

      <LegalSection id="liability" title="9. Limitation of liability">
        <p>
          To the maximum extent permitted by Indian law, Shivang Brahmbhatt, trading as Kuber Mobility, is not
          liable for indirect, incidental, special, or consequential loss arising from matching delays, a pilot’s
          driving, vehicle condition, road incidents, network failure, Google Maps inaccuracy, or your payment
          arrangements with the driver.
        </p>
        <p>
          Nothing in these Terms excludes liability that cannot legally be excluded, including for fraud or for
          death or personal injury caused by negligence where the law does not allow a limit.
        </p>
        <p>
          The service is provided on a reasonable-effort basis in Ahmedabad and nearby areas. We do not promise
          uninterrupted availability of api.kubercab.in, Socket.IO, FCM, or maps.
        </p>
      </LegalSection>

      <LegalSection id="law" title="10. Governing law and courts">
        <p>
          These Terms are governed by the laws of India. Courts in <strong>Ahmedabad, Gujarat</strong> have
          exclusive jurisdiction over disputes, subject to any non-excludable consumer protections.
        </p>
      </LegalSection>

      <LegalSection id="privacy" title="11. Privacy Policy">
        <p>
          Personal information is handled as described in the{' '}
          <Link to="/privacy-policy" className="text-blue-700 font-medium hover:underline">
            Kuber Cab Privacy Policy
          </Link>{' '}
          at{' '}
          <a className="text-blue-700 hover:underline" href="https://kubercab.in/privacy-policy">
            https://kubercab.in/privacy-policy
          </a>
          . These Terms are published at{' '}
          <a className="text-blue-700 hover:underline" href="https://kubercab.in/terms-conditions">
            https://kubercab.in/terms-conditions
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  );
};

export default TermsConditionsPage;
