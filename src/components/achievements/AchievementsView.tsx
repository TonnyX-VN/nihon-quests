import React from 'react';
import { useGame } from '../../context/GameContext';
import { INITIAL_ACHIEVEMENTS } from '../../data/achievements';
import { Trophy, CheckCircle2, Lock, Sparkles } from 'lucide-react';

export const AchievementsView: React.FC = () => {
  const { user } = useGame();

  const achievementsWithStatus = INITIAL_ACHIEVEMENTS.map((ach) => {
    const isUnlocked = user.unlockedAchievements.includes(ach.id);
    let current = ach.current;
    if (ach.id === 'first_step') {
      current = Object.values(user.completedStages).filter((s) => s.completed).length;
    } else if (ach.id === 'streak_7') {
      current = user.streak;
    } else if (ach.id === 'battle_master') {
      current = user.battlesWon;
    } else if (ach.id === 'kanji_hunter') {
      current = user.kanjiLearnedCount;
    } else if (ach.id === 'n3_challenger') {
      current = user.completedStages['n4_stage_6']?.completed ? 1 : 0;
    }

    return {
      ...ach,
      isUnlocked,
      current: Math.min(ach.target, current)
    };
  });

  const unlockedCount = achievementsWithStatus.filter((a) => a.isUnlocked).length;
  const total = achievementsWithStatus.length;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-purple-500/40 bg-gradient-to-br from-slate-900 via-purple-950/30 to-slate-950 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold">
              <Trophy className="w-3.5 h-3.5" />
              <span>DANH HIỆU & HUY HIỆU DANH DỰ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Bảng Vàng Thành Tích Kiếm Sĩ
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Vượt qua các cột mốc lịch sử trong quá trình chinh phục tiếng Nhật để khẳng định thực lực và nhận thưởng XP danh giá.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-purple-500/40 rounded-2xl p-4 flex items-center gap-3 shrink-0 shadow-inner">
            <Trophy className="w-8 h-8 text-amber-400" />
            <div>
              <div className="text-xs text-slate-400">Đã mở khóa</div>
              <div className="text-lg font-bold text-amber-400">
                {unlockedCount} / {total} Huy hiệu
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${(unlockedCount / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid of Achievements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievementsWithStatus.map((ach) => {
          const percent = Math.min(100, Math.round((ach.current / ach.target) * 100));

          return (
            <div
              key={ach.id}
              className={`p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                ach.isUnlocked
                  ? 'bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-950 border-purple-500/60 shadow-lg ring-1 ring-purple-500/30'
                  : 'bg-slate-950/60 border-slate-800/80 opacity-70'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 border ${
                  ach.isUnlocked
                    ? 'bg-purple-600/30 border-purple-400 shadow-md ring-2 ring-purple-400/40'
                    : 'bg-slate-900 border-slate-800 grayscale'
                }`}
              >
                {ach.icon}
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-white truncate">
                    {user.language === 'vi' ? ach.titleVi : ach.titleJp}
                  </h3>
                  {ach.isUnlocked ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-400 shrink-0 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Đạt</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-500 shrink-0 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>Khóa</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {user.language === 'vi' ? ach.descVi : ach.descJp}
                </p>

                <div className="pt-2">
                  <div className="flex justify-between text-[11px] font-medium text-slate-400 mb-1">
                    <span>
                      Tiến độ: {ach.current} / {ach.target}
                    </span>
                    <span className="text-amber-400 font-bold">+{ach.rewardXp} XP</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-amber-400 rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
