import React, { useState } from 'react';
import { LearningItem, Stage } from '../../types/game';
import { soundService } from '../../services/sound';
import { Shield, Swords, Flame, Heart, ArrowRight, Skull } from 'lucide-react';

interface BossBattleProps {
  item: LearningItem;
  stage: Stage;
  furiganaEnabled: boolean;
  combo: number;
  bossCurrentHp: number;
  playerCurrentHp: number;
  onBossDamage: (damage: number) => void;
  onPlayerDamage: (damage: number) => void;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

export const BossBattle: React.FC<BossBattleProps> = ({
  item,
  stage,
  furiganaEnabled,
  combo,
  bossCurrentHp,
  playerCurrentHp,
  onBossDamage,
  onPlayerDamage,
  onAnswer,
  onNext,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [answeredState, setAnsweredState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [bossHitAnim, setBossHitAnim] = useState(false);
  const [playerHitAnim, setPlayerHitAnim] = useState(false);

  const maxBossHp = stage.bossHp || 100;
  const bossHpPercent = Math.max(0, Math.min(100, Math.round((bossCurrentHp / maxBossHp) * 100)));
  const playerHpPercent = Math.max(0, Math.min(100, Math.round((playerCurrentHp / 100) * 100)));

  const handleSelect = (choice: string) => {
    if (answeredState !== 'idle') return;
    setSelectedChoice(choice);

    const isCorrect = choice === item.correctAnswer;
    if (isCorrect) {
      setAnsweredState('correct');
      setBossHitAnim(true);
      soundService.play('bossHit');
      soundService.play('correct');

      // Calculate damage: Base 35 damage + combo bonus
      let damage = 35;
      if (combo >= 2) damage += 15;
      if (combo >= 5) damage += 25;

      setTimeout(() => {
        setBossHitAnim(false);
      }, 600);

      onBossDamage(damage);
      onAnswer(true);
    } else {
      setAnsweredState('wrong');
      setPlayerHitAnim(true);
      soundService.play('damage');

      setTimeout(() => {
        setPlayerHitAnim(false);
      }, 600);

      onPlayerDamage(20);
      onAnswer(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Boss vs Player Arena Display */}
      <div className="rounded-3xl bg-gradient-to-b from-red-950/40 via-slate-900 to-slate-950 border border-red-700/50 p-6 shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-1/4 w-40 h-40 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-2 gap-4 items-center">
          {/* Boss Section */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="relative">
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-red-700 to-amber-700 flex items-center justify-center text-4xl sm:text-5xl shadow-2xl ring-4 ring-red-500/40 transition-transform ${
                  bossHitAnim ? 'scale-90 rotate-6 filter brightness-150 animate-shake' : 'animate-float'
                }`}
              >
                {stage.bossAvatar || '👹'}
              </div>
              {bossHitAnim && (
                <div className="absolute -top-3 -right-3 text-red-400 font-extrabold text-sm sm:text-base animate-bounce">
                  -CRITICAL!
                </div>
              )}
            </div>

            <div>
              <div className="font-extrabold text-sm sm:text-base text-red-200">
                {stage.bossName || 'Đại Ma Vương'}
              </div>
              <div className="text-[10px] text-red-400 font-semibold uppercase tracking-wider">
                BOSS JLPT {stage.level}
              </div>
            </div>

            {/* Boss HP Bar */}
            <div className="w-full max-w-[160px] space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-red-300">
                <span>HP</span>
                <span>{Math.max(0, bossCurrentHp)} / {maxBossHp}</span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-red-950">
                <div
                  className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-red-400 transition-all duration-300"
                  style={{ width: `${bossHpPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Player Section */}
          <div className="flex flex-col items-center text-center space-y-2 border-l border-slate-800 pl-4">
            <div className="relative">
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-emerald-600 to-cyan-600 flex items-center justify-center text-4xl sm:text-5xl shadow-2xl ring-4 ring-emerald-500/40 transition-transform ${
                  playerHitAnim ? 'scale-90 -rotate-6 filter contrast-150' : ''
                }`}
              >
                🥷
              </div>
              {playerHitAnim && (
                <div className="absolute -top-3 -right-3 text-rose-400 font-extrabold text-sm sm:text-base animate-bounce">
                  -20 HP!
                </div>
              )}
            </div>

            <div>
              <div className="font-extrabold text-sm sm:text-base text-emerald-200">
                Kiếm Sĩ Tiếng Nhật
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                CẤP ĐỘ {stage.level}
              </div>
            </div>

            {/* Player HP Bar */}
            <div className="w-full max-w-[160px] space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-emerald-300">
                <span>HP</span>
                <span>{Math.max(0, playerCurrentHp)} / 100</span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-emerald-950">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                  style={{ width: `${playerHpPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Battle Question */}
      <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-5 text-center shadow-lg space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-red-400">ĐÒN TẤN CÔNG THỰC CHIẾN</span>
          {combo > 1 && (
            <span className="font-bold text-amber-400 flex items-center gap-1 animate-pulse">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              Sát thương x{combo >= 5 ? '2.0' : '1.5'}
            </span>
          )}
        </div>

        <div className="text-xl sm:text-2xl font-extrabold text-white font-jp py-2">
          {item.question}
        </div>
        {item.furigana && furiganaEnabled && (
          <div className="text-xs text-rose-300 font-jp">
            「{item.furigana}」
          </div>
        )}
      </div>

      {/* 4 Choices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {item.choices.map((choice, idx) => {
          const isSelected = selectedChoice === choice;
          const isCorrect = choice === item.correctAnswer;

          let btnClass = 'bg-slate-900/90 border-slate-800 hover:border-red-500/50 text-slate-200';
          if (answeredState !== 'idle') {
            if (isCorrect) {
              btnClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50';
            } else if (isSelected) {
              btnClass = 'bg-rose-950/80 border-rose-500 text-rose-200';
            } else {
              btnClass = 'bg-slate-950/50 border-slate-900 text-slate-600 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(choice)}
              disabled={answeredState !== 'idle'}
              className={`p-4 rounded-xl border text-left font-bold text-sm transition-all duration-150 flex items-center justify-between cursor-pointer ${btnClass}`}
            >
              <span>{choice}</span>
              <span className="text-xs text-slate-500 font-mono px-2 py-0.5 rounded bg-slate-950/60">
                {idx + 1}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback Drawer */}
      {answeredState !== 'idle' && (
        <div
          className={`p-5 rounded-2xl border text-sm space-y-2 animate-fadeIn ${
            answeredState === 'correct'
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-base">
              {answeredState === 'correct' ? '💥 ĐÒN ĐÁNH TRÚNG ĐÍCH! BOSS MẤT MÁU NẶNG!' : '⚡ BẠN BỊ PHẢN ĐÒN! -20 HP!'}
            </span>
            <button
              onClick={onNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-200 shadow transition cursor-pointer"
            >
              <span>Tiếp tục trận đánh</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-slate-300">
            <span className="font-bold text-amber-300">Bí kíp chiến thắng: </span>
            {item.explanation}
          </div>
        </div>
      )}
    </div>
  );
};
