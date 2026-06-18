import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Wifi, QrCode, Globe, CreditCard } from 'lucide-react';

const FEATURES = [
  { icon: '📱', title: 'Mobile Banking', desc: 'Full-featured app for iOS and Android. Check balances, transfer money, pay bills.' },
  { icon: '💻', title: 'Internet Banking', desc: 'Secure web portal for all banking operations from any browser.' },
  { icon: '📲', title: 'UPI Payments', desc: 'Instant 24/7 money transfers using UPI ID or QR code.' },
  { icon: '🔢', title: 'QR Payments', desc: 'Scan QR to pay merchants instantly. Generate your own payment QR.' },
  { icon: '🌍', title: 'International Payments', desc: 'Send and receive money globally with real-time exchange rates.' },
  { icon: '🔔', title: 'Smart Alerts', desc: 'Instant SMS & email alerts for every transaction on your account.' },
];

export default function DigitalBanking() {
  return (
    <div>
      <section className="bg-gradient-navy py-24 pt-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-5xl font-extrabold text-white mb-4">
              Digital <span className="gradient-text-light">Banking</span>
            </h1>
            <p className="text-white/65 text-lg max-w-xl mx-auto">
              Bank smarter with our award-winning digital banking suite. Available 24/7 from anywhere.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="section bg-bg-primary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-card-lg transition-all"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-lg text-navy font-display mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
