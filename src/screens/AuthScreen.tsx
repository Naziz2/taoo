import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface AuthScreenProps {
  onAuthSuccess?: (user: any) => void;
}

type AuthStep = 'phone' | 'otp' | 'profile';

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [step, setStep] = useState<AuthStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [isNewUser, setIsNewUser] = useState(false);

  const otpInputs = useRef<Array<TextInput | null>>([]);

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
    
    // Limit to 12 digits (966 + 9 digits)
    const limitedDigits = digits.slice(0, 12);

    // Format as +966 XX XXX XXXX
    if (limitedDigits.length <= 3) return `+966 ${limitedDigits.slice(3)}`;
    if (limitedDigits.length <= 5) return `+966 ${limitedDigits.slice(3, 5)} ${limitedDigits.slice(5)}`;
    if (limitedDigits.length <= 8) return `+966 ${limitedDigits.slice(3, 5)} ${limitedDigits.slice(5, 8)} ${limitedDigits.slice(8)}`;
    return `+966 ${limitedDigits.slice(3, 5)} ${limitedDigits.slice(5, 8)} ${limitedDigits.slice(8, 12)}`;
  };

  const handlePhoneSubmit = async () => {
    const digits = phoneNumber.replace(/\D/g, '');
    if (digits.length < 12) {
      setError('Please enter a valid Saudi phone number');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate checking if user exists (50% chance)
      const userExists = Math.random() > 0.5;
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
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = async () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 4) {
      setError('Please enter the complete 4-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
            monthlyLimit: 7500,
            usedThisMonth: 2440,
            availableLimit: 1350,
            maxSplitMonths: 6,
            accountAgeDays: 360,
            interests: ['fashion', 'tech', 'gaming', 'travel'],
            referralCode: 'SLIM1234',
            isNewUser: false
          };
          onAuthSuccess?.(userData);
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

  const handleProfileSubmit = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter your first and last name');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate user registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = {
        id: 'user_new_123',
        phone: phoneNumber,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        level: 'basic',
        points: 13614,
        accountComplited: 90,
        monthlyLimit: 7500,
        usedThisMonth: 2440,
        availableLimit: 5060,
        maxSplitMonths: 6,
        accountAgeDays: 360,
        interests: ['fashion', 'tech', 'gaming', 'travel'],
        referralCode: 'SLIM1234',
        isNewUser: true
      };
      
      onAuthSuccess?.(userData);
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResendTimer(60);
      setError('');
      Alert.alert('Success', 'Verification code sent!');
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderPhoneStep = () => (
    <View style={styles.stepContainer}>
      {/* Icon */}
      <View style={[styles.iconCircle, { backgroundColor: '#FEF3C7' }]}>
        <MaterialCommunityIcons name="phone" size={40} color="#D97706" />
      </View>

      {/* Title */}
      <Text style={[styles.stepTitle, isDark && styles.textDark]}>
        {t('auth.welcomeToTaoo') || 'Welcome to DO Shopping'}
      </Text>
      <Text style={[styles.stepSubtitle, isDark && styles.textGrayDark]}>
        {t('auth.enterPhone')}
      </Text>

      {/* Phone Input */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, isDark && styles.textGrayDark]}>
          {t('auth.phoneNumber')}
        </Text>
        <TextInput
          style={[styles.input, isDark && styles.inputDark]}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
          placeholder="+966 XX XXX XXXX"
          placeholderTextColor="#9CA3AF"
          keyboardType="phone-pad"
        />
      </View>

      {/* Error */}
      {error ? (
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons name="alert-circle" size={20} color="#DC2626" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handlePhoneSubmit}
        disabled={isLoading || phoneNumber.replace(/\D/g, '').length < 12}
      >
        {isLoading ? (
          <ActivityIndicator color="#111827" />
        ) : (
          <>
            <MaterialCommunityIcons name="phone" size={20} color="#111827" />
            <Text style={styles.buttonText}>{t('auth.sendCode')}</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Info Box */}
      <View style={styles.infoBox}>
        <MaterialCommunityIcons name="shield-check" size={20} color="#2563EB" />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>Your privacy is protected</Text>
          <Text style={styles.infoText}>
            We'll send you a 4-digit verification code via SMS. Standard messaging rates may apply.
          </Text>
        </View>
      </View>
    </View>
  );

  const renderOtpStep = () => (
    <View style={styles.stepContainer}>
      {/* Icon */}
      <View style={[styles.iconCircle, { backgroundColor: '#D1FAE5' }]}>
        <MaterialCommunityIcons name="shield-check" size={40} color="#059669" />
      </View>

      {/* Title */}
      <Text style={[styles.stepTitle, isDark && styles.textDark]}>
        {t('auth.verifyNumber')}
      </Text>
      <Text style={[styles.stepSubtitle, isDark && styles.textGrayDark]}>
        {t('auth.codeSentTo')}
      </Text>
      <Text style={[styles.phoneDisplay, isDark && styles.textDark]}>{phoneNumber}</Text>

      {/* OTP Inputs */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, isDark && styles.textGrayDark, { textAlign: 'center' }]}>
          {t('auth.enterCode')}
        </Text>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (otpInputs.current[index] = ref)}
              style={[styles.otpInput, isDark && styles.inputDark]}
              value={digit}
              onChangeText={(value) => handleOtpChange(index, value)}
              onKeyPress={({ nativeEvent }) => handleOtpKeyPress(index, nativeEvent.key)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>
      </View>

      {/* Error */}
      {error ? (
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons name="alert-circle" size={20} color="#DC2626" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleOtpSubmit}
        disabled={isLoading || otp.join('').length !== 4}
      >
        {isLoading ? (
          <ActivityIndicator color="#111827" />
        ) : (
          <>
            <MaterialCommunityIcons name="check" size={20} color="#111827" />
            <Text style={styles.buttonText}>
              {t('auth.verifyCode')}
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* Resend Button */}
      <TouchableOpacity
        onPress={handleResendOtp}
        disabled={resendTimer > 0 || isLoading}
        style={styles.resendButton}
      >
        <Text style={[styles.resendText, (resendTimer > 0 || isLoading) && styles.resendTextDisabled]}>
          {resendTimer > 0
            ? `${t('auth.resendIn') || 'Resend code in'} ${resendTimer}s`
            : t('auth.resendCode')}
        </Text>
      </TouchableOpacity>

      {/* Test Code Info */}
      <View style={[styles.testCodeBox, isDark && styles.testCodeBoxDark]}>
        <Text style={[styles.testCodeText, isDark && styles.textGrayDark]}>
          {t('auth.testCode')}
        </Text>
      </View>
    </View>
  );

  const renderProfileStep = () => (
    <View style={styles.stepContainer}>
      {/* Icon */}
      <View style={[styles.iconCircle, { backgroundColor: '#FEF3C7' }]}>
        <MaterialCommunityIcons name="check" size={40} color="#D97706" />
      </View>

      {/* Title */}
      <Text style={[styles.stepTitle, isDark && styles.textDark]}>
        {t('auth.completeProfile')}
      </Text>
      <Text style={[styles.stepSubtitle, isDark && styles.textGrayDark]}>
        {t('auth.tellUsAboutYou') || 'Tell us a bit about yourself to get started'}
      </Text>

      {/* First Name */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, isDark && styles.textGrayDark]}>
          {t('auth.firstName')}
        </Text>
        <TextInput
          style={[styles.input, isDark && styles.inputDark]}
          value={firstName}
          onChangeText={setFirstName}
          placeholder={t('auth.enterFirstName') || 'Enter your first name'}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Last Name */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, isDark && styles.textGrayDark]}>
          {t('auth.lastName')}
        </Text>
        <TextInput
          style={[styles.input, isDark && styles.inputDark]}
          value={lastName}
          onChangeText={setLastName}
          placeholder={t('auth.enterLastName') || 'Enter your last name'}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Error */}
      {error ? (
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons name="alert-circle" size={20} color="#DC2626" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleProfileSubmit}
        disabled={isLoading || !firstName.trim() || !lastName.trim()}
      >
        {isLoading ? (
          <ActivityIndicator color="#111827" />
        ) : (
          <>
            <MaterialCommunityIcons name="check" size={20} color="#111827" />
            <Text style={styles.buttonText}>
              {t('auth.completeRegistration') || 'Complete Registration'}
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* Welcome Bonus */}
      <View style={styles.bonusBox}>
        <MaterialCommunityIcons name="check" size={20} color="#059669" />
        <View style={styles.infoTextContainer}>
          <Text style={styles.bonusTitle}>
            {t('auth.welcomeBonusTitle') || 'Welcome bonus!'}
          </Text>
          <Text style={styles.bonusText}>{t('auth.welcomeBonus')}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={[styles.header, isDark && styles.headerDark]}>
            <Text style={styles.logo}>DO SHOPPING</Text>
          </View>

          {/* Progress Indicator */}
          <View style={[styles.progressContainer, isDark && styles.headerDark]}>
            <View style={styles.progressIndicator}>
              <View style={[styles.progressDot, step === 'phone' && styles.progressDotActive]} />
              <View style={[styles.progressLine, step !== 'phone' && styles.progressLineActive]} />
              <View style={[styles.progressDot, step === 'otp' && styles.progressDotActive]} />
              {isNewUser && (
                <>
                  <View style={[styles.progressLine, step === 'profile' && styles.progressLineActive]} />
                  <View style={[styles.progressDot, step === 'profile' && styles.progressDotActive]} />
                </>
              )}
            </View>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {step === 'phone' && renderPhoneStep()}
            {step === 'otp' && renderOtpStep()}
            {step === 'profile' && renderProfileStep()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  containerDark: {
    backgroundColor: '#111827',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerDark: {
    backgroundColor: '#1F2937',
    borderBottomColor: '#374151',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EAB308',
    letterSpacing: 1,
  },
  progressContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  progressIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D1D5DB',
  },
  progressDotActive: {
    backgroundColor: '#EAB308',
  },
  progressLine: {
    width: 32,
    height: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  progressLineActive: {
    backgroundColor: '#EAB308',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  stepContainer: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
  },
  phoneDisplay: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
  },
  inputDark: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
    color: '#F9FAFB',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  otpInput: {
    width: 48,
    height: 56,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111827',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    width: '100%',
  },
  errorText: {
    color: '#991B1B',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  button: {
    backgroundColor: '#EAB308',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  resendButton: {
    marginTop: 16,
    paddingVertical: 12,
  },
  resendText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',
  },
  resendTextDisabled: {
    color: '#9CA3AF',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#DBEAFE',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    width: '100%',
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#1E40AF',
    lineHeight: 18,
  },
  testCodeBox: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    width: '100%',
  },
  testCodeBoxDark: {
    backgroundColor: '#1F2937',
  },
  testCodeText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
  },
  bonusBox: {
    flexDirection: 'row',
    backgroundColor: '#D1FAE5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    width: '100%',
  },
  bonusTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#065F46',
    marginBottom: 4,
  },
  bonusText: {
    fontSize: 13,
    color: '#065F46',
    lineHeight: 18,
  },
  textDark: {
    color: '#F9FAFB',
  },
  textGrayDark: {
    color: '#D1D5DB',
  },
});
