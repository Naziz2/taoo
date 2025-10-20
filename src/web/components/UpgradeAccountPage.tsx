import React, { useState } from 'react';
import { ChevronLeft, Crown, Star, Gift, CreditCard, Smartphone, Check, Zap, TrendingUp, Shield, AlertCircle, Loader } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface UpgradeAccountPageProps {
  onBack: () => void;
  currentUser?: any;
  onUpgradeSuccess?: (newLevel: string) => void;
}

interface LevelBenefit {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  highlight?: boolean;
}

interface AccountLevel {
  name: string;
  displayName: string;
  color: string;
  bgGradient: string;
  price: string;
  originalPrice?: string;
  popular?: boolean;
  benefits: LevelBenefit[];
  pointsPerSAR: number;
  referralPoints: number;
  dailyCheckinPoints: number;
  maxInstallments: number;
  mobileSubscription?: string;
}

export default function UpgradeAccountPage({ onBack,currentUser, onUpgradeSuccess }: UpgradeAccountPageProps) {
  const { t } = useLanguage();
  const [selectedLevel, setSelectedLevel] = useState<'silver' | 'gold'>('silver');
  const [billingCycle, setBillingCycle] = useState<'daily' | 'weekly'>('daily');
  const [showOtpConfirmation, setShowOtpConfirmation] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [resendTimer, setResendTimer] = useState(0);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`upgrade-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`upgrade-otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleResendOtp = () => {
    setResendTimer(60);
    setError('');
    // Simulate OTP resend
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleUpgradeConfirmation = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length !== 4) {
      setError('Please enter the complete 4-digit verification code');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (otpCode === '1234') {
        // Success - upgrade account
        onUpgradeSuccess?.(selectedLevel);
        onBack();
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  const levels: AccountLevel[] = [
    {
      name: 'basic',
      displayName: 'Basic',
      color: 'text-orange-400',
      bgGradient: 'from-orange-300 to-orange-400',
      price: t('upgrade.free'),
      originalPrice:  undefined,
      popular: true,
      pointsPerSAR: 10,
      referralPoints: 10,
      dailyCheckinPoints: 1,
      maxInstallments: 0,
      mobileSubscription: t('upgrade.free'),
      benefits: [
        {
          icon: Star,
          title: t('upgrade.cashbackStandard'),
          description: `10 ${t('common.points')}/SAR ${t('upgrade.cashbackStandard')} • ${t('upgrade.limitedOffers')}`,
          highlight: true
        },
        {
          icon: CreditCard,
          title: t('upgrade.onlinePayment'),
          description: t('upgrade.onlinePaymentDesc'),
          highlight: true
        },
        {
          icon: Smartphone,
          title: t('upgrade.mobileSubscription'),
          description: t('upgrade.free'),
          highlight: true
        },
        {
          icon: Zap,
          title: t('upgrade.dailyCheckin'),
          description: `1 ${t('upgrade.pointsPerDay')}`
        }
        ]
    },
    {
      name: 'silver',
      displayName: 'Silver',
      color: 'text-gray-400',
      bgGradient: 'from-gray-300 to-gray-400',
      price: billingCycle === 'daily' ? '1.90' : '10.90',
      originalPrice: billingCycle === 'monthly' ? '39.50' : undefined,
      popular: true,
      pointsPerSAR: 12,
      referralPoints: 20,
      dailyCheckinPoints: 5,
      maxInstallments: 6,
      mobileSubscription: '1.90 SAR/jour, 10.90 SAR/semaine, 39.50 SAR/mois',
      benefits: [
        {
          icon: Star,
          title: t('upgrade.cashbackExtra'),
          description: `12 ${t('common.points')} SAR ${t('upgrade.cashbackStandard')} (20% ${t('upgrade.morePercentThanBasic')})`,
          highlight: true
        },
        {
          icon: CreditCard,
          title: t('upgrade.splitPayment'),
          description: t('upgrade.splitPaymentDesc'),
          highlight: true
        },
        {
          icon: Smartphone,
          title: t('upgrade.mobileSubscription'),
          description: `1.90 SAR/${t('upgrade.perDay')}, 10.90 SAR/${t('upgrade.perWeek')}, 39.50 SAR/${t('upgrade.monthly')}`,
          highlight: true
        },
        {
          icon: Gift,
          title: t('upgrade.premiumOffers'),
          description: t('upgrade.premiumOffersAccess'),
          highlight: true
        },
        {
          icon: Zap,
          title: t('upgrade.dailyCheckin'),
          description: `5 ${t('upgrade.pointsPerDay')}`
        },
        {
          icon: TrendingUp,
          title: t('upgrade.extendedMonthlyLimit'),
          description: t('upgrade.extendedLimitDesc')
        }
      ]
    },
    {
      name: 'gold',
      displayName: 'Gold',
      color: 'text-yellow-400',
      bgGradient: 'from-yellow-400 to-yellow-500',
      price: billingCycle === 'daily' ? '3.40' : '19.50',
      originalPrice: billingCycle === 'monthly' ? '74.50' : undefined,
      pointsPerSAR: 15,
      referralPoints: 40,
      dailyCheckinPoints: 7,
      maxInstallments: 6,
      mobileSubscription: '3.40 SAR/jour, 19.50 SAR/semaine, 74.50 SAR/mois',
      benefits: [
        {
          icon: Star,
          title: t('upgrade.maxPoints'),
          description: `15 ${t('common.points')} SAR ${t('upgrade.cashbackStandard')} (50% ${t('upgrade.morePercentThanBasic')})`,
          highlight: true
        },
        {
          icon: Gift,
          title: t('upgrade.doubledReferral'),
          description: `40 ${t('upgrade.referralPointsDesc')}`,
          highlight: true
        },
        {
          icon: Crown,
          title: t('upgrade.vipAccess'),
          description: t('upgrade.vipAccessDesc'),
          highlight: true
        },
        {
          icon: Smartphone,
          title: t('upgrade.premiumMobile'),
          description: `3.40 SAR/${t('upgrade.perDay')}, 19.50 SAR/${t('upgrade.perWeek')}, 74.50 SAR/${t('upgrade.monthly')}`,
          highlight: true
        },
        {
          icon: Zap,
          title: t('upgrade.dailyCheckin'),
          description: `7 ${t('upgrade.pointsPerDay')}`
        },
        {
          icon: CreditCard,
          title: t('upgrade.extendedSplitPayment'),
          description: t('upgrade.extendedSplitDesc')
        }
      ]
    }
  ];

  const currentLevel = levels.find(level => level.name === selectedLevel);
  const currentUserLevel = levels.find(level => level.name === currentUser?.level);
  
  const handleUpgrade = () => {
    setShowOtpConfirmation(true);
    setResendTimer(60);
    setError('');
    setOtp(['', '', '', '']);
  };

  if (showOtpConfirmation) {
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <button onClick={() => setShowOtpConfirmation(false)} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold">{t('upgrade.confirmUpgrade')}</h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Upgrade Summary */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-center mb-4">
              <div className={`w-20 h-20 bg-gradient-to-r ${currentLevel?.bgGradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Crown className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {t('upgrade.upgradingTo')} {currentLevel?.displayName}
              </h2>
              <p className="text-gray-600">
                {currentLevel?.price} SAR/{billingCycle === 'daily' ? t('upgrade.perDay') : t('upgrade.perWeek')}
              </p>
            </div>
          </div>

          {/* OTP Verification */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{t('upgrade.verifyIdentity')}</h3>
              <p className="text-gray-600 text-sm">
                {t('upgrade.codeSentToMobile')}
              </p>
            </div>

            <form onSubmit={handleUpgradeConfirmation} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                  {t('upgrade.enter4Digit')}
                </label>
                <div className="flex justify-center space-x-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`upgrade-otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      disabled={isProcessing}
                    />
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing || otp.join('').length !== 4}
                className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin mr-2" />
                    {t('upgrade.processingUpgrade')}
                  </>
                ) : (
                  <>
                    <Crown className="w-5 h-5 mr-2" />
                    {t('upgrade.confirmUpgradeButton')}
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendTimer > 0 || isProcessing}
                  className="text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed font-medium text-sm"
                >
                  {resendTimer > 0 ? `${t('auth.resendIn')} ${resendTimer}s` : t('auth.resendCode')}
                </button>
              </div>
            </form>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-1">{t('upgrade.secureUpgrade')}</p>
                <p>{t('upgrade.verifyForSecurity')}</p>
                <p className="mt-2"><strong>{t('upgrade.testCodeNote')}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">{t('upgrade.chooseYourPlan')}</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Current Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{t('upgrade.currentLevel')}</h3>
              <div className="flex items-center mt-2">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                  <Crown className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="font-semibold text-amber-600">{t(currentUserLevel.name)}</div>
                  <div className="text-sm text-gray-500">{t(currentUserLevel.benefits[0].description)}</div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800">{currentUser?.points}</div>
              <div className="text-sm text-gray-500">{t('upgrade.currentPoints')}</div>
            </div>
          </div>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('upgrade.choosePeriod')}</h3>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('daily')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                billingCycle === 'daily'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              {t('upgrade.daily')}
            </button>
            <button
              onClick={() => setBillingCycle('weekly')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors relative ${
                billingCycle === 'weekly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              {t('upgrade.weekly')}
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                -17%
              </span>
            </button>
          </div>
        </div>

        {/* Level Selection */}
        <div className="space-y-4">
          {levels.map((level) => (
            <div
              key={level.name}
              className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all ${level.name === 'basic' || currentUserLevel.name ==='gold' || (currentUserLevel.name === 'silver' && level.name === 'silver') ? 'hidden' : ''} ${
                selectedLevel === level.name
                  ? 'border-yellow-400 ring-2 ring-yellow-100'
                  : 'border-gray-200'
              } ${level.popular ? 'relative' : ''}`}
            >
              {level.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                    {t('upgrade.mostPopular')}
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedLevel(level.name as 'silver' | 'gold')}
                className="w-full text-left"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 bg-gradient-to-r ${level.bgGradient} rounded-full flex items-center justify-center mr-4`}>
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{level.displayName}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{level.pointsPerSAR} pts/SAR</span>
                        <span>•</span>
                        <span>{level.maxInstallments} mois max</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">
                      {level.price} SAR
                    </div>
                    <div className="text-sm text-gray-500">
                      /{billingCycle === 'daily' ? t('upgrade.perDay') : t('upgrade.perWeek')}
                    </div>
                    {level.originalPrice && (
                      <div className="text-sm text-gray-400 line-through">
                        {level.originalPrice} SAR
                      </div>
                    )}
                  </div>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 gap-3">
                  {level.benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div
                        key={index}
                        className={`flex items-start p-3 rounded-lg ${
                          benefit.highlight ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                          benefit.highlight ? 'bg-yellow-100' : 'bg-gray-200'
                        }`}>
                          <Icon className={`w-4 h-4 ${
                            benefit.highlight ? 'text-yellow-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{benefit.title}</h4>
                          <p className="text-sm text-gray-600">{benefit.description}</p>
                        </div>
                        {benefit.highlight && (
                          <Check className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('upgrade.levelComparison')}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-gray-600">{t('upgrade.feature')}</th>
                  <th className="text-center py-3 text-amber-600">Basic</th>
                  <th className="text-center py-3 text-gray-400">Silver</th>
                  <th className="text-center py-3 text-yellow-500">Gold</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-800">{t('upgrade.cashbackPointsSAR')}</td>
                  <td className="text-center py-3">{levels[0].pointsPerSAR} pts</td>
                  <td className="text-center py-3 font-semibold">{levels[1].pointsPerSAR} pts</td>
                  <td className="text-center py-3 font-semibold">{levels[2].pointsPerSAR} pts</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-800">{t('upgrade.referral')}</td>
                  <td className="text-center py-3">{levels[0].referralPoints} pts</td>
                  <td className="text-center py-3">{levels[1].referralPoints} pts</td>
                  <td className="text-center py-3 font-semibold">{levels[2].referralPoints} pts</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-800">{t('upgrade.dailyCheckin')}</td>
                  <td className="text-center py-3">{levels[0].dailyCheckinPoints} pts</td>
                  <td className="text-center py-3">{levels[1].dailyCheckinPoints} pts</td>
                  <td className="text-center py-3 font-semibold">{levels[2].dailyCheckinPoints} pts</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-800">{t('upgrade.installmentPayment')}</td>
                  <td className="text-center py-3">❌</td>
                  <td className="text-center py-3">✅</td>
                  <td className="text-center py-3">✅</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-gray-800">{t('upgrade.premiumOffers')}</td>
                  <td className="text-center py-3">❌</td>
                  <td className="text-center py-3">✅</td>
                  <td className="text-center py-3">✅</td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-800">{t('upgrade.exclusiveVIPAccess')}</td>
                  <td className="text-center py-3">❌</td>
                  <td className="text-center py-3">❌</td>
                  <td className="text-center py-3 font-semibold">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <Check className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-green-800">{t('upgrade.guaranteeTitle')}</h3>
          </div>
          <p className="text-sm text-green-700">
            {t('upgrade.tryFree')} {currentLevel?.price} SAR/{billingCycle === 'daily' ? t('upgrade.perDay') : t('upgrade.perWeek')}. {t('upgrade.ifNotSatisfied')} {t('upgrade.unsubscribeAt')} https://mesabonnements.com.
          </p>
        </div>

        {/* Bottom spacing for fixed button */}
        <div className="h-20"></div>
      </div>

      {/* Fixed Upgrade Button */}
      <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto ${currentLevel.name === 'gold'? 'hidden' : ''}">
        <button
          onClick={handleUpgrade}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold py-4 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <div className="text-lg">{t('upgrade.upgradeNow')} {currentLevel?.displayName}</div>
              <div className="text-sm opacity-80">
                {currentLevel?.price} SAR/{billingCycle === 'daily' ? t('upgrade.perDay') : t('upgrade.perWeek')}
              </div>
            </div>
            <Crown className="w-8 h-8" />
          </div>
        </button>
      </div>
    </div>
  );
}