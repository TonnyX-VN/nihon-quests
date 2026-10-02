import React from 'react';
import { useGame } from '../../context/GameContext';
import { REGIONS } from '../../data/stages';
import { JLPTLevel, Stage } from '../../types/game';
import { Lock, CheckCircle2, Play, Star, Sparkles, Shield, ChevronRight } from 'lucide-react';

export const WorldMapView: React.FC = () => {
  const { user, selectedLevel, setSelectedLevel, setActiveStage, setBreadcrumbs } = useGame();

  // Find the selected region
  const currentRegion = REGIONS.find((r) => r.id === selectedLevel) || REGIONS[0];

  const handleStageClick = (stage: Stage, isUnlocked: boolean) => {
    if (!isUnlocked) return;
    setActiveStage(stage);
    setBreadcrumbs(['Bản Đồ', selectedLevel, currentRegion.nameVi, `Stage ${stage.stageNumber}: ${stage.titleVi}`]);
  };

  // Check stage unlock status sequentially:
  // First stage of N5 is always unlocked.
  // Stage N is unlocked if stage N-1 is completed.
  // For N4: First stage is unlocked if N5 boss is completed (or user level >= 4).
  // For N3: First stage is unlocked if N4 boss is completed (or user level >= 7).
  const isStageUnlocked = (stage: Stage, index: number, stages: Stage[]): boolean => {
    if (stage.level === 'N5') {
      if (index === 0) return true;
      const prevStage = stages[index - 1];
      return !!user.completedStages[prevStage.id]?.completed || user.level >= stage.requiredLevel;
    }
    if (stage.level === 'N4') {
      const n5BossCompleted = !!user.completedStages['n5_stage_6']?.completed || user.level >= 4;
      if (!n5BossCompleted) return false;
      if (index === 0) return true;
      const prevStage = stages[index - 1];
      return !!user.completedStages[prevStage.id]?.completed;
    }
    if (stage.level === 'N3') {
      const n4BossCompleted = !!user.completedStages['n4_stage_6']?.completed || user.level >= 7;
      if (!n4BossCompleted) return false;
      if (index === 0) return true;
      const prevStage = stages[index - 1];
      return !!user.completedStages[prevStage.id]?.completed;
    }
    return false;
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Level Region Selector Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 max-w-xl mx-auto">
        {REGIONS.map((region) => {
          const isSelected = selectedLevel === region.id;
          const isUnlocked =
            region.id === 'N5' ||
            (region.id === 'N4' && (user.completedStages['n5_stage_6']?.completed || user.level >= 4)) ||
            (region.id === 'N3' && (user.completedStages['n4_stage_6']?.completed || user.level >= 7));

          return (
            <button
              key={region.id}
              onClick={() => setSelectedLevel(region.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-950/60 scale-[1.02]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span className="text-lg">{region.icon}</span>
              <div className="text-left">
                <span className="block leading-none">{region.id}</span>
                <span className="text-[10px] font-normal opacity-80 block mt-0.5 truncate max-w-[90px] sm:max-w-none">
                  {region.nameVi.split(' ')[0]} {region.nameVi.split(' ')[1]}
                </span>
              </div>
              {!isUnlocked && <Lock className="w-3.5 h-3.5 ml-1 text-slate-500" />}
            </button>
          );
        })}
      </div>

      {/* Region Banner Header */}
      <div
        className={`relative overflow-hidden rounded-3xl border border-rose-900/40 ${currentRegion.bgGradient} p-6 sm:p-8 shadow-xl`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/60 border border-rose-500/30 text-rose-300 text-xs font-bold">
              <span>{currentRegion.icon}</span>
              <span>{currentRegion.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
              <span>{user.language === 'vi' ? currentRegion.nameVi : currentRegion.nameJp}</span>
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              {user.language === 'vi' ? currentRegion.subtitleVi : currentRegion.subtitleJp}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3 bg-slate-950/60 border border-slate-800 rounded-2xl px-4 py-3">
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block font-medium">Tiến độ khu vực</span>
              <span className="text-base font-bold text-amber-300">
                {currentRegion.stages.filter((s) => user.completedStages[s.id]?.completed).length} /{' '}
                {currentRegion.stages.length} Stage
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Sequential Stages Path Map */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 px-1">
          {user.language === 'vi' ? 'Danh sách các màn ải tuần tự' : 'ステージマップ一覧'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentRegion.stages.map((stage, idx) => {
            const unlocked = isStageUnlocked(stage, idx, currentRegion.stages);
            const completedInfo = user.completedStages[stage.id];
            const isCompleted = !!completedInfo?.completed;

            // Determine if this is the active next stage
            const isCurrent = unlocked && !isCompleted;

            return (
              <div
                key={stage.id}
                onClick={() => handleStageClick(stage, unlocked)}
                className={`relative group rounded-2xl p-5 border transition-all duration-200 select-none ${
                  !unlocked
                    ? 'bg-slate-950/40 border-slate-900 opacity-60 cursor-not-allowed'
                    : isCompleted
                    ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-950/40 cursor-pointer'
                    : isCurrent
                    ? 'bg-gradient-to-br from-slate-900 via-rose-950/50 to-slate-900 border-rose-500 ring-2 ring-rose-500/40 shadow-xl shadow-rose-950/70 cursor-pointer animate-pulse-glow'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 cursor-pointer'
                }`}
              >
                {/* Header: Stage number, Icon & Status */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md border ${
                        !unlocked
                          ? 'bg-slate-900 border-slate-800 text-slate-600'
                          : isCompleted
                          ? 'bg-emerald-950 border-emerald-600 text-emerald-400'
                          : isCurrent
                          ? 'bg-rose-600 border-rose-400 text-white shadow-rose-900/60'
                          : 'bg-slate-800 border-slate-700 text-white'
                      }`}
                    >
                      {stage.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Stage {stage.stageNumber}
                        </span>
                        {stage.bossHp && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-red-600 text-white animate-pulse">
                            BOSS
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-base text-white group-hover:text-rose-300 transition-colors">
                        {user.language === 'vi' ? stage.titleVi : stage.titleJp}
                      </h4>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {!unlocked ? (
                      <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-900/80 px-2 py-1 rounded-md border border-slate-800">
                        <Lock className="w-3 h-3" />
                        <span>{user.language === 'vi' ? 'Khóa' : '未開放'}</span>
                      </div>
                    ) : isCompleted ? (
                      <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded-md border border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{user.language === 'vi' ? 'Đã qua' : 'クリア'}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-[11px] font-bold text-rose-300 bg-rose-950/70 px-2.5 py-1 rounded-md border border-rose-500/50 animate-pulse">
                        <Play className="w-3 h-3 fill-rose-300" />
                        <span>{user.language === 'vi' ? 'Tiếp tục' : '挑戦'}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                  {user.language === 'vi' ? stage.descriptionVi : stage.descriptionJp}
                </p>

                {/* Footer: Mini-Game Type & Reward */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="capitalize text-slate-300 font-medium">
                      {stage.gameType.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 font-bold text-amber-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>+{stage.rewardXp} XP</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
