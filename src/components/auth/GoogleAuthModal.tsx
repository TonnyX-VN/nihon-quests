import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { X, LogOut, Mail } from 'lucide-react';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({ isOpen, onClose }) => {
  const { user, loginWithGoogle, logoutAuth } = useGame();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const isGoogleLoggedIn = user.authProfile?.provider === 'google' && user.authProfile?.isLoggedIn;

  /**
   * Gọi trực tiếp signInWithPopup của Firebase Auth SDK
   */
  const handleFirebaseGoogleSignIn = async () => {
    setIsProcessing(true);
    try {
      const success = await loginWithGoogle();
      if (success) {
        onClose();
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLogout = async () => {
    await logoutAuth();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isProcessing) onClose();
      }}
    >
      <div className="w-full max-w-sm rounded-3xl border border-rose-500/30 bg-slate-900 p-6 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Modal Header: Tiêu đề "Đăng nhập bằng Google" + Nút tắt (X) */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.64-5.2 3.64-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.94H1.26v3.15C3.25 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.32 14.26a7.2 7.2 0 0 1 0-4.52V6.59H1.26a11.96 11.96 0 0 0 0 10.82l4.06-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.59l4.06 3.15c.94-2.84 3.58-4.99 6.68-4.99z"
                />
              </svg>
            </div>
            <h3 className="font-extrabold text-white text-base">
              {isGoogleLoggedIn ? 'Tài Khoản Google' : 'Đăng nhập bằng Google'}
            </h3>
          </div>

          {/* Nút tắt Modal (X) */}
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer disabled:opacity-50"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nội dung Modal */}
        {isGoogleLoggedIn ? (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-lg font-bold text-emerald-300 shrink-0">
                {user.authProfile?.photoURL ? (
                  <img
                    src={user.authProfile.photoURL}
                    alt="Avatar"
                    className="w-full h-full rounded-xl object-cover"
                  />
                ) : (
                  user.authProfile?.displayName?.[0]?.toUpperCase() || 'G'
                )}
              </div>
              <div className="min-w-0 flex-1 text-xs">
                <div className="font-bold text-white truncate">
                  {user.authProfile?.displayName}
                </div>
                <div className="text-slate-400 truncate flex items-center gap-1 mt-0.5">
                  <Mail className="w-3 h-3 text-slate-500" />
                  <span>{user.authProfile?.email}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-2.5 px-4 rounded-xl border border-red-900/60 hover:bg-red-950/50 text-red-400 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng xuất</span>
            </button>
          </div>
        ) : (
          /* Nút duy nhất "Đăng nhập bằng Google" */
          <div className="pt-1">
            <button
              onClick={handleFirebaseGoogleSignIn}
              disabled={isProcessing}
              className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm shadow-xl flex items-center justify-center gap-3 transition cursor-pointer active:scale-98 disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  <span>Đang mở cửa sổ Google...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.64-5.2 3.64-9.15z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.94H1.26v3.15C3.25 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.32 14.26a7.2 7.2 0 0 1 0-4.52V6.59H1.26a11.96 11.96 0 0 0 0 10.82l4.06-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.59l4.06 3.15c.94-2.84 3.58-4.99 6.68-4.99z"
                    />
                  </svg>
                  <span>Đăng nhập bằng Google</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
