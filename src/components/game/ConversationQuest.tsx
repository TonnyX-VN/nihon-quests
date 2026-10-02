import React, { useState } from 'react';
import { LearningItem } from '../../types/game';
import { soundService } from '../../services/sound';
import { MessageSquare, ArrowRight, Volume2, UserCheck } from 'lucide-react';

interface ConversationQuestProps {
  item: LearningItem;
  furiganaEnabled: boolean;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

export const ConversationQuest: React.FC<ConversationQuestProps> = ({
  item,
  onAnswer,
  onNext,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [answeredState, setAnsweredState] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const speaker = item.speakerName || 'Người bản xứ (NPC)';

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
      {/* RPG Dialogue Stage */}
      <div className="rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-purple-900/40 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold uppercase px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
            Hội Thoại Thực Tế • Roleplay
          </span>
          <span className="text-slate-400 font-medium">Chọn câu đối đáp chuẩn xác</span>
        </div>

        {/* NPC Avatar & Dialogue Bubble */}
        <div className="flex items-start gap-3 sm:gap-4 pt-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-3xl shadow-lg shrink-0 ring-2 ring-purple-400/30">
            👘
          </div>

          <div className="relative flex-1 bg-slate-900 border border-purple-700/40 rounded-2xl p-4 sm:p-5 shadow-inner space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-purple-300 uppercase tracking-wide">
                {speaker}
              </span>
              <button
                onClick={() => soundService.speakJapanese(item.audioText || item.question)}
                title="Nghe câu thoại"
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <Volume2 className="w-4 h-4 text-purple-400" />
              </button>
            </div>

            <div className="text-base sm:text-lg font-bold text-white whitespace-pre-line font-jp leading-relaxed">
              {item.question}
            </div>
          </div>
        </div>
      </div>

      {/* Player Response Choices */}
      <div className="space-y-2.5">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
          Lời đáp của bạn:
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {item.choices.map((choice, idx) => {
            const isSelected = selectedChoice === choice;
            const isCorrect = choice === item.correctAnswer;

            let btnClass = 'bg-slate-900/90 border-slate-800 hover:border-purple-500/50 text-slate-200';
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
                <span className="font-jp">{choice}</span>
                <span className="text-xs text-slate-500 font-mono ml-2 shrink-0">
                  [{idx + 1}]
                </span>
              </button>
            );
          })}
        </div>
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
            <span className="font-extrabold text-base flex items-center gap-1.5">
              {answeredState === 'correct' ? '🎉 Đối đáp cực kỳ chuẩn mực & tự nhiên!' : '❌ Chưa phù hợp văn cảnh!'}
            </span>
            <button
              onClick={onNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-200 shadow transition cursor-pointer"
            >
              <span>Tiếp tục</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-amber-300">Quy tắc ứng xử / Ngữ pháp: </span>
            {item.explanation}
          </div>

          <div className="text-xs text-slate-400">
            <span className="font-bold text-white">Ví dụ mẫu: </span>
            <span className="font-jp text-slate-200">{item.example}</span> — {item.translation}
          </div>
        </div>
      )}
    </div>
  );
};
