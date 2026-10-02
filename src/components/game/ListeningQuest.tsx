import React, { useState, useEffect } from 'react';
import { LearningItem } from '../../types/game';
import { soundService } from '../../services/sound';
import { Volume2, RotateCcw, ArrowRight, Headphones } from 'lucide-react';

interface ListeningQuestProps {
  item: LearningItem;
  furiganaEnabled: boolean;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

export const ListeningQuest: React.FC<ListeningQuestProps> = ({
  item,
  furiganaEnabled,
  onAnswer,
  onNext,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [answeredState, setAnsweredState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const textToSpeak = item.audioText || item.question;

  const playVoice = () => {
    setIsPlayingAudio(true);
    soundService.speakJapanese(textToSpeak);
    setTimeout(() => setIsPlayingAudio(false), 2000);
  };

  useEffect(() => {
    // Auto-play audio on question load
    const timer = setTimeout(() => {
      playVoice();
    }, 400);
    return () => clearTimeout(timer);
  }, [item]);

  const handleSelect = (choice: string) => {
    if (answeredState !== 'idle') return;
    setSelectedChoice(choice);

    const isCorrect = choice === item.correctAnswer;
    if (isCorrect) {
      setAnsweredState('correct');
      soundService.play('correct');
      onAnswer(true);
    } else {
      setAnsweredState('wrong');
      soundService.play('wrong');
      onAnswer(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Listening Audio Player Card */}
      <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-900/40 p-6 text-center shadow-lg space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Headphones className="w-3.5 h-3.5" />
          <span>Listening Quest • Thử Thách Nghe Hiểu</span>
        </div>

        {/* Large Sound Button */}
        <div>
          <button
            onClick={playVoice}
            className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer ${
              isPlayingAudio
                ? 'bg-emerald-500 text-slate-950 ring-8 ring-emerald-500/30 scale-110'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white hover:scale-105'
            }`}
          >
            <Volume2 className="w-9 h-9" />
          </button>
          <div className="text-xs text-slate-400 mt-2 font-medium">
            Chạm để nghe lại phát âm 🔁
          </div>
        </div>

        <div className="pt-2">
          <h2 className="text-lg font-bold text-white">
            {item.question}
          </h2>
          {furiganaEnabled && item.furigana && (
            <div className="text-xs text-emerald-300 font-jp mt-1">
              Phát âm: 「{item.furigana}」
            </div>
          )}
        </div>
      </div>

      {/* Choices Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {item.choices.map((choice, idx) => {
          const isSelected = selectedChoice === choice;
          const isCorrect = choice === item.correctAnswer;

          let btnClass = 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/50 text-slate-200';
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
              {answeredState === 'correct' ? '🎉 Chính xác! Bạn nghe rất chuẩn!' : '❌ Chưa chính xác!'}
            </span>
            <button
              onClick={onNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-200 shadow transition cursor-pointer"
            >
              <span>Tiếp tục</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-slate-300">
            <span className="font-bold text-amber-300">Giải thích: </span>
            {item.explanation}
          </div>

          <div className="text-xs text-slate-400">
            <span className="font-bold text-white">Nội dung âm thanh: </span>
            <span className="font-jp text-slate-200">{textToSpeak}</span> — {item.translation}
          </div>
        </div>
      )}
    </div>
  );
};
