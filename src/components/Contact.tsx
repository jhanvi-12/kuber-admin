import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import { format } from 'date-fns';
import toast, { Toaster } from 'react-hot-toast';
import { Mail, Phone, Clock, Calendar as CalendarIcon } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';

const Contact: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredDate: format(new Date(), 'PPP')
  });

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
          message: formData.message,
          preferredDate: formData.preferredDate
        }),
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          preferredDate: format(new Date(), 'PPP')
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get in <span className="text-purple-700">Touch</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help. Schedule a call or send us a message.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-purple-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-purple-600 mr-4 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <a href="mailto:info.kubercab@gmail.com" className="text-gray-600 hover:text-purple-700">
                    info.kubercab@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-6 w-6 text-purple-600 mr-4 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <a href="tel:+919898002124" className="text-gray-600 hover:text-purple-700">
                    +91 98980 02124
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-6 w-6 text-purple-600 mr-4 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Business Hours</p>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div className="relative">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="date"
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer"
                    value={formData.preferredDate}
                    onClick={() => setShowCalendar(!showCalendar)}
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-purple-700 text-white rounded-lg font-medium hover:bg-purple-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;