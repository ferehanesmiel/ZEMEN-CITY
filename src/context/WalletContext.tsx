import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot, collection, query, where, orderBy, limit, runTransaction, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';
import { Wallet, Transaction, TransactionType } from '../types';

interface WalletContextType {
  wallet: Wallet | null;
  transactions: Transaction[];
  loading: boolean;
  recordTransaction: (amount: number, description: string, type: TransactionType) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setWallet(null);
      setTransactions([]);
      setLoading(false);
      return;
    }

    // Listen to wallet
    const walletUnsubscribe = onSnapshot(doc(db, 'wallets', user.uid), (doc) => {
      if (doc.exists()) {
        setWallet(doc.data() as Wallet);
      }
      setLoading(false);
    }, (error) => {
      console.error("Wallet snapshot error:", error);
    });

    // Listen to transactions
    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc'),
      limit(10)
    );

    const transUnsubscribe = onSnapshot(q, (snapshot) => {
      const trans = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
      setTransactions(trans);
    }, (error) => {
      console.error("Transactions snapshot error:", error);
    });

    return () => {
      walletUnsubscribe();
      transUnsubscribe();
    };
  }, [user]);

  const recordTransaction = async (amount: number, description: string, type: TransactionType) => {
    if (!user) return;

    const walletRef = doc(db, 'wallets', user.uid);
    const transactionRef = doc(collection(db, 'transactions'));

    try {
      await runTransaction(db, async (transaction) => {
        const walletDoc = await transaction.get(walletRef);
        if (!walletDoc.exists()) {
          throw new Error("Wallet does not exist!");
        }

        const currentBalance = walletDoc.data().balance;
        const newBalance = currentBalance + amount;

        transaction.update(walletRef, { 
          balance: newBalance,
          updatedAt: serverTimestamp()
        });

        transaction.set(transactionRef, {
          userId: user.uid,
          amount,
          description,
          type,
          timestamp: serverTimestamp(),
          status: 'completed'
        });
      });
    } catch (error) {
      console.error("Transaction failed: ", error);
      throw error;
    }
  };

  return (
    <WalletContext.Provider value={{ wallet, transactions, loading, recordTransaction }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
