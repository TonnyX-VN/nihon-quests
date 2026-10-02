import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { getXpForLevel } from '../../services/storage';
import { REGIONS } from '../../data/stages';
import {
  User,
  Flame,
  Trophy,
  Swords,
  BookOpen,
  Sparkles,
  Shield,
  RotateCcw,
  Check,
  Edit2,
  Mail,
  Download,
  Upload,
  BookPlus,
  ShieldCheck,
  LogIn,
  LogOut
} from 'lucide-react';

const AVATAR_OPTIONS = ['🥷', '👘', '🦊', '⚔️', '🐉', '🌸', '⚡', '👺', '🏯', '🥋'];

export const ProfileView: React.FC = () => {
  const {
    user,
    updateUserAvatar,
    resetProgress,
    logoutAuth,
    openGoogleAuthModal,
    exportUserData,
    importUserData,
    setView,
    showToast
  } = useGame();

  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(user.username);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);

  const xpNeeded = getXpForLevel(user.level);
  const xpPercent = Math.min(100, Math.round((user.xp / xpNeeded) * 100));

  // Calculate N5, N4, N3 stage completion
  const n5Stages = REGIONS[0].stages;
  const n4Stages = REGIONS[1].stages;
  const n3Stages = REGIONS[2].stages;

  const n5Done = n5Stages.filter((s) => user.completedStages[s.id]?.completed).length;
  const n4Done = n4Stages.filter((s) => user.completedStages[s.id]?.completed).length;
  const n3Done = n3Stages.filter((s) => user.completedStages[s.id]?.completed).length;
  const customCount = Object.keys(user.customKnowledge || {}).length;
  const isGoogle = user.authProfile?.provider === 'google';

  const handleSaveProfile = () => {
    updateUserAvatar(selectedAvatar, tempUsername.trim() || user.username);
    setIsEditing(false);
  };

  const handleExport = () => {
    const data = exportUserData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nihongo_quest_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Đã tải xuống tệp sao lưu dữ liệu!', '💾');
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const success = importUserData(importJsonText);
    if (success) {
      setShowImportModal(false);
      setImportJsonText('');
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      {/* Hero Profile Card */}
      <div className="relative overflow-hidden rounded-3xl border border-rose-800/40 bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-950 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with editor */}
          <div className="relative group shrink-0">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 flex items-center justify-center text-5xl shadow-2xl ring-4 ring-rose-500/30">
              {isEditing ? selectedAvatar : user.avatar}
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-slate-900 border border-slate-700 text-rose-300 hover:text-white hover:bg-slate-800 shadow transition cursor-pointer"
              title="Đổi đại diện"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                    maxLength={20}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-rose-500 text-white font-bold text-lg outline-none"
                  />
                  <button
                    onClick={handleSaveProfile}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" /> Lưu
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {user.username}
                  </h1>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    Level {user.level}
                  </span>
                  {isGoogle && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Gmail xác thực</span>
                    </span>
                  )}
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              Chiến binh trên hành trình Nihongo Quest • Tổng tích lũy:{' '}
              <span className="font-bold text-amber-300">{user.totalXp} XP</span>
            </p>

            {/* Streak & Rank Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-950/60 border border-orange-500/40 text-orange-300 text-xs font-semibold">
                <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                <span>{user.streak} ngày liên tiếp</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-semibold">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>{user.unlockedAchievements.length} Danh hiệu</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold">
                <Swords className="w-4 h-4 text-rose-400" />
                <span>{user.battlesWon} Trận thắng</span>
              </div>
            </div>

            {/* XP progress bar */}
            <div className="pt-2">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Cấp độ tiếp theo (Level {user.level + 1})</span>
                <span className="text-amber-300 font-bold">{user.xp} / {xpNeeded} XP</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-red-500 rounded-full transition-all"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Picker popup if editing */}
        {isEditing && (
          <div className="mt-6 pt-5 border-t border-slate-800 space-y-2 animate-fadeIn">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Chọn Avatar đại diện:
            </div>
            <div className="flex flex-wrap gap-2">
              {AVATAR_OPTIONS.map((av) => (
                <button
                  key={av}
                  onClick={() => setSelectedAvatar(av)}
                  className={`w-11 h-11 rounded-xl text-2xl flex items-center justify-center transition cursor-pointer ${
                    selectedAvatar === av
                      ? 'bg-rose-600 ring-2 ring-rose-400 scale-110 shadow-lg'
                      : 'bg-slate-900 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Google / Gmail Account Status Section */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
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
            <h4 className="font-bold text-sm text-white">
              {isGoogle ? 'Tài Khoản Gmail Đã Kết Nối' : 'Đăng Nhập Với Gmail'}
            </h4>
            <p className="text-xs text-slate-400">
              {isGoogle
                ? user.authProfile?.email
                : 'Đăng nhập để tự động sao lưu dữ liệu và lưu giữ kho thẻ kiến thức'}
            </p>
          </div>
        </div>

        <div>
          {isGoogle ? (
            <div className="flex items-center gap-2">
              <button
                onClick={openGoogleAuthModal}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                Chi tiết tài khoản
              </button>
              <button
                onClick={logoutAuth}
                className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-900/50 text-red-400 transition cursor-pointer"
                title="Đăng xuất về trạng thái Khách"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={openGoogleAuthModal}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs shadow-md transition cursor-pointer flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5 text-rose-600" />
              <span>Đăng nhập bằng Google</span>
            </button>
          )}
        </div>
      </div>

      {/* JLPT Levels Mastery Breakdown */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Tiến Độ Chinh Phục Cấp Độ JLPT
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* N5 */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-pink-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-pink-300">🌸 N5 Sơ Cấp (Làng Sakura)</span>
              <span className="text-xs font-bold text-white">{n5Done}/{n5Stages.length}</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-pink-500 transition-all"
                style={{ width: `${(n5Done / n5Stages.length) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Hiragana, Katakana, Trợ từ は/が/を/に/で, Thời gian, Động từ cơ bản
            </p>
          </div>

          {/* N4 */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-cyan-300">🏙️ N4 Trung Cấp I (Tokyo)</span>
              <span className="text-xs font-bold text-white">{n4Done}/{n4Stages.length}</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-500 transition-all"
                style={{ width: `${(n4Done / n4Stages.length) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Thể て/ない/た, ように, ために, ことになる/にする, ば, なら, たら
            </p>
          </div>

          {/* N3 */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-amber-300">🏯 N3 Trung Cấp II (Samurai)</span>
              <span className="text-xs font-bold text-white">{n3Done}/{n3Stages.length}</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all"
                style={{ width: `${(n3Done / n3Stages.length) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              わけではない, わりに, に対して, に基づいて, 恐れがある, Kính ngữ thương mại
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Learning Stats & Custom Knowledge */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
          <span className="text-2xl">📖</span>
          <div className="text-xl font-bold text-white">{user.vocabLearnedCount}</div>
          <div className="text-xs text-slate-400">Từ vựng đã học</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
          <span className="text-2xl">🈶</span>
          <div className="text-xl font-bold text-white">{user.kanjiLearnedCount}</div>
          <div className="text-xs text-slate-400">Kanji thành thạo</div>
        </div>

        <div
          onClick={() => setView('custom_knowledge')}
          className="p-4 rounded-xl bg-slate-900/60 border border-amber-500/40 text-center space-y-1 cursor-pointer hover:bg-slate-900 transition"
        >
          <span className="text-2xl">💎</span>
          <div className="text-xl font-bold text-amber-300">{customCount}</div>
          <div className="text-xs text-amber-400 font-semibold">Thẻ tự thêm ➔</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
          <span className="text-2xl">⚔️</span>
          <div className="text-xl font-bold text-white">{user.battlesWon}</div>
          <div className="text-xs text-slate-400">Màn chơi chiến thắng</div>
        </div>
      </div>

      {/* Data Backup & Restore */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Download className="w-4 h-4 text-rose-400" />
            <span>Sao Lưu & Đồng Bộ Dữ Liệu</span>
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Xuất hoặc nhập dữ liệu tiến độ và kho thẻ kiến thức cá nhân của bạn.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Sao lưu JSON</span>
          </button>
          <button
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Khôi phục JSON</span>
          </button>
        </div>
      </div>

      {/* Reset Progress Section */}
      <div className="p-5 rounded-2xl bg-slate-950/80 border border-red-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-red-400 flex items-center gap-1.5">
            <RotateCcw className="w-4 h-4" />
            <span>Thiết lập lại tiến độ chơi</span>
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Xóa toàn bộ điểm số, cấp độ và bắt đầu lại cuộc phiêu lưu từ đầu.
          </p>
        </div>

        <div>
          {showResetConfirm ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  resetProgress();
                  setShowResetConfirm(false);
                }}
                className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs cursor-pointer"
              >
                Xác nhận xóa
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs cursor-pointer"
              >
                Hủy
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-3.5 py-1.5 rounded-lg border border-red-900/50 hover:bg-red-950/40 text-red-400 font-semibold text-xs transition cursor-pointer"
            >
              Đặt lại tiến độ
            </button>
          )}
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">Nhập Dữ Liệu Sao Lưu</h3>
              <button onClick={() => setShowImportModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <textarea
              rows={6}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder="Dán nội dung JSON vào đây..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 outline-none focus:border-rose-500"
            />
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setShowImportModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300">
                Hủy
              </button>
              <button onClick={handleImport} className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white shadow">
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
