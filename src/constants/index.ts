import { ServiceType, TestimonialType, FAQType, CityType } from '../types';

export const SERVICES: ServiceType[] = [
  {
    id: 'bike',
    title: 'Bike Rides',
    description: 'Quick, affordable rides for solo travelers in busy traffic',
    icon: 'bike',
    benefits: ['Starting at ₹30/km', 'Beat the traffic', 'Available 24/7', 'Quick pickup']
  },
  {
    id: 'auto',
    title: 'Auto Rides',
    description: 'Comfortable three-wheeler rides for 1-3 passengers',
    icon: 'car',
    benefits: ['No surge pricing', 'Starting at ₹50/km', 'Weather protection', 'Space for luggage']
  },
  {
    id: 'sedan',
    title: 'Cab Rides',
    description: 'Premium car rides for comfort and style',
    icon: 'car',
    benefits: ['Air conditioned', 'Starting at ₹100/km', 'Comfortable seating', 'Ideal for families']
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
    answer: 'You can book a ride through our mobile app available on iOS and Android. Simply download the app, create an account, enter your pickup and drop-off locations, select your ride type, and confirm your booking.'
  },
  {
    id: '2',
    question: 'What payment methods are accepted?',
    answer: 'We accept various payment methods including UPI (Google Pay, PhonePe, Paytm), credit/debit cards, and cash payments directly to the driver after your ride.'
  },
  {
    id: '3',
    question: 'How do I become a Kuber.cab driver partner?',
    answer: 'To become a driver partner, you need to register through our app or website, submit required documents (driver\'s license, vehicle registration, insurance), complete a background check, and attend a brief orientation session.'
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