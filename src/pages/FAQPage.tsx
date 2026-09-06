import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FAQS } from '../constants';
import PageHero from '../components/PageHero';

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <PageHero
        kicker="Help"
        title="Questions, answered"
        description="Booking, payments, driving, and safety — in plain language."
      >
        <input
          type="search"
          placeholder="Search questions"
          className="field-input mt-8 max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </PageHero>

      <section className="section-pad bg-white">
        <div className="site-container max-w-3xl">
          {filtered.length === 0 ? (
            <p className="text-ink-muted">No matching questions. Try another search, or contact us.</p>
          ) : (
            <div className="divide-y divide-line border-y border-line">
              {filtered.map((faq, index) => {
                const open = openIndex === index;
                return (
                  <div key={faq.id}>
                    <button
                      type="button"
                      className="flex w-full items-start justify-between gap-4 py-5 text-left"
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
          )}

          <div className="mt-12 border-t border-line pt-8">
            <p className="text-ink-muted">Still need help?</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Contact support
              </Link>
              <a href="tel:+919898002124" className="btn-secondary">
                +91 98980 02124
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
