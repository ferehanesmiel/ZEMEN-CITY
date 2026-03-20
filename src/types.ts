/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AppInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: 'core' | 'expansion';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  shop: string;
  location: string;
  image: string;
  type: 'market' | 'farm' | 'pharma' | 'service';
}

export interface Transaction {
  id: string;
  type: 'earn' | 'spend' | 'donate' | 'recycle';
  amount: number;
  description: string;
  timestamp: string;
}

export interface Statistic {
  label: string;
  value: string;
  icon: string;
}
