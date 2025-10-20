import React from 'react';
import { Home, Store, Percent, Wallet, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const { t } = useLanguage();
  const tabs = [
    { id: 'home', name: t('nav.home'), icon: Home },
    { id: 'stores', name: t('nav.stores'), icon: Store },
    { id: 'wallet', name: t('nav.wallet'), icon: Wallet },
    { id: 'deals', name: t('nav.deals'), icon: Percent },
    { id: 'convert', name: t('nav.convert'), icon: RefreshCw },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-1 ${
                isActive ? 'text-yellow-600' : 'text-gray-400 '
              }`}
            >
              <Icon className="h-6 w-6 mb-1" />
              <span className="text-xs">{tab.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}