import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { soundService } from '../../services/sound';
import { BookOpen, CheckCircle2, RotateCcw, Volume2, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';
import { LearningItem } from '../../types/game';

export const ReviewView: React.FC = () => {
  const { user, openSenseiWithContext, recordCorrectAnswer, addXp, showToast } = useGame();
  const wrongItems = Object.values(user.wrongQuestions);

  // Active quiz state for review
  const [reviewIndex, setReviewIndex] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answeredState, setAnsweredState] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const currentItem = reviewIndex !== null ? wrongItems[reviewIndex]?.item : null;

  const handleStartReview = () => {
    if (wrongItems.length === 0) return;
    setReviewIndex(0);
    setSelectedAnswer(null);
    setAnsweredState('idle');
  };

  const handleAnswerReview = (choice: string) => {
    if (!currentItem || answeredState !== 'idle') return;
    setSelectedAnswer(choice);

    if (choice === currentItem.correctAnswer) {
      setAnsweredState('correct');
      soundService.play('correct');
      addXp(15, 'Ôn tập thành công câu sai');
      recordCorrectAnswer(currentItem, 1);
      showToast('Xuất sắc! Bạn đã khắc phục thành công câu hỏi này!', '🎉');
    } else {
      setAnsweredState('wrong');
      soundService.play('wrong');
    }
  };

  const handleNextReview = () => {
    if (reviewIndex === null) return;
    if (reviewIndex + 1 < wrongItems.length) {
      setReviewIndex(reviewIndex + 1);
      setSelectedAnswer(null);
      setAnsweredState('idle');
    } else {
      // Completed all reviews
      setReviewIndex(null);
      showToast('Hoàn thành phiên ôn tập!', '🏆');
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-rose-800/40 bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-950 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>SỔ TAY ÔN TẬP • REVIEW NOTEBOOK</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Khắc Phục Điểm Yếu & Biến Sai Lầm Thành Kỹ Năng
            </h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Mỗi lần trả lời chưa chính xác trong các màn chơi, hệ thống sẽ tự động lưu lại vào đây để bạn dễ dàng ôn luyện và hỏi Sakura Sensei.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-rose-500/30 rounded-2xl p-4 flex items-center gap-3 shrink-0 shadow-inner">
            <AlertCircle className="w-8 h-8 text-rose-400" />
            <div>
              <div className="text-xs text-slate-400">Số câu cần ôn</div>
              <div className="text-lg font-bold text-rose-400">
                {wrongItems.length} câu hỏi
              </div>
            </div>
          </div>
        </div>

        {wrongItems.length > 0 && reviewIndex === null && (
          <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-end">
            <button
              onClick={handleStartReview}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/80 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Bắt đầu ôn tập ({wrongItems.length} câu)</span>
            </button>
          </div>
        )}
      </div>

      {/* Interactive Review Quiz Mode */}
      {reviewIndex !== null && currentItem && (
        <div className="rounded-3xl border border-rose-500/50 bg-slate-900/90 p-6 space-y-5 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
            <span className="font-bold text-rose-400">
              CÂU HỎI {reviewIndex + 1} / {wrongItems.length}
            </span>
            <button
              onClick={() => setReviewIndex(null)}
              className="hover:text-white transition"
            >
              Đóng bài ôn tập ✕
            </button>
          </div>

          {/* Question box */}
          <div className="text-center py-4 space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {currentItem.level} • {currentItem.category}
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-jp">
              {currentItem.question}
            </div>
            {currentItem.furigana && user.furiganaEnabled && (
              <div className="text-sm font-jp text-rose-300 font-medium">
                「{currentItem.furigana}」
              </div>
            )}
            <button
              onClick={() => soundService.speakJapanese(currentItem.audioText || currentItem.question)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <Volume2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Phát âm</span>
            </button>
          </div>

          {/* Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentItem.choices.map((choice, cIdx) => {
              const isSelected = selectedAnswer === choice;
              const isCorrect = choice === currentItem.correctAnswer;

              let btnStyle = 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200';
              if (answeredState !== 'idle') {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40';
                } else if (isSelected) {
                  btnStyle = 'bg-red-950/80 border-red-500 text-red-200';
                }
              }

              return (
                <button
                  key={cIdx}
                  onClick={() => handleAnswerReview(choice)}
                  disabled={answeredState !== 'idle'}
                  className={`p-3.5 rounded-xl border text-sm font-semibold transition text-left cursor-pointer ${btnStyle}`}
                >
                  <span className="text-xs text-slate-400 mr-2 font-bold">{cIdx + 1}.</span>
                  {choice}
                </button>
              );
            })}
          </div>

          {/* Explanation if answered */}
          {answeredState !== 'idle' && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 animate-fadeIn text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-rose-300">💡 Giải thích chi tiết:</span>
                <span className="text-slate-300">{currentItem.explanation}</span>
              </div>
              <div className="text-slate-400">
                <span className="text-amber-400 font-semibold">Ví dụ: </span>
                <span className="font-jp text-slate-200">{currentItem.example}</span> — {currentItem.translation}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => openSenseiWithContext(`Giải thích giúp em câu hỏi này: "${currentItem.question}". Đáp án là: "${currentItem.correctAnswer}"`)}
                  className="flex items-center gap-1.5 text-xs text-purple-300 hover:text-purple-200"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Hỏi thêm Sakura Sensei</span>
                </button>

                <button
                  onClick={handleNextReview}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow transition cursor-pointer"
                >
                  Câu tiếp theo ➔
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* List of Wrong Questions */}
      {wrongItems.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-3xl">
            🌸
          </div>
          <h3 className="text-lg font-bold text-white">Sổ tay trống! Phong độ tuyệt vời!</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Bạn chưa có câu hỏi nào bị sai hoặc đã hoàn thành ôn tập tất cả. Hãy tham gia Đấu trường để tiếp tục rèn giũa!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Danh sách các câu hỏi đã ghi nhận ({wrongItems.length})
          </h3>

          <div className="space-y-3">
            {wrongItems.map(({ item, failedCount }) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-rose-900/50 transition space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {item.level} • {item.category}
                      </span>
                      <span className="text-xs text-red-400 font-semibold">
                        Đã sai {failedCount} lần
                      </span>
                    </div>

                    <div className="text-base font-bold text-white font-jp pt-1">
                      {item.question}
                    </div>

                    {item.furigana && user.furiganaEnabled && (
                      <div className="text-xs font-jp text-rose-300">
                        Furigana: {item.furigana}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => soundService.speakJapanese(item.audioText || item.question)}
                      title="Nghe câu hỏi"
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                    >
                      <Volume2 className="w-4 h-4 text-rose-400" />
                    </button>
                    <button
                      onClick={() => openSenseiWithContext(`Giải thích giúp em câu hỏi này: "${item.question}". Đáp án đúng là: "${item.correctAnswer}". Giải thích hiện tại: ${item.explanation}`)}
                      title="Hỏi Sakura Sensei"
                      className="p-2 rounded-xl bg-purple-950/60 border border-purple-800/40 hover:bg-purple-900 text-purple-300 transition"
                    >
                      🌸
                    </button>
                  </div>
                </div>

                {/* Solution & Explanation */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-400">Đáp án chuẩn:</span>
                    <span className="font-semibold text-slate-100">{item.correctAnswer}</span>
                  </div>
                  <div className="text-slate-300">
                    <span className="font-bold text-rose-300">Giải thích: </span>
                    {item.explanation}
                  </div>
                  <div className="text-slate-400 pt-0.5">
                    <span className="font-bold text-amber-400">Ví dụ: </span>
                    <span className="font-jp text-slate-200">{item.example}</span> — {item.translation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
