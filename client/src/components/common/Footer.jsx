import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube,
  Shield, Award, Lock
} from 'lucide-react';

const FOOTER_LINKS = {
  'Banking Services': [
    { label: 'Savings Account', path: '/accounts' },
    { label: 'Current Account', path: '/accounts' },
    { label: 'Fixed Deposits', path: '/accounts' },
    { label: 'Credit Cards', path: '/cards' },
    { label: 'Debit Cards', path: '/cards' },
  ],
  'Loans': [
    { label: 'Personal Loan', path: '/loans?type=personal' },
    { label: 'Home Loan', path: '/loans?type=home' },
    { label: 'Vehicle Loan', path: '/loans?type=vehicle' },
    { label: 'Education Loan', path: '/loans?type=education' },
    { label: 'Business Loan', path: '/loans?type=business' },
  ],
  'Investments': [
    { label: 'Mutual Funds', path: '/investments' },
    { label: 'Stock Trading', path: '/investments' },
    { label: 'SIP Plans', path: '/investments' },
    { label: 'Gold Investment', path: '/investments' },
    { label: 'Fixed Deposits', path: '/investments' },
  ],
  'Company': [
    { label: 'About Us', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Blog', path: '/blog' },
    { label: 'Press', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
  ],
};

const SOCIALS = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-navy-DEFAULT text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-royal-DEFAULT to-navy-light flex items-center justify-center">
                <span className="text-gold-DEFAULT font-black text-xl">B</span>
              </div>
              <div>
                <div className="font-black text-2xl font-display">
                  Bigi<span className="text-royal-DEFAULT">Bank</span>
                </div>
                <div className="text-xs text-white/50">Digital Banking Partner</div>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              BigiBank is your trusted digital banking partner. We offer secure, innovative, 
              and comprehensive financial services to over 1 million satisfied customers.
            </p>
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Phone size={14} className="text-gold-DEFAULT flex-shrink-0" />
                <span>1800-123-4567 (Toll Free)</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Mail size={14} className="text-gold-DEFAULT flex-shrink-0" />
                <span>support@bigibank.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <MapPin size={14} className="text-gold-DEFAULT flex-shrink-0" />
                <span>BigiBank Tower, Financial District, Mumbai - 400001</span>
              </div>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/8 hover:bg-royal-DEFAULT flex items-center justify-center transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-sm text-white mb-4 uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-white/55 hover:text-gold-DEFAULT transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-white/8">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { icon: Shield, text: 'RBI Regulated' },
              { icon: Lock, text: '256-bit SSL Encryption' },
              { icon: Award, text: 'ISO 27001 Certified' },
              { icon: Shield, text: 'DICGC Insured' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/50 text-xs">
                <Icon size={14} className="text-gold-DEFAULT" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="container mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-xs">
              © 2024 BigiBank. All rights reserved. | Regulated by Reserve Bank of India
            </p>
            <div className="flex items-center gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'].map((item) => (
                <Link key={item} to="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
