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
          {settingsOptions.map((option, index) => (\n            <div key={index} className=\"card p-6\">\n              <div className=\"flex items-center justify-between\">\n                <div className=\"flex items-center space-x-4\">\n                  <div className=\"w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center\">\n                    <option.icon className=\"w-6 h-6 text-neutral-600\" />\n                  </div>\n                  <div>\n                    <h3 className=\"font-display font-semibold text-neutral-900 mb-1\">\n                      {option.title}\n                    </h3>\n                    <p className=\"text-sm text-neutral-600\">{option.description}</p>\n                  </div>\n                </div>\n                <div className=\"flex items-center\">\n                  {option.enabled ? (\n                    <div className=\"w-12 h-6 bg-primary-600 rounded-full relative\">\n                      <div className=\"w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm\"></div>\n                    </div>\n                  ) : (\n                    <div className=\"w-12 h-6 bg-neutral-300 rounded-full relative\">\n                      <div className=\"w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm\"></div>\n                    </div>\n                  )}\n                </div>\n              </div>\n            </div>\n          ))}\n        </div>\n\n        {/* Coming Soon Notice */}\n        <div className=\"card p-6 mt-6 text-center bg-gradient-to-r from-neutral-100 to-neutral-50\">\n          <FiSettings className=\"w-8 h-8 text-neutral-500 mx-auto mb-3\" />\n          <h3 className=\"font-display font-semibold text-neutral-900 mb-2\">\n            More Settings Coming Soon\n          </h3>\n          <p className=\"text-sm text-neutral-600\">\n            We're working on additional settings to give you more control over your account.\n          </p>\n        </div>\n      </div>\n\n      <BottomNav />\n    </div>\n  );\n}