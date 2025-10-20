import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  phone?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  level?: string;
  points?: number;
  accountComplited?: number;
  monthlyLimit?: number;
  usedThisMonth?: number;
  availableLimit?: number;
  maxSplitMonths?: number;
  accountAgeDays?: number;
  interests?: string[];
  referralCode?: string;
  isNewUser?: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ 
  children, 
  initialUser,
  onLogout 
}: { 
  children: ReactNode;
  initialUser?: User | null;
  onLogout?: () => void;
}) => {
  const [user, setUser] = useState<User | null>(initialUser || null);

  const logout = async () => {
    console.log('UserContext: logout() called');
    setUser(null);
    console.log('UserContext: user state cleared');
    if (onLogout) {
      console.log('UserContext: calling parent onLogout callback');
      await onLogout();
      console.log('UserContext: parent onLogout completed');
    } else {
      console.log('UserContext: no onLogout callback provided');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
