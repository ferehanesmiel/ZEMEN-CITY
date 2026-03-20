export interface Transaction {
  id: string;
  type: 'earn' | 'spend' | 'donate' | 'recycle';
  amount: number;
  description: string;
  timestamp: string;
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
