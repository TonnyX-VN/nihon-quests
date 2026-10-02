import React from 'react';
import { useGame } from '../../context/GameContext';
import { ViewTab } from '../../types/game';
import { Home, Compass, Swords, GraduationCap, Target, Trophy, User, BookOpen, BookPlus, Sparkles } from 'lucide-react';

interface NavItem {
  id: ViewTab;
  labelVi: string;
  labelJp: string;
  icon: React.ReactNode;
  badge?: number;
}

export const Navigation: React.FC = () => {
  const { view, setView, user } = useGame();
  const wrongCount = Object.keys(user.wrongQuestions || {}).length;
  const customCount = Object.keys(user.customKnowledge || {}).length;

  const navItems: NavItem[] = [
    {
      id: 'home',
      labelVi: 'Trang chủ',
      labelJp: 'ホーム',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'map',
      labelVi: 'Bản đồ',
      labelJp: 'ワールドマップ',
      icon: <Compass className="w-5 h-5" />
    },
    {
      id: 'battle',
      labelVi: 'Battle',
      labelJp: 'バトル',
      icon: <Swords className="w-5 h-5" />
    },
    {
      id: 'custom_knowledge',
      labelVi: 'Kho thẻ tự tạo',
      labelJp: '自作カード',
      icon: <BookPlus className="w-5 h-5" />,
      badge: customCount
    },
    {
      id: 'study',
      labelVi: 'Học & Sensei',
      labelJp: '学習・先生',
      icon: <GraduationCap className="w-5 h-5" />
    },
    {
      id: 'daily',
      labelVi: 'Daily Quest',
      labelJp: 'デイリー',
      icon: <Target className="w-5 h-5" />
    },
    {
      id: 'achievements',
      labelVi: 'Thành tích',
      labelJp: '実績・称号',
      icon: <Trophy className="w-5 h-5" />
    },
    {
      id: 'profile',
      labelVi: 'Profile',
      labelJp: 'プロフィール',
      icon: <User className="w-5 h-5" />
    },
    {
      id: 'review',
      labelVi: 'Ôn tập',
      labelJp: '復習ノート',
      icon: <BookOpen className="w-5 h-5" />,
      badge: wrongCount
    }
  ];

  // Mobile primary items
  const mobileNavItems: NavItem[] = [
    {
      id: 'home',
      labelVi: 'Trang chủ',
      labelJp: 'ホーム',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'map',
      labelVi: 'Bản đồ',
      labelJp: 'マップ',
      icon: <Compass className="w-5 h-5" />
    },
    {
      id: 'battle',
      labelVi: 'Battle',
      labelJp: 'バトル',
      icon: <Swords className="w-5 h-5" />
    },
    {
      id: 'custom_knowledge',
      labelVi: 'Kho thẻ',
      labelJp: '自作',
      icon: <BookPlus className="w-5 h-5" />,
      badge: customCount
    },
    {
      id: 'study',
      labelVi: 'Sensei',
      labelJp: '先生',
      icon: <GraduationCap className="w-5 h-5" />
    },
    {
      id: 'profile',
      labelVi: 'Hồ sơ',
      labelJp: 'マイページ',
      icon: <User className="w-5 h-5" />
    }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-950/70 border-r border-rose-900/30 p-4 shrink-0 h-[calc(100vh-61px)] sticky top-[61px] select-none justify-between overflow-y-auto">
        <div className="space-y-1.5">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-rose-400/80 flex items-center justify-between">
            <span>{user.language === 'vi' ? 'Hành trình kiếm sĩ' : 'メインメニュー'}</span>
            <span className="text-[10px] text-amber-400 font-semibold">{user.totalXp} XP</span>
          </div>

          {navItems.map((item) => {
            const isActive = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-900/80 to-rose-950/60 text-white border border-rose-500/50 shadow-md shadow-rose-950/60 translate-x-1'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/80 hover:translate-x-0.5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`transition-colors ${
                      isActive ? 'text-rose-400' : 'text-slate-400 group-hover:text-rose-400'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className={user.language === 'jp' ? 'font-jp text-xs' : ''}>
                    {user.language === 'vi' ? item.labelVi : item.labelJp}
                  </span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className="px-1.5 py-0.5 text-[11px] font-bold rounded-full bg-rose-600 text-white">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Mini Player Badge at bottom of sidebar */}
        <div
          onClick={() => setView('profile')}
          className="cursor-pointer p-3 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/40 transition group mt-4 shrink-0"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-600 to-amber-600 flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
              {user.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate flex items-center gap-1">
                <span>{user.username}</span>
                {user.authProfile?.provider === 'google' && (
                  <span className="text-[10px] text-emerald-400">✓</span>
                )}
              </div>
              <div className="text-[11px] text-amber-400">Level {user.level} Samurai</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (Optimized for touch phones) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-rose-950/60 px-2 py-1.5 flex items-center justify-around shadow-[0_-8px_25px_rgba(0,0,0,0.7)] safe-area-pb">
        {mobileNavItems.map((item) => {
          const isActive = view === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2 rounded-xl transition duration-150 cursor-pointer min-w-[50px] ${
                isActive
                  ? 'text-rose-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1 -right-2 px-1 text-[9px] font-bold rounded-full bg-rose-600 text-white leading-tight">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className={`text-[10px] mt-0.5 truncate max-w-[56px] text-center leading-tight ${user.language === 'jp' ? 'font-jp' : ''}`}>
                {user.language === 'vi' ? item.labelVi : item.labelJp}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-3 h-0.5 bg-rose-500 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
};
