import React from 'react';
import { ChevronLeft, Globe, Check } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';

interface LanguageSelectorProps {
  onBack: () => void;
}

export default function LanguageSelector({ onBack }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  ];

  const handleLanguageSelect = (langCode: Language) => {
    setLanguage(langCode);
    // Auto-save and go back after selection
    setTimeout(() => {
      onBack();
    }, 300);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">{t('language.title')}</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Language Options */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {languages.map((lang, index) => (
            <div key={lang.code}>
              <button
                onClick={() => handleLanguageSelect(lang.code)}
                className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-gray-800 font-semibold">{lang.nativeName}</h3>
                  <p className="text-gray-500 text-sm">{lang.name}</p>
                </div>
                {language === lang.code && (
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-gray-900" />
                  </div>
                )}
              </button>
              {index < languages.length - 1 && (
                <div className="border-t border-gray-100" />
              )}
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="bg-blue-50 rounded-xl p-4 mt-6 border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">Language Settings</h3>
          <p className="text-sm text-blue-700">
            Your language preference will be applied throughout the app. You can change it anytime from your account settings.
          </p>
        </div>
      </div>
    </div>
  );
}