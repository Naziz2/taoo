import React, { useState, useEffect } from 'react';
import { ChevronLeft, Phone, Shield, Check, AlertCircle, Loader } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AuthPageProps {
  onAuthSuccess: (userData: any) => void;
  onBack?: () => void;
}

export default function AuthPage({ onAuthSuccess, onBack }: AuthPageProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [isNewUser, setIsNewUser] = useState(false);

  // Timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');

    // Format as +966 XX XXX XXXX
    if (digits.length <= 3) return `+966 ${digits}`;
    if (digits.length <= 5) return `+966 ${digits.slice(3, 5)} ${digits.slice(5)}`;
    if (digits.length <= 8) return `+966 ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
    return `+966 ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 12)}`;
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.replace(/\D/g, '').length < 12) {
      setError('Please enter a valid Saudi phone number');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate checking if user exists
      const userExists = Math.random() > 0.5; // 50% chance user exists
      setIsNewUser(!userExists);
      
      setStep('otp');
      setResendTimer(60);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length !== 4) {
      setError('Please enter the complete 4-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (otpCode === '1234') {
        if (isNewUser) {
          setStep('profile');
        } else {
          // Existing user - complete authentication
          const userData = {
            id: 'user_123',
            phone: phoneNumber,
            firstName: 'Existing',
            lastName: 'User',
            level: 'basic',
            points: 13614,
            accountComplited: 90,
            monthlyLimit: 7500, // SAR
            usedThisMonth: 2440, // SAR
            availableLimit: 1350,
            maxSplitMonths: 6,
            accountAgeDays:360,
            interests: ["fashion", "tech", "gaming", "travel"],
            language: "en",
            referralCode:"SLIM1234",
            isNewUser: false
          };
          onAuthSuccess(userData);
        }
      } else {
        setError(t('auth.invalidCode') || 'Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError(t('auth.verificationFailed') || 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter your first and last name');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate user registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const userData = {
        id: 'user_new_123',
        phone: phoneNumber,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        level: 'basic',
        //points: 10, // Welcome bonus
        points: 13614,
        accountComplited: 90,
        monthlyLimit: 7500, // SAR
        usedThisMonth: 2440, // SAR
        availableLimit: 5060,
        maxSplitMonths: 6,
        accountAgeDays:360,
        interests: ["fashion", "tech", "gaming", "travel"],
        language: "en",
        referralCode:"SLIM1234",
        isNewUser: true
      };
      
      onAuthSuccess(userData);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    
    setIsLoading(true);
    try {
      // Simulate resend OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResendTimer(60);
      setError('');
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderPhoneStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone className="w-10 h-10 text-yellow-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">{t('auth.welcomeToTaoo') || 'Welcome to DO Shopping'}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('auth.enterPhone')}</p>
      </div>

      <form onSubmit={handlePhoneSubmit} className="space-y-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700  dark:text-gray-300 mb-2">
            {t('auth.phoneNumber')}
          </label>
          <input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
            placeholder="+966 XX XXX XXXX"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-lg"
            required
          />
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
          disabled={isLoading || phoneNumber.replace(/\D/g, '').length < 12}
          className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <Phone className="w-5 h-5 mr-2" />
          )}
          {isLoading ? (t('auth.sending') || 'Sending...') : t('auth.sendCode')}
        </button>
      </form>

      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start">
          <Shield className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Your privacy is protected</p>
            <p>We'll send you a 4-digit verification code via SMS. Standard messaging rates may apply.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOtpStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800  dark:text-gray-200 mb-2">{t('auth.verifyNumber')}</h1>
        <p className="text-gray-600  dark:text-gray-400 mb-2">
          {t('auth.codeSentTo')}
        </p>
        <p className="font-semibold text-gray-800  dark:text-gray-200">{phoneNumber}</p>
      </div>

      <form onSubmit={handleOtpSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700  dark:text-gray-300 mb-4 text-center">
            {t('auth.enterCode')}
          </label>
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
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
          disabled={isLoading || otp.join('').length !== 4}
          className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <Check className="w-5 h-5 mr-2" />
          )}
          {isLoading ? (t('auth.verifying') || 'Verifying...') : t('auth.verifyCode')}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendTimer > 0 || isLoading}
            className="text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed font-medium"
          >
            {resendTimer > 0 ? `${t('auth.resendIn') || 'Resend code in'} ${resendTimer}s` : t('auth.resendCode')}
          </button>
        </div>
      </form>

      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600 text-center">
          {t('auth.testCode')}
        </p>
      </div>
    </div>
  );

  const renderProfileStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-10 h-10 text-yellow-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800  dark:text-gray-200 mb-2">{t('auth.completeProfile')}</h1>
        <p className="text-gray-600  dark:text-gray-400">{t('auth.tellUsAboutYou') || 'Tell us a bit about yourself to get started'}</p>
      </div>

      <form onSubmit={handleProfileSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700  dark:text-gray-300 mb-2">
            {t('auth.firstName')}
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={t('auth.enterFirstName') || 'Enter your first name'}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700  dark:text-gray-300 mb-2">
            {t('auth.lastName')}
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder={t('auth.enterLastName') || 'Enter your last name'}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            required
          />
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
          disabled={isLoading || !firstName.trim() || !lastName.trim()}
          className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <Check className="w-5 h-5 mr-2" />
          )}
          {isLoading ? (t('auth.creatingAccount') || 'Creating Account...') : (t('auth.completeRegistration') || 'Complete Registration')}
        </button>
      </form>

      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
        <div className="flex items-start">
          <Check className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-green-700">
            <p className="font-medium mb-1">{t('auth.welcomeBonusTitle') || 'Welcome bonus!'}</p>
            <p>{t('auth.welcomeBonus')}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-4 shadow-sm">
        <div className="flex items-center">
          {onBack && (
            <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          <div className="flex-1 flex justify-center">
            <img src="/taoo_black 1.png" alt="DO Shopping" width={80} height={30} className="object-contain dark:hidden" />
            <img src="/taoo_white.png" alt="DO Shopping" width={80} height={30} className="object-contain hidden dark:block" />
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white dark:bg-gray-800 px-4 pb-4">
        <div className="flex items-center justify-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${step === 'phone' ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
          <div className={`w-8 h-1 ${step !== 'phone' ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
          <div className={`w-3 h-3 rounded-full ${step === 'otp' ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
          {isNewUser && (
            <>
              <div className={`w-8 h-1 ${step === 'profile' ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
              <div className={`w-3 h-3 rounded-full ${step === 'profile' ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {step === 'phone' && renderPhoneStep()}
        {step === 'otp' && renderOtpStep()}
        {step === 'profile' && renderProfileStep()}
      </div>
    </div>
  );
}