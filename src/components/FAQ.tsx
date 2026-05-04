import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../constants';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section id="faq" className="py-16 bg-purple-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-purple-700">Questions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Got questions? We've got answers. If you can't find what you're looking for, feel free to contact our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {FAQS.map((faq, index) => (
            <div 
              key={faq.id}
              className="mb-4 bg-white rounded-lg shadow-sm overflow-hidden transition-all"
            >
              <button
                className="w-full text-left p-6 focus:outline-none flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="font-semibold text-lg text-gray-900">{faq.question}</h3>
                {openIndex === index ? 
                  <ChevronUp className="h-5 w-5 text-purple-600" /> : 
                  <ChevronDown className="h-5 w-5 text-purple-600" />
                }
              </button>

              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a 
            href="#contact" 
            className="py-3 px-8 bg-purple-700 text-white rounded-full font-medium hover:bg-purple-800 transition-colors inline-block"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;