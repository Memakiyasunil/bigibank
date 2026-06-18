import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { User, Bell, Lock, Shield, Eye, Smartphone, Save } from 'lucide-react';

export default function Settings() {
  const { user } = useSelector(state => state.auth);
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile Details', icon: User },
    { id: 'security', label: 'Security & Login', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 space-y-6 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-navy">Account Settings</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your preferences and security</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 bg-gray-50/50 border-r border-gray-100 p-6 flex flex-col gap-2 shrink-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-semibold ${
                activeTab === tab.id 
                  ? 'bg-white shadow-sm border border-gray-200 text-royal' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-navy'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-10">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-2xl">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-royal to-navy flex items-center justify-center text-white font-display text-3xl font-bold shadow-lg border-4 border-white">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy mb-1">{user?.name}</h3>
                  <p className="text-gray-500 text-sm">{user?.role === 'admin' ? 'Administrator' : 'Premium Member'}</p>
                  <button className="text-sm font-semibold text-royal mt-2 hover:underline">Change Avatar</button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="input-group">
                  <label className="input-label">Full Name</label>
                  <input type="text" className="input-field bg-gray-50" defaultValue={user?.name} readOnly />
                </div>
                <div className="input-group">
                  <label className="input-label">Email Address</label>
                  <input type="email" className="input-field bg-gray-50" defaultValue={user?.email} readOnly />
                </div>
                <div className="input-group">
                  <label className="input-label">Phone Number</label>
                  <input type="tel" className="input-field" defaultValue="+91 98765 43210" />
                </div>
                <div className="input-group">
                  <label className="input-label">Date of Birth</label>
                  <input type="date" className="input-field" defaultValue="1990-01-01" />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 flex justify-end">
                <button className="btn btn-primary"><Save size={18}/> Save Changes</button>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-2xl">
              <div>
                <h3 className="font-bold text-navy mb-2 flex items-center gap-2"><Lock size={18}/> Change Password</h3>
                <p className="text-sm text-gray-500 mb-6">Ensure your account is using a long, random password to stay secure.</p>
                <div className="space-y-4">
                  <div className="input-group">
                    <label className="input-label">Current Password</label>
                    <input type="password" className="input-field" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="input-group">
                      <label className="input-label">New Password</label>
                      <input type="password" className="input-field" />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Confirm New Password</label>
                      <input type="password" className="input-field" />
                    </div>
                  </div>
                  <button className="btn btn-primary mt-2">Update Password</button>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-navy mb-1 flex items-center gap-2"><Smartphone size={18}/> Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500 max-w-md">Add an extra layer of security to your account by requiring a code from your mobile device when logging in.</p>
                  </div>
                  <button className="btn btn-outline btn-sm">Enable 2FA</button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-2xl">
              {[
                { title: 'Login Alerts', desc: 'Get notified when someone logs into your account from a new device.', active: true },
                { title: 'Transaction Alerts', desc: 'Receive SMS and Email for all debits and credits.', active: true },
                { title: 'Marketing Emails', desc: 'Receive updates about new products, features, and offers.', active: false },
              ].map((item, i) => (
                <div key={i} className="flex items-start justify-between p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                  <div>
                    <h4 className="font-bold text-navy mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <button className={`w-12 h-6 rounded-full relative transition-colors ${item.active ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${item.active ? 'left-7' : 'left-1'}`}></span>
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
