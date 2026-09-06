import { ServiceType, TestimonialType, FAQType, CityType } from '../types';

export const PLAY_STORE_RIDER = 'https://play.google.com/store/apps/details?id=com.app.kuberCab';
export const PLAY_STORE_DRIVER = 'https://play.google.com/store/apps/details?id=com.app.kuberDriver';

export const SERVICES: ServiceType[] = [
  {
    id: 'moto',
    title: 'Moto Rides',
    description: 'Swift two-wheeler rides built for solo commuters who need to move fast through city traffic.',
    icon: 'moto',
    benefits: ['2–5 min average pickup', 'Navigate traffic effortlessly', 'Available around the clock', 'Eco-conscious travel']
  },
  {
    id: 'auto',
    title: 'Auto Rides',
    description: 'Reliable three-wheeler transport with weather cover and room for everyday errands or short group trips.',
    icon: 'car',
    benefits: ['Up to 3 passengers', 'Weather-protected cabin', 'Space for small luggage', 'Ideal for local errands']
  },
  {
    id: 'sedan',
    title: 'Cab Rides',
    description: 'Premium sedan experiences with climate control and professional drivers for comfort-first journeys.',
    icon: 'car',
    benefits: ['Fully air-conditioned', 'Spacious, comfortable seating', 'Verified professional drivers', 'Perfect for families & business']
  },
];

export const TESTIMONIALS: TestimonialType[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Regular Commuter',
    comment: 'Kuber.cab has transformed my daily office commute. The drivers are professional and the rides are always on time.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '2',
    name: 'Rahul Mehta',
    role: 'Business Traveler',
    comment: 'As someone who travels frequently for work, I appreciate the reliability and consistency of Kuber.cab services.',
    rating: 4,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '3',
    name: 'Anjali Desai',
    role: 'College Student',
    comment: 'The bike rides are so affordable! Perfect for students like me who need reliable transportation.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '4',
    name: 'Vikram Singh',
    role: 'Weekend Explorer',
    comment: 'The SUV option is perfect for our weekend family trips. Spacious, comfortable, and the drivers know the best routes.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

export const FAQS: FAQType[] = [
  {
    id: '1',
    question: 'How do I book a ride with Kuber.cab?',
    answer: 'You can book a ride through our mobile app on Google Play for Android. Download the app, create an account, enter your pickup and drop-off locations, select your ride type, and confirm your booking.'
  },
  {
    id: '2',
    question: 'What payment methods are accepted?',
    answer: 'We accept various payment methods including UPI (Google Pay, PhonePe, Paytm), credit/debit cards, and cash payments directly to the driver after your ride.'
  },
  {
    id: '3',
    question: 'How do I become a Kuber.cab driver partner?',
    answer: 'Download the Kuber Pilot driver app from Google Play. Create your account and submit documents in the app. We do not take driver applications on this website.'
  },
  {
    id: '4',
    question: 'Is there a cancellation fee?',
    answer: 'Yes, a nominal cancellation fee may apply if you cancel your ride after a driver has been assigned. The exact fee depends on the time elapsed since booking and your location.'
  },
  {
    id: '5',
    question: 'Are there any safety measures in place?',
    answer: 'We prioritize safety with features like driver background checks, real-time ride tracking, emergency assistance button, share ride details option, and post-ride feedback system.'
  }
];

export const CITIES: CityType[] = [
  // Gujarat - Major Cities
  { id: '1', name: 'Ahmedabad', isPopular: true },
  { id: '2', name: 'Gandhinagar', isPopular: true },
  { id: '3', name: 'Vadodara', isPopular: true },
  { id: '4', name: 'Surat', isPopular: true },
  { id: '5', name: 'Rajkot', isPopular: true },
  { id: '6', name: 'Bhavnagar', isPopular: true },
  
  // Ahmedabad Areas
  { id: '7', name: 'Satellite', isPopular: false },
  { id: '8', name: 'Vastrapur', isPopular: false },
  { id: '9', name: 'Bopal', isPopular: false },
  { id: '10', name: 'Prahlad Nagar', isPopular: false },
  { id: '11', name: 'Navrangpura', isPopular: false },
  { id: '12', name: 'C.G. Road', isPopular: false },
  { id: '13', name: 'S.G. Highway', isPopular: false },
  { id: '14', name: 'Maninagar', isPopular: false },
  { id: '15', name: 'Ghatlodia', isPopular: false },
  { id: '16', name: 'Thaltej', isPopular: false },
  { id: '17', name: 'Bodakdev', isPopular: false },
  { id: '18', name: 'Ambawadi', isPopular: false },
  { id: '19', name: 'Paldi', isPopular: false },
  { id: '20', name: 'Ellisbridge', isPopular: false },
  { id: '21', name: 'Ashram Road', isPopular: false },
  
  // Gujarat - Other Cities
  { id: '22', name: 'Mehsana', isPopular: false },
  { id: '23', name: 'Kalol', isPopular: false },
  { id: '24', name: 'Nadiad', isPopular: false },
  { id: '25', name: 'Anand', isPopular: false },
  { id: '26', name: 'Bharuch', isPopular: false },
  { id: '27', name: 'Navsari', isPopular: false },
  { id: '28', name: 'Himatnagar', isPopular: false },
  { id: '29', name: 'Chota Udaipur', isPopular: false },
  { id: '30', name: 'Ambaji', isPopular: false },
  { id: '31', name: 'Gondal', isPopular: false },
  { id: '32', name: 'Junagadh', isPopular: false },
  { id: '33', name: 'Gir Somnath', isPopular: false }
];