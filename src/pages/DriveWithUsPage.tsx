import React, { useState } from 'react';
import { Car, Users, DollarSign, Clock, Shield, Star, CheckCircle, ArrowRight, Phone, Mail, MapPin, Calendar } from 'lucide-react';

const DriveWithUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    vehicleType: '',
    experience: '',
    message: ''
  });

  const benefits = [
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: 'Competitive Earnings',
      description: 'Earn up to ₹50,000 per month with flexible working hours',
      highlight: 'Up to ₹50K/month'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Flexible Schedule',
      description: 'Work when you want, where you want. Be your own boss',
      highlight: '24/7 Flexibility'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Insurance Coverage',
      description: 'Comprehensive insurance coverage for you and your vehicle',
      highlight: 'Full Coverage'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Driver Support',
      description: '24/7 dedicated support team for all your needs',
      highlight: 'Always Available'
    }
  ];

  const requirements = [
    'Valid driving license (minimum 2 years)',
    'Vehicle registration documents',
    'Insurance papers',
    'Aadhaar card and PAN card',
    'Police verification certificate',
    'Medical fitness certificate'
  ];

  const steps = [
    {
      step: '01',
      title: 'Apply Online',
      description: 'Fill out our simple application form with your details'
    },
    {
      step: '02',
      title: 'Document Verification',
      description: 'Submit required documents for verification'
    },
    {
      step: '03',
      title: 'Vehicle Inspection',
      description: 'Get your vehicle inspected at our partner centers'
    },
    {
      step: '04',
      title: 'Training & Onboarding',
      description: 'Complete our driver training program'
    },
    {
      step: '05',
      title: 'Start Earning',
      description: 'Go online and start accepting ride requests'
    }
  ];

  const successStories = [
    {
      name: 'Rajesh Kumar',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      city: 'Mumbai',
      earnings: '₹45,000/month',
      story: 'Joined Kuber.cab 2 years ago and now supporting my family comfortably while maintaining work-life balance.'
    },
    {
      name: 'Amit Sharma',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      city: 'Delhi',
      earnings: '₹52,000/month',
      story: 'The flexible hours allow me to spend time with my children while earning a good income.'
    },
    {
      name: 'Suresh Patel',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
      city: 'Bangalore',
      earnings: '₹48,000/month',
      story: 'Great platform with excellent support. The earnings are consistent and the app is easy to use.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
                Join Our Team
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Drive with <span className="text-purple-700">Kuber.cab</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Turn your vehicle into a source of income. Join thousands of driver partners who are earning 
                good money while enjoying the freedom of flexible work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-purple-700 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-800 transition-colors">
                  Apply Now
                </button>
                <button className="border border-purple-700 text-purple-700 px-8 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors">
                  Learn More
                </button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                  100K+ Active Drivers
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
                  ₹45K Average Monthly Earnings
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/8358149/pexels-photo-8358149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Happy Kuber.cab driver"
                className="rounded-xl shadow-xl object-cover h-[500px] w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Star className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">4.8/5 Rating</p>
                    <p className="text-sm text-gray-500">Driver Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Drive with <span className="text-purple-700">Us?</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our platform and enjoy benefits that make driving rewarding and profitable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-purple-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                  <div className="text-purple-600">{benefit.icon}</div>
                </div>
                <div className="inline-block px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-medium mb-4">
                  {benefit.highlight}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to <span className="text-purple-700">Get Started</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow these simple steps to become a Kuber.cab driver partner and start earning.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-16 h-16 bg-purple-700 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-shrink-0 ml-6">
                      <ArrowRight className="h-6 w-6 text-purple-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Requirements to <span className="text-purple-700">Join</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  Make sure you have all the required documents and meet our criteria before applying.
                </p>
                <div className="space-y-4">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{requirement}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Note:</strong> All documents will be verified during the onboarding process. 
                    Ensure all documents are valid and up-to-date.
                  </p>
                </div>
              </div>
              <div className="bg-purple-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Stats</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Average Monthly Earnings</span>
                    <span className="font-bold text-purple-700">₹45,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Drivers</span>
                    <span className="font-bold text-purple-700">100,000+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Cities Available</span>
                    <span className="font-bold text-purple-700">33</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Driver Rating</span>
                    <span className="font-bold text-purple-700">4.8/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success <span className="text-purple-700">Stories</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our driver partners about their experience and success with Kuber.cab.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <img 
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{story.name}</h3>
                    <p className="text-gray-600 text-sm">{story.city}</p>
                    <div className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                      {story.earnings}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{story.story}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Apply to <span className="text-purple-700">Drive</span>
              </h2>
              <p className="text-gray-600">
                Ready to start earning? Fill out the application form below and we'll get back to you soon.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <select
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      >
                        <option value="">Select City</option>
                        <option value="mumbai">Mumbai</option>
                        <option value="delhi">Delhi</option>
                        <option value="bangalore">Bangalore</option>
                        <option value="hyderabad">Hyderabad</option>
                        <option value="chennai">Chennai</option>
                        <option value="kolkata">Kolkata</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Vehicle Type
                      </label>
                      <select
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={formData.vehicleType}
                        onChange={(e) => setFormData(prev => ({ ...prev, vehicleType: e.target.value }))}
                      >
                        <option value="">Select Vehicle</option>
                        <option value="bike">Bike</option>
                        <option value="auto">Auto Rickshaw</option>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Driving Experience
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      value={formData.experience}
                      onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    >
                      <option value="">Select Experience</option>
                      <option value="2-5">2-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-purple-700 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-800 transition-colors"
                  >
                    Submit Application
                  </button>
                </form>
              </div>

              <div className="bg-purple-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-purple-600 mr-4 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <a href="tel:+919898002124" className="text-green-600 hover:text-green-700">
                        +91 98980 02124
                      </a>
                      <p className="text-gray-500 text-sm">Driver Support Hotline</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-purple-600 mr-4 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">info.kubercab@gmail.com</p>
                      <p className="text-gray-500 text-sm">Driver Applications</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-purple-600 mr-4 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Office</p>
                      <p className="text-gray-600">Duffnala, Shahibag<br />Ahmedabad, Gujarat 380004</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar className="h-6 w-6 text-purple-600 mr-4 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Office Hours</p>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DriveWithUsPage;