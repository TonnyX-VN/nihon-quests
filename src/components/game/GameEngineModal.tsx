import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Stage, LearningItem } from '../../types/game';
import { getQuestionById, ALL_QUESTIONS } from '../../data/stages';
import { soundService } from '../../services/sound';
import { FlashBattle } from './FlashBattle';
import { SentenceBuilder } from './SentenceBuilder';
import { KanjiMatch } from './KanjiMatch';
import { ListeningQuest } from './ListeningQuest';
import { ConversationQuest } from './ConversationQuest';
import { BossBattle } from './BossBattle';
import { StageClearModal } from './StageClearModal';
import { X, Flame, Sparkles, Heart } from 'lucide-react';

interface GameEngineModalProps {
  stage: Stage;
  onClose: () => void;
}

export const GameEngineModal: React.FC<GameEngineModalProps> = ({ stage, onClose }) => {
  const { user, addXp, recordCorrectAnswer, recordWrongAnswer, completeStage, showToast } = useGame();

  // Check if custom questions exist in memory for custom knowledge stage
  const customWindowQuestions = (window as any).__customStageQuestions as LearningItem[] | undefined;
  const isCustomStage = stage.id.startsWith('stage_custom_') && customWindowQuestions && customWindowQuestions.length > 0;

  // Load questions for this stage
  const stageQuestions: LearningItem[] = isCustomStage
    ? customWindowQuestions
    : stage.questionIds
        .map((id) => getQuestionById(id))
        .filter((q): q is LearningItem => !!q);

  // Fallback if question ids empty
  const activeQuestions = stageQuestions.length > 0 ? stageQuestions : ALL_QUESTIONS.slice(0, 4);

  // Game Engine State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);
  const [isStageCleared, setIsStageCleared] = useState(false);

  // Boss Battle specific state
  const [bossHp, setBossHp] = useState<number>(stage.bossHp || 100);
  const [playerHp, setPlayerHp] = useState<number>(100);

  const currentItem = activeQuestions[currentIndex];

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      setCorrectCount((prev) => prev + 1);

      // Calculate XP with Combo Multiplier:
      // 3 combo: x1.2, 5 combo: x1.5, 10 combo: x2.0
      let multiplier = 1.0;
      if (newCombo >= 10) multiplier = 2.0;
      else if (newCombo >= 5) multiplier = 1.5;
      else if (newCombo >= 3) multiplier = 1.2;

      const baseQuestionXp = stage.gameType === 'boss_battle' ? 25 : 10;
      const questionXp = Math.round(baseQuestionXp * multiplier);

      setEarnedXp((prev) => prev + questionXp);
      recordCorrectAnswer(currentItem, newCombo);

      if (newCombo === 3) showToast('Combo x3: Tăng 1.2x XP!', '🔥', 'combo');
      if (newCombo === 5) showToast('Combo x5: Tăng 1.5x XP!', '🔥', 'combo');
      if (newCombo === 10) showToast('Combo x10: Tăng 2.0x XP!', '⚡', 'combo');
    } else {
      setCombo(0);
      recordWrongAnswer(currentItem);
    }
  };

  const handleBossDamage = (damage: number) => {
    const updatedHp = Math.max(0, bossHp - damage);
    setBossHp(updatedHp);

    if (updatedHp <= 0) {
      // Boss Defeated!
      setTimeout(() => {
        finishStage();
      }, 700);
    }
  };

  const handlePlayerDamage = (damage: number) => {
    const updatedHp = Math.max(0, playerHp - damage);
    setPlayerHp(updatedHp);

    if (updatedHp <= 0) {
      showToast('Bạn đã kiệt sức! Hãy ôn tập và thử lại nhé!', '💀');
      setTimeout(() => {
        onClose();
      }, 1200);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finished all questions in stage
      finishStage();
    }
  };

  const finishStage = () => {
    const totalAwardXp = earnedXp + stage.rewardXp;
    addXp(totalAwardXp, `Vượt qua màn chơi: ${stage.titleVi}`);
    completeStage(stage.id, 3, earnedXp, maxCombo);
    setIsStageCleared(true);
  };

  const accuracy = Math.round(
    (correctCount / Math.max(1, currentIndex + 1)) * 100
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Top Status Bar */}
      <div className="w-full max-w-3xl flex items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-600/30 border border-rose-500/40 flex items-center justify-center text-lg">
            {stage.icon}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                {stage.level} • Stage {stage.stageNumber}
              </span>
              <span className="text-[10px] text-rose-300 font-semibold px-1.5 py-0.2 rounded bg-rose-950/60 border border-rose-800/40">
                {stage.gameType.replace('_', ' ')}
              </span>
            </div>
            <h3 className="font-bold text-sm sm:text-base text-white truncate max-w-[200px] sm:max-w-none">
              {stage.titleVi}
            </h3>
          </div>
        </div>

        {/* Combo & Progress indicators */}
        <div className="flex items-center gap-2 sm:gap-4">
          {combo > 1 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-950/70 border border-orange-500/40 text-orange-300 text-xs font-bold animate-pulse">
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
              <span>x{combo} Combo</span>
            </div>
          )}

          <div className="flex items-center gap-1 text-xs text-amber-300 font-bold bg-amber-950/40 px-2.5 py-1 rounded-xl border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>+{earnedXp} XP</span>
          </div>

          <div className="text-xs font-bold text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            {currentIndex + 1} / {activeQuestions.length}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            title="Thoát màn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full max-w-3xl h-1 bg-slate-800 rounded-full my-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
        />
      </div>

      {/* Active Mini Game Component Body */}
      <div className="w-full max-w-3xl my-auto py-2">
        {stage.gameType === 'flash_battle' && (
          <FlashBattle
            item={currentItem}
            furiganaEnabled={user.furiganaEnabled}
            combo={combo}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        )}

        {stage.gameType === 'sentence_builder' && (
          <SentenceBuilder
            item={currentItem}
            furiganaEnabled={user.furiganaEnabled}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        )}

        {stage.gameType === 'kanji_match' && (
          <KanjiMatch
            item={currentItem}
            stageItems={activeQuestions}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        )}

        {stage.gameType === 'listening_quest' && (
          <ListeningQuest
            item={currentItem}
            furiganaEnabled={user.furiganaEnabled}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        )}

        {stage.gameType === 'conversation_quest' && (
          <ConversationQuest
            item={currentItem}
            furiganaEnabled={user.furiganaEnabled}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        )}

        {stage.gameType === 'boss_battle' && (
          <BossBattle
            item={currentItem}
            stage={stage}
            furiganaEnabled={user.furiganaEnabled}
            combo={combo}
            bossCurrentHp={bossHp}
            playerCurrentHp={playerHp}
            onBossDamage={handleBossDamage}
            onPlayerDamage={handlePlayerDamage}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        )}
      </div>

      {/* Footer hint */}
      <div className="text-[11px] text-slate-500 text-center select-none pt-2">
        Trả lời chuẩn xác để tích lũy liên kích Combo và kiếm thưởng XP tối đa!
      </div>

      {/* Victory Stage Clear Modal */}
      {isStageCleared && (
        <StageClearModal
          stage={stage}
          earnedXp={earnedXp + stage.rewardXp}
          maxCombo={maxCombo}
          accuracy={accuracy}
          onContinue={() => {
            setIsStageCleared(false);
            onClose();
          }}
        />
      )}
    </div>
  );
};
