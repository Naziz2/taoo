import React from 'react';
import { Search, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  points: number;
  onAccountClick?: () => void;
  onPointsClick?: () => void;
}

export default function Header({ points,onAccountClick, onPointsClick }: HeaderProps) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  return (
    <div className="bg-white dark:bg-gray-800 p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onAccountClick}
          className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center border-4 border-yellow-400">
            <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        <img src="/taoo_black 1.png" alt="DO Shopping" width={80} height={30} className="object-contain dark:hidden" />
        <img src="/taoo_white.png" alt="DO Shopping" width={80} height={30} className="object-contain hidden dark:block" />
        <button 
          onClick={onPointsClick}
          className="flex items-center bg-yellow-100 dark:bg-yellow-900 px-3 py-1 rounded-full hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors cursor-pointer"
        >
          <span className="font-semibold text-gray-800 dark:text-gray-200">{points.toLocaleString()}</span>
          <span className="ml-1 text-yellow-600">
            <img src="/Image+Background.png" alt="🪙" width={16} height={16} />
          </span>
        </button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder={t('header.search')}
          className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
    </div>
  );
}