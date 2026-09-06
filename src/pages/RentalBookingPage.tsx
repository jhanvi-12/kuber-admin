import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { MapPin, Car, Bike, Upload, Phone, CheckCircle, User, CreditCard, ChevronDown, Calendar, Clock } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import DropoffMap from '../components/DropoffMap';

interface BookingData {
  pickupAddress: string;
  dropoffAddress: string;
  dropoffLat: number | null;
  dropoffLng: number | null;
  vehicleType: 'car' | 'bike';
  vehicleCategory: string;
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
}

const RentalBookingPage: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    pickupAddress: '',
    dropoffAddress: '',
    dropoffLat: null,
    dropoffLng: null,
    vehicleType: 'car',
    vehicleCategory: '',
    rentalDuration: '1',
    startDate: '',
    isOver21: false,
    licenseNumber: '',
    licenseImage: null,
    aadharNumber: '',
    aadharImage: null,
  });

  useEffect(() => {
    const state = location.state as { vehicleType?: 'car' | 'bike' } | null;
    const typeParam = searchParams.get('type');
    const vehicleType =
      state?.vehicleType ?? (typeParam === 'bike' || typeParam === 'car' ? typeParam : null);

    if (vehicleType) {
      setBookingData((prev) => ({
        ...prev,
        vehicleType,
        vehicleCategory: '',
      }));
    }
  }, [location.state, searchParams]);

  const carCategories: VehicleCategory[] = [
    { id: 'hatchback', name: 'Hatchback', description: 'Compact cars for city driving', icon: '🚗' },
    { id: 'sedan', name: 'Sedan', description: 'Comfortable cars for business and family', icon: '🚙' },
    { id: 'suv', name: 'SUV', description: 'Spacious vehicles for family trips', icon: '🚐' },
  ];

  const bikeCategories: VehicleCategory[] = [
    { id: 'scooter', name: 'Scooter', description: 'Easy to ride automatic scooters', icon: '🛵' },
    { id: 'commuter', name: 'Commuter', description: 'Fuel-efficient bikes for daily use', icon: '🏍️' },
    { id: 'sports', name: 'Sports Bike', description: 'Performance bikes for enthusiasts', icon: '🏁' },
    { id: 'cruiser', name: 'Cruiser', description: 'Classic bikes for long rides', icon: '🛣️' },
  ];

  const getCurrentCategories = () => {
    return bookingData.vehicleType === 'car' ? carCategories : bikeCategories;
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.pickupAddress) {
      toast.error('Please enter a pickup address');
      return;
    }
    if (!bookingData.dropoffAddress || bookingData.dropoffLat == null || bookingData.dropoffLng == null) {
      toast.error('Please pin your drop-off on the map');
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
      toast.error('Please select a vehicle type');
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
      const selectedCategory = getCurrentCategories().find(cat => cat.id === bookingData.vehicleCategory);

      if (bookingData.licenseImage) {
        await convertFileToBase64(bookingData.licenseImage);
      }

      if (bookingData.aadharImage) {
        await convertFileToBase64(bookingData.aadharImage);
      }

      const dropPin =
        bookingData.dropoffLat != null && bookingData.dropoffLng != null
          ? ` (${bookingData.dropoffLat.toFixed(5)}, ${bookingData.dropoffLng.toFixed(5)})`
          : '';

      const emailParams = {
        logoUrl: `${window.location.origin}/kuber-cab-sb.png`,
        name: 'Customer', // You can add a name field to the form
        type: bookingData.vehicleType === 'car' ? 'Car Rental' : 'Bike Rental',
        vehicleName: `${selectedCategory?.name || ''} — model assigned by Kuber`,
        pickupAddress: bookingData.pickupAddress,
        dropAddress: `${bookingData.dropoffAddress}${dropPin}`,
        pickupDateTime: `${bookingData.startDate} (Duration: ${bookingData.rentalDuration} day(s))`,
        additionalInfo: `License: ${bookingData.licenseNumber || (bookingData.licenseImage ? 'Image provided' : 'Not provided')}, Aadhar: ${bookingData.aadharNumber || (bookingData.aadharImage ? 'Image provided' : 'Not provided')}`,
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

    const selectedCategory = getCurrentCategories().find(cat => cat.id === bookingData.vehicleCategory);
    const dropPin =
      bookingData.dropoffLat != null && bookingData.dropoffLng != null
        ? `\n📍 *Drop-off pin:* ${bookingData.dropoffLat.toFixed(5)}, ${bookingData.dropoffLng.toFixed(5)}`
        : '';

    const message = `🚗 *Kuber.cab Rental Booking Request*

📧 *Email Notification:* Sent to info.kubercab@gmail.com with documents

📍 *Pickup Address:* ${bookingData.pickupAddress}
📍 *Drop-off Address:* ${bookingData.dropoffAddress}${dropPin}
📅 *Start Date:* ${bookingData.startDate}
⏰ *Duration:* ${bookingData.rentalDuration} day(s)

🚙 *Vehicle Details:*
• Type: ${bookingData.vehicleType.toUpperCase()}
• Category: ${selectedCategory?.name}
• Model: Assigned by Kuber after booking

👤 *Customer Details:*
✅ Age: 21+ years confirmed
🆔 *Driving License:* ${bookingData.licenseNumber || 'Image uploaded'}
🆔 *Aadhar Card:* ${bookingData.aadharNumber || 'Image uploaded'}

📧 *Documents:* Check email for uploaded license and Aadhar images
🕐 *Booking Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Please confirm availability and assign a vehicle model.`;

    const whatsappUrl = `https://wa.me/919898002124?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast.success('Email sent & redirecting to WhatsApp...');
    setShowValidationModal(false);
  };

  return (
    <div className="min-h-screen bg-paper pb-16 pt-24">
      <Toaster position="top-right" />
      
      <div className="site-container mb-10">
        <p className="kicker mb-3">Rentals</p>
        <h1 className="display text-4xl md:text-5xl">Rent a vehicle</h1>
        <p className="mt-3 max-w-xl text-ink-muted">
          Choose from our fleet of cars and bikes. Enter pickup, dates, and confirm.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-purple-700' : 'text-ink-faint'}`}>
              <div className={`flex h-8 w-8 items-center justify-center rounded-md text-xs font-semibold ${currentStep >= 1 ? 'bg-purple-700 text-white' : 'bg-line text-ink-muted'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Trip details</span>
            </div>
            <div className={`h-px w-10 ${currentStep >= 2 ? 'bg-purple-700' : 'bg-line'}`}></div>
            <div className={`flex items-center ${currentStep >= 2 ? 'text-purple-700' : 'text-ink-faint'}`}>
              <div className={`flex h-8 w-8 items-center justify-center rounded-md text-xs font-semibold ${currentStep >= 2 ? 'bg-purple-700 text-white' : 'bg-line text-ink-muted'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Vehicle</span>
            </div>
        </div>
      </div>

      {/* Step 1: Enhanced Address & Trip Details */}
      {currentStep === 1 && (
        <div className="site-container">
          <form onSubmit={handleAddressSubmit} className="grid items-stretch gap-6 lg:grid-cols-2">
            <div className="surface-card p-6 md:p-8">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mr-4">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Trip Details</h2>
                  <p className="text-gray-600">Enter pickup, drop-off, and trip duration. Pin drop-off on the map.</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-6">
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
                        placeholder="Address fills in when you pin the map"
                        value={bookingData.dropoffAddress}
                        onChange={(e) => setBookingData(prev => ({ ...prev, dropoffAddress: e.target.value }))}
                      />
                    </div>
                    <p className="text-xs text-gray-500">We'll collect the vehicle from the map pin</p>
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
                  className="btn-primary w-full py-4"
                >
                  Continue to Vehicle Selection →
                </button>
              </div>
            </div>

            <aside className="flex min-h-[28rem] flex-col lg:sticky lg:top-24 lg:min-h-[40rem]">
              <p className="mb-3 text-sm font-semibold text-gray-700 lg:sr-only">Drop-off map</p>
              <DropoffMap
                lat={bookingData.dropoffLat}
                lng={bookingData.dropoffLng}
                onPick={({ address, lat, lng }) =>
                  setBookingData((prev) => ({
                    ...prev,
                    dropoffAddress: address,
                    dropoffLat: lat,
                    dropoffLng: lng,
                  }))
                }
              />
            </aside>
          </form>
        </div>
      )}

      {/* Step 2: Enhanced Vehicle Selection */}
      {currentStep === 2 && (
        <div className="site-container">
          <div className="max-w-6xl mx-auto">
            <div className="surface-card p-6 md:p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mr-4">
                    <Car className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Choose Your Vehicle</h2>
                    <p className="text-gray-600">Select car or bike, then a type. Kuber assigns the exact model.</p>
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
                      onClick={() => setBookingData(prev => ({ ...prev, vehicleType: 'car', vehicleCategory: '' }))}
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
                      onClick={() => setBookingData(prev => ({ ...prev, vehicleType: 'bike', vehicleCategory: '' }))}
                    >
                      <Bike className="h-5 w-5 inline mr-2" />
                      Bikes
                    </button>
                  </div>
                </div>

                {/* Vehicle Category Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Select {bookingData.vehicleType === 'car' ? 'car' : 'bike'} type
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
                        onClick={() => setBookingData(prev => ({ ...prev, vehicleCategory: category.id }))}
                      >
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <h4 className="font-semibold text-gray-900">{category.name}</h4>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {bookingData.vehicleCategory && (
                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-purple-700 mr-2 mt-0.5 shrink-0" />
                      <p className="text-sm text-purple-900">
                        You selected {getCurrentCategories().find((c) => c.id === bookingData.vehicleCategory)?.name}.
                        Kuber will send the specific model after this request.
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!bookingData.vehicleCategory}
                  className={`w-full py-4 px-8 rounded-xl font-semibold transition-all ${
                    bookingData.vehicleCategory
                      ? 'bg-purple-700 text-white hover:bg-purple-800'
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
                    className="flex-1 btn-primary py-3"
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