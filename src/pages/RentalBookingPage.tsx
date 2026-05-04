import React, { useState } from 'react';
import { MapPin, Car, Bike, Upload, Phone, CheckCircle, AlertCircle, User, CreditCard, ChevronDown, Search, Calendar, Clock } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';

interface BookingData {
  pickupAddress: string;
  dropoffAddress: string;
  vehicleType: 'car' | 'bike';
  vehicleCategory: string;
  specificModel: string;
  rentalDuration: string;
  startDate: string;
  isOver21: boolean;
  licenseNumber: string;
  licenseImage: File | null;
  aadharNumber: string;
  aadharImage: File | null;
}

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_hvjgtrd';
const EMAILJS_TEMPLATE_ID = 'template_1cpo5iq';
const EMAILJS_PUBLIC_KEY = 'Mnxf3P8j8ECP4zB4p';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

interface VehicleCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  models: VehicleModel[];
}

interface VehicleModel {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  features: string[];
  image: string;
  isPopular?: boolean;
  isAvailable?: boolean;
}

const RentalBookingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    pickupAddress: '',
    dropoffAddress: '',
    vehicleType: 'car',
    vehicleCategory: '',
    specificModel: '',
    rentalDuration: '1',
    startDate: '',
    isOver21: false,
    licenseNumber: '',
    licenseImage: null,
    aadharNumber: '',
    aadharImage: null,
  });

  const carCategories: VehicleCategory[] = [
    {
      id: 'hatchback',
      name: 'Hatchback',
      description: 'Compact cars perfect for city driving',
      icon: '🚗',
      models: [
        {
          id: 'swift',
          name: 'Maruti Swift',
          price: '₹2,200/day',
          originalPrice: '₹2,750/day',
          discount: '20% OFF',
          features: ['Petrol', 'Manual', '5 Seats', 'AC'],
          image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          isPopular: true,
          isAvailable: true
        },
        {
          id: 'baleno',
          name: 'Maruti Baleno',
          price: '₹2,500/day',
          originalPrice: '₹3,050/day',
          discount: '18% OFF',
          features: ['Petrol', 'Manual', '5 Seats', 'AC'],
          image: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          isPopular: true,
          isAvailable: true
        },
        {
          id: 'i20',
          name: 'Hyundai i20',
          price: '₹2,400/day',
          originalPrice: '₹2,825/day',
          discount: '15% OFF',
          features: ['Petrol', 'Manual', '5 Seats', 'AC'],
          image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          isAvailable: true
        },
        {
          id: 'tiago',
          name: 'Tata Tiago',
          price: '₹2,000/day',
          originalPrice: '₹2,350/day',
          discount: '15% OFF',
          features: ['Petrol', 'Manual', '5 Seats', 'Budget'],
          image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          isAvailable: true
        }
      ]
    },
    {
      id: 'sedan',
      name: 'Sedan',
      description: 'Comfortable cars for business and family',
      icon: '🚙',
      models: [
        {
          id: 'dzire',
          name: 'Maruti Dzire',
          price: '₹2,300/day',
          features: ['Petrol', 'Manual', '5 Seats', 'Sedan'],
          image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          isAvailable: true
        },
        {
          id: 'city',
          name: 'Honda City',
          price: '₹2,800/day',
          features: ['Petrol', 'Manual', '5 Seats', 'Premium'],
          image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          isAvailable: true
        }
      ]
    },
    {
      id: 'suv',
      name: 'SUV',
      description: 'Spacious vehicles for family trips',
      icon: '🚐',
      models: [
        {
          id: 'brezza',
          name: 'Maruti Brezza',
          price: '₹3,200/day',
          originalPrice: '₹4,000/day',
          discount: '20% OFF',
          features: ['Petrol', 'Manual', '5 Seats', 'SUV'],
          image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          isAvailable: true
        },
        {
          id: 'creta',
          name: 'Hyundai Creta',
          price: '₹3,800/day',
          features: ['Petrol', 'Manual', '5 Seats', 'SUV'],
          image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          isAvailable: false
        },
        {
          id: 'innova',
          name: 'Toyota Innova',
          price: '₹4,500/day',
          features: ['Diesel', 'Manual', '7 Seats', 'AC'],
          image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          isAvailable: true
        }
      ]
    }
  ];

  const bikeCategories: VehicleCategory[] = [
    {
      id: 'scooter',
      name: 'Scooter',
      description: 'Easy to ride automatic scooters',
      icon: '🛵',
      models: [
        {
          id: 'activa-6g',
          name: 'Honda Activa 6G',
          price: '₹600/day',
          originalPrice: '₹800/day',
          discount: '25% OFF',
          features: ['110cc', 'Automatic', 'Petrol', 'Storage'],
          image: 'https://images.pexels.com/photos/1098460/pexels-photo-1098460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          isPopular: true,
          isAvailable: true
        },
        {
          id: 'jupiter',
          name: 'TVS Jupiter',
          price: '₹650/day',
          originalPrice: '₹845/day',
          discount: '23% OFF',
          features: ['110cc', 'Automatic', 'Petrol', 'Comfort'],
          image: 'https://images.pexels.com/photos/1098460/pexels-photo-1098460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          isPopular: true,
          isAvailable: true
        },
        {
          id: 'access-125',
          name: 'Suzuki Access 125',
          price: '₹700/day',
          features: ['125cc', 'Automatic', 'Petrol', 'Premium'],
          image: 'https://images.pexels.com/photos/1098460/pexels-photo-1098460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          isAvailable: true
        }
      ]
    },
    {
      id: 'commuter',
      name: 'Commuter',
      description: 'Fuel-efficient bikes for daily use',
      icon: '🏍️',
      models: [
        {
          id: 'splendor-plus',
          name: 'Hero Splendor Plus',
          price: '₹550/day',
          originalPrice: '₹690/day',
          discount: '20% OFF',
          features: ['100cc', 'Manual', 'Petrol', 'Mileage King'],
          image: 'https://images.pexels.com/photos/1624504/pexels-photo-1624504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          isAvailable: true
        },
        {
          id: 'passion-pro',
          name: 'Hero Passion Pro',
          price: '₹580/day',
          features: ['110cc', 'Manual', 'Petrol', 'Stylish'],
          image: 'https://images.pexels.com/photos/1624504/pexels-photo-1624504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          isAvailable: true
        }
      ]
    },
    {
      id: 'sports',
      name: 'Sports Bike',
      description: 'Performance bikes for enthusiasts',
      icon: '🏁',
      models: [
        {
          id: 'fz-s',
          name: 'Yamaha FZ-S',
          price: '₹900/day',
          features: ['150cc', 'Manual', 'Petrol', 'Sporty'],
          image: 'https://images.pexels.com/photos/1624504/pexels-photo-1624504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          isAvailable: true
        },
        {
          id: 'pulsar-150',
          name: 'Bajaj Pulsar 150',
          price: '₹850/day',
          originalPrice: '₹1,000/day',
          discount: '15% OFF',
          features: ['150cc', 'Manual', 'Petrol', 'Performance'],
          image: 'https://images.pexels.com/photos/1624504/pexels-photo-1624504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          isAvailable: true
        }
      ]
    },
    {
      id: 'cruiser',
      name: 'Cruiser',
      description: 'Classic bikes for long rides',
      icon: '🛣️',
      models: [
        {
          id: 'royal-enfield',
          name: 'Royal Enfield Classic 350',
          price: '₹1,200/day',
          features: ['350cc', 'Manual', 'Petrol', 'Classic'],
          image: 'https://images.pexels.com/photos/1624504/pexels-photo-1624504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          isAvailable: false
        }
      ]
    }
  ];

  const getCurrentCategories = () => {
    return bookingData.vehicleType === 'car' ? carCategories : bikeCategories;
  };

  const getCurrentModels = () => {
    const categories = getCurrentCategories();
    const selectedCategory = categories.find(cat => cat.id === bookingData.vehicleCategory);
    return selectedCategory?.models || [];
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.pickupAddress || !bookingData.dropoffAddress) {
      toast.error('Please enter both pickup and drop-off addresses');
      return;
    }
    if (!bookingData.startDate) {
      toast.error('Please select a start date');
      return;
    }
    setCurrentStep(2);
  };

  const handleVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.vehicleCategory) {
      toast.error('Please select a vehicle category');
      return;
    }
    if (!bookingData.specificModel) {
      toast.error('Please select a specific vehicle model');
      return;
    }
    setShowValidationModal(true);
  };

  const handleFileUpload = (type: 'license' | 'aadhar', file: File) => {
    if (type === 'license') {
      setBookingData(prev => ({ ...prev, licenseImage: file }));
    } else {
      setBookingData(prev => ({ ...prev, aadharImage: file }));
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const sendEmailNotification = async () => {
    try {
      const selectedModel = getCurrentModels().find(model => model.id === bookingData.specificModel);
      const selectedCategory = getCurrentCategories().find(cat => cat.id === bookingData.vehicleCategory);

      // Convert files to base64 if they exist
      let licenseBase64 = '';
      let aadharBase64 = '';

      if (bookingData.licenseImage) {
        licenseBase64 = await convertFileToBase64(bookingData.licenseImage);
      }

      if (bookingData.aadharImage) {
        aadharBase64 = await convertFileToBase64(bookingData.aadharImage);
      }

      const emailParams = {
        logoUrl: `${window.location.origin}/kuber-cab-sb.png`,
        logoUrl: 'https://your-domain.com/kuber-cab-logo.png', // Update with your actual logo URL
        name: 'Customer', // You can add a name field to the form
        type: bookingData.vehicleType === 'car' ? 'Car Rental' : 'Bike Rental',
        vehicleName: `${selectedCategory?.name || ''} - ${selectedModel?.name || ''}`,
        pickupAddress: bookingData.pickupAddress,
        dropAddress: bookingData.dropoffAddress,
        pickupDateTime: `${bookingData.startDate} (Duration: ${bookingData.rentalDuration} day(s))`,
        additionalInfo: `License: ${bookingData.licenseNumber || (bookingData.licenseImage ? 'Image provided' : 'Not provided')}, Aadhar: ${bookingData.aadharNumber || (bookingData.aadharImage ? 'Image provided' : 'Not provided')}, Price: ${selectedModel?.price || ''}`,
        // Boolean flags for document availability
        license_image: !!bookingData.licenseImage,
        aadhar_image: !!bookingData.aadharImage
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailParams);
      toast.success('Email sent successfully!');
    } catch (error) {
      console.error('Email sending failed:', error);
      toast.error('Failed to send email notification');
    }
  };

  const validateAndBook = () => {
    if (!bookingData.isOver21) {
      toast.error('You must be 21+ years old to book a rental');
      return;
    }

    if (!bookingData.licenseNumber && !bookingData.licenseImage) {
      toast.error('Please provide driving license details');
      return;
    }

    if (!bookingData.aadharNumber && !bookingData.aadharImage) {
      toast.error('Please provide Aadhar card details');
      return;
    }

    // Send email notification
    sendEmailNotification();

    const selectedModel = getCurrentModels().find(model => model.id === bookingData.specificModel);
    const selectedCategory = getCurrentCategories().find(cat => cat.id === bookingData.vehicleCategory);

    const message = `🚗 *Kuber.cab Rental Booking Request*

📧 *Email Notification:* Sent to info.kubercab@gmail.com with documents

📍 *Pickup Address:* ${bookingData.pickupAddress}
📍 *Drop-off Address:* ${bookingData.dropoffAddress}
📅 *Start Date:* ${bookingData.startDate}
⏰ *Duration:* ${bookingData.rentalDuration} day(s)

🚙 *Vehicle Details:*
• Type: ${bookingData.vehicleType.toUpperCase()}
• Category: ${selectedCategory?.name}
• Model: ${selectedModel?.name}
• Price: ${selectedModel?.price}

👤 *Customer Details:*
✅ Age: 21+ years confirmed
🆔 *Driving License:* ${bookingData.licenseNumber || 'Image uploaded'}
🆔 *Aadhar Card:* ${bookingData.aadharNumber || 'Image uploaded'}

📧 *Documents:* Check email for uploaded license and Aadhar images
🕐 *Booking Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Please confirm availability and provide further booking details.`;

    const whatsappUrl = `https://wa.me/919898002124?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast.success('Email sent & redirecting to WhatsApp...');
    setShowValidationModal(false);
  };

  return (
    <div className="pt-20 pb-16 bg-gradient-to-br from-purple-50 via-white to-blue-50 min-h-screen">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="container mx-auto px-4 md:px-6 mb-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6">
            <Car className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Rent a <span className="text-purple-700">Vehicle</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our premium fleet of cars and bikes with easy booking process
          </p>
        </div>

        {/* Enhanced Progress Steps */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-purple-700' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${currentStep >= 1 ? 'bg-purple-700 text-white shadow-lg' : 'bg-gray-300'}`}>
                <MapPin className="h-5 w-5" />
              </div>
              <span className="ml-3 font-medium">Trip Details</span>
            </div>
            <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-purple-700' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${currentStep >= 2 ? 'text-purple-700' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${currentStep >= 2 ? 'bg-purple-700 text-white shadow-lg' : 'bg-gray-300'}`}>
                <Car className="h-5 w-5" />
              </div>
              <span className="ml-3 font-medium">Vehicle Selection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step 1: Enhanced Address & Trip Details */}
      {currentStep === 1 && (
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mr-4">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Trip Details</h2>
                  <p className="text-gray-600">Enter your pickup, drop-off locations and trip duration</p>
                </div>
              </div>

              <form onSubmit={handleAddressSubmit} className="space-y-8">
                {/* Address Section */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Pickup Location *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                        placeholder="Enter pickup address"
                        value={bookingData.pickupAddress}
                        onChange={(e) => setBookingData(prev => ({ ...prev, pickupAddress: e.target.value }))}
                      />
                    </div>
                    <p className="text-xs text-gray-500">We'll pick up the vehicle from this location</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Drop-off Location *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                        placeholder="Enter drop-off address"
                        value={bookingData.dropoffAddress}
                        onChange={(e) => setBookingData(prev => ({ ...prev, dropoffAddress: e.target.value }))}
                      />
                    </div>
                    <p className="text-xs text-gray-500">We'll collect the vehicle from this location</p>
                  </div>
                </div>

                {/* Trip Duration Section */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Start Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                        value={bookingData.startDate}
                        onChange={(e) => setBookingData(prev => ({ ...prev, startDate: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Rental Duration
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <select
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all appearance-none"
                        value={bookingData.rentalDuration}
                        onChange={(e) => setBookingData(prev => ({ ...prev, rentalDuration: e.target.value }))}
                      >
                        <option value="1">1 Day</option>
                        <option value="2">2 Days</option>
                        <option value="3">3 Days</option>
                        <option value="7">1 Week</option>
                        <option value="30">1 Month</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-green-800 font-medium text-sm">Free Cancellation</span>
                    </div>
                    <p className="text-green-700 text-xs mt-1">Cancel up to 24 hours before</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-blue-800 font-medium text-sm">Instant Booking</span>
                    </div>
                    <p className="text-blue-700 text-xs mt-1">Get confirmation immediately</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-purple-800 font-medium text-sm">24/7 Support</span>
                    </div>
                    <p className="text-purple-700 text-xs mt-1">Help available anytime</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-700 to-blue-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-purple-800 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Continue to Vehicle Selection →
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Enhanced Vehicle Selection */}
      {currentStep === 2 && (
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mr-4">
                    <Car className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Choose Your Vehicle</h2>
                    <p className="text-gray-600">Select vehicle type, category, and specific model</p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-purple-700 hover:text-purple-800 font-medium flex items-center"
                >
                  ← Back to Trip Details
                </button>
              </div>

              <form onSubmit={handleVehicleSubmit} className="space-y-8">
                {/* Vehicle Type Toggle */}
                <div className="flex justify-center">
                  <div className="bg-gray-100 p-1 rounded-xl">
                    <button
                      type="button"
                      className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                        bookingData.vehicleType === 'car' 
                          ? 'bg-white text-purple-700 shadow-md' 
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                      onClick={() => setBookingData(prev => ({ ...prev, vehicleType: 'car', vehicleCategory: '', specificModel: '' }))}
                    >
                      <Car className="h-5 w-5 inline mr-2" />
                      Cars
                    </button>
                    <button
                      type="button"
                      className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                        bookingData.vehicleType === 'bike' 
                          ? 'bg-white text-purple-700 shadow-md' 
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                      onClick={() => setBookingData(prev => ({ ...prev, vehicleType: 'bike', vehicleCategory: '', specificModel: '' }))}
                    >
                      <Bike className="h-5 w-5 inline mr-2" />
                      Bikes
                    </button>
                  </div>
                </div>

                {/* Vehicle Category Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Select {bookingData.vehicleType === 'car' ? 'Car' : 'Bike'} Category
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {getCurrentCategories().map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          bookingData.vehicleCategory === category.id
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                        }`}
                        onClick={() => setBookingData(prev => ({ ...prev, vehicleCategory: category.id, specificModel: '' }))}
                      >
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <h4 className="font-semibold text-gray-900">{category.name}</h4>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Specific Model Selection */}
                {bookingData.vehicleCategory && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Choose Specific Model
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getCurrentModels().map((model) => (
                        <div 
                          key={model.id} 
                          className={`border-2 rounded-xl overflow-hidden transition-all cursor-pointer ${
                            bookingData.specificModel === model.id
                              ? 'border-purple-600 shadow-lg'
                              : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                          } ${!model.isAvailable ? 'opacity-75' : ''}`}
                          onClick={() => model.isAvailable && setBookingData(prev => ({ ...prev, specificModel: model.id }))}
                        >
                          {/* Status Badges */}
                          <div className="relative">
                            {model.isPopular && (
                              <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium z-10">
                                Popular
                              </div>
                            )}
                            {model.discount && model.isAvailable && (
                              <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium z-10">
                                {model.discount}
                              </div>
                            )}
                            {!model.isAvailable && (
                              <div className="absolute inset-0 bg-red-500 bg-opacity-20 flex items-center justify-center z-10">
                                <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
                                  SOLD OUT
                                </div>
                              </div>
                            )}
                            
                            <img
                              src={model.image}
                              alt={model.name}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                          
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="text-lg font-semibold text-gray-900">{model.name}</h4>
                              <div className="text-right">
                                {model.originalPrice && (
                                  <div className="text-sm text-gray-500 line-through">{model.originalPrice}</div>
                                )}
                                <span className="text-lg font-bold text-purple-700">{model.price}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              {model.features.map((feature, index) => (
                                <span key={index} className={`px-2 py-1 rounded-full text-xs ${
                                  model.isPopular ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                                }`}>
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {bookingData.specificModel && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-green-800 font-medium">
                        Selected: {getCurrentModels().find(m => m.id === bookingData.specificModel)?.name}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!bookingData.specificModel}
                  className={`w-full py-4 px-8 rounded-xl font-semibold transition-all ${
                    bookingData.specificModel
                      ? 'bg-gradient-to-r from-purple-700 to-blue-600 text-white hover:from-purple-800 hover:to-blue-700 transform hover:scale-105 shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Proceed to Verification →
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Validation Modal */}
      {showValidationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mr-4">
                    <User className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Verify Your Details</h3>
                    <p className="text-gray-600">Complete verification to confirm your booking</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowValidationModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-8">
                {/* Age Confirmation */}
                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="age-confirm"
                      checked={bookingData.isOver21}
                      onChange={(e) => setBookingData(prev => ({ ...prev, isOver21: e.target.checked }))}
                      className="mr-3 w-5 h-5 text-purple-600"
                    />
                    <label htmlFor="age-confirm" className="text-yellow-800 font-semibold">
                      I confirm that I am 21+ years old and eligible to rent vehicles
                    </label>
                  </div>
                </div>

                {/* Driving License */}
                <div className="border border-gray-200 p-6 rounded-xl">
                  <div className="flex items-center mb-6">
                    <CreditCard className="h-6 w-6 text-purple-600 mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">Driving License Verification</h4>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        License Number
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Enter your driving license number"
                        value={bookingData.licenseNumber}
                        onChange={(e) => setBookingData(prev => ({ ...prev, licenseNumber: e.target.value }))}
                      />
                    </div>
                    
                    <div className="text-center">
                      <span className="bg-gray-100 px-4 py-2 rounded-full text-gray-600 text-sm">OR</span>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Upload License Image
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload('license', e.target.files[0])}
                          className="hidden"
                          id="license-upload"
                        />
                        <label htmlFor="license-upload" className="cursor-pointer">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600 font-medium">Click to upload license image</p>
                          <p className="text-gray-500 text-sm">PNG, JPG up to 10MB</p>
                        </label>
                        {bookingData.licenseImage && (
                          <div className="mt-3 p-2 bg-green-50 rounded-lg">
                            <p className="text-green-600 font-medium">✓ {bookingData.licenseImage.name}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Aadhar Card */}
                <div className="border border-gray-200 p-6 rounded-xl">
                  <div className="flex items-center mb-6">
                    <User className="h-6 w-6 text-purple-600 mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">Aadhar Card Verification</h4>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Aadhar Number
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Enter your 12-digit Aadhar number"
                        value={bookingData.aadharNumber}
                        onChange={(e) => setBookingData(prev => ({ ...prev, aadharNumber: e.target.value }))}
                      />
                    </div>
                    
                    <div className="text-center">
                      <span className="bg-gray-100 px-4 py-2 rounded-full text-gray-600 text-sm">OR</span>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Upload Aadhar Image
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload('aadhar', e.target.files[0])}
                          className="hidden"
                          id="aadhar-upload"
                        />
                        <label htmlFor="aadhar-upload" className="cursor-pointer">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600 font-medium">Click to upload Aadhar image</p>
                          <p className="text-gray-500 text-sm">PNG, JPG up to 10MB</p>
                        </label>
                        {bookingData.aadharImage && (
                          <div className="mt-3 p-2 bg-green-50 rounded-lg">
                            <p className="text-green-600 font-medium">✓ {bookingData.aadharImage.name}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowValidationModal(false)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={validateAndBook}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center shadow-lg"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Send Email & WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalBookingPage;