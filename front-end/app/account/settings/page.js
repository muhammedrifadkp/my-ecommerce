'use client';

import Link from 'next/link';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { FiSettings, FiArrowLeft, FiBell, FiEye, FiShield } from 'react-icons/fi';

export default function SettingsPage() {
  const settingsOptions = [
    {
      icon: FiBell,
      title: 'Notifications',
      description: 'Manage your notification preferences',
      enabled: true
    },
    {
      icon: FiEye,
      title: 'Privacy',
      description: 'Control your privacy settings',
      enabled: true
    },
    {
      icon: FiShield,
      title: 'Security',
      description: 'Password and security settings',
      enabled: false
    }
  ];

  return (
    <div className="bg-gradient-to-br from-neutral-50 via-white to-neutral-100 min-h-screen pb-16">
      <Navbar />

      <div className="container-custom py-6">
        <div className="flex items-center mb-6">
          <Link href="/account" className="p-2 hover:bg-white rounded-xl transition-colors mr-3">
            <FiArrowLeft className="w-6 h-6 text-neutral-600" />
          </Link>
          <h1 className="text-2xl font-display font-bold text-neutral-900">Account Settings</h1>
        </div>

        {/* Settings Options */}
        <div className="space-y-4">
          {settingsOptions.map((option, index) => (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center">
                    <option.icon className="w-6 h-6 text-neutral-600" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-neutral-900 mb-1">
                      {option.title}
                    </h3>
                    <p className="text-sm text-neutral-600">{option.description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {option.enabled ? (
                    <div className="w-12 h-6 bg-primary-600 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                    </div>
                  ) : (
                    <div className="w-12 h-6 bg-neutral-300 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="card p-6 mt-6 text-center bg-gradient-to-r from-neutral-100 to-neutral-50">
          <FiSettings className="w-8 h-8 text-neutral-500 mx-auto mb-3" />
          <h3 className="font-display font-semibold text-neutral-900 mb-2">
            More Settings Coming Soon
          </h3>
          <p className="text-sm text-neutral-600">
            We're working on additional settings to give you more control over your account.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}