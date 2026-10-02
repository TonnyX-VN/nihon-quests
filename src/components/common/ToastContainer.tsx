import React from 'react';
import { useGame } from '../../context/GameContext';

export const ToastContainer: React.FC = () => {
  const { toasts } = useGame();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-16 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => {
        let borderClass = 'border-rose-500/60 bg-slate-900/95';
        if (toast.type === 'levelUp') {
          borderClass = 'border-amber-400 bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 ring-2 ring-amber-400/50';
        } else if (toast.type === 'achievement') {
          borderClass = 'border-purple-400 bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 ring-1 ring-purple-400/40';
        } else if (toast.type === 'combo') {
          borderClass = 'border-orange-500 bg-gradient-to-r from-orange-950 via-slate-900 to-slate-950';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border ${borderClass} shadow-2xl backdrop-blur-md animate-bounce-short text-slate-100 text-sm`}
          >
            <span className="text-2xl shrink-0">{toast.icon}</span>
            <div className="flex-1 font-medium leading-tight">
              {toast.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};
