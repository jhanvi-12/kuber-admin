import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FAQS } from '../constants';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const preview = FAQS.slice(0, 5);

  return (
    <section id="faq" className="bg-paper section-pad">
      <div className="site-container grid gap-14 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-24">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl lg:text-5xl">
            Questions, answered
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted md:text-lg">
            Booking, payments, driving, and safety. Need more detail? Open the full help page.
          </p>
          <Link to="/faq" className="btn-secondary mt-10">
            View all FAQs
          </Link>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {preview.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={faq.id}>
                <button
                  type="button"
                      className="flex w-full items-start justify-between gap-4 py-7 text-left"
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span className="font-semibold text-ink">{faq.question}</span>
                  <ChevronDown
                    className={`mt-1 h-5 w-5 shrink-0 text-ink-faint transition-transform ${open ? 'rotate-180' : ''}`}
                  />
                </button>
                {open && <p className="pb-5 pr-8 text-sm leading-relaxed text-ink-muted">{faq.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
