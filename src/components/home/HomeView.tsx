import React from 'react';
import { useGame } from '../../context/GameContext';
import { getXpForLevel } from '../../services/storage';
import { REGIONS, getStageById } from '../../data/stages';
import { Flame, Play, ArrowRight, Sparkles, Swords, BookOpen, Trophy, ShieldAlert, CheckCircle2, BookPlus } from 'lucide-react';
import { Stage } from '../../types/game';

export const HomeView: React.FC = () => {
  const { user, setView, setActiveStage, setSelectedLevel, claimDailyQuest, openGoogleAuthModal } = useGame();
  const xpNeeded = getXpForLevel(user.level);
  const xpPercent = Math.min(100, Math.round((user.xp / xpNeeded) * 100));
  const isGoogle = user.authProfile?.provider === 'google' && user.authProfile?.isLoggedIn;

  // Determine current unfinished stage
  let nextStage: Stage | null = null;
  for (const reg of REGIONS) {
    for (const stg of reg.stages) {
      if (!user.completedStages[stg.id]?.completed) {
        nextStage = stg;
        break;
      }
    }
    if (nextStage) break;
  }
  if (!nextStage) {
    nextStage = REGIONS[0].stages[0]; // fallback
  }

  const wrongCount = Object.keys(user.wrongQuestions).length;

  const handleStartPlay = (stage: Stage) => {
    setSelectedLevel(stage.level);
    setActiveStage(stage);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Hero RPG Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-rose-800/40 bg-gradient-to-br from-slate-900 via-rose-950/60 to-slate-950 p-6 sm:p-8 shadow-2xl">
        {/* Decorative sakura petals and torii glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold tracking-wide">
              <span>🌸</span>
              <span>{user.language === 'vi' ? 'Học như chơi – Chơi mà vẫn giỏi tiếng Nhật!' : 'ゲーム感覚で日本語を極めよう！'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              <span className="font-rpg text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-white to-amber-200">
                NIHONGO QUEST
              </span>
              <span className="block text-xl sm:text-2xl text-rose-300/90 font-jp mt-1 font-bold">
                日本語クエスト
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {user.language === 'vi'
                ? 'Hành trình vượt ải JLPT N5 ➔ N4 ➔ N3 qua 6 chế độ Đấu trường RPG, thu thập XP, liên kích combo và cùng Sakura Sensei chinh phục tiếng Nhật!'
                : 'JLPT N5〜N3の冒険へ出発！6つのRPGバトルでXPとコンボを稼ぎ、さくら先生と共に日本語マスターを目指そう！'}
            </p>

            {/* CTAs: Chơi ngay & Tiếp tục hành trình */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleStartPlay(nextStage!)}
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 text-white shadow-lg shadow-rose-950/80 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{user.language === 'vi' ? 'Chơi ngay' : '今すぐプレイ'}</span>
              </button>

              <button
                onClick={() => setView('map')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-rose-900/50 hover:border-rose-500/50 transition cursor-pointer"
              >
                <span>{user.language === 'vi' ? 'Bản đồ thế giới' : 'ワールドマップ'}</span>
                <ArrowRight className="w-4 h-4 text-rose-400" />
              </button>
            </div>
          </div>

          {/* Player Mini Character Card */}
          <div className="bg-slate-950/80 border border-rose-900/50 rounded-2xl p-5 w-full md:w-72 shadow-xl flex flex-col justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-600 flex items-center justify-center text-3xl shadow-inner ring-2 ring-rose-500/40">
                {user.avatar}
              </div>
              <div>
                <div className="font-bold text-white text-base truncate">{user.username}</div>
                <div className="text-xs text-amber-400 font-semibold">
                  LEVEL {user.level} SAMURAI
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-orange-400 font-medium">
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  <span>{user.streak} {user.language === 'vi' ? 'ngày liên tiếp' : '日連続'}</span>
                </div>
              </div>
            </div>

            {/* Google Auth Status / Login Action */}
            <div className="mt-3 pt-2.5 border-t border-slate-800/80">
              {isGoogle ? (
                <div className="flex items-center justify-between text-[11px] text-emerald-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Google: {user.authProfile?.displayName?.split(' ')[0]}</span>
                  </span>
                  <button
                    onClick={openGoogleAuthModal}
                    className="text-slate-400 hover:text-white underline cursor-pointer text-[10px]"
                  >
                    Tài khoản
                  </button>
                </div>
              ) : (
                <button
                  onClick={openGoogleAuthModal}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-rose-500/50 text-slate-200 text-xs font-semibold shadow transition cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.64-5.2 3.64-9.15z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.94H1.26v3.15C3.25 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.32 14.26a7.2 7.2 0 0 1 0-4.52V6.59H1.26a11.96 11.96 0 0 0 0 10.82l4.06-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.59l4.06 3.15c.94-2.84 3.58-4.99 6.68-4.99z"
                    />
                  </svg>
                  <span>Đăng nhập bằng Google</span>
                </button>
              )}
            </div>

            {/* XP progress bar */}
            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <div className="flex justify-between text-xs text-slate-300 font-medium mb-1.5">
                <span className="text-slate-400">Tiến độ Level {user.level}</span>
                <span className="text-amber-300 font-bold">{user.xp} / {xpNeeded} XP</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-red-500 rounded-full transition-all duration-500"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>

            {/* Current Quest pointer */}
            <div className="mt-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">MÀN ĐANG THỰC HIỆN</span>
                <span className="text-rose-300 font-semibold truncate block max-w-[170px]">
                  {nextStage?.titleVi}
                </span>
              </div>
              <button
                onClick={() => handleStartPlay(nextStage!)}
                className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition"
              >
                ▶
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Daily Quests & Current Stage Action */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Daily Quests */}
        <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  {user.language === 'vi' ? '🎯 DAILY QUEST (Nhiệm vụ hàng ngày)' : '🎯 デイリークエスト'}
                </h3>
                <p className="text-xs text-slate-400">
                  {user.language === 'vi' ? 'Hoàn thành tất cả để nhận thêm +300 XP bonus!' : '全達成でボーナス +300 XP！'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setView('daily')}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
            >
              {user.language === 'vi' ? 'Xem chi tiết' : 'すべて見る'} ➔
            </button>
          </div>

          <div className="space-y-2.5">
            {user.dailyQuests.slice(0, 3).map((quest) => {
              const isFinished = quest.current >= quest.target;
              return (
                <div
                  key={quest.id}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                    quest.isClaimed
                      ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                      : isFinished
                      ? 'bg-gradient-to-r from-amber-950/30 to-slate-900 border-amber-500/50 ring-1 ring-amber-500/30'
                      : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs border ${
                        quest.isClaimed
                          ? 'bg-emerald-950 border-emerald-600 text-emerald-400'
                          : isFinished
                          ? 'bg-amber-500 border-amber-400 text-slate-950'
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      {quest.isClaimed ? '✓' : isFinished ? '★' : '□'}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-200">
                        {user.language === 'vi' ? quest.titleVi : quest.titleJp}
                      </div>
                      <div className="text-xs text-slate-400">
                        Tiến độ: {quest.current}/{quest.target} •{' '}
                        <span className="text-amber-400 font-bold">+{quest.rewardXp} XP</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {quest.isClaimed ? (
                      <span className="text-xs font-semibold text-emerald-400 px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-800">
                        Đã nhận
                      </span>
                    ) : isFinished ? (
                      <button
                        onClick={() => claimDailyQuest(quest.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md animate-pulse transition"
                      >
                        Nhận thưởng
                      </button>
                    ) : (
                      <span className="text-xs text-slate-500">Chưa xong</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Review Alert & Fast Game Launch */}
        <div className="space-y-4">
          {/* Wrong questions callout */}
          {wrongCount > 0 ? (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-950 border border-rose-500/40 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {user.language === 'vi' ? 'Sổ tay ôn tập câu sai' : '復習ノート'}
                  </h4>
                  <p className="text-xs text-rose-300">
                    Bạn có <span className="font-bold text-rose-400">{wrongCount} câu</span> cần khắc phục
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-300 mb-3">
                Ôn lại ngay để chuyển hóa sai sót thành kinh nghiệm thực chiến và kiếm thêm XP!
              </p>
              <button
                onClick={() => setView('review')}
                className="w-full py-2 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-500 text-white transition flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{user.language === 'vi' ? 'Ôn lại ngay' : '今すぐ復習'}</span>
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm">Phong độ hoàn hảo!</h4>
              <p className="text-xs text-slate-400">
                Chưa có câu hỏi nào bị sai tồn đọng. Hãy tiếp tục giữ vững phong độ!
              </p>
            </div>
          )}

          {/* Custom Knowledge Base Quick Widget */}
          <div
            onClick={() => setView('custom_knowledge')}
            className="cursor-pointer p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/40 hover:border-amber-400/60 transition group shadow-lg"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300">
                  <BookPlus className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm">
                  {user.language === 'vi' ? 'Kho Kiến Thức Tự Thêm' : '自作知識ベース'}
                </h4>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {Object.keys(user.customKnowledge || {}).length} {user.language === 'vi' ? 'thẻ' : '枚'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {user.language === 'vi'
                ? 'Tự thêm từ mới, ngữ pháp hoặc câu hay bên ngoài để đưa vào Đấu Trường luyện tập!'
                : '自分で新しい単語や文法を登録して、オリジナルバトルで練習しよう！'}
            </p>
          </div>

          {/* Quick AI Sensei banner */}
          <div
            onClick={() => setView('study')}
            className="cursor-pointer p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-950 border border-purple-800/40 hover:border-purple-500/50 transition group shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                🌸
              </div>
              <div>
                <h4 className="font-bold text-purple-200 text-sm group-hover:text-purple-100">
                  さくら先生 (Sakura Sensei)
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Thắc mắc ngữ pháp, kanji hay trợ từ? Hỏi ngay Sensei giải đáp 2 chế độ!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Mini-Games Quick Arcade Showcase */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Swords className="w-5 h-5 text-rose-500" />
              <span>{user.language === 'vi' ? '6 Chế Độ Đấu Trường Mini-Game' : '6つのミニゲーム・アリーナ'}</span>
            </h3>
            <p className="text-xs text-slate-400">
              Chọn ngay chế độ bạn muốn rèn luyện để tăng cường kỹ năng chuyên sâu.
            </p>
          </div>
          <button
            onClick={() => setView('battle')}
            className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
          >
            {user.language === 'vi' ? 'Đấu trường đầy đủ' : 'バトル一覧'} ➔
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            {
              type: 'flash_battle',
              title: 'Flash Battle',
              icon: '⚔️',
              desc: 'Tốc chiến 4 đáp án',
              color: 'hover:border-rose-500/50'
            },
            {
              type: 'sentence_builder',
              title: 'Sentence Builder',
              icon: '🧩',
              desc: 'Ghép từ xếp câu',
              color: 'hover:border-amber-500/50'
            },
            {
              type: 'kanji_match',
              title: 'Kanji Match',
              icon: '🈶',
              desc: 'Lật thẻ ghép Kanji',
              color: 'hover:border-cyan-500/50'
            },
            {
              type: 'listening_quest',
              title: 'Listening Quest',
              icon: '👂',
              desc: 'Luyện nghe phát âm',
              color: 'hover:border-emerald-500/50'
            },
            {
              type: 'conversation_quest',
              title: 'Conversation',
              icon: '🗣️',
              desc: 'Hội thoại tình huống',
              color: 'hover:border-purple-500/50'
            },
            {
              type: 'boss_battle',
              title: 'Boss Battle',
              icon: '👹',
              desc: 'Đại chiến trùm cuối',
              color: 'hover:border-red-500/60'
            }
          ].map((mode) => (
            <div
              key={mode.type}
              onClick={() => setView('battle')}
              className={`p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 ${mode.color} cursor-pointer hover:-translate-y-1 transition duration-200 text-center space-y-1.5 shadow-md`}
            >
              <div className="text-2xl">{mode.icon}</div>
              <div className="font-bold text-xs text-slate-100 truncate">{mode.title}</div>
              <div className="text-[11px] text-slate-400">{mode.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
