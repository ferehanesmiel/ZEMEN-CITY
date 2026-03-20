import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Info, Gift, CreditCard } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { NotificationType } from '../../types';

const iconMap: Record<NotificationType, any> = {
  success: CheckCircle,
  info: Info,
  reward: Gift,
  payment: CreditCard,
};

const colorMap: Record<NotificationType, string> = {
  success: 'bg-green-500',
  info: 'bg-blue-500',
  reward: 'bg-gold-accent',
  payment: 'bg-fire-orange',
};

export default function NotificationSystem() {
  const { notifications } = useDemo();

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-4 pointer-events-none sm:right-8">
      <AnimatePresence>
        {notifications.map((n) => {
          const Icon = iconMap[n.type];
          return (
            <motion.div
              key={n.id}
              initial={{ x: 300, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 300, opacity: 0, scale: 0.8 }}
              className="pointer-events-auto glass-card rounded-2xl p-4 flex items-center gap-4 min-w-[280px] shadow-2xl border-white/5"
            >
              <div className={`w-10 h-10 ${colorMap[n.type]} rounded-xl flex items-center justify-center shadow-lg`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{n.type}</span>
                <span className="text-sm font-bold text-white">{n.message}</span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
