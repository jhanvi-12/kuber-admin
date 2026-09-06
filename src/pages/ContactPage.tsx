import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import { format } from 'date-fns';
import toast, { Toaster } from 'react-hot-toast';
import { Mail, Phone, Clock, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import PageHero from '../components/PageHero';

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
    contactMethod: 'email',
  });

  const departments = [
    { name: 'General Inquiry', value: 'general' },
    { name: 'Driver Support', value: 'driver' },
    { name: 'Rider Support', value: 'rider' },
    { name: 'Business Partnership', value: 'business' },
    { name: 'Technical Support', value: 'technical' },
  ];

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setFormData((prev) => ({ ...prev, preferredDate: format(date, 'PPP') }));
    setShowCalendar(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formspree.io/f/xzzvyvan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed');
      toast.success('Message sent successfully.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        preferredDate: format(new Date(), 'PPP'),
        contactMethod: 'email',
      });
    } catch {
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <PageHero
        kicker="Contact"
        title="We’re here to help"
        description="Email, call, or send a message. We reply from Ahmedabad."
      />

      <section className="section-pad bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Full name
                <input
                  required
                  className="field-input mt-1.5"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                />
              </label>
              <label className="block text-sm font-medium">
                Phone
                <input
                  type="tel"
                  className="field-input mt-1.5"
                  value={formData.phone}
                  onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                />
              </label>
            </div>
            <label className="block text-sm font-medium">
              Email
              <input
                required
                type="email"
                className="field-input mt-1.5"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              />
            </label>
            <label className="block text-sm font-medium">
              Topic
              <select
                className="field-input mt-1.5"
                value={formData.subject}
                onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
              >
                <option value="">Select a topic</option>
                {departments.map((dept) => (
                  <option key={dept.value} value={dept.value}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="relative">
              <label className="block text-sm font-medium">
                Preferred date
                <input
                  readOnly
                  className="field-input mt-1.5 cursor-pointer"
                  value={formData.preferredDate}
                  onClick={() => setShowCalendar((v) => !v)}
                />
              </label>
              <CalendarIcon className="pointer-events-none absolute right-3 top-10 h-4 w-4 text-ink-faint" />
              {showCalendar && (
                <div className="absolute z-10 mt-2 rounded-md border border-line bg-white p-3 shadow-lift">
                  <Calendar onChange={handleDateChange as never} value={selectedDate} minDate={new Date()} />
                </div>
              )}
            </div>
            <fieldset className="text-sm">
              <legend className="font-medium">Preferred contact method</legend>
              <div className="mt-3 flex flex-wrap gap-5">
                {['email', 'phone', 'both'].map((method) => (
                  <label key={method} className="flex items-center gap-2 capitalize">
                    <input
                      type="radio"
                      name="contactMethod"
                      value={method}
                      checked={formData.contactMethod === method}
                      onChange={(e) => setFormData((p) => ({ ...p, contactMethod: e.target.value }))}
                    />
                    {method}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="block text-sm font-medium">
              Message
              <textarea
                required
                rows={5}
                className="field-input mt-1.5"
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
              />
            </label>
            <button type="submit" className="btn-primary">
              Send message
            </button>
          </form>

          <aside className="space-y-8">
            <ul className="space-y-6 text-sm">
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-purple-700" />
                <div>
                  <p className="font-medium text-ink">Email</p>
                  <a href="mailto:info.kubercab@gmail.com" className="text-ink-muted hover:text-ink">
                    info.kubercab@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-purple-700" />
                <div>
                  <p className="font-medium text-ink">Phone</p>
                  <a href="tel:+919898002124" className="text-ink-muted hover:text-ink">
                    +91 98980 02124
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-purple-700" />
                <div>
                  <p className="font-medium text-ink">Office</p>
                  <p className="text-ink-muted">Duffnala, Shahibag, Ahmedabad, Gujarat 380004</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-purple-700" />
                <div>
                  <p className="font-medium text-ink">Hours</p>
                  <p className="text-ink-muted">Monday – Friday: 9:00 AM – 6:00 PM</p>
                  <p className="text-ink-muted">Saturday: 10:00 AM – 4:00 PM</p>
                </div>
              </li>
            </ul>
            <Link to="/faq" className="btn-ghost">
              Browse FAQs
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
