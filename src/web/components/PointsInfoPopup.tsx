import React from 'react';
import { X, Gift } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PointsInfoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PointsInfoPopup({ isOpen, onClose }: PointsInfoPopupProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="w-6"></div> {/* Spacer for centering */}
          <div className="flex-1 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Gift className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              {t('pointsInfo.estimationText')}
            </p>

            <p>
              {t('pointsInfo.changeNotice')}
            </p>

            <p>
              {t('pointsInfo.notMoney')}
            </p>

            <p>
              {t('pointsInfo.checkRegularly')}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-colors"
          >
            {t('pointsInfo.understood')}
          </button>
        </div>
      </div>
    </div>
  );
}