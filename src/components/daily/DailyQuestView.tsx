import React from 'react';
import { useGame } from '../../context/GameContext';
import { Target, Trophy, Sparkles, CheckCircle2, Flame, ArrowRight } from 'lucide-react';

export const DailyQuestView: React.FC = () => {
  const { user, claimDailyQuest, setView } = useGame();

  const totalQuests = user.dailyQuests.length;
  const completedCount = user.dailyQuests.filter((q) => q.current >= q.target).length;
  const claimedCount = user.dailyQuests.filter((q) => q.isClaimed).length;
  const isAllClaimed = claimedCount === totalQuests;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-950 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
              <Target className="w-3.5 h-3.5" />
              <span>NHIỆM VỤ HÀNG NGÀY • DAILY QUEST</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Thực Thi Sứ Mệnh Mỗi Ngày
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Tích lũy XP, củng cố kiến thức đều đặn để duy trì ngọn lửa chuỗi ngày (Streak) và nhận rương báu 300 XP!
            </p>
          </div>

          {/* Daily Streak summary */}
          <div className="bg-slate-950/80 border border-orange-500/40 rounded-2xl p-4 flex items-center gap-3 shrink-0 shadow-inner">
            <Flame className="w-8 h-8 text-orange-500 animate-pulse" />
            <div>
              <div className="text-xs text-slate-400 font-medium">Chuỗi ngày học</div>
              <div className="text-lg font-bold text-orange-400">
                {user.streak} ngày liên tiếp
              </div>
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
            <span>Tiến độ hoàn thành</span>
            <span className="text-amber-400">{completedCount} / {totalQuests} Nhiệm vụ</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / totalQuests) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quests List */}
      <div className="space-y-3">
        {user.dailyQuests.map((quest) => {
          const isFinished = quest.current >= quest.target;
          const percent = Math.min(100, Math.round((quest.current / quest.target) * 100));

          return (
            <div
              key={quest.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                quest.isClaimed
                  ? 'bg-slate-950/50 border-slate-800/60 opacity-60'
                  : isFinished
                  ? 'bg-gradient-to-r from-amber-950/30 to-slate-900 border-amber-500/50 shadow-md ring-1 ring-amber-500/30'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shrink-0 border ${
                    quest.isClaimed
                      ? 'bg-emerald-950 border-emerald-600 text-emerald-400'
                      : isFinished
                      ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-md'
                      : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  {quest.isClaimed ? '✓' : isFinished ? '★' : '□'}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      {user.language === 'vi' ? quest.titleVi : quest.titleJp}
                    </h3>
                    <span className="text-xs font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      +{quest.rewardXp} XP
                    </span>
                  </div>

                  <p className="text-xs text-slate-400">
                    {user.language === 'vi' ? quest.descVi : quest.descJp}
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <div className="w-36 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {quest.current} / {quest.target}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="sm:self-center shrink-0">
                {quest.isClaimed ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Đã nhận thưởng</span>
                  </span>
                ) : isFinished ? (
                  <button
                    onClick={() => claimDailyQuest(quest.id)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-950/80 animate-pulse transition cursor-pointer"
                  >
                    Nhận +{quest.rewardXp} XP
                  </button>
                ) : (
                  <button
                    onClick={() => setView('battle')}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                  >
                    Thực hiện ngay
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bonus Reward Box for All Complete */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/50 via-slate-900 to-rose-950/50 border border-purple-500/40 text-center space-y-3 shadow-xl">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-3xl shadow-inner">
          🏆
        </div>
        <h3 className="font-extrabold text-lg text-white">
          RƯƠNG BÁU HOÀN THÀNH TẤT CẢ (DAILY COMPLETE)
        </h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Hoàn thành toàn bộ nhiệm vụ trong ngày để tự động mở khóa phần thưởng tối cao +300 XP danh vọng!
        </p>
        <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 font-bold text-xs">
          {isAllClaimed ? '🎉 Đã nhận toàn bộ phần thưởng hôm nay!' : 'Đang chờ bạn hoàn thành các thử thách'}
        </div>
      </div>
    </div>
  );
};
