import React, { useState } from 'react';
import { LearningItem } from '../../types/game';
import { soundService } from '../../services/sound';
import { RotateCcw, Check, ArrowRight, Volume2 } from 'lucide-react';

interface SentenceBuilderProps {
  item: LearningItem;
  furiganaEnabled: boolean;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

export const SentenceBuilder: React.FC<SentenceBuilderProps> = ({
  item,
  onAnswer,
  onNext,
}) => {
  const initialTiles = item.wordTiles || item.choices || ['Từ 1', 'Từ 2', 'Từ 3'];

  // State of assembled tiles (in current order) and remaining available tiles
  const [availableTiles, setAvailableTiles] = useState<string[]>(initialTiles);
  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
  const [answeredState, setAnsweredState] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const handleTileClick = (tile: string, fromSelected: boolean) => {
    if (answeredState !== 'idle') return;
    soundService.play('click');

    if (fromSelected) {
      // Remove from selected, return to available
      setSelectedTiles((prev) => prev.filter((t, i) => i !== prev.indexOf(tile)));
      setAvailableTiles((prev) => [...prev, tile]);
    } else {
      // Add to selected, remove from available
      setAvailableTiles((prev) => prev.filter((t, i) => i !== prev.indexOf(tile)));
      setSelectedTiles((prev) => [...prev, tile]);
    }
  };

  const handleReset = () => {
    if (answeredState !== 'idle') return;
    soundService.play('click');
    setAvailableTiles(initialTiles);
    setSelectedTiles([]);
  };

  const handleCheck = () => {
    if (selectedTiles.length === 0 || answeredState !== 'idle') return;

    const constructedSentence = selectedTiles.join(' ').trim();
    const cleanConstructed = constructedSentence.replace(/\s+/g, '');
    const cleanCorrect = item.correctAnswer.replace(/\s+/g, '');

    const isMatch = cleanConstructed === cleanCorrect;
    if (isMatch) {
      setAnsweredState('correct');
      soundService.play('correct');
      soundService.speakJapanese(cleanConstructed);
      onAnswer(true);
    } else {
      setAnsweredState('wrong');
      soundService.play('wrong');
      onAnswer(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Target Prompt Card */}
      <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-900/40 p-5 text-center shadow-lg space-y-2">
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 uppercase tracking-wider">
          Sentence Builder • Sắp Xếp Câu
        </span>
        <h2 className="text-lg sm:text-xl font-bold text-white">
          {item.question}
        </h2>
        <p className="text-xs text-slate-400">
          Chọn các mảnh ghép bên dưới theo thứ tự ngữ pháp chính xác.
        </p>
      </div>

      {/* Assembly Area (Drop/Pick zone) */}
      <div className="rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/60 p-4 min-h-[90px] flex flex-wrap items-center justify-center gap-2">
        {selectedTiles.length === 0 ? (
          <span className="text-xs text-slate-500 italic select-none">
            Chạm vào các từ bên dưới để đưa vào câu...
          </span>
        ) : (
          selectedTiles.map((tile, idx) => (
            <button
              key={`${tile}_${idx}`}
              onClick={() => handleTileClick(tile, true)}
              disabled={answeredState !== 'idle'}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer font-jp"
            >
              {tile}
            </button>
          ))
        )}
      </div>

      {/* Available Tiles Pool */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 p-3">
        {availableTiles.map((tile, idx) => (
          <button
            key={`${tile}_${idx}`}
            onClick={() => handleTileClick(tile, false)}
            disabled={answeredState !== 'idle'}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-100 font-bold text-sm shadow hover:-translate-y-0.5 transition-all cursor-pointer font-jp"
          >
            {tile}
          </button>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handleReset}
          disabled={answeredState !== 'idle' || selectedTiles.length === 0}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Xếp lại</span>
        </button>

        {answeredState === 'idle' ? (
          <button
            onClick={handleCheck}
            disabled={selectedTiles.length === 0}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-950/60 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Kiểm tra</span>
          </button>
        ) : (
          <button
            onClick={onNext}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-200 shadow-lg transition cursor-pointer"
          >
            <span>Tiếp tục</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
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
          <div className="font-extrabold text-base">
            {answeredState === 'correct' ? '🎉 Chính xác! Cấu trúc câu hoàn hảo!' : '❌ Chưa chính xác!'}
          </div>

          <div className="text-xs">
            <span className="font-bold text-amber-300">Đáp án chuẩn: </span>
            <span className="font-bold font-jp text-white">{item.correctAnswer}</span>
          </div>

          <div className="text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-slate-100">Giải thích: </span>
            {item.explanation}
          </div>
        </div>
      )}
    </div>
  );
};
