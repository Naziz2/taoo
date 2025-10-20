import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import DealsScreen from '../screens/DealsScreen';
import StoresScreen from '../screens/StoresScreen';
import WalletScreen from '../screens/WalletScreen';
import AccountScreen from '../screens/AccountScreen';
import AuthScreen from '../screens/AuthScreen';
import DailyRewardsScreen from '../screens/DailyRewardsScreen';
import UpgradeAccountScreen from '../screens/UpgradeAccountScreen';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
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
};

export type MainTabParamList = {
  Home: undefined;
  Deals: undefined;
  Stores: undefined;
  Wallet: undefined;
  Account: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
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
          let iconName = 'home';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Deals') iconName = 'gift';
          else if (route.name === 'Stores') iconName = 'store';
          else if (route.name === 'Wallet') iconName = 'wallet';
          else if (route.name === 'Account') iconName = 'account';
          return <MaterialCommunityIcons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Deals"
        component={DealsScreen}
        options={{ tabBarLabel: 'Deals' }}
      />
      <Tab.Screen
        name="Stores"
        component={StoresScreen}
        options={{ tabBarLabel: 'Stores' }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{ tabBarLabel: 'Wallet' }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ tabBarLabel: 'Account' }}
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
            <Stack.Screen name="DailyRewards" component={DailyRewardsScreen} />
            <Stack.Screen name="UpgradeAccount" component={UpgradeAccountScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
