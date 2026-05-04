import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import { format } from 'date-fns';
import toast, { Toaster } from 'react-hot-toast';
import { Mail, Phone, Clock, Calendar as CalendarIcon, MapPin, MessageCircle, Send, Users, Headphones } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';

const ContactPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredDate: format(new Date(), 'PPP'),
    contactMethod: 'email'
  });

  const contactMethods = [
    {
      icon: <Mail className="h-8 w-8" />,
      title: 'Email Support',
      description: 'Send us a detailed message and we\'ll respond within 24 hours',
      contact: 'info.kubercab@gmail.com',
      availability: 'Response within 24 hours',
      color: 'blue'
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: 'Phone Support',
      description: 'Speak directly with our customer support team',
      contact: '+91 98980 02124',
      availability: '24/7 Available',
      color: 'green'
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: 'Live Chat',
      description: 'Get instant help through our live chat system',
      contact: 'Available on website',
      availability: 'Mon-Fri, 9 AM - 6 PM',
      color: 'purple'
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: 'Visit Our Office',
      description: 'Meet us in person at our headquarters',
      contact: '123 Business Street, Tech Hub, Mumbai',
      availability: 'Mon-Fri, 9 AM - 6 PM',
      color: 'orange'
    }
  ];

  const departments = [
    { name: 'General Inquiry', value: 'general' },
    { name: 'Driver Support', value: 'driver' },
    { name: 'Rider Support', value: 'rider' },
    { name: 'Business Partnership', value: 'business' },
    { name: 'Media & Press', value: 'media' },
    { name: 'Technical Support', value: 'technical' }
  ];

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setFormData(prev => ({
      ...prev,
      preferredDate: format(date, 'PPP')
    }));
    setShowCalendar(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://formspree.io/f/xzzvyvan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          preferredDate: formData.preferredDate,
          contactMethod: formData.contactMethod
        }),
      });

      if (response.ok) {
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          preferredDate: format(new Date(), 'PPP'),
          contactMethod: 'email'
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };
      

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  return (
    <div className="pt-20 pb-16">
      <Toaster position="top-right" />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/kuber-cab-sb.png" 
                alt="Kuber.cab" 
                className="h-16 w-auto mr-4"
              />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Get in <span className="text-purple-700">Touch</span>
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Have questions, need support, or want to partner with us? We're here to help. 
              Choose your preferred way to reach out and we'll respond promptly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <Headphones className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-gray-700">24/7 Support</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-gray-700">Expert Team</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <Clock className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-gray-700">Quick Response</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Preferred Contact Method</h2>
              <p className="text-gray-600">We offer multiple ways to get in touch based on your needs and preferences</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, index) => (
                <div key={index} className={`border-2 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer ${getColorClasses(method.color)}`}>
                  <div className="mb-4">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                  <div className="space-y-2">
                    <p className="font-medium text-gray-900">{method.contact}</p>
                    <p className="text-sm text-gray-500">{method.availability}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                  <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept.value} value={dept.value}>{dept.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Contact Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg cursor-pointer"
                        value={formData.preferredDate}
                        onClick={() => setShowCalendar(!showCalendar)}
                      />
                      <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                    {showCalendar && (
                      <div className="absolute z-10 mt-2 bg-white rounded-lg shadow-lg p-4">
                        <Calendar
                          onChange={handleDateChange}
                          value={selectedDate}
                          minDate={new Date()}
                          className="rounded-lg border-0"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Contact Method
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="email"
                          checked={formData.contactMethod === 'email'}
                          onChange={(e) => setFormData(prev => ({ ...prev, contactMethod: e.target.value }))}
                          className="mr-2"
                        />
                        Email
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="phone"
                          checked={formData.contactMethod === 'phone'}
                          onChange={(e) => setFormData(prev => ({ ...prev, contactMethod: e.target.value }))}
                          className="mr-2"
                        />
                        Phone
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="both"
                          checked={formData.contactMethod === 'both'}
                          onChange={(e) => setFormData(prev => ({ ...prev, contactMethod: e.target.value }))}
                          className="mr-2"
                        />
                        Both
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Please describe your inquiry in detail..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-purple-700 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-800 transition-colors flex items-center justify-center"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mr-4">
                        <Mail className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <a href="mailto:info.kubercab@gmail.com" className="text-purple-600 hover:text-purple-700">
                          info.kubercab@gmail.com
                        </a>
                        <p className="text-gray-500 text-sm">For general inquiries and support</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mr-4">
                        <Phone className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <a href="tel:+919898002124" className="text-green-600 hover:text-green-700">
                          +91 98980 02124
                        </a>
                        <p className="text-gray-500 text-sm">24/7 customer support hotline</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mr-4">
                        <MapPin className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Office Address</p>
                        <p className="text-gray-600">Duffnala, Shahibag<br />Ahmedabad, Gujarat 380004</p>
                        <p className="text-gray-500 text-sm">Visit us during business hours</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mr-4">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Business Hours</p>
                        <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                        <p className="text-gray-600">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ Quick Links */}
                <div className="bg-purple-50 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Help</h3>
                  <p className="text-gray-600 mb-6">
                    Looking for quick answers? Check out our frequently asked questions.
                  </p>
                  <div className="space-y-3">
                    <a href="#" className="block text-purple-700 hover:text-purple-800 font-medium">
                      → How to book a ride?
                    </a>
                    <a href="#" className="block text-purple-700 hover:text-purple-800 font-medium">
                      → Payment methods accepted
                    </a>
                    <a href="#" className="block text-purple-700 hover:text-purple-800 font-medium">
                      → Cancellation policy
                    </a>
                    <a href="#" className="block text-purple-700 hover:text-purple-800 font-medium">
                      → Safety measures
                    </a>
                  </div>
                  <button className="mt-6 bg-purple-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-800 transition-colors">
                    View All FAQs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Our Office</h2>
              <p className="text-gray-600">Located in the heart of Mumbai's tech district</p>
            </div>
            
            <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Interactive map would be integrated here</p>
                <p className="text-sm text-gray-500">123 Business Street, Tech Hub, Mumbai, India</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;