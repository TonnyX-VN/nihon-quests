import React from 'react';
import { useGame } from '../../context/GameContext';
import { getXpForLevel } from '../../services/storage';
import { Volume2, VolumeX, BookOpen, Flame, Sparkles, BookPlus } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, toggleSound, toggleFurigana, setLanguage, setView, openGoogleAuthModal } = useGame();

  const xpNeeded = getXpForLevel(user.level);
  const xpPercent = Math.min(100, Math.round((user.xp / xpNeeded) * 100));
  const wrongCount = Object.keys(user.wrongQuestions).length;
  const customCount = Object.keys(user.customKnowledge || {}).length;
  const isGoogle = user.authProfile?.provider === 'google' && user.authProfile?.isLoggedIn;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-rose-900/30 bg-slate-950/90 backdrop-blur-md px-3 sm:px-4 py-2 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand / Logo */}
          <div
            onClick={() => setView('home')}
            className="flex items-center gap-2 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-950/60 ring-2 ring-rose-400/30 group-hover:scale-105 transition-transform">
              <span className="text-lg sm:text-xl">🌸</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-rpg font-bold text-sm sm:text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-white to-amber-200">
                  NIHONGO QUEST
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold px-1 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 hidden xs:inline-block">
                  RPG
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-jp text-rose-300/80 -mt-0.5">日本語クエスト</p>
            </div>
          </div>

          {/* Level & XP Bar (RPG Header Status) */}
          <div className="hidden md:flex items-center gap-3 bg-slate-900/90 border border-rose-900/40 rounded-xl px-3.5 py-1.5 shadow-inner">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-bold text-xs text-slate-950 shadow">
                Lv{user.level}
              </div>
              <div className="w-28 lg:w-36">
                <div className="flex justify-between text-[11px] font-medium text-slate-300 mb-1">
                  <span className="text-amber-300 font-semibold">{user.xp} XP</span>
                  <span className="text-slate-400">/{xpNeeded}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-500 ease-out"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="h-5 w-px bg-slate-800" />

            {/* Streak indicator */}
            <div className="flex items-center gap-1.5 text-orange-400 font-semibold text-xs px-2 py-0.5 rounded-lg bg-orange-950/40 border border-orange-500/30">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              <span>{user.streak} {user.language === 'vi' ? 'ngày liên tiếp' : '日連続'}</span>
            </div>
          </div>

          {/* Right Controls: Google Auth, Custom Knowledge, Review, Audio, Lang */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Google / Gmail Auth Button */}
            <button
              onClick={openGoogleAuthModal}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                isGoogle
                  ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/50'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-rose-500/50 hover:text-white'
              }`}
              title={isGoogle ? `Đã đăng nhập Google: ${user.authProfile?.email}` : 'Đăng nhập bằng Google'}
            >
              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shrink-0">
                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24">
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
              <span className="hidden sm:inline max-w-[80px] lg:max-w-[120px] truncate">
                {isGoogle ? user.authProfile?.displayName?.split(' ')[0] || 'Google' : 'Đăng nhập Google'}
              </span>
            </button>

            {/* Custom Knowledge quick button */}
            <button
              onClick={() => setView('custom_knowledge')}
              title="Kho kiến thức tự thêm"
              className="relative flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800 transition text-xs text-slate-200"
            >
              <BookPlus className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline font-medium">Kho thẻ</span>
              {customCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500/30 text-amber-300 border border-amber-500/40">
                  {customCount}
                </span>
              )}
            </button>

            {/* Review Notebook quick button */}
            <button
              onClick={() => setView('review')}
              title="Sổ tay câu sai cần ôn"
              className="relative flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-slate-900 border border-rose-900/40 hover:border-rose-500/60 hover:bg-slate-800 transition text-xs text-slate-200"
            >
              <BookOpen className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline font-medium">
                {user.language === 'vi' ? 'Ôn tập' : '復習'}
              </span>
              {wrongCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-600 text-white animate-pulse">
                  {wrongCount}
                </span>
              )}
            </button>

            {/* Furigana toggle */}
            <button
              onClick={toggleFurigana}
              title={user.furiganaEnabled ? 'Tắt Furigana' : 'Bật Furigana'}
              className={`px-2 py-1.5 rounded-lg text-xs font-bold font-jp border transition ${
                user.furiganaEnabled
                  ? 'bg-rose-950/60 border-rose-500/60 text-rose-300 shadow-sm shadow-rose-900/40'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              ふ
            </button>

            {/* Sound toggle */}
            <button
              onClick={toggleSound}
              title={user.soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
              className={`p-2 rounded-lg border transition ${
                user.soundEnabled
                  ? 'bg-slate-900 border-rose-900/40 text-amber-300 hover:bg-slate-800'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400'
              }`}
            >
              {user.soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Language Switch VI / JP */}
            <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-xs font-bold">
              <button
                onClick={() => setLanguage('vi')}
                className={`px-1.5 sm:px-2 py-1 rounded-md transition text-[11px] sm:text-xs ${
                  user.language === 'vi'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                VI
              </button>
              <button
                onClick={() => setLanguage('jp')}
                className={`px-1.5 sm:px-2 py-1 rounded-md transition font-jp text-[11px] sm:text-xs ${
                  user.language === 'jp'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                JP
              </button>
            </div>
          </div>
        </div>
      </header>
  );
};
