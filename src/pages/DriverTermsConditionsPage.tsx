import React from 'react';
import { Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import LegalPageShell, { GrievanceBlock, LegalSection } from '../components/LegalPageShell';

const NAV = [
  { id: 'agreement', title: 'Agreement' },
  { id: 'independent', title: 'Independent contractor' },
  { id: 'eligibility', title: 'Eligibility and documents' },
  { id: 'using-the-app', title: 'Using Kuber Pilot' },
  { id: 'passenger-data', title: 'Passenger information' },
  { id: 'fees', title: 'Subscription fees (Razorpay)' },
  { id: 'location', title: 'Location while online' },
  { id: 'suspension', title: 'Suspension' },
  { id: 'liability', title: 'Liability' },
  { id: 'law', title: 'Governing law' },
  { id: 'privacy', title: 'Privacy' },
];

const DriverTermsConditionsPage: React.FC = () => {
  return (
    <LegalPageShell
      icon={<Scale className="h-8 w-8" />}
      accent="slate"
      kicker="Kuber Pilot – Driver App"
      title="Terms &"
      titleAccent="Conditions"
      subtitle="These terms apply to pilots who use Kuber Pilot to accept trips from the Kuber Cab rider app. You are an independent service provider, not an employee."
      lastUpdated="6 September 2026"
      nav={NAV}
      related={[
        { to: '/driver/privacy-policy', label: 'Kuber Pilot Privacy Policy' },
        { to: '/terms-conditions', label: 'Kuber Cab (rider) Terms' },
      ]}
      grievance={
        <GrievanceBlock
          heading="Contact and grievance officer"
          intro="Questions about these terms, verification, or fees should go to Shivang Brahmbhatt, Grievance Officer."
          operatorSentence="Kuber Pilot is operated by Shivang Brahmbhatt, trading as Kuber Mobility."
        />
      }
    >
      <LegalSection id="agreement" title="1. Agreement">
        <p>
          Kuber Pilot is operated by Shivang Brahmbhatt, trading as Kuber Mobility. These Terms and Conditions
          (“Terms”) apply to <strong>Kuber Pilot - Driver App1</strong> (package{' '}
          <code className="text-sm bg-gray-100 px-1 rounded">com.app.kuberDriver</code>).
        </p>
        <p>
          By registering or going online you agree to these Terms. The rider app (Kuber Cab) has separate terms.
          Service area is Ahmedabad and nearby areas in Gujarat, India.
        </p>
      </LegalSection>

      <LegalSection id="independent" title="2. You are an independent service provider">
        <p>
          You are not an employee, worker, or agent of Shivang Brahmbhatt or Kuber Mobility. You provide transport
          using your own vehicle. You decide when to go online (subject to these Terms and document verification).
          Nothing in the app creates a partnership or joint venture.
        </p>
        <p>
          Kuber Pilot is a matching tool: it sends you trip requests from Kuber Cab passengers. You are responsible
          for how you drive, for your vehicle, and for complying with motor vehicle and traffic law in Gujarat.
        </p>
      </LegalSection>

      <LegalSection id="eligibility" title="3. Eligibility, documents, and verification">
        <p>
          You must hold a valid driving licence, vehicle RC, insurance, and a roadworthy vehicle. You must provide
          accurate name, email, and mobile number. The app collects DL number and expiry, DL photos (front and
          back), RC, insurance, vehicle photo, and plate / vehicle details. The app does not collect Aadhaar.
        </p>
        <p>
          New accounts stay under review until documents are verified. If we reject a submission, you may resubmit.
          We may suspend access if documents expire, look altered, fail verification, or no longer match the vehicle
          you use.
        </p>
      </LegalSection>

      <LegalSection id="using-the-app" title="4. Going online, trips, and safety">
        <p>
          When online you may receive ride requests (notifications, vibration, full-screen intent, ringtone via a
          mediaPlayback foreground service). You may accept or reject requests as the app allows. Once you accept,
          complete the trip in good faith: navigate, pick up the rider, use the ride OTP/verification flow, and
          finish the job in the app.
        </p>
        <p>You agree to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Drive safely and follow applicable traffic law.</li>
          <li>Not create fake trips, fake GPS, or other fraud.</li>
          <li>Not harass passengers.</li>
          <li>Keep the vehicle reasonably clean and roadworthy.</li>
          <li>Not use the app if you are not legally allowed to drive that vehicle.</li>
        </ul>
        <p>
          Account deletion is blocked during an active ride. Finish or cancel first. How deletion works is in the{' '}
          <Link to="/driver/privacy-policy#delete-account" className="text-slate-800 font-medium hover:underline">
            Kuber Pilot Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="passenger-data" title="5. Passenger name and phone">
        <p>
          You may see a passenger’s name and phone so you can fulfil that trip (pickup, call if needed). You must
          not save, share, or use that information for marketing, debt collection unrelated to the fare, or any
          purpose after the trip except as required by law (for example a genuine police report).
        </p>
      </LegalSection>

      <LegalSection id="fees" title="6. Platform / subscription fees and Razorpay">
        <p>
          Passengers pay you outside this app (cash or UPI to you). Kuber Pilot is not the passenger checkout.
        </p>
        <p>
          You may be required to pay platform or subscription fees <strong>in the app through Razorpay</strong>.
          Razorpay is the payment processor. We receive payment ids and status; we do not store full card numbers
          when Razorpay tokenizes the charge.
        </p>
        <p>
          Fees are as shown in the app at the time you pay. Refunds, if any, are made only in line with Razorpay’s
          process and the refund rule we state in the pay screen or a written confirmation from Shivang Brahmbhatt
          at info.kubercab@gmail.com. Unless we confirm a refund, subscription or platform fees are not
          automatically refundable because they pay for access to the matching service.
        </p>
      </LegalSection>

      <LegalSection id="location" title="7. Location must stay enabled while online or on a trip">
        <p>
          Precise location while the app is in use is required to show you on the map, match trips, and share
          location during an active job. We do not require background location permission. If you turn location off
          while online or on a trip, matching and rider tracking will fail and we may take you offline.
        </p>
        <p>
          Optional battery-optimization exceptions and the ride-alert ringtone service exist so you can hear
          requests. They are not permission to track you after you leave the app.
        </p>
      </LegalSection>

      <LegalSection id="suspension" title="8. Suspension and account closure">
        <p>
          We may suspend or close a Kuber Pilot account for expired or fake documents, unsafe driving reports,
          fraud, misuse of passenger data, unpaid required subscription fees, or other serious breach. Deletion is
          not a freeze: see the Privacy Policy for the 30-day re-register rule and data removal.
        </p>
      </LegalSection>

      <LegalSection id="liability" title="9. Limitation of liability">
        <p>
          To the maximum extent permitted by Indian law, Shivang Brahmbhatt, trading as Kuber Mobility, is not
          liable for indirect, incidental, special, or consequential loss, including lost trip income, vehicle
          damage, passenger disputes over cash/UPI, map or network failure, or your own traffic violations.
        </p>
        <p>
          You remain responsible for accidents, insurance claims, and motor vehicle compliance. Nothing in these
          Terms excludes liability that Indian law does not allow to be excluded.
        </p>
      </LegalSection>

      <LegalSection id="law" title="10. Governing law and courts">
        <p>
          These Terms are governed by the laws of India. Courts in <strong>Ahmedabad, Gujarat</strong> have
          exclusive jurisdiction, subject to any non-excludable legal rights.
        </p>
      </LegalSection>

      <LegalSection id="privacy" title="11. Privacy Policy">
        <p>
          How we handle your personal and document data is in the{' '}
          <Link to="/driver/privacy-policy" className="text-slate-800 font-medium hover:underline">
            Kuber Pilot Privacy Policy
          </Link>{' '}
          at{' '}
          <a className="text-slate-800 hover:underline" href="https://kubercab.in/driver/privacy-policy">
            https://kubercab.in/driver/privacy-policy
          </a>
          . These Terms are at{' '}
          <a className="text-slate-800 hover:underline" href="https://kubercab.in/driver/terms-conditions">
            https://kubercab.in/driver/terms-conditions
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  );
};

export default DriverTermsConditionsPage;
