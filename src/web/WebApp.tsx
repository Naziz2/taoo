import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AuthPage from './components/AuthPage';
import HomePage from './components/HomePage';
import DealsPage from './components/DealsPage';
import DealDetailPage from './components/DealDetailPage';
import StoreDetailPage from './components/StoreDetailPage';
import StoresPage from './components/StoresPage';
import AccountPage from './components/AccountPage';
import WalletPage from './components/WalletPage';
import WalletDetailsPage from './components/WalletDetailsPage';
import InviteFriendsPage from './components/InviteFriendsPage';
import InterestsPage from './components/InterestsPage';
import HelpSupportPage from './components/HelpSupportPage';
import CheckoutPage from './components/CheckoutPage';
import TransactionHistory from './components/TransactionHistory';
import LanguageSelector from './components/LanguageSelector';
import UpgradeAccountPage from './components/UpgradeAccountPage';
import BottomNav from './components/BottomNav';
import VouchersPage from './components/VouchersPage';
import VoucherDetailPage from './components/VoucherDetailPage';
import QRScannerPage from './components/QRScannerPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import FlouciPaymentPage from './components/FlouciPaymentPage';
import PluxeePage from './components/PluxeePage';
import ReceiptUploadPage from './components/ReceiptUploadPage';
import ConvertPage from './components/ConvertPage';
import ConvertItemDetailPage from './components/ConvertItemDetailPage';
import DailyRewardsPage from './components/DailyRewardsPage';
import { ConvertItem } from './types/entities';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [showCheckout, setShowCheckout] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showWalletDetails, setShowWalletDetails] = useState(false);
  const [showInviteFriends, setShowInviteFriends] = useState(false);
  const [showInterests, setShowInterests] = useState(false);
  const [showHelpSupport, setShowHelpSupport] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showDealDetail, setShowDealDetail] = useState(false);
  const [showStoreDetail, setShowStoreDetail] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [showUpgradeAccount, setShowUpgradeAccount] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showVouchers, setShowVouchers] = useState(false);
  const [showVoucherDetail, setShowVoucherDetail] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<any>(null);
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [showTermsOfService, setShowTermsOfService] = useState(false);
  const [showFlouciPayment, setShowFlouciPayment] = useState(false);
  const [showPluxeePage, setShowPluxeePage] = useState(false);
  const [showReceiptUpload, setShowReceiptUpload] = useState(false);
  const [showConvert, setShowConvert] = useState(false);
  const [showConvertDetail, setShowConvertDetail] = useState(false);
  const [selectedConvertItem, setSelectedConvertItem] = useState<ConvertItem | null>(null);
  const [showDailyRewards, setShowDailyRewards] = useState(false);

  const handleAuthSuccess = (userData: any) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    
    // Show welcome message for new users
    if (userData.isNewUser) {
      // Could show a welcome modal or redirect to onboarding
      console.log('Welcome new user!', userData);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveTab('home');
  };

  // Sample vouchers data
  const vouchers: ConvertItem[] = [
    {
      id: '20493',
      title: "Offre de Bienvenue",
      description: "Profitez d'une offre exclusive de 15% de réduction sur votre premier passage chez Kudu. </br>\r\nNe manquez pas cette opportunité limitée dans le temps pour économiser sur vos prochains repas!",
      cover: "191bfab9-887a-4d1f-80b4-2826aa4fd47f",
      thumbnail: "https://server.taoo.ai/api/uploads/191bfab9-887a-4d1f-80b4-2826aa4fd47f",
      type: "COUPON",
      createdAt: "2025-01-15 10:30:45",
      pointsCost: 275,
      category: 'gift_card',
      status: 'active',
      uuid: "94VCjY66Ebt",
      website: "",
      companies: [
        {
          id: 4,
          name: "Kudu",
          logo: "9e8d2ee5-3d5c-477c-a490-6ca75e293aab"
        }
      ],
      error: false,
      offerId: 12,
      discountType: "PERCENT",
      expiresAt: "2025-02-15 10:30:45",
      moneyAmount: 0.0,
      discountPercentAmount: 15.0,
      discountMoneyAmount: 0.0,
      minDiscountCalculatedAmount: 0.0,
      maxDiscountCalculatedAmount: 0.0,
      discountCondition: "",
      canUseOnline: false,
      canUseOffline: true,
      code: "",
      orderId: null
    },
    {
      id: '20494',
      title: "Casque Gaming",
      description: "Réduction sur casque gaming haute qualité",
      cover: "f2c221b8-dcff-4c0b-b7e3-1b025db7a2d8",
      thumbnail: "https://server.taoo.ai/api/uploads/f2c221b8-dcff-4c0b-b7e3-1b025db7a2d8",
      type: "COUPON",
      createdAt: "2025-01-10 14:20:30",
      pointsCost: 80,
      category: 'free_product',
      status: 'active',
      uuid: "XK9mN2pQr8s",
      website: "",
      companies: [
        {
          id: 21,
          name: "Jarir Bookstore",
          logo: "23c2b34d-3d07-4d69-bdac-fb60e9ea037a"
        }
      ],
      error: false,
      offerId: 83,
      discountType: "PERCENT",
      expiresAt: "2025-01-25 14:20:30",
      moneyAmount: 0.0,
      discountPercentAmount: 7.0,
      discountMoneyAmount: 0.0,
      minDiscountCalculatedAmount: 0.0,
      maxDiscountCalculatedAmount: 0.0,
      discountCondition: "",
      canUseOnline: false,
      canUseOffline: true,
      code: "GAMING2025",
      orderId: null
    },
    {
      id: '20495',
      title: "Abonnement 1 an",
      description: "Abonnement annuel avec réduction spéciale",
      cover: "03e5d887-cc21-472e-8d03-9a2ce56b1521",
      thumbnail: "https://server.taoo.ai/api/uploads/03e5d887-cc21-472e-8d03-9a2ce56b1521",
      type: "COUPON",
      createdAt: "2024-12-20 09:15:22",
      pointsCost: 80,
      category: 'gift_card',
      status: 'expired',
      uuid: "Lm4pR7nTx3w",
      website: "",
      companies: [
        {
          id: 38,
          name: "Fitness Time",
          logo: "69991b89-5a3a-4cf0-968c-177839a84358"
        }
      ],
      error: false,
      offerId: 167,
      discountType: "PERCENT",
      expiresAt: "2024-12-25 09:15:22",
      moneyAmount: 0.0,
      discountPercentAmount: 20.0,
      discountMoneyAmount: 0.0,
      minDiscountCalculatedAmount: 0.0,
      maxDiscountCalculatedAmount: 0.0,
      discountCondition: "",
      canUseOnline: false,
      canUseOffline: true,
      code: "GYM2024",
      orderId: null
    }
  ];

  // Show authentication page if not authenticated
  if (!isAuthenticated) {
    return (
      <LanguageProvider>
        <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
          <AuthPage onAuthSuccess={handleAuthSuccess} />
        </div>
      </LanguageProvider>
    );
  }

  const renderActiveTab = () => {
    if (showCheckout) {
      return <CheckoutPage onBack={() => setShowCheckout(false)}
            onAccountClick={()=>setShowAccount(true)}
            onShowUpgradeAccount={() => setShowUpgradeAccount(true)}
            currentUser={currentUser} orderData={orderData} />;
    }
    
    if (showQRScanner) {
      return (
        <QRScannerPage 
          onBack={() => setShowQRScanner(false)}
          onAccountClick={()=>setShowAccount(true)}
          onShowUpgradeAccount={() => setShowUpgradeAccount(true)}
          onOrderCreated={(data) => {
            setOrderData(data);
            setShowQRScanner(false);
            setShowCheckout(true);
          }}
        />
      );
    }
    
    if (showDealDetail) {
      return <DealDetailPage
            onAccountClick={()=>setShowAccount(true)}
            onShowUpgradeAccount={() => setShowUpgradeAccount(true)}
            deal={selectedDeal} onBack={() => setShowDealDetail(false)} />;
    }
    
    if (showTransactions) {
      return <TransactionHistory onBack={() => setShowTransactions(false)} />;
    }
    
    if (showWalletDetails) {
      return <WalletDetailsPage onBack={() => setShowWalletDetails(false)} />;
    }
    
    if (showInviteFriends) {
      return <InviteFriendsPage onBack={() => setShowInviteFriends(false)} />;
    }
    
    if (showInterests) {
      return <InterestsPage onBack={() => setShowInterests(false)} />;
    }
    
    if (showHelpSupport) {
      return <HelpSupportPage onBack={() => setShowHelpSupport(false)} />;
    }
    
    if (showLanguageSelector) {
      return <LanguageSelector onBack={() => setShowLanguageSelector(false)} />;
    }
    
    if (showUpgradeAccount) {
      return (
        <UpgradeAccountPage 
          onBack={() => setShowUpgradeAccount(false)}
          onAccountClick={()=>setShowAccount(true)}
          currentUser={currentUser}
          onUpgradeSuccess={(newLevel) => {
            // Update user level in the app state
            if (currentUser) {
              setCurrentUser({
                ...currentUser,
                level: newLevel
              });
            }
            console.log(`User upgraded to ${newLevel}`);
          }}
        />
      );
    }
    
    if (showVouchers) {
      return (
        <VouchersPage 
          onBack={() => setShowVouchers(false)}
          vouchers={vouchers}
          onAccountClick={()=>setShowAccount(true)}
          currentUser={currentUser}
          onShowUpgradeAccount={() => setShowUpgradeAccount(true)}
          onShowVoucherDetail={(voucher) => {
            setSelectedVoucher(voucher);
            setShowVoucherDetail(true);
            setShowVouchers(false);
          }}
        />
      );
    }
    
    if (showVoucherDetail) {
      return (
        <VoucherDetailPage 
          voucher={selectedVoucher}
          onBack={() => setShowVoucherDetail(false)}
        />
      );
    }
    
    if (showTermsOfService) {
      return <TermsOfServicePage onBack={() => setShowTermsOfService(false)} />;
    }
    
    if (showFlouciPayment) {
      return <FlouciPaymentPage
            onAccountClick={()=>setShowAccount(true)}
            onShowUpgradeAccount={() => setShowUpgradeAccount(true)}
            currentUser={currentUser} onBack={() => setShowFlouciPayment(false)} />;
    }
    
    if (showPluxeePage) {
      return <PluxeePage currentUser={currentUser} onBack={() => setShowPluxeePage(false)}  onShowUpgradeAccount={() => setShowUpgradeAccount(true)} />;
    }
    
    if (showReceiptUpload) {
      return <ReceiptUploadPage currentUser={currentUser} onBack={() => setShowReceiptUpload(false)} />;
    }
    
    if (showConvert) {
      return (
        <ConvertPage 
          onBack={() => setShowConvert(false)}
          
          currentUser={currentUser}
          onAccountClick={() => setShowAccount(true)}
          onShowUpgradeAccount={() => setShowUpgradeAccount(true)}
          onShowConvertDetail={(item) => {
            setSelectedConvertItem(item);
            setShowConvertDetail(true);
          }}
        />
      );
    }
    
    if (showConvertDetail) {
      return (
        <ConvertItemDetailPage 
          item={selectedConvertItem}
          onBack={() => setShowConvertDetail(false)}
          currentUser={currentUser}
          onShowVouchers={() => setShowVouchers(true)}
          onConversionSuccess={(item, pointsSpent) => {
            vouchers.push(item);
            // Update user points
            if (currentUser) {
              setCurrentUser({
                ...currentUser,
                points: currentUser.points - pointsSpent
              });
            }
            console.log(`Converted ${item.title} for ${pointsSpent} points`);
          }}
        />
      );
    }
    
    if (showDailyRewards) {
      return (
        <DailyRewardsPage 
          currentUser={currentUser}
          onBack={() => setShowDailyRewards(false)}
          onAccountClick={() => setShowAccount(true)}
          onShowUpgradeAccount={() => setShowUpgradeAccount(true)}
        />
      );
    }
    
    if (showStoreDetail) {
      return <StoreDetailPage currentUser={currentUser} store={selectedStore} onBack={() => setShowStoreDetail(false)} />;
    }
    if(showAccount){
      return (
          <AccountPage 
            
            onBack={() => setShowAccount(false)}
            onShowWalletDetails={() => setShowWalletDetails(true)}
            onShowInviteFriends={() => setShowInviteFriends(true)}
            onShowInterests={() => setShowInterests(true)}
            onShowHelpSupport={() => setShowHelpSupport(true)}
            onShowTransactions={() => setShowTransactions(true)}
            onShowLanguageSelector={() => setShowLanguageSelector(true)}
            onLogout={handleLogout}
            currentUser={currentUser}
            onShowUpgradeAccount={() => setShowUpgradeAccount(true)}
            onShowTermsOfService={() => setShowTermsOfService(true)}
          />
        );
    }
    
    switch (activeTab) {
      
      case 'deals':
        return (
          <DealsPage 
            currentUser={currentUser}
            onAccountClick={()=>setShowAccount(true)}
            onShowUpgradeAccount={() => setShowUpgradeAccount(true)}
            onShowDealDetail={() => setShowDealDetail(true)}
            onShowDealDetailWithData={(deal) => {
              setSelectedDeal(deal);
              setShowDealDetail(true);
            }}
          />
        );
      case 'stores':
        return (<StoresPage 
                  currentUser={currentUser}
                  onAccountClick={()=>setShowAccount(true)}
                  onShowUpgradeAccount={() => setShowUpgradeAccount(true)}
                  onShowStoreDetail={(store) => {
                    setSelectedStore(store);
                    setShowStoreDetail(true);
                  }}
                  />
               );
      case 'wallet':
        return (
          <WalletPage 
            onBack={() => setActiveTab('home')}
            currentUser={currentUser}
            onAccountClick={()=>setShowAccount(true)}
            onShowUpgradeAccount={() => setShowUpgradeAccount(true)}
            onShowTransactions={() => setShowTransactions(true)}
            onShowCheckout={() => setShowCheckout(true)}
            onShowVouchers={() => setShowVouchers(true)}
            onShowQRScanner={() => setShowQRScanner(true)}
            onShowFlouciPay={() => setShowFlouciPayment(true)}
            onShowPluxeePage={() => setShowPluxeePage(true)}
            onShowReceiptUpload={() => setShowReceiptUpload(true)}
          />
        );
      case 'account':
        return (
          <AccountPage 
            onShowWalletDetails={() => setShowWalletDetails(true)}
            onShowInviteFriends={() => setShowInviteFriends(true)}
            onShowInterests={() => setShowInterests(true)}
            onShowHelpSupport={() => setShowHelpSupport(true)}
            onShowTransactions={() => setShowTransactions(true)}
            onShowLanguageSelector={() => setShowLanguageSelector(true)}
            onLogout={handleLogout}
            currentUser={currentUser}
            onShowUpgradeAccount={() => setShowUpgradeAccount(true)}
            onShowTermsOfService={() => setShowTermsOfService(true)}
          />
        );
      case 'convert':
        return (
          <ConvertPage 
            onBack={() => setActiveTab('home')}
            currentUser={currentUser}
            onAccountClick={() => setShowAccount(true)}
            onShowUpgradeAccount={() => setShowUpgradeAccount(true)}
            onShowConvertDetail={(item) => {
              setSelectedConvertItem(item);
              setShowConvertDetail(true);
            }}
          />
        );
        
      case 'home':
      default:
        return (
          <HomePage 
            currentUser={currentUser}
            onAccountClick={()=>setShowAccount(true)}
            onShowUpgradeAccount={() => setShowUpgradeAccount(true)}
            onShowStoreDetail={(store) => {
                setSelectedStore(store);
                setShowStoreDetail(true);
              }}
            onShowDealDetail={(deal) => {
              setSelectedDeal(deal);
              setShowDealDetail(true);
            }}
            onShowDailyRewards={() =>{
              
              setShowDailyRewards(true);
            } }
          />
        );
    }
  };

  // Determine if footer should be hidden
  const shouldHideFooter = showStoreDetail || showAccount || showDealDetail || showCheckout || showTransactions || 
     showInviteFriends || showInterests || 
    showHelpSupport || showLanguageSelector || showUpgradeAccount || showWalletDetails ||
    showVouchers || showVoucherDetail || showQRScanner || showTermsOfService || showFlouciPayment || showPluxeePage || showReceiptUpload || showConvert || showConvertDetail || showDailyRewards;

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 max-w-md mx-auto relative">
          <div className={shouldHideFooter ? "" : "pb-20"}>
            {renderActiveTab()}
          </div>
          {!shouldHideFooter && (
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md">
              <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          )}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;