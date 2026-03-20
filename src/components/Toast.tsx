import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

type ToastType = 'success' | 'info' | 'error';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="pointer-events-auto"
            >
              <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md ${
                toast.type === 'success' ? 'bg-green-500/90 border-green-400 text-white' :
                toast.type === 'error' ? 'bg-red-500/90 border-red-400 text-white' :
                'bg-dark-blue/90 border-white/10 text-white'
              }`}>
                {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> :
                 toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> :
                 <Info className="w-5 h-5" />}
                <p className="font-bold text-sm">{toast.message}</p>
                <button
                  onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                  className="ml-4 hover:opacity-70"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
