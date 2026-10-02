import { Region, Stage, LearningItem, JLPTLevel } from '../types/game';
import { QUESTIONS_N5 } from './questionsN5';
import { QUESTIONS_N4 } from './questionsN4';
import { QUESTIONS_N3 } from './questionsN3';

export const ALL_QUESTIONS: LearningItem[] = [
  ...QUESTIONS_N5,
  ...QUESTIONS_N4,
  ...QUESTIONS_N3,
];

export function getQuestionById(id: string): LearningItem | undefined {
  return ALL_QUESTIONS.find((q) => q.id === id);
}

export function getQuestionsByLevel(level: JLPTLevel): LearningItem[] {
  return ALL_QUESTIONS.filter((q) => q.level === level);
}

export const REGIONS: Region[] = [
  {
    id: 'N5',
    nameVi: 'Làng Hoa Anh Đào',
    nameJp: '桜の村 (Sakura Village)',
    subtitleVi: 'Khởi đầu cuộc hành trình: Bảng chữ cái, từ vựng nền tảng & trợ từ cơ bản',
    subtitleJp: '五十音・基本語彙・助詞の基礎を極める',
    icon: '🌸',
    color: 'from-pink-500 to-rose-600',
    badge: 'N5 SƠ CẤP',
    bgGradient: 'bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-950',
    stages: [
      {
        id: 'n5_stage_1',
        level: 'N5',
        stageNumber: 1,
        titleVi: 'Cổng Làng Torii',
        titleJp: '鳥居の門 (Torii Gate)',
        descriptionVi: 'Làm quen với các từ vựng chào hỏi và sinh hoạt quen thuộc.',
        descriptionJp: '日常の基本単語でウォーミングアップ！',
        gameType: 'flash_battle',
        requiredLevel: 1,
        questionIds: ['n5_voc_001', 'n5_voc_002', 'n5_voc_003', 'n5_voc_004'],
        rewardXp: 50,
        icon: '⛩️'
      },
      {
        id: 'n5_stage_2',
        level: 'N5',
        stageNumber: 2,
        titleVi: 'Rừng Kanji Khởi Thủy',
        titleJp: '漢字の森 (Kanji Woods)',
        descriptionVi: 'Ghép nối và nhận diện các Hán tự cơ bản nhất như Thuỷ, Học, Xe hơi.',
        descriptionJp: '基本漢字の読みと意味をマスターしよう。',
        gameType: 'kanji_match',
        requiredLevel: 1,
        questionIds: ['n5_kanji_001', 'n5_kanji_002', 'n5_kanji_004', 'n5_kanji_005'],
        rewardXp: 60,
        icon: '🈶'
      },
      {
        id: 'n5_stage_3',
        level: 'N5',
        stageNumber: 3,
        titleVi: 'Cây Cầu Trợ Từ',
        titleJp: '助詞の橋 (Particle Bridge)',
        descriptionVi: 'Xây dựng câu hoàn chỉnh bằng cách sắp xếp trợ từ は, に, で, を.',
        descriptionJp: '助詞（は・に・で・を）を正しく並べ替えて橋を渡ろう！',
        gameType: 'sentence_builder',
        requiredLevel: 1,
        questionIds: ['n5_sen_001', 'n5_sen_002', 'n5_gra_001', 'n5_gra_002'],
        rewardXp: 70,
        icon: '🧩'
      },
      {
        id: 'n5_stage_4',
        level: 'N5',
        stageNumber: 4,
        titleVi: 'Suối Âm Thanh',
        titleJp: '音の泉 (Sound Spring)',
        descriptionVi: 'Lắng nghe phát âm của người bản xứ và chọn đáp án chính xác.',
        descriptionJp: '日本語のリスニングに挑戦しよう。',
        gameType: 'listening_quest',
        requiredLevel: 2,
        questionIds: ['n5_lis_001', 'n5_lis_002', 'n5_lis_003'],
        rewardXp: 80,
        icon: '👂'
      },
      {
        id: 'n5_stage_5',
        level: 'N5',
        stageNumber: 5,
        titleVi: 'Quán Trà Sakura',
        titleJp: 'さくら茶屋 (Sakura Teahouse)',
        descriptionVi: 'Trò chuyện cùng người dân trong quán trà với các câu giao tiếp lịch thiệp.',
        descriptionJp: '茶屋の店員さんや仲間と楽しく会話しよう！',
        gameType: 'conversation_quest',
        requiredLevel: 2,
        questionIds: ['n5_con_001', 'n5_con_002', 'n5_con_003'],
        rewardXp: 90,
        icon: '🍵'
      },
      {
        id: 'n5_stage_6',
        level: 'N5',
        stageNumber: 6,
        titleVi: 'Trùm Yêu Hồ Cửu Vĩ',
        titleJp: '妖狐の試練 (Kitsune Trial)',
        descriptionVi: 'Đánh bại Yêu Hồ canh giữ Làng Sakura để mở khóa cánh cổng đến Tokyo!',
        descriptionJp: '九尾の妖狐を倒して、次の都市へ進め！',
        gameType: 'boss_battle',
        requiredLevel: 3,
        bossHp: 100,
        bossName: 'Yêu Hồ Linh Bạch (白狐の霊)',
        bossAvatar: '🦊',
        questionIds: ['n5_gra_007', 'n5_gra_008', 'n5_kanji_003', 'n5_voc_005', 'n5_rea_001', 'n5_rea_002'],
        rewardXp: 200,
        icon: '👹'
      }
    ]
  },
  {
    id: 'N4',
    nameVi: 'Thành Phố Tokyo',
    nameJp: '東京シティ (Tokyo City)',
    subtitleVi: 'Bước ngoặt trung cấp: Thể sai khiến, bị động, điều kiện & giao tiếp công sở',
    subtitleJp: '使役・受身・条件形・ビジネス基礎をマスター',
    icon: '🏙️',
    color: 'from-cyan-500 to-blue-600',
    badge: 'N4 TRUNG CẤP I',
    bgGradient: 'bg-gradient-to-br from-slate-900 via-cyan-950/40 to-slate-950',
    stages: [
      {
        id: 'n4_stage_1',
        level: 'N4',
        stageNumber: 1,
        titleVi: 'Giao Lộ Shibuya',
        titleJp: '渋谷交差点 (Shibuya Crossing)',
        descriptionVi: 'Tốc độ phản xạ từ vựng và ngữ pháp trạng thái thể て, ない, た.',
        descriptionJp: 'めまぐるしい街で瞬時に正しい文法を判断しよう。',
        gameType: 'flash_battle',
        requiredLevel: 4,
        questionIds: ['n4_gra_001', 'n4_gra_002', 'n4_voc_001', 'n4_voc_002'],
        rewardXp: 100,
        icon: '🚦'
      },
      {
        id: 'n4_stage_2',
        level: 'N4',
        stageNumber: 2,
        titleVi: 'Khu Đèn Điện Akihabara',
        titleJp: '秋葉原電脳街 (Akihabara Tech)',
        descriptionVi: 'Ghép cặp Hán tự N4: Hướng dẫn, Giải thích, Kinh nghiệm, Tiện lợi.',
        descriptionJp: 'ハイテク街でN4重要漢字をマッチング！',
        gameType: 'kanji_match',
        requiredLevel: 4,
        questionIds: ['n4_kanji_001', 'n4_kanji_002', 'n4_kanji_003', 'n4_kanji_004'],
        rewardXp: 110,
        icon: '⚡'
      },
      {
        id: 'n4_stage_3',
        level: 'N4',
        stageNumber: 3,
        titleVi: 'Tháp Truyền Hình Tokyo Sky',
        titleJp: 'スカイツリー (Tokyo Sky Tower)',
        descriptionVi: 'Sắp xếp câu điều kiện giả định và dự báo phức hợp.',
        descriptionJp: 'より高度な文構造を組み立てて高みを目指せ！',
        gameType: 'sentence_builder',
        requiredLevel: 5,
        questionIds: ['n4_sen_001', 'n4_sen_002', 'n4_gra_003', 'n4_gra_004'],
        rewardXp: 120,
        icon: '🗼'
      },
      {
        id: 'n4_stage_4',
        level: 'N4',
        stageNumber: 4,
        titleVi: 'Nhà Ga Shinjuku Giờ Cao Điểm',
        titleJp: '新宿ラッシュ (Shinjuku Rush)',
        descriptionVi: 'Lắng nghe các thông báo đời thực và phản hồi nhanh.',
        descriptionJp: 'リアルなアナウンスを聞き取ろう。',
        gameType: 'listening_quest',
        requiredLevel: 5,
        questionIds: ['n4_lis_001', 'n4_lis_002'],
        rewardXp: 130,
        icon: '🚆'
      },
      {
        id: 'n4_stage_5',
        level: 'N4',
        stageNumber: 5,
        titleVi: 'Văn Phòng Marunouchi',
        titleJp: '丸の内オフィス (Office Quest)',
        descriptionVi: 'Hội thoại ứng xử chuẩn mực cùng cấp trên và đồng nghiệp Nhật Bản.',
        descriptionJp: '上司や取引先とのビジネスマナー会話に挑戦！',
        gameType: 'conversation_quest',
        requiredLevel: 6,
        questionIds: ['n4_con_001', 'n4_con_002'],
        rewardXp: 140,
        icon: '💼'
      },
      {
        id: 'n4_stage_6',
        level: 'N4',
        stageNumber: 6,
        titleVi: 'Trùm Cơ Khí Mecha Samurai',
        titleJp: '鋼鉄の武士 (Cyber Samurai)',
        descriptionVi: 'Trùm công nghệ bảo vệ thành phố với kho vũ khí ngữ pháp bị động - sai khiến!',
        descriptionJp: '巨大メカ侍を倒して、侍の古城への道を切り開け！',
        gameType: 'boss_battle',
        requiredLevel: 6,
        bossHp: 150,
        bossName: 'Cương Thiết Mecha (サイバー武士)',
        bossAvatar: '🤖',
        questionIds: ['n4_gra_005', 'n4_gra_006', 'n4_gra_007', 'n4_gra_008', 'n4_gra_011', 'n4_gra_012'],
        rewardXp: 250,
        icon: '⚔️'
      }
    ]
  },
  {
    id: 'N3',
    nameVi: 'Lâu Đài Samurai',
    nameJp: 'サムライ城 (Samurai Castle)',
    subtitleVi: 'Đỉnh cao trung cấp: Phân biệt sắc thái, kính ngữ thực chiến & ngữ pháp tinh hoa',
    subtitleJp: 'ニュアンスの使い分け・実戦敬語・N3頻出文法を完全制覇',
    icon: '🏯',
    color: 'from-amber-500 to-red-600',
    badge: 'N3 TRUNG CẤP II',
    bgGradient: 'bg-gradient-to-br from-slate-900 via-amber-950/40 to-slate-950',
    stages: [
      {
        id: 'n3_stage_1',
        level: 'N3',
        stageNumber: 1,
        titleVi: 'Cổng Thành Hào Sâu',
        titleJp: '大手門 (Castle Gate)',
        descriptionVi: 'Vượt qua bài test phản xạ ngữ pháp N3: わけではない, わりに, に対して.',
        descriptionJp: 'N3特有の微妙なニュアンス文法を突破せよ！',
        gameType: 'flash_battle',
        requiredLevel: 7,
        questionIds: ['n3_gra_001', 'n3_gra_002', 'n3_gra_003', 'n3_gra_004'],
        rewardXp: 150,
        icon: '🛡️'
      },
      {
        id: 'n3_stage_2',
        level: 'N3',
        stageNumber: 2,
        titleVi: 'Thư Phòng Cổ Tự',
        titleJp: '古文書の間 (Scroll Room)',
        descriptionVi: 'Khớp nối các cặp Hán tự cao cấp: Khuynh hướng, Hoãn lại, Hoan nghênh, Thận trọng.',
        descriptionJp: '上級漢字の訓読・音読を完璧に見極めよう。',
        gameType: 'kanji_match',
        requiredLevel: 7,
        questionIds: ['n3_kanji_001', 'n3_kanji_002', 'n3_kanji_003', 'n3_kanji_004'],
        rewardXp: 160,
        icon: '📜'
      },
      {
        id: 'n3_stage_3',
        level: 'N3',
        stageNumber: 3,
        titleVi: 'Vườn Đá Thiền Định',
        titleJp: '枯山水 (Zen Garden)',
        descriptionVi: 'Sắp xếp các câu văn lập luận sâu sắc với cấu trúc nhượng bộ phức tạp.',
        descriptionJp: '論理的で美しい長文を組み立てよ。',
        gameType: 'sentence_builder',
        requiredLevel: 8,
        questionIds: ['n3_sen_001', 'n3_sen_002', 'n3_gra_005', 'n3_gra_006'],
        rewardXp: 170,
        icon: '🪨'
      },
      {
        id: 'n3_stage_4',
        level: 'N3',
        stageNumber: 4,
        titleVi: 'Thính Phòng Vọng Nguyệt',
        titleJp: '月見の櫓 (Moon Watchtower)',
        descriptionVi: 'Nghe hiểu các thông tin thời sự, phát thanh công cộng tinh vi.',
        descriptionJp: '高度な日本語リスニングを聞き分けろ。',
        gameType: 'listening_quest',
        requiredLevel: 8,
        questionIds: ['n3_lis_001', 'n3_rea_001'],
        rewardXp: 180,
        icon: '🌕'
      },
      {
        id: 'n3_stage_5',
        level: 'N3',
        stageNumber: 5,
        titleVi: 'Đại Điện Thượng Tướng',
        titleJp: '将軍の大広間 (Shogun Hall)',
        descriptionVi: 'Thử thách Kính ngữ và Khiêm nhường ngữ cao cấp cùng Giáo sư & Khách VIP.',
        descriptionJp: '尊敬語・謙譲語の達人を目指して対話せよ！',
        gameType: 'conversation_quest',
        requiredLevel: 9,
        questionIds: ['n3_con_001', 'n3_con_002'],
        rewardXp: 190,
        icon: '👑'
      },
      {
        id: 'n3_stage_6',
        level: 'N3',
        stageNumber: 6,
        titleVi: 'Đại Tướng Quân Hỏa Long',
        titleJp: '炎竜の将軍 (Fire Dragon General)',
        descriptionVi: 'Trận chiến định đoạt danh hiệu Kiếm Thánh Tiếng Nhật! Boss có 200 HP!',
        descriptionJp: '日本語クエストの頂点！究極のボスを討ち果たせ！',
        gameType: 'boss_battle',
        requiredLevel: 9,
        bossHp: 200,
        bossName: 'Hỏa Long Tướng Quân (炎竜将軍)',
        bossAvatar: '🐉',
        questionIds: ['n3_gra_007', 'n3_gra_008', 'n3_gra_009', 'n3_gra_010', 'n3_gra_011', 'n3_gra_012'],
        rewardXp: 350,
        icon: '🔥'
      }
    ]
  }
];

export function getStageById(stageId: string): { stage: Stage; region: Region } | null {
  for (const reg of REGIONS) {
    const found = reg.stages.find((s) => s.id === stageId);
    if (found) return { stage: found, region: reg };
  }
  return null;
}
