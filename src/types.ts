export type UserRole = 'scout' | 'rider' | 'customer' | 'admin';

export interface UserProfile {
  uid: string;
  name: string;
  phone: string;
  role: UserRole;
  walletId: string;
  createdAt: string;
}

export type TransactionType = 'earn' | 'spend' | 'donation' | 'conversion';

export interface Wallet {
  userId: string;
  balance: number;
  updatedAt: any;
}

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  description: string;
  timestamp: any;
  status: 'pending' | 'completed' | 'failed';
}

export interface AppInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: 'core' | 'service' | 'impact';
}

export interface DemoState {
  balance: number;
  notifications: Notification[];
  transactions: Transaction[];
  activeRunners: number;
  totalDonations: number;
}

export type NotificationType = 'success' | 'info' | 'reward' | 'payment';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  timestamp: Date;
}
