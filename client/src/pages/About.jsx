import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Target, Users, Shield } from 'lucide-react';

const TEAM = [
  { name: 'Vikram Sharma', role: 'CEO & Co-Founder', avatar: 'VS', desc: 'Ex-RBI Director with 25 years of banking experience.' },
  { name: 'Priya Nair', role: 'CTO', avatar: 'PN', desc: 'Former Google engineer building the future of fintech.' },
  { name: 'Rajesh Patel', role: 'CFO', avatar: 'RP', desc: 'IIM Ahmedabad alumnus with expertise in financial strategy.' },
  { name: 'Ananya Singh', role: 'Head of Security', avatar: 'AS', desc: 'Cybersecurity expert with 15 years in financial institutions.' },
];

export default function About() {
  return (
    <div>
      <section className="bg-gradient-navy py-24 pt-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-5xl font-extrabold text-white mb-4">
              About <span className="gradient-text-light">BigiBank</span>
            </h1>
            <p className="text-white/65 text-lg max-w-2xl mx-auto">
              Founded in 2018, BigiBank is India's fastest-growing digital bank, 
              committed to making world-class financial services accessible to every Indian.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="section bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Our Mission', desc: 'To democratise banking by making premium financial services accessible to every Indian, regardless of location or income level.', color: 'bg-blue-100 text-royal' },
              { icon: Award, title: 'Our Vision', desc: 'To become India\'s most trusted digital bank by 2030, serving 100 million customers with innovative, secure, and transparent financial services.', color: 'bg-amber-100 text-gold-dark' },
              { icon: Shield, title: 'Our Values', desc: 'Trust, transparency, innovation, and customer-first thinking are the core values that drive every decision we make at BigiBank.', color: 'bg-green-100 text-emerald-bank' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="text-center p-8 rounded-2xl bg-gray-50 border border-gray-100">
                <div className={`w-14 h-14 ${color.split(' ')[0]} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon size={24} className={color.split(' ')[1]} />
                </div>
                <h3 className="font-display font-bold text-xl text-navy mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section bg-gradient-navy">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '2018', label: 'Founded' },
              { value: '1M+', label: 'Customers' },
              { value: '₹10B+', label: 'Transactions' },
              { value: '12', label: 'Awards Won' },
            ].map(({ value, label }) => (
              <div key={label} className="stat-card">
                <div className="stat-number">{value}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section bg-bg-primary">
        <div className="container mx-auto px-6">
          <h2 className="section-title text-center mb-12">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card text-center">
                <div className="w-16 h-16 bg-gradient-royal rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-royal">
                  {member.avatar}
                </div>
                <h3 className="font-bold text-navy">{member.name}</h3>
                <p className="text-royal text-sm font-medium mb-2">{member.role}</p>
                <p className="text-gray-500 text-xs">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
