import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    toast.success('Message sent! We\'ll respond within 2 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  return (
    <div>
      <section className="bg-gradient-navy py-24 pt-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-5xl font-extrabold text-white mb-4">
              Get in <span className="gradient-text-light">Touch</span>
            </h1>
            <p className="text-white/65 text-lg max-w-xl mx-auto">
              We're here 24/7. Our friendly support team is always ready to help you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section bg-bg-primary">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              {[
                { icon: Phone, title: '24/7 Support Line', info: '1800-123-4567', sub: 'Toll Free · Mon–Sun', color: 'text-royal bg-blue-50' },
                { icon: Mail, title: 'Email Support', info: 'support@bigibank.com', sub: 'Response within 2 hours', color: 'text-emerald-bank bg-green-50' },
                { icon: MapPin, title: 'Head Office', info: 'BigiBank Tower, Financial District', sub: 'Mumbai – 400001', color: 'text-orange-500 bg-orange-50' },
                { icon: MessageCircle, title: 'Live Chat', info: 'Chat with us now', sub: 'Average wait: < 2 min', color: 'text-purple-600 bg-purple-50' },
              ].map(({ icon: Icon, title, info, sub, color }) => (
                <div key={title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card flex items-start gap-4">
                  <div className={`w-11 h-11 ${color.split(' ')[1]} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon size={20} className={color.split(' ')[0]} />
                  </div>
                  <div>
                    <div className="font-semibold text-navy text-sm">{title}</div>
                    <div className="font-bold text-navy">{info}</div>
                    <div className="text-gray-400 text-xs">{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-3xl p-8">
                <h2 className="font-display font-bold text-2xl text-navy mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="input-group">
                      <label className="input-label">Your Name</label>
                      <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="Arjun Mehta" required className="input-field" />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Email Address</label>
                      <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                        placeholder="your@email.com" required className="input-field" />
                    </div>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Subject</label>
                    <input value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
                      placeholder="How can we help?" required className="input-field" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Message</label>
                    <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                      placeholder="Describe your query in detail..." rows={5} required className="input-field resize-none" />
                  </div>
                  <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-full justify-center">
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={18} />Send Message</>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
