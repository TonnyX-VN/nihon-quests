import React from 'react';
import { Stage } from '../../types/game';
import { Trophy, Star, Sparkles, Flame, CheckCircle2, ArrowRight } from 'lucide-react';

interface StageClearModalProps {
  stage: Stage;
  earnedXp: number;
  maxCombo: number;
  accuracy: number;
  onContinue: () => void;
}

export const StageClearModal: React.FC<StageClearModalProps> = ({
  stage,
  earnedXp,
  maxCombo,
  accuracy,
  onContinue,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-md rounded-3xl border border-rose-500/50 bg-gradient-to-b from-slate-900 via-rose-950/50 to-slate-950 p-6 sm:p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
        {/* Glow lights */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Victory Emblem */}
        <div className="relative">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-4xl shadow-xl ring-4 ring-amber-400/40 animate-bounce">
            🎉
          </div>
          <div className="mt-4">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-widest">
              Stage Clear! • 攻略完了
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              CHÚC MỪNG CHIẾN THẮNG!
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Bạn đã hoàn thành xuất sắc thử thách: {stage.titleVi}
            </p>
          </div>
        </div>

        {/* Reward Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 shadow-inner">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Phần thưởng</span>
            <div className="text-base sm:text-lg font-bold text-amber-400 flex items-center justify-center gap-0.5">
              <Sparkles className="w-4 h-4" />
              <span>+{earnedXp}</span>
            </div>
            <span className="text-[10px] text-slate-400">XP</span>
          </div>

          <div className="space-y-1 border-x border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Liên kích</span>
            <div className="text-base sm:text-lg font-bold text-orange-400 flex items-center justify-center gap-0.5">
              <Flame className="w-4 h-4 fill-orange-400" />
              <span>x{maxCombo}</span>
            </div>
            <span className="text-[10px] text-slate-400">Combo Max</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Độ chuẩn xác</span>
            <div className="text-base sm:text-lg font-bold text-emerald-400 flex items-center justify-center gap-0.5">
              <Star className="w-4 h-4 fill-emerald-400" />
              <span>{accuracy}%</span>
            </div>
            <span className="text-[10px] text-slate-400">Chính xác</span>
          </div>
        </div>

        {/* Stars */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map((starIdx) => (
            <div
              key={starIdx}
              className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400"
            >
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={onContinue}
            className="w-full py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 text-white shadow-xl shadow-rose-950/80 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Tiếp tục hành trình</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
