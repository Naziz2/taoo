import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DealsScreen from '../screens/DealsScreen';
import StoresScreen from '../screens/StoresScreen';
import WalletScreen from '../screens/WalletScreen';
import AccountScreen from '../screens/AccountScreen';
import AuthScreen from '../screens/AuthScreen';
import DailyRewardsScreen from '../screens/DailyRewardsScreen';
import UpgradeAccountScreen from '../screens/UpgradeAccountScreen';
import StoreDetailScreen from '../screens/StoreDetailScreen';
import DealDetailScreen from '../screens/DealDetailScreen';
import ConvertScreen from '../screens/ConvertScreen';
import ConvertItemDetailScreen from '../screens/ConvertItemDetailScreen';
import QRScannerScreen from '../screens/QRScannerScreen';
import ReceiptUploadScreen from '../screens/ReceiptUploadScreen';
import FlouciPaymentScreen from '../screens/FlouciPaymentScreen';
import RewardsListScreen from '../screens/RewardsListScreen';
import { useLanguage } from '../contexts/LanguageContext';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Account: undefined;
  DealDetail: { deal: any };
  StoreDetail: { store: any };
  VoucherDetail: { voucher: any };
  Checkout: { orderData: any };
  QRScanner: undefined;
  DailyRewards: undefined;
  UpgradeAccount: undefined;
  InviteFriends: undefined;
  HelpSupport: undefined;
  TermsOfService: undefined;
  FlouciPayment: undefined;
  PluxeePage: undefined;
  ReceiptUpload: undefined;
  Convert: undefined;
  ConvertItemDetail: { item: any };
  RewardsList: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Deals: undefined;
  Stores: undefined;
  Wallet: undefined;
  Convert: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  const { t } = useLanguage();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#EAB308',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') return <Ionicons name="home-outline" size={size} color={color} />;
          else if (route.name === 'Deals') return <Ionicons name="pricetag-outline" size={size} color={color} />;
          else if (route.name === 'Stores') return <Ionicons name="storefront-outline" size={size} color={color} />;
          else if (route.name === 'Wallet') return <Ionicons name="wallet-outline" size={size} color={color} />;
          else if (route.name === 'Convert') return <Ionicons name="swap-horizontal-outline" size={size} color={color} />;
          return <Ionicons name="home-outline" size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: t('nav.home') }}
      />
      <Tab.Screen
        name="Stores"
        component={StoresScreen}
        options={{ tabBarLabel: t('nav.stores') }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{ tabBarLabel: t('nav.wallet') }}
      />
      <Tab.Screen
        name="Deals"
        component={DealsScreen}
        options={{ tabBarLabel: t('nav.deals') }}
      />
      <Tab.Screen
        name="Convert"
        component={ConvertScreen}
        options={{ 
          tabBarLabel: t('nav.convert'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-horizontal-outline" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator({ 
  isAuthenticated,
  onAuthSuccess,
  onLogout,
  userData
}: { 
  isAuthenticated: boolean;
  onAuthSuccess?: (user: any) => void;
  onLogout?: () => void;
  userData?: any;
}) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth">
            {(props) => <AuthScreen {...props} onAuthSuccess={onAuthSuccess} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="DealDetail" component={DealDetailScreen} />
            <Stack.Screen name="StoreDetail" component={StoreDetailScreen} />
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="Convert" component={ConvertScreen} />
            <Stack.Screen name="ConvertItemDetail" component={ConvertItemDetailScreen} />
            <Stack.Screen name="DailyRewards" component={DailyRewardsScreen} />
            <Stack.Screen name="UpgradeAccount" component={UpgradeAccountScreen} />
            <Stack.Screen name="QRScanner" component={QRScannerScreen} />
            <Stack.Screen name="ReceiptUpload" component={ReceiptUploadScreen} />
            <Stack.Screen name="FlouciPayment" component={FlouciPaymentScreen} />
            <Stack.Screen name="RewardsList" component={RewardsListScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
