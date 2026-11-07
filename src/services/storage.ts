import { UserStats, DailyQuest, LearningItem, WrongQuestion, CustomKnowledgeItem, UserAuthProfile } from '../types/game';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import { googleAuthService } from './googleAuth';

export const STORAGE_KEY = 'nihongo_quest_user_v1';

export function getXpForLevel(level: number): number {
  return Math.floor(250 * Math.pow(1.22, level - 1));
}

export function getDefaultDailyQuests(): DailyQuest[] {
  return [
    {
      id: 'quest_1',
      titleVi: 'Học 5 câu hỏi mới',
      titleJp: '新しい問題を5問解く',
      descVi: 'Luyện tập trả lời đúng 5 câu hỏi bất kỳ',
      descJp: '任意のクイズで5問正解しよう',
      current: 0,
      target: 5,
      rewardXp: 50,
      isClaimed: false,
      type: 'questions'
    },
    {
      id: 'quest_2',
      titleVi: 'Hoàn thành 1 Stage trên bản đồ',
      titleJp: 'マップのステージを1つクリア',
      descVi: 'Vượt qua 1 màn chơi trong Làng Sakura, Tokyo hoặc Lâu Đài',
      descJp: 'いずれかのステージを攻略しよう',
      current: 0,
      target: 1,
      rewardXp: 100,
      isClaimed: false,
      type: 'stage'
    },
    {
      id: 'quest_3',
      titleVi: 'Thắng 1 trận Battle',
      titleJp: 'バトルで1勝する',
      descVi: 'Tham gia Đấu Trường Chớp Nhoáng hoặc Đấu Trùm',
      descJp: 'フラッシュバトルまたはボス戦に勝利する',
      current: 0,
      target: 1,
      rewardXp: 80,
      isClaimed: false,
      type: 'battle'
    },
    {
      id: 'quest_4',
      titleVi: 'Ôn tập 3 câu hỏi sai',
      titleJp: '間違えた問題を3回復習する',
      descVi: 'Truy cập Sổ tay ôn tập để khắc phục điểm yếu',
      descJp: '復習ノートで弱点を克服しよう',
      current: 0,
      target: 3,
      rewardXp: 60,
      isClaimed: false,
      type: 'review'
    },
    {
      id: 'quest_5',
      titleVi: 'Khiêu chiến Đại Boss',
      titleJp: '大ボスに挑戦する',
      descVi: 'Tấn công gây sát thương lên Boss ít nhất 1 lần',
      descJp: 'ボス戦でダメージを与えよう',
      current: 0,
      target: 1,
      rewardXp: 150,
      isClaimed: false,
      type: 'boss'
    }
  ];
}

export const INITIAL_CUSTOM_KNOWLEDGE: Record<string, CustomKnowledgeItem> = {
  'custom_1': {
    id: 'custom_1',
    level: 'N3',
    category: 'kanji',
    term: '一期一会',
    furigana: 'いちごいちえ',
    meaningVi: 'Nhất kỳ nhất hội — Đời người chỉ gặp một lần, trân quý từng cuộc hạnh ngộ.',
    exampleJp: '茶道では「一期一会」の心を最も大切にします。',
    exampleVi: 'Trong trà đạo, người ta trân trọng nhất tinh thần "Nhất kỳ nhất hội".',
    notes: 'Thành ngữ 4 chữ (Yojijukugo) kinh điển của văn hóa Nhật Bản.',
    tags: ['Triết lý', 'Trà đạo', 'Yojijukugo'],
    createdAt: '2026-09-27T08:00:00.000Z',
    mastery: 4
  },
  'custom_2': {
    id: 'custom_2',
    level: 'N4',
    category: 'vocabulary',
    term: '木漏れ日',
    furigana: 'こもれび',
    meaningVi: 'Ánh nắng vàng lung linh len qua kẽ lá xanh mướt.',
    exampleJp: '森の中を散歩すると、美しい木漏れ日が差し込んでいた。',
    exampleVi: 'Dạo bước trong rừng, những tia nắng len qua kẽ lá rọi xuống tuyệt đẹp.',
    notes: 'Từ ngữ thi vị độc đáo của tiếng Nhật, khó dịch sang ngôn ngữ khác chỉ bằng 1 từ.',
    tags: ['Thi vị', 'Thiên nhiên', 'Đời sống'],
    createdAt: '2026-09-27T08:30:00.000Z',
    mastery: 3
  },
  'custom_3': {
    id: 'custom_3',
    level: 'N5',
    category: 'phrase',
    term: 'お疲れ様でした',
    furigana: 'おつかれさまでした',
    meaningVi: 'Anh/chị đã vất vả rồi! (Câu chào khi hoàn thành công việc hoặc tan làm).',
    exampleJp: '今日も一日お疲れ様でした！また明日。',
    exampleVi: 'Hôm nay bạn đã vất vả nhiều rồi! Hẹn gặp lại ngày mai nhé.',
    notes: 'Câu chào cửa miệng hàng ngày không thể thiếu trong môi trường học tập và công ty Nhật.',
    tags: ['Giao tiếp', 'Công sở', 'Hàng ngày'],
    createdAt: '2026-09-27T09:00:00.000Z',
    mastery: 5
  }
};

export const GUEST_AUTH_PROFILE: UserAuthProfile = {
  provider: 'guest',
  isLoggedIn: false,
  displayName: 'Khách Phiêu Lưu',
  email: undefined,
  photoURL: undefined,
  uid: undefined,
  loggedInAt: undefined
};

/**
 * Tạo bộ dữ liệu mới sạch sẽ cho tài khoản (không dùng chung hay kế thừa từ tài khoản khác)
 */
export function createNewUserStats(
  uid?: string,
  displayName?: string,
  email?: string,
  photoURL?: string
): UserStats {
  const isGuest = !uid || uid === 'guest';
  const today = new Date().toISOString().split('T')[0];

  return {
    userId: isGuest ? 'guest' : uid,
    username: displayName || (isGuest ? 'Khách Phiêu Lưu' : email?.split('@')[0] || 'Chiến Binh Sakura'),
    avatar: '🥷',
    level: 1,
    xp: isGuest ? 120 : 0,
    totalXp: isGuest ? 120 : 0,
    streak: isGuest ? 7 : 1,
    lastActiveDate: today,
    completedStages: {},
    wrongQuestions: {},
    unlockedAchievements: [],
    dailyQuests: getDefaultDailyQuests(),
    lastDailyQuestDate: today,
    battlesWon: 0,
    vocabLearnedCount: 0,
    kanjiLearnedCount: 0,
    grammarLearnedCount: 0,
    soundEnabled: true,
    furiganaEnabled: true,
    language: 'vi',
    customKnowledge: isGuest ? { ...INITIAL_CUSTOM_KNOWLEDGE } : {},
    authProfile: isGuest
      ? { ...GUEST_AUTH_PROFILE }
      : {
          provider: 'google',
          isLoggedIn: true,
          email,
          displayName,
          photoURL,
          uid,
          loggedInAt: new Date().toISOString()
        }
  };
}

export const INITIAL_USER_STATS: UserStats = createNewUserStats('guest');

/**
 * 2. LỌC DỮ LIỆU LOCALSTORAGE:
 * Đặt tên khóa (key) có gắn kèm `uid` để phân tách tuyệt đối giữa các tài khoản.
 */
export function getUserStorageKey(uid?: string | null): string {
  if (!uid || uid === 'guest') {
    return 'nihongo_quest_guest_data';
  }
  return `nihongo_quest_user_${uid}`;
}

export const storageService = {
  /**
   * Truy vấn nạp dữ liệu riêng biệt theo từng userId (UID)
   */
  loadUser(uid?: string | null, fallbackProfile?: UserAuthProfile): UserStats {
    if (typeof window === 'undefined') return INITIAL_USER_STATS;
    const targetUid = uid || 'guest';
    const storageKey = getUserStorageKey(targetUid);

    try {
      const data = localStorage.getItem(storageKey);
      if (!data) {
        // Tài khoản chưa có dữ liệu -> Tạo mới độc lập hoàn toàn cho UID này
        const freshStats = createNewUserStats(
          targetUid,
          fallbackProfile?.displayName,
          fallbackProfile?.email,
          fallbackProfile?.photoURL
        );
        this.saveUser(freshStats, targetUid);
        return freshStats;
      }

      const parsed = JSON.parse(data) as UserStats;
      const today = new Date().toISOString().split('T')[0];

      // Đảm bảo luôn gắn đúng userId vào object dữ liệu
      parsed.userId = targetUid;

      // Đảm bảo customKnowledge tồn tại
      if (!parsed.customKnowledge) {
        parsed.customKnowledge = targetUid === 'guest' ? { ...INITIAL_CUSTOM_KNOWLEDGE } : {};
      }

      // Đảm bảo authProfile phù hợp
      if (targetUid === 'guest') {
        parsed.authProfile = { ...GUEST_AUTH_PROFILE };
        if (!parsed.username || parsed.username.includes('@')) {
          parsed.username = 'Khách Phiêu Lưu';
        }
      } else if (fallbackProfile) {
        parsed.authProfile = { ...fallbackProfile };
      }

      // Refresh daily quests nếu sang ngày mới
      if (parsed.lastDailyQuestDate !== today) {
        parsed.dailyQuests = getDefaultDailyQuests();
        parsed.lastDailyQuestDate = today;
      }

      // Streak logic
      if (parsed.lastActiveDate !== today) {
        const last = new Date(parsed.lastActiveDate).getTime();
        const now = new Date(today).getTime();
        const diffDays = Math.round((now - last) / (1000 * 3600 * 24));
        if (diffDays === 1) {
          parsed.streak += 1;
        } else if (diffDays > 1) {
          parsed.streak = 1;
        }
        parsed.lastActiveDate = today;
      }

      return parsed;
    } catch {
      return createNewUserStats(
        targetUid,
        fallbackProfile?.displayName,
        fallbackProfile?.email,
        fallbackProfile?.photoURL
      );
    }
  },

  /**
   * 1. GẮN USER ID KHI LƯU DỮ LIỆU VÀO LOCALSTORAGE:
   * Luôn gắn userId vào đối tượng và lưu vào đúng key `nihongo_quest_user_${uid}`
   */
  saveUser(stats: UserStats, explicitUid?: string | null) {
    if (typeof window === 'undefined') return;
    const currentUid = explicitUid || stats.userId || stats.authProfile?.uid || 'guest';
    const storageKey = getUserStorageKey(currentUid);

    try {
      const dataWithUserId: UserStats = {
        ...stats,
        userId: currentUid
      };
      localStorage.setItem(storageKey, JSON.stringify(dataWithUserId));
    } catch {
      // ignore
    }
  },

  /**
   * 3. XỬ LÝ KHI ĐĂNG XUẤT:
   * Xóa sạch các phiên làm việc tạm và trả về dữ liệu Khách hoàn toàn mới/độc lập
   */
  logoutAndResetToGuest(): UserStats {
    googleAuthService.logout();

    // Nạp dữ liệu riêng biệt của Khách (không mang theo bất kỳ dữ liệu nào của tài khoản vừa đăng xuất)
    const guestUser = this.loadUser('guest');
    return guestUser;
  },

  resetAll(uid?: string | null): UserStats {
    if (typeof window !== 'undefined') {
      const targetUid = uid || 'guest';
      localStorage.removeItem(getUserStorageKey(targetUid));
    }
    return createNewUserStats(uid || 'guest');
  }
};
