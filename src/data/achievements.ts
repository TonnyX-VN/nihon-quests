import { Achievement } from '../types/game';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_step',
    titleVi: 'Bước Chân Đầu Tiên',
    titleJp: '最初の一歩 (First Step)',
    descVi: 'Hoàn thành Stage đầu tiên trên bản đồ phiêu lưu.',
    descJp: '最初のステージをクリアする。',
    icon: '🌱',
    current: 0,
    target: 1,
    isUnlocked: false,
    rewardXp: 50
  },
  {
    id: 'streak_7',
    titleVi: 'Ý Chí Rực Lửa',
    titleJp: '不屈の炎 (7 Day Streak)',
    descVi: 'Duy trì chuỗi học liên tiếp trong 7 ngày.',
    descJp: '7日間連続で学習を継続する。',
    icon: '🔥',
    current: 1,
    target: 7,
    isUnlocked: false,
    rewardXp: 200
  },
  {
    id: 'battle_master',
    titleVi: 'Chiến Thần Đấu Trường',
    titleJp: '百戦錬磨 (Battle Master)',
    descVi: 'Chiến thắng 25 trận Battle và câu đố.',
    descJp: '25回のバトルに勝利する。',
    icon: '⚔️',
    current: 0,
    target: 25,
    isUnlocked: false,
    rewardXp: 250
  },
  {
    id: 'kanji_hunter',
    titleVi: 'Thợ Săn Hán Tự',
    titleJp: '漢字ハンター (Kanji Hunter)',
    descVi: 'Khắc ghi và vượt qua 20 câu hỏi Kanji chính xác.',
    descJp: '漢字問題を20問正解する。',
    icon: '🈶',
    current: 0,
    target: 20,
    isUnlocked: false,
    rewardXp: 180
  },
  {
    id: 'combo_king',
    titleVi: 'Vua Combo Tốc Độ',
    titleJp: '連撃王 (Combo King)',
    descVi: 'Đạt chuỗi liên kích 10 câu trả lời chính xác liên tiếp.',
    descJp: '10回連続正解のコンボを達成する。',
    icon: '⚡',
    current: 0,
    target: 10,
    isUnlocked: false,
    rewardXp: 150
  },
  {
    id: 'boss_slayer',
    titleVi: 'Dũng Sĩ Diệt Trùm',
    titleJp: '魔物討伐者 (Boss Slayer)',
    descVi: 'Đánh bại một đại Boss canh giữ cổng thành.',
    descJp: '試練のボスモンスターを討ち果たす。',
    icon: '👹',
    current: 0,
    target: 1,
    isUnlocked: false,
    rewardXp: 300
  },
  {
    id: 'n3_challenger',
    titleVi: 'Kẻ Khiêu Chiến N3',
    titleJp: '古城の挑戦者 (N3 Challenger)',
    descVi: 'Mở khóa đến khu vực Lâu Đài Samurai N3.',
    descJp: 'サムライ城エリアを開放する。',
    icon: '👑',
    current: 0,
    target: 1,
    isUnlocked: false,
    rewardXp: 350
  },
  {
    id: 'sensei_disciple',
    titleVi: 'Đồ Đệ Của Sakura Sensei',
    titleJp: 'さくら門下生 (Sensei Disciple)',
    descVi: 'Thỉnh giáo Sakura Sensei về ngữ pháp hoặc từ vựng.',
    descJp: 'さくら先生に質問して教えを乞う。',
    icon: '🌸',
    current: 0,
    target: 1,
    isUnlocked: false,
    rewardXp: 100
  }
];
