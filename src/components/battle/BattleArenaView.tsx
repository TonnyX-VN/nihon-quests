import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { MiniGameType, JLPTLevel, Stage } from '../../types/game';
import { REGIONS } from '../../data/stages';
import { Swords, Flame, Trophy, Zap, Shield, Play } from 'lucide-react';

export const BattleArenaView: React.FC = () => {
  const { user, setActiveStage, setSelectedLevel, selectedLevel } = useGame();
  const [targetLevel, setTargetLevel] = useState<JLPTLevel>(selectedLevel);

  // Helper to start a mini game in arena mode
  const startArenaMode = (type: MiniGameType) => {
    setSelectedLevel(targetLevel);
    // Find stage matching this type in target level, or fallback
    const region = REGIONS.find((r) => r.id === targetLevel) || REGIONS[0];
    const stage = region.stages.find((s) => s.gameType === type) || region.stages[0];
    setActiveStage(stage);
  };

  const arenaModes: {
    type: MiniGameType;
    title: string;
    badge: string;
    icon: string;
    desc: string;
    mechanic: string;
    color: string;
    border: string;
  }[] = [
    {
      type: 'flash_battle',
      title: '⚔️ Flash Battle (Tốc Chiến)',
      badge: 'Game 1',
      icon: '⚔️',
      desc: 'Hiển thị câu hỏi tiếng Nhật và 4 đáp án chọn nhanh dưới áp lực tốc độ.',
      mechanic: 'Trả lời đúng: Chém kiếm + Tích lũy Combo. Sai: Đưa vào Sổ tay ôn tập.',
      color: 'from-rose-950/60 via-slate-900 to-slate-950',
      border: 'border-rose-700/40 hover:border-rose-500'
    },
    {
      type: 'sentence_builder',
      title: '🧩 Sentence Builder (Xếp Câu)',
      badge: 'Game 2',
      icon: '🧩',
      desc: 'Các mảnh từ ngữ bị xáo trộn vị trí. Kéo thả hoặc click để tạo câu ngữ pháp chuẩn xác.',
      mechanic: 'Kiểm tra trật tự Chủ ngữ - Bổ ngữ - Trợ từ - Động từ.',
      color: 'from-amber-950/60 via-slate-900 to-slate-950',
      border: 'border-amber-700/40 hover:border-amber-500'
    },
    {
      type: 'kanji_match',
      title: '🈶 Kanji Match (Ghép Hán Tự)',
      badge: 'Game 3',
      icon: '🈶',
      desc: 'Lật thẻ ghi nhớ và ghép cặp Hán tự Kanji với cách đọc Furigana và ý nghĩa tiếng Việt.',
      mechanic: 'Thử thách trí nhớ thị giác và âm đọc On-yomi / Kun-yomi.',
      color: 'from-cyan-950/60 via-slate-900 to-slate-950',
      border: 'border-cyan-700/40 hover:border-cyan-500'
    },
    {
      type: 'listening_quest',
      title: '👂 Listening Quest (Nghe Hiểu)',
      badge: 'Game 4',
      icon: '👂',
      desc: 'Lắng nghe phát âm tiếng Nhật chuẩn và chọn nội dung, ngữ cảnh hoặc đáp án tương ứng.',
      mechanic: 'Tích hợp bộ tổng hợp âm thanh giọng Nhật chuẩn xác.',
      color: 'from-emerald-950/60 via-slate-900 to-slate-950',
      border: 'border-emerald-700/40 hover:border-emerald-500'
    },
    {
      type: 'conversation_quest',
      title: '🗣️ Conversation Quest (Hội Thoại)',
      badge: 'Game 5',
      icon: '🗣️',
      desc: 'NPC người bản xứ đưa ra câu thoại trong đời sống và công sở. Chọn lời đáp tinh tế.',
      mechanic: 'Phân tích kính ngữ, khiêm nhường ngữ và văn hóa ứng xử Nhật Bản.',
      color: 'from-purple-950/60 via-slate-900 to-slate-950',
      border: 'border-purple-700/40 hover:border-purple-500'
    },
    {
      type: 'boss_battle',
      title: '👹 Boss Battle (Đại Chiến Trùm)',
      badge: 'Game 6',
      icon: '👹',
      desc: 'Đối đầu trực tiếp Boss có thanh máu HP. Đúng gây sát thương cực đại, sai bị mất HP!',
      mechanic: 'Hệ thống đòn đánh chí mạng (Critical Strike) khi đạt chuỗi Combo cao!',
      color: 'from-red-950/80 via-slate-900 to-slate-950',
      border: 'border-red-600/50 hover:border-red-400'
    }
  ];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-rose-800/40 bg-gradient-to-br from-slate-900 via-rose-950/50 to-slate-950 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
              <Swords className="w-3.5 h-3.5" />
              <span>ĐẤU TRƯỜNG HUYỀN THOẠI</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Đấu Trường 6 Mini-Game Thực Chiến
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Chọn bất kỳ mini-game nào để trau dồi kỹ năng phản xạ, rèn luyện Kanji, cấu trúc câu và thử lửa trước Đại Boss!
            </p>
          </div>

          {/* Combo Rule Card */}
          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-4 shrink-0 max-w-sm space-y-2 shadow-inner">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
              <span>Cơ Chế Liên Kích Combo XP</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="block text-slate-400 text-[10px]">3 câu đúng</span>
                <span className="font-bold text-amber-400">x1.2 XP</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="block text-slate-400 text-[10px]">5 câu đúng</span>
                <span className="font-bold text-orange-400">x1.5 XP</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="block text-slate-400 text-[10px]">10 câu đúng</span>
                <span className="font-bold text-rose-400">x2.0 XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Level Picker */}
      <div className="flex items-center justify-between flex-wrap gap-3 px-1">
        <div className="text-sm font-bold text-slate-300">
          Chọn trình độ thách đấu:
        </div>
        <div className="flex items-center gap-2">
          {(['N5', 'N4', 'N3'] as JLPTLevel[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setTargetLevel(lvl)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                targetLevel === lvl
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-950/60 scale-105'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {lvl} {lvl === 'N5' ? '🌸 Sơ cấp' : lvl === 'N4' ? '🏙️ Trung cấp I' : '🏯 Trung cấp II'}
            </button>
          ))}
        </div>
      </div>

      {/* Mini-Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {arenaModes.map((game) => (
          <div
            key={game.type}
            className={`rounded-2xl p-5 border bg-gradient-to-br ${game.color} ${game.border} shadow-lg flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl p-2 rounded-2xl bg-slate-900/80 border border-slate-800 shadow">
                  {game.icon}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                  {game.badge}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-white">{game.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{game.desc}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400">
                <span className="font-semibold text-rose-300 block mb-0.5">Cơ chế gameplay:</span>
                {game.mechanic}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-300">
                Thử thách {targetLevel}
              </span>
              <button
                onClick={() => startArenaMode(game.type)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow transition cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Vào trận</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
