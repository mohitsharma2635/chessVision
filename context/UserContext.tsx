import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

type UserContextType = {
  userName: string;
  setUserName: (name: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserName] = useState<string>('User');

  useEffect(() => {
    // Load saved user name
    AsyncStorage.getItem('userName').then((savedName) => {
      if (savedName) {
        setUserName(savedName);
      }
    });
  }, []);

  const handleSetUserName = (name: string) => {
    setUserName(name);
    AsyncStorage.setItem('userName', name);
  };

  return (
    <UserContext.Provider value={{ userName, setUserName: handleSetUserName }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
