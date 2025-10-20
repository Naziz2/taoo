import React, { useState } from 'react';
import { ChevronLeft, Plus, Minus, CreditCard, History, Gift, User, TrendingUp, Scan, Receipt } from 'lucide-react';
import PointsInfoPopup from './PointsInfoPopup';
import { useLanguage } from '../contexts/LanguageContext';

interface WalletPageProps {
  onBack: () => void;
  currentUser?: any;
  onAccountClick?: () => void;
  onShowUpgradeAccount?: () => void;
  onShowTransactions: () => void;
  onShowCheckout: () => void;
  onShowVouchers: () => void;
  onShowQRScanner: () => void;
  onShowFlouciPay: () => void;
  onShowReceiptUpload: () => void;
  onShowPluxeePage: () => void;
}

const WalletPage = ({ onBack, currentUser,onAccountClick,onShowUpgradeAccount, onShowTransactions, onShowCheckout, onShowVouchers, onShowQRScanner, onShowFlouciPay, onShowPluxeePage, onShowReceiptUpload }: WalletPageProps) => {
  const { t } = useLanguage();
  const [currentPoints, setCurrentPoints] = useState(13614);
  const [showPointsInfo, setShowPointsInfo] = useState(false);
  const [monthlyLimit] = useState(7500); // SAR
  const [usedThisMonth] = useState(2440); // SAR
  const [maxSplitMonths] = useState(6);

  const availableLimit = monthlyLimit - usedThisMonth;
  const limitPercentage = (currentUser.usedThisMonth / currentUser.monthlyLimit) * 100;

  const quickActions = [
    { icon: Scan, label: t('wallet.scanOrder'), action: onShowQRScanner },
    { icon: Receipt, label: t('wallet.uploadReceipt'), action: onShowReceiptUpload },
    { icon: Gift, label: t('wallet.redeem'), action: onShowVouchers },
    { icon: CreditCard, label: t('wallet.flouciPay'), action: onShowFlouciPay },
  ];
  const formatCurrency = (amount, currencyCode, locale = 'fr-FR') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  };
  const recentActivity = [
    { type: 'earned', merchant: 'H&M', points: 25, date: '2024-01-15' },
    { type: 'redeemed', merchant: 'Gift Card', points: -500, date: '2024-01-12' },
    { type: 'earned', merchant: 'TunisiaNet', points: 80, date: '2024-01-10' },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
        <button
          onClick={onAccountClick}
          className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center border-4 border-yellow-400">
            <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        <img src="/taoo_black 1.png" alt="TAOO" width={80} height={30} className="object-contain dark:hidden" />
        <img src="/taoo_white.png" alt="TAOO" width={80} height={30} className="object-contain hidden dark:block" />
        <button 
          onClick={onShowUpgradeAccount}
          className="flex items-center bg-yellow-100 dark:bg-yellow-900 px-3 py-1 rounded-full hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors cursor-pointer"
        >
          <span className="font-semibold text-gray-800 dark:text-gray-200">{currentUser.points.toLocaleString()}</span>
          <span className="ml-1 text-yellow-600">
            <img src="/Image+Background.png" alt="🪙" width={16} height={16} />
          </span>
        </button>
      </div>
        
        <div className="relative">
          
          <h1 className="text-xl font-semibold dark:text-gray-200">{t('wallet.title')}</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Points Balance */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 text-gray-900">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold dark:text-gray-900">{t('wallet.availablePoints')}</h2>
              <div className="text-3xl font-bold">{currentUser.points.toLocaleString()}</div>
              <div className="text-sm opacity-80">
                {t('wallet.estimated')} {formatCurrency(currentUser.points/100,'SAR')}
                <button
                  onClick={() => setShowPointsInfo(true)}
                  className="text-black dark:text-gray-900 underline ml-1"
                >
                  {t('wallet.readMore')} &raquo;
                </button>
              </div>
            </div>
            <div className="text-4xl"><img src="/Image+Background.png" alt="🪙" width={54} height={54} /></div>
          </div>
          <div className="text-sm opacity-80">
            {t('wallet.earnPointsDesc')}
          </div>
        </div>

        {/* Monthly Spending Limit - Only for Silver/Gold users */}
        
            {currentUser?.level !== 'basic' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t('wallet.monthlyLimit')}</h3>
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{t('wallet.usedThisMonth')}</span>
                <span>{currentUser.usedThisMonth} / {currentUser.monthlyLimit} SAR</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${limitPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-xl font-bold text-green-600">{currentUser.availableLimit}</div>
                <div className="text-sm text-green-600">{t('wallet.available')}</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-xl font-bold text-blue-600">{currentUser.maxSplitMonths}</div>
                <div className="text-sm text-blue-600">{t('wallet.maxSplit')}</div>
              </div>
            </div>
          </div>
          )}
          {currentUser?.level === 'basic' && (<div className="mb-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{t('wallet.monthlyLimit')}</h3>
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Split payment is not available for your current level</span>
              </div>
            </div>
          </div>
          )}

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="flex flex-col items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mb-2">
                    <Icon className="w-6 h-6 text-yellow-600" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 text-center">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pluxee Partner Section 
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <button
            onClick={onShowPluxeePage}
            className="w-full bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 rounded-xl p-3 transition-all transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src="/pluxee-logo.png" 
                  alt="Pluxee" 
                  className="h-12 w-auto mr-4"
                />
                <div className="text-left text-white">
                  <h4 className="font-bold text-lg">Gagnez des points</h4>
                  <p className="text-sm opacity-90">grâce aux transactions par carte Pluxee</p>
                </div>
              </div>
              <div className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
          </button>
        </div>
*/}
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Recent Activity</h3>
            <button 
              onClick={onShowTransactions}
              className="text-blue-500 text-sm font-medium"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    activity.type === 'earned' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {activity.type === 'earned' ? (
                      <Plus className="w-5 h-5 text-green-600" />
                    ) : (
                      <Minus className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-200">{activity.merchant}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</div>
                  </div>
                </div>
                <div className={`font-bold ${
                  activity.type === 'earned' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {activity.points > 0 ? '+' : ''}{activity.points}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Points Earning Info */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">How to Earn More Points</h3>
          <div className="space-y-2 text-sm text-blue-700">
            <div className="flex justify-between">
              <span>• Shop at partner stores</span>
              <span className="font-medium">10 pts/SAR</span>
            </div>
            <div className="flex justify-between">
              <span>• Refer friends</span>
              <span className="font-medium">50 points</span>
            </div>
            <div className="flex justify-between">
              <span>• Daily check-in</span>
              <span className="font-medium">15 points</span>
            </div>
            <div className="flex justify-between">
              <span>• Mobile subscription</span>
              <span className="font-medium">10.50 SAR/month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Points Info Popup */}
      <PointsInfoPopup
        isOpen={showPointsInfo}
        onClose={() => setShowPointsInfo(false)}
      />
    </div>
  );
};

export default WalletPage;