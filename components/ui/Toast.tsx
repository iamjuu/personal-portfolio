"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, AlertCircle } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

interface ToastContextType {
  showToast: (message: string, type: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    console.log('Toast triggered:', { message, type });
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type };
    
    setToasts(prev => {
      console.log('Adding toast, current count:', prev.length + 1);
      return [...prev, newToast];
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-[9999] space-y-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="pointer-events-auto"
            >
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-2 border-purple-400 rounded-lg p-4 shadow-2xl max-w-sm min-w-[300px] backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  {toast.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0" />
                  )}
                  <p className="text-white text-sm flex-1 font-medium">{toast.message}</p>
                  <button
                    onClick={() => removeToast(toast.id)}
                    className="text-gray-300 hover:text-white transition-colors p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};