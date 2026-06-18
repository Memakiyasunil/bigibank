import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';

const FAQS = [
  { q: 'How do I open an account with BigiBank?', a: 'You can open an account online in just 5 minutes. Click "Open Account", fill in your details, complete KYC verification, and your account will be ready instantly.' },
  { q: 'Is BigiBank safe and RBI regulated?', a: 'Yes! BigiBank is fully regulated by the Reserve Bank of India (RBI) and all deposits are insured by DICGC up to ₹5 lakh per account.' },
  { q: 'How long does loan approval take?', a: 'Most loan applications are reviewed within 48 hours. For pre-approved customers, instant approval is available. You\'ll receive updates via SMS and email.' },
  { q: 'What are the charges for UPI transactions?', a: 'All UPI transactions at BigiBank are completely FREE. No hidden charges whatsoever.' },
  { q: 'How do I reset my internet banking password?', a: 'Click "Forgot Password" on the login page, enter your registered email, and follow the reset link. You can also visit any branch or call 1800-123-4567.' },
  { q: 'Can I have multiple accounts?', a: 'Yes! You can have a Savings, Current, FD and RD account with BigiBank. Manage all of them from one dashboard.' },
];

export default function HelpCenter() {
  const [openFaq, setOpenFaq] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = FAQS.filter(faq => faq.q.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-bg-primary pt-20">
      <section className="bg-gradient-navy py-20 pt-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-display text-4xl font-extrabold text-white mb-4">How can we <span className="gradient-text-light">help you?</span></h1>
          <div className="max-w-md mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search for answers..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border-none outline-none text-navy bg-white shadow-lg" />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="section-title mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-navy">{faq.q}</span>
                  <ChevronDown size={18} className={`text-gray-400 flex-shrink-0 ml-4 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
