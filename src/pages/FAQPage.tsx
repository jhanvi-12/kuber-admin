import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search, MessageCircle, Phone, Mail } from 'lucide-react';
import { FAQS } from '../constants';

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFAQ = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const filteredFAQs = FAQS.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    { name: 'General', count: 8, color: 'purple' },
    { name: 'Booking', count: 6, color: 'blue' },
    { name: 'Payment', count: 4, color: 'green' },
    { name: 'Safety', count: 5, color: 'orange' }
  ];

  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
              <HelpCircle className="h-8 w-8 text-purple-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-purple-700">Questions</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Find answers to common questions about our services, booking process, payments, and more.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} questions</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try searching with different keywords</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <div 
                    key={faq.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg"
                  >
                    <button
                      className="w-full text-left p-6 focus:outline-none flex justify-between items-center"
                      onClick={() => toggleFAQ(index)}
                    >
                      <h3 className="font-semibold text-lg text-gray-900 pr-4">{faq.question}</h3>
                      {openIndex === index ? 
                        <ChevronUp className="h-6 w-6 text-purple-600 flex-shrink-0" /> : 
                        <ChevronDown className="h-6 w-6 text-purple-600 flex-shrink-0" />
                      }
                    </button>

                    <div 
                      className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                        openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                      }`}
                    >
                        <a href="tel:+919898002124" className="text-green-600 hover:text-green-700">
                          +91 98980 02124
                        </a>
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Still Need <span className="text-purple-700">Help?</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Can't find what you're looking for? Our support team is here to help you 24/7.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                  <MessageCircle className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 text-sm mb-4">Chat with our support team instantly</p>
                <button className="bg-purple-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-800 transition-colors">
                  Start Chat
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 text-sm mb-4">Speak directly with our support team</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Call Now
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm mb-4">Send us a detailed message</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;