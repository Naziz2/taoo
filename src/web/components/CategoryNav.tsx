import React from 'react';
import { Shirt, Palette, Home, Smartphone, Car, Utensils, Gamepad2, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function CategoryNav() {
  const { t } = useLanguage();

  const categories = [
    { name: 'category.apparel', icon: Shirt },
    { name: 'category.beauty', icon: Palette },
    { name: 'category.homeKitchen', icon: Home },
    { name: 'category.tech', icon: Smartphone },
    { name: 'category.travel', icon: Car },
    { name: 'category.food', icon: Utensils },
    { name: 'category.gaming', icon: Gamepad2 },
    { name: 'category.health', icon: Heart },
  ];

  return (
    <div className="px-4 py-3 bg-white dark:bg-gray-800">
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.name}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap flex-shrink-0"
          >
            <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">{t(category.name)}</span>
          </button>
        );
      })}
      </div>
    </div>
  );
}