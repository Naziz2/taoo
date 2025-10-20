import React from 'react';
import { ChevronLeft, ChevronRight, Crown, Wallet, Heart, Hash, Percent, HelpCircle, User, Globe, Moon, Sun } from 'lucide-react';
import LevelDetails from './LevelDetails';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface AccountPageProps {
  onBack:()=>void;
  onShowWalletDetails: () => void;
  onShowInviteFriends: () => void;
  onShowInterests: () => void;
  onShowHelpSupport: () => void;
  onShowTransactions: () => void;
  onShowLanguageSelector: () => void;
  onLogout?: () => void;
  currentUser?: any;
  onShowTermsOfService: () => void;
}

interface AccountHeaderProps {
  points: number;
}

function AccountHeader({onBack, points }: AccountHeaderProps) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  return (
    <div className="bg-white dark:bg-gray-800 p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <ChevronLeft className="h-6 w-6 dark:text-gray-300" />
          </button>
          
        <img src="/taoo_black 1.png" alt="TAOO" width={80} height={30} className="object-contain dark:hidden" />
        <img src="/taoo_white.png" alt="TAOO" width={80} height={30} className="object-contain hidden dark:block" />
        <div className="flex items-center bg-yellow-100 dark:bg-yellow-900 px-3 py-1 rounded-full">
          <span className="font-semibold text-gray-800 dark:text-gray-200">{points.toLocaleString()}</span>
          <span className="ml-1 text-yellow-600"><img src="/Image+Background.png" alt="🪙" width={16} height={16} /></span>
        </div>
      </div>
    </div>
  );
}

interface ProfileSectionProps {
  points: number;
  currentUser?: any;
}

function ProfileSection({ points, currentUser }: ProfileSectionProps) {
  const { t } = useLanguage();
  return (
    <div className="bg-white dark:bg-gray-800 mx-4 mt-4 rounded-xl p-6 shadow-sm">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center border-4 border-yellow-400">
            <User className="w-10 h-10 text-gray-600 dark:text-gray-300" />
          </div>
          {/* Progress indicator */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-400 transform rotate-45"></div>
        </div>
        
        <div className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold mb-2">
          {t('account.completedAt')} {currentUser.accountComplited}%
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">{currentUser.firstName} {currentUser.lastName}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{t('account.accountAge')} {currentUser.accountAgeDays} {t('days')}</p>
        
        {currentUser && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <p>Phone: {currentUser.phone}</p>
            <p>Level: {currentUser.level}</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  iconBg?: string;
}

function MenuItem({ icon, title, subtitle, onClick, iconBg = "bg-gray-100" }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    >
      <div className={`w-12 h-12 ${iconBg} dark:bg-gray-700 rounded-lg flex items-center justify-center mr-4`}>
        {icon}
      </div>
      <div className="flex-1 text-left">
        <h3 className="text-gray-800 dark:text-gray-200 font-semibold">{title}</h3>
        {subtitle && <p className="text-gray-500 dark:text-gray-400 text-sm">{subtitle}</p>}
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
    </button>
  );
}

export default function AccountPage({ 
  onBack,
  onShowWalletDetails, 
  onShowInviteFriends, 
  onShowInterests, 
  onShowHelpSupport, 
  onShowTransactions,
  onShowLanguageSelector,
  onLogout,
  currentUser,
  onShowTermsOfService
}: AccountPageProps) {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [showLevelDetails, setShowLevelDetails] = React.useState(false);
  
  const handleBack = () => {
    // This would typically navigate back or close the account page
    console.log('Navigate back');
  };

  const handleLevelClick = () => {
    setShowLevelDetails(true);
  };

  const handleBackFromLevel = () => {
    setShowLevelDetails(false);
  };

  if (showLevelDetails) {
    return (
      <div className="relative">
        <button 
          onClick={handleBackFromLevel}
          className="absolute top-4 left-4 z-10 p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <LevelDetails 
          currentLevel={currentUser.level}
          currentPoints={currentUser.points}
          nextLevelPoints={25000}
          accountAge={currentUser.accountAgeDays}
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <AccountHeader onBack={onBack} points={currentUser.points} />
      <ProfileSection points={currentUser.points} currentUser={currentUser} />
      
      <div className="px-4 mt-6 space-y-4">
        {/* Menu Items */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <MenuItem
            icon={<Crown className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />}
            title={t(currentUser.level)}
            subtitle={t('account.currentLevel')}
            iconBg="bg-yellow-100"
            onClick={handleLevelClick}
          />
          
          <div className="border-t border-gray-100">
            <MenuItem
              icon={<Wallet className="h-6 w-6 text-gray-600 dark:text-gray-400" />}
              title={t('account.myWallet')}
              iconBg="bg-gray-100"
              onClick={onShowWalletDetails}
            />
          </div>
          
          <div className="border-t border-gray-100">
            <MenuItem
              icon={<Heart className="h-6 w-6 text-pink-600 dark:text-pink-400" />}
              title={t('account.inviteFriends')}
              subtitle={t('account.shareAndEarn')}
              iconBg="bg-pink-100"
              onClick={onShowInviteFriends}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <MenuItem
            icon={<Hash className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
            title={t('account.interests')}
            iconBg="bg-blue-100"
            onClick={onShowInterests}
          />
          
          <div className="border-t border-gray-100">
            <MenuItem
              icon={<Percent className="h-6 w-6 text-green-600 dark:text-green-400" />}
              title={t('account.history')}
              subtitle={t('account.allTransactions')}
              iconBg="bg-green-100"
              onClick={onShowTransactions}
            />
          </div>
          
          <div className="border-t border-gray-100">
            <MenuItem
              icon={<HelpCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
              title={t('account.helpSupport')}
              iconBg="bg-purple-100"
              onClick={onShowHelpSupport}
            />
          </div>
          
          <div className="border-t border-gray-100">
            <MenuItem
              icon={<Globe className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
              title={t('account.language')}
              subtitle={t('account.selectLanguage')}
              iconBg="bg-indigo-100"
              onClick={onShowLanguageSelector}
            />
          </div>
          
          <div className="border-t border-gray-100">
            <MenuItem
              icon={theme === 'dark' ? <Sun className="h-6 w-6 text-orange-600 dark:text-orange-400" /> : <Moon className="h-6 w-6 text-gray-600 dark:text-gray-400" />}
              title={theme === 'dark' ? t('account.lightMode') : t('account.darkMode')}
              subtitle={t('account.themeSettings')}
              iconBg={theme === 'dark' ? "bg-orange-100" : "bg-gray-100"}
              onClick={toggleTheme}
            />
          </div>
        </div>
        
        {/* Account Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 space-y-1">
          <button className="w-full text-left py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex items-center justify-between">
            <span>{t('account.deleteAccount')}</span>
            <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </button>
          
          <div className="border-t border-gray-100 dark:border-gray-700 pt-1">
            <button 
              onClick={onLogout}
              className="w-full text-left py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex items-center justify-between"
            >
              <span>{t('account.logout')}</span>
              <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </button>
          </div>
          
          <div className="border-t border-gray-100 dark:border-gray-700 pt-1">
            <button 
              onClick={onShowTermsOfService}
              className="w-full text-left py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex items-center justify-between"
            >
              <span>{t('account.terms')}</span>
              <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}