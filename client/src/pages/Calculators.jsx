import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw } from 'lucide-react';

function EMICalc() {
  const [p, setP] = useState(500000);
  const [r, setR] = useState(12.5);
  const [n, setN] = useState(36);

  const rate = r / 12 / 100;
  const emi = rate === 0 ? p / n : (p * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
  const total = emi * n;
  const interest = total - p;

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card">
      <h3 className="font-display font-bold text-xl text-navy mb-6">EMI Calculator</h3>
      <div className="space-y-5">
        {[
          { label: 'Loan Amount (₹)', value: p, set: setP, min: 10000, max: 10000000, step: 10000, format: (v) => `₹${parseInt(v).toLocaleString()}` },
          { label: 'Interest Rate (% p.a.)', value: r, set: setR, min: 4, max: 24, step: 0.5, format: (v) => `${parseFloat(v).toFixed(1)}%` },
          { label: 'Loan Tenure (Months)', value: n, set: setN, min: 3, max: 360, step: 1, format: (v) => `${v} months` },
        ].map(({ label, value, set, min, max, step, format }) => (
          <div key={label}>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-navy">{label}</label>
              <span className="text-sm font-bold text-royal">{format(value)}</span>
            </div>
            <input type="range" min={min} max={max} step={step} value={value}
              onChange={(e) => set(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-royal"
            />
          </div>
        ))}
      </div>
      <div className="mt-8 p-5 bg-gradient-navy rounded-2xl text-white grid grid-cols-3 gap-4 text-center">
        <div><div className="text-white/60 text-xs mb-1">Monthly EMI</div><div className="font-black text-xl">₹{Math.round(emi).toLocaleString()}</div></div>
        <div><div className="text-white/60 text-xs mb-1">Total Interest</div><div className="font-black text-xl text-gold">₹{Math.round(interest).toLocaleString()}</div></div>
        <div><div className="text-white/60 text-xs mb-1">Total Payment</div><div className="font-black text-xl">₹{Math.round(total).toLocaleString()}</div></div>
      </div>
    </div>
  );
}

function SIPCalc() {
  const [sip, setSip] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const n = years * 12;
  const r = rate / 12 / 100;
  const maturity = sip * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const invested = sip * n;
  const returns = maturity - invested;

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card">
      <h3 className="font-display font-bold text-xl text-navy mb-6">SIP Calculator</h3>
      <div className="space-y-5">
        {[
          { label: 'Monthly SIP (₹)', value: sip, set: setSip, min: 500, max: 200000, step: 500, format: (v) => `₹${parseInt(v).toLocaleString()}` },
          { label: 'Expected Returns (% p.a.)', value: rate, set: setRate, min: 4, max: 30, step: 0.5, format: (v) => `${parseFloat(v).toFixed(1)}%` },
          { label: 'Investment Period (Years)', value: years, set: setYears, min: 1, max: 40, step: 1, format: (v) => `${v} years` },
        ].map(({ label, value, set, min, max, step, format }) => (
          <div key={label}>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold text-navy">{label}</label>
              <span className="text-sm font-bold text-royal">{format(value)}</span>
            </div>
            <input type="range" min={min} max={max} step={step} value={value}
              onChange={(e) => set(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        ))}
      </div>
      <div className="mt-8 p-5 bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-2xl text-white grid grid-cols-3 gap-4 text-center">
        <div><div className="text-white/60 text-xs mb-1">Invested</div><div className="font-black text-xl">₹{Math.round(invested / 100000).toFixed(1)}L</div></div>
        <div><div className="text-white/60 text-xs mb-1">Returns</div><div className="font-black text-xl text-yellow-300">₹{Math.round(returns / 100000).toFixed(1)}L</div></div>
        <div><div className="text-white/60 text-xs mb-1">Maturity</div><div className="font-black text-xl">₹{Math.round(maturity / 100000).toFixed(1)}L</div></div>
      </div>
    </div>
  );
}

export default function Calculators() {
  return (
    <div className="pt-20 pb-16 bg-bg-primary min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center py-12">
          <h1 className="font-display text-4xl font-bold text-navy mb-3">Financial Calculators</h1>
          <p className="text-gray-500">Plan your finances smarter with our interactive calculators</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <EMICalc />
          <SIPCalc />
        </div>
      </div>
    </div>
  );
}
