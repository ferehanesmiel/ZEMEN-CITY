import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Transaction, Notification, NotificationType } from '../types';

interface DemoContextType {
  balance: number;
  notifications: Notification[];
  transactions: Transaction[];
  activeRunners: number;
  totalDonations: number;
  updateBalance: (amount: number) => void;
  addNotification: (message: string, type: NotificationType) => void;
  incrementTransactions: () => void;
  setActiveRunners: React.Dispatch<React.SetStateAction<number>>;
  setTotalDonations: React.Dispatch<React.SetStateAction<number>>;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(1250);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeRunners, setActiveRunners] = useState(12);
  const [totalDonations, setTotalDonations] = useState(4500);

  const updateBalance = useCallback((amount: number) => {
    setBalance(prev => prev + amount);
  }, []);

  const addNotification = useCallback((message: string, type: Notification['type']) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newNotification: Notification = {
      id,
      message,
      type,
      timestamp: new Date(),
    };
    setNotifications(prev => [newNotification, ...prev].slice(0, 5));
    
    // Auto-remove notification
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  }, []);

  const incrementTransactions = useCallback(() => {
    // Simulated transaction increment
  }, []);

  return (
    <DemoContext.Provider value={{
      balance,
      notifications,
      transactions,
      activeRunners,
      totalDonations,
      updateBalance,
      addNotification,
      incrementTransactions,
      setActiveRunners,
      setTotalDonations,
    }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemo must be used within DemoProvider');
  return context;
}
