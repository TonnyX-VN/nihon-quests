import React, { useState, useEffect } from 'react';
import { LearningItem } from '../../types/game';
import { soundService } from '../../services/sound';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CardItem {
  id: string;
  pairId: string;
  type: 'kanji' | 'meaning';
  text: string;
  subText?: string;
}

interface KanjiMatchProps {
  item: LearningItem;
  stageItems?: LearningItem[];
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

export const KanjiMatch: React.FC<KanjiMatchProps> = ({
  item,
  stageItems = [],
  onAnswer,
  onNext,
}) => {
  // Build 4 pairs using stage items or current item
  const sourceItems = stageItems.length >= 4 ? stageItems.slice(0, 4) : [item];

  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardItem[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Generate pair cards
    const initialPairs: CardItem[] = [];

    sourceItems.forEach((src, idx) => {
      const pairId = `pair_${src.id || idx}`;
      // Extract kanji from question or answer
      const kanjiText = src.question.replace(/[「」漢字の読み方は何ですか？選んでください。]/g, '').trim() || '水';
      const meaningText = src.correctAnswer;

      initialPairs.push({
        id: `k_${pairId}`,
        pairId,
        type: 'kanji',
        text: kanjiText,
      });

      initialPairs.push({
        id: `m_${pairId}`,
        pairId,
        type: 'meaning',
        text: meaningText,
        subText: src.translation ? src.translation.split(' ')[0] : undefined
      });
    });

    // Shuffle cards
    const shuffled = [...initialPairs].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setMatchedPairs([]);
    setSelectedCards([]);
    setIsFinished(false);
  }, [item]);

  const handleCardClick = (card: CardItem) => {
    if (selectedCards.length >= 2) return;
    if (matchedPairs.includes(card.pairId)) return;
    if (selectedCards.find((c) => c.id === card.id)) return;

    soundService.play('click');
    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (first.pairId === second.pairId && first.type !== second.type) {
        // Matched!
        soundService.play('correct');
        const updated = [...matchedPairs, first.pairId];
        setMatchedPairs(updated);
        setSelectedCards([]);

        // Check if all matched
        if (updated.length === sourceItems.length) {
          setIsFinished(true);
          soundService.play('victory');
          onAnswer(true);
        }
      } else {
        // Wrong match
        soundService.play('wrong');
        setTimeout(() => {
          setSelectedCards([]);
        }, 700);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Target prompt */}
      <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-900/40 p-5 text-center shadow-lg space-y-2">
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 uppercase tracking-wider">
          Kanji Match • Ghép Cặp Hán Tự
        </span>
        <h2 className="text-lg sm:text-xl font-bold text-white">
          Chạm vào 1 thẻ Kanji và 1 thẻ nghĩa / âm đọc tương ứng để kết nối!
        </h2>
        <div className="text-xs text-slate-400">
          Đã ghép đúng: <span className="font-bold text-cyan-400">{matchedPairs.length} / {sourceItems.length}</span> cặp
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cards.map((card) => {
          const isMatched = matchedPairs.includes(card.pairId);
          const isSelected = selectedCards.some((c) => c.id === card.id);

          let cardStyle = 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/60 text-white';
          if (isMatched) {
            cardStyle = 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300 opacity-60 pointer-events-none scale-95';
          } else if (isSelected) {
            cardStyle = 'bg-cyan-950 border-cyan-400 ring-2 ring-cyan-400 text-cyan-200 scale-105 shadow-lg shadow-cyan-950/80';
          }

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              disabled={isMatched}
              className={`h-28 rounded-2xl border p-3 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer select-none ${cardStyle}`}
            >
              <div
                className={`font-bold transition-all ${
                  card.type === 'kanji' ? 'text-3xl font-jp' : 'text-base'
                }`}
              >
                {card.text}
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">
                {card.type === 'kanji' ? 'Hán Tự' : 'Ý Nghĩa'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Clear notification */}
      {isFinished && (
        <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-200 text-center space-y-3 animate-fadeIn">
          <div className="flex items-center justify-center gap-2 font-bold text-lg">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <span>XUẤT SẮC! ĐÃ HOÀN TẤT TOÀN BỘ CÁC CẶP KANJI!</span>
          </div>
          <p className="text-xs text-slate-300">
            Bạn đã ghi nhớ chuẩn xác mối liên kết giữa Hán tự và ngữ nghĩa.
          </p>
          <button
            onClick={onNext}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-white text-slate-950 hover:bg-slate-200 shadow transition cursor-pointer"
          >
            Tiếp tục màn tiếp theo ➔
          </button>
        </div>
      )}
    </div>
  );
};
