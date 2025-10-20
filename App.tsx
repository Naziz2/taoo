import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { UserProvider } from './src/contexts/UserContext';
import AppNavigator from './src/navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Clear any existing session on app start
  useEffect(() => {
    clearSession();
  }, []);

  const clearSession = async () => {
    try {
      await AsyncStorage.removeItem('user_data');
      console.log('App: Previous session cleared - starting fresh');
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  };

  const handleAuthSuccess = async (user: any) => {
    try {
      await AsyncStorage.setItem('user_data', JSON.stringify(user));
      setUserData(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleLogout = async () => {
    console.log('App: handleLogout() called');
    try {
      console.log('App: removing user_data from AsyncStorage');
      await AsyncStorage.removeItem('user_data');
      console.log('App: user_data removed successfully');
      setUserData(null);
      console.log('App: userData state cleared');
      setIsAuthenticated(false);
      console.log('App: isAuthenticated set to false');
    } catch (error) {
      console.error('App: Error logging out:', error);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <LanguageProvider>
          <UserProvider initialUser={userData} onLogout={handleLogout}>
            <StatusBar style="auto" />
            <AppNavigator 
              isAuthenticated={isAuthenticated} 
              onAuthSuccess={handleAuthSuccess}
              onLogout={handleLogout}
              userData={userData}
            />
          </UserProvider>
        </LanguageProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
