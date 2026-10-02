import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { createGoogleAuthProvider } from '../../services/googleAuth';
import { X, LogIn, LogOut, ShieldCheck, Mail, User, RefreshCw, KeyRound, AlertCircle, ArrowLeft } from 'lucide-react';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({ isOpen, onClose }) => {
  const { user, loginWithGoogle, logoutAuth, showToast } = useGame();

  // Yêu cầu 1: Reset và xóa bỏ trạng thái tự động đăng nhập mặc định (Auto-login / Mock session)
  // Các trường form luôn ở trạng thái trống
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [isUsingOtherAccount, setIsUsingOtherAccount] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const isGoogleLoggedIn = user.authProfile?.provider === 'google' && user.authProfile?.isLoggedIn;

  /**
   * Yêu cầu 4: Trong hàm xử lý Đăng nhập Google (Firebase Auth hoặc Google Provider),
   * bắt buộc đặt thuộc tính `prompt: 'select_account'` để luôn hiển thị danh sách chọn tài khoản Google
   * chứ không tự động đăng nhập tài khoản cũ.
   */
  const handleSelectGoogleAccount = (email: string, name: string) => {
    setIsProcessing(true);

    // Khởi tạo provider với prompt: 'select_account'
    const provider = createGoogleAuthProvider();
    console.log(`[Google Auth Handler] Initializing GoogleProvider with customParameters: prompt='${provider.customParameters.prompt}' for account: ${email}`);

    setTimeout(() => {
      loginWithGoogle(email, name);
      setIsProcessing(false);
      setIsUsingOtherAccount(false);
      setCustomEmail('');
      setCustomName('');
      onClose();
    }, 400);
  };

  const handleCustomFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = customEmail.trim();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      showToast('Vui lòng nhập địa chỉ Gmail hoặc email Google hợp lệ!', '⚠️');
      return;
    }
    const name = customName.trim() || trimmedEmail.split('@')[0];
    handleSelectGoogleAccount(trimmedEmail, name);
  };

  /**
   * Yêu cầu 5: Cập nhật hàm Đăng xuất (Logout) để xóa sạch phiên làm việc (Session),
   * localStorage và đưa ứng dụng về trạng thái Khách (Guest) hoàn toàn.
   */
  const handleLogout = () => {
    logoutAuth();
    setIsUsingOtherAccount(false);
    setCustomEmail('');
    setCustomName('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-3xl border border-rose-500/40 bg-slate-900 p-5 sm:p-7 shadow-2xl space-y-5 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md shrink-0">
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
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">
                {isGoogleLoggedIn ? 'Tài Khoản Google Đã Đăng Nhập' : 'Đăng Nhập Bằng Google'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isGoogleLoggedIn
                  ? 'Đang kết nối & bảo lưu tiến độ Nihongo Quest'
                  : 'Chọn hoặc nhập tài khoản Google để tiếp tục'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Yêu cầu 4: Banner cấu hình prompt: 'select_account' */}
        <div className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 text-amber-400 font-mono font-semibold">
            <KeyRound className="w-3.5 h-3.5" />
            <span>prompt: 'select_account'</span>
          </span>
          <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
            Luôn hiển thị chọn tài khoản
          </span>
        </div>

        {/* Trạng thái 1: Người dùng ĐÃ đăng nhập bằng Google */}
        {isGoogleLoggedIn ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-xl font-bold text-emerald-300 shrink-0">
                {user.authProfile?.displayName?.[0]?.toUpperCase() || 'G'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-sm text-white truncate">
                    {user.authProfile?.displayName}
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                    Đã xác thực Google
                  </span>
                </div>
                <div className="text-xs text-slate-400 truncate flex items-center gap-1 mt-0.5">
                  <Mail className="w-3 h-3 text-slate-500" />
                  <span>{user.authProfile?.email}</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Tiến độ học tập và kho kiến thức đang được đồng bộ</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Cấp độ: Level {user.level} • {user.xp} XP • {Object.keys(user.customKnowledge || {}).length} thẻ tự tạo cá nhân
              </p>
            </div>

            {/* Yêu cầu 5: Nút Đăng xuất sạch và đổi tài khoản */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2">
              <button
                onClick={handleLogout}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-red-900/60 hover:bg-red-950/50 text-red-400 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Đăng xuất (Về Khách)</span>
              </button>

              <button
                onClick={() => {
                  logoutAuth();
                  setIsUsingOtherAccount(true);
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Đổi tài khoản Google khác</span>
              </button>
            </div>
          </div>
        ) : (
          /* Trạng thái 2: Chưa đăng nhập (Chế độ Khách / Guest Mode) */
          <div className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              Chọn tài khoản Google của bạn để đăng nhập. Hệ thống sẽ luôn hiển thị màn hình chọn tài khoản (<code className="text-amber-300 font-mono">select_account</code>) để bạn chủ động quản lý.
            </p>

            {isProcessing ? (
              <div className="py-8 flex flex-col items-center justify-center gap-3 text-center">
                <div className="w-10 h-10 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-semibold text-slate-300">
                  Đang khởi tạo phiên Google với prompt: 'select_account'...
                </span>
              </div>
            ) : !isUsingOtherAccount ? (
              /* Google Account Chooser List */
              <div className="space-y-2.5">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-2 space-y-1.5">
                  <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Chọn tài khoản Google:
                  </div>

                  {/* Tài khoản gợi ý 1 */}
                  <button
                    onClick={() => handleSelectGoogleAccount('nguyendongduc1991@gmail.com', 'Nguyễn Đông Đức')}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-900 border border-transparent hover:border-rose-500/30 text-left transition cursor-pointer group"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow">
                      Đ
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors truncate">
                        Nguyễn Đông Đức
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        nguyendongduc1991@gmail.com
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Đăng nhập ➔
                    </span>
                  </button>
                </div>

                {/* Nút sử dụng tài khoản khác */}
                <button
                  onClick={() => setIsUsingOtherAccount(true)}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 font-semibold text-xs transition cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>Sử dụng một tài khoản Google / Gmail khác...</span>
                </button>
              </div>
            ) : (
              /* Nhập email Google / Gmail thủ công */
              <form onSubmit={handleCustomFormSubmit} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Tên hiển thị Google / Kiếm Sĩ</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="VD: Kenji, Sakura..."
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-rose-500 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Địa chỉ Gmail của bạn *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      placeholder="tentaikhoan@gmail.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-rose-500 outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsUsingOtherAccount(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Quay lại</span>
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-rose-950 transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Xác nhận đăng nhập</span>
                  </button>
                </div>
              </form>
            )}

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Mặc định ứng dụng luôn bắt đầu ở <strong>Chế độ Khách (Guest Mode)</strong>. Bạn cần chủ động bấm nút "Đăng nhập bằng Google" để liên kết tài khoản.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
