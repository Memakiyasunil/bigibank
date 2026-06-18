import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Heart, TrendingUp } from 'lucide-react';

const JOBS = [
  { title: 'Senior React Developer', dept: 'Engineering', location: 'Mumbai / Remote', type: 'Full-time' },
  { title: 'Data Scientist – Fraud Detection', dept: 'AI & Analytics', location: 'Bengaluru', type: 'Full-time' },
  { title: 'Product Manager – Lending', dept: 'Product', location: 'Mumbai', type: 'Full-time' },
  { title: 'UX Designer', dept: 'Design', location: 'Remote', type: 'Full-time' },
  { title: 'Customer Success Manager', dept: 'Support', location: 'Chennai / Mumbai', type: 'Full-time' },
];

export default function Careers() {
  return (
    <div>
      <section className="bg-gradient-navy py-24 pt-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-5xl font-extrabold text-white mb-4">
              Join <span className="gradient-text-light">BigiBank</span>
            </h1>
            <p className="text-white/65 text-lg max-w-xl mx-auto">
              Help us build the future of banking. We're looking for passionate people to join our mission.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="section bg-bg-primary">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Heart, title: 'Great Culture', desc: 'Inclusive, diverse, and collaborative work environment.' },
              { icon: TrendingUp, title: 'Growth Opportunities', desc: 'Rapid career growth with learning and development programs.' },
              { icon: Briefcase, title: 'Great Benefits', desc: 'Health insurance, ESOPs, flexible working, and more.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card text-center">
                <Icon size={32} className="text-royal mx-auto mb-3" />
                <h3 className="font-bold text-navy mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
          <h2 className="section-title mb-6">Open Positions</h2>
          <div className="space-y-4">
            {JOBS.map((job) => (
              <div key={job.title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card flex items-center justify-between hover:shadow-card-lg transition-all">
                <div>
                  <h3 className="font-bold text-navy">{job.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="badge badge-info">{job.dept}</span>
                    <span className="text-gray-400 text-xs">{job.location}</span>
                    <span className="badge badge-success">{job.type}</span>
                  </div>
                </div>
                <button className="btn btn-outline btn-sm">Apply <ArrowRight size={14} /></button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
