export type JLPTLevel = 'N5' | 'N4' | 'N3';

export type QuestionCategory = 'vocabulary' | 'kanji' | 'grammar' | 'reading' | 'listening' | 'conversation';

export type MiniGameType =
  | 'flash_battle'
  | 'sentence_builder'
  | 'kanji_match'
  | 'listening_quest'
  | 'conversation_quest'
  | 'boss_battle';

export interface LearningItem {
  id: string;
  level: JLPTLevel;
  category: QuestionCategory;
  question: string;
  furigana?: string;
  choices: string[];
  correctAnswer: string;
  explanation: string;
  example: string;
  translation: string;
  difficulty: 1 | 2 | 3;
  // Extras for specific mini-games
  wordTiles?: string[]; // for sentence builder
  audioText?: string; // text to speak for listening
  speakerName?: string; // for conversation
  bossName?: string; // for boss battle custom flavor
  isCustom?: boolean; // marker for user-created custom card
}

export interface CustomKnowledgeItem {
  id: string;
  level: JLPTLevel;
  category: QuestionCategory | 'phrase';
  term: string; // Japanese term, kanji or grammar structure
  furigana?: string;
  meaningVi: string;
  exampleJp?: string;
  exampleVi?: string;
  notes?: string;
  tags?: string[];
  createdAt: string;
  mastery: number; // 0 - 5
}

export interface Stage {
  id: string;
  level: JLPTLevel;
  stageNumber: number;
  titleVi: string;
  titleJp: string;
  descriptionVi: string;
  descriptionJp: string;
  gameType: MiniGameType;
  requiredLevel: number;
  questionIds: string[];
  bossHp?: number;
  bossName?: string;
  bossAvatar?: string;
  rewardXp: number;
  icon: string;
}

export interface Region {
  id: JLPTLevel;
  nameVi: string;
  nameJp: string;
  subtitleVi: string;
  subtitleJp: string;
  icon: string;
  color: string;
  badge: string;
  bgGradient: string;
  stages: Stage[];
}

export interface DailyQuest {
  id: string;
  titleVi: string;
  titleJp: string;
  descVi: string;
  descJp: string;
  current: number;
  target: number;
  rewardXp: number;
  isClaimed: boolean;
  type: 'questions' | 'stage' | 'battle' | 'review' | 'boss';
}

export interface Achievement {
  id: string;
  titleVi: string;
  titleJp: string;
  descVi: string;
  descJp: string;
  icon: string;
  current: number;
  target: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  rewardXp: number;
}

export interface WrongQuestion {
  questionId: string;
  item: LearningItem;
  failedCount: number;
  lastFailedDate: string;
}

export interface UserAuthProfile {
  email?: string;
  displayName?: string;
  photoURL?: string;
  uid?: string;
  provider: 'google' | 'guest';
  isLoggedIn: boolean;
  loggedInAt?: string;
}

export interface UserStats {
  username: string;
  avatar: string;
  level: number;
  xp: number;
  totalXp: number;
  streak: number;
  lastActiveDate: string;
  completedStages: Record<string, { completed: boolean; score: number; stars: number; clearedAt: string }>;
  wrongQuestions: Record<string, WrongQuestion>;
  unlockedAchievements: string[];
  dailyQuests: DailyQuest[];
  lastDailyQuestDate: string;
  battlesWon: number;
  vocabLearnedCount: number;
  kanjiLearnedCount: number;
  grammarLearnedCount: number;
  soundEnabled: boolean;
  furiganaEnabled: boolean;
  language: 'vi' | 'jp';
  authProfile?: UserAuthProfile;
  customKnowledge: Record<string, CustomKnowledgeItem>;
}

export type ViewTab =
  | 'home'
  | 'map'
  | 'battle'
  | 'study'
  | 'daily'
  | 'achievements'
  | 'profile'
  | 'review'
  | 'custom_knowledge';
