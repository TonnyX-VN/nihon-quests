import React, { useState } from 'react';
import { LearningItem } from '../../types/game';
import { soundService } from '../../services/sound';
import { Volume2, Swords, Sparkles, ArrowRight } from 'lucide-react';

interface FlashBattleProps {
  item: LearningItem;
  furiganaEnabled: boolean;
  combo: number;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

export const FlashBattle: React.FC<FlashBattleProps> = ({
  item,
  furiganaEnabled,
  combo,
  onAnswer,
  onNext,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [answeredState, setAnsweredState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [slashAnim, setSlashAnim] = useState(false);

  const handleSelect = (choice: string) => {
    if (answeredState !== 'idle') return;
    setSelectedChoice(choice);

    const isCorrect = choice === item.correctAnswer;
    if (isCorrect) {
      setAnsweredState('correct');
      setSlashAnim(true);
      soundService.play('attack');
      soundService.play('correct');
      setTimeout(() => setSlashAnim(false), 500);
      onAnswer(true);
    } else {
      setAnsweredState('wrong');
      soundService.play('wrong');
      onAnswer(false);
    }
  };

  return (
    <div className="relative space-y-6">
      {/* Attack visual slash overlay */}
      {slashAnim && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
          <div className="w-64 h-2 bg-gradient-to-r from-transparent via-amber-300 to-transparent rotate-45 animate-slash shadow-[0_0_20px_#f59e0b]" />
          <div className="text-4xl absolute animate-bounce">💥</div>
        </div>
      )}

      {/* Question Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-rose-900/40 p-6 text-center shadow-lg space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-rose-300">
            {item.category}
          </span>
          {combo > 1 && (
            <span className="font-bold text-amber-400 flex items-center gap-1 animate-pulse">
              🔥 Combo x{combo}
            </span>
          )}
        </div>

        <div className="py-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-jp tracking-wide">
            {item.question}
          </h2>
          {item.furigana && furiganaEnabled && (
            <div className="text-sm text-rose-300 font-jp font-medium mt-1">
              「{item.furigana}」
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => soundService.speakJapanese(item.audioText || item.question)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
          >
            <Volume2 className="w-3.5 h-3.5 text-rose-400" />
            <span>Nghe phát âm</span>
          </button>
        </div>
      </div>

      {/* 4 Choices Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {item.choices.map((choice, idx) => {
          const isSelected = selectedChoice === choice;
          const isCorrect = choice === item.correctAnswer;

          let btnClass = 'bg-slate-900/90 border-slate-800 hover:border-rose-500/50 text-slate-200';
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
              className={`p-4 rounded-xl border text-left font-bold text-sm sm:text-base transition-all duration-150 flex items-center justify-between cursor-pointer ${btnClass}`}
            >
              <span>{choice}</span>
              <span className="text-xs text-slate-500 font-mono px-2 py-0.5 rounded bg-slate-950/60">
                {idx + 1}
              </span>
            </button>
          );
        })}
      </div>

      {/* Answer Feedback & Explanation */}
      {answeredState !== 'idle' && (
        <div
          className={`p-5 rounded-2xl border text-sm space-y-2 animate-fadeIn ${
            answeredState === 'correct'
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-base flex items-center gap-1.5">
              {answeredState === 'correct' ? '🎉 Chính xác! Tuyệt chiêu trúng đích!' : '❌ Chưa chính xác!'}
            </span>
            <button
              onClick={onNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-200 shadow transition cursor-pointer"
            >
              <span>Tiếp tục</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs leading-relaxed text-slate-300">
            <span className="font-bold text-amber-300">Giải thích: </span>
            {item.explanation}
          </div>

          <div className="text-xs text-slate-400">
            <span className="font-bold text-white">Ví dụ: </span>
            <span className="font-jp text-slate-200">{item.example}</span> — {item.translation}
          </div>
        </div>
      )}
    </div>
  );
};
