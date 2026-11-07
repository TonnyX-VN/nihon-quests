import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserStats, ViewTab, Stage, LearningItem, JLPTLevel, CustomKnowledgeItem, UserAuthProfile } from '../types/game';
import { storageService, getXpForLevel, getDefaultDailyQuests } from '../services/storage';
import { INITIAL_ACHIEVEMENTS } from '../data/achievements';
import { soundService } from '../services/sound';
import { REGIONS } from '../data/stages';
import { googleAuthService } from '../services/googleAuth';
import { firestoreSyncService } from '../services/firestoreSync';
import { auth } from '../services/firebase';

interface GameToast {
  id: number;
  text: string;
  icon: string;
  type?: 'success' | 'levelUp' | 'achievement' | 'combo';
}

interface GameContextType {
  user: UserStats;
  view: ViewTab;
  setView: (tab: ViewTab) => void;
  activeStage: Stage | null;
  setActiveStage: (stage: Stage | null) => void;
  selectedLevel: JLPTLevel;
  setSelectedLevel: (level: JLPTLevel) => void;
  breadcrumbs: string[];
  setBreadcrumbs: (crumbs: string[]) => void;
  addXp: (amount: number, reason?: string) => void;
  recordCorrectAnswer: (item: LearningItem, combo: number) => void;
  recordWrongAnswer: (item: LearningItem) => void;
  completeStage: (stageId: string, stars: number, score: number, maxCombo: number) => void;
  claimDailyQuest: (questId: string) => void;
  toggleSound: () => void;
  toggleFurigana: () => void;
  setLanguage: (lang: 'vi' | 'jp') => void;
  updateUserAvatar: (avatar: string, username?: string) => void;
  resetProgress: () => void;
  toasts: GameToast[];
  showToast: (text: string, icon: string, type?: GameToast['type']) => void;
  openSenseiWithContext: (contextPrompt: string) => void;
  senseiInitialContext: string;
  // Auth methods
  loginWithGoogle: (email?: string, displayName?: string, photoURL?: string) => Promise<boolean>;
  logoutAuth: () => Promise<void>;
  isAuthModalOpen: boolean;
  openGoogleAuthModal: () => void;
  closeGoogleAuthModal: () => void;
  // Custom Knowledge methods
  addCustomKnowledge: (item: Omit<CustomKnowledgeItem, 'id' | 'createdAt' | 'mastery'>) => void;
  updateCustomKnowledge: (id: string, updates: Partial<CustomKnowledgeItem>) => void;
  deleteCustomKnowledge: (id: string) => void;
  playCustomKnowledgeStage: (items: CustomKnowledgeItem[]) => void;
  // Backup / Data sync
  exportUserData: () => string;
  importUserData: (jsonData: string) => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserStats>(() => storageService.loadUser());
  const [view, setViewInternal] = useState<ViewTab>('home');
  const [activeStage, setActiveStage] = useState<Stage | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel>('N5');
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>(['Trang Chủ']);
  const [toasts, setToasts] = useState<GameToast[]>([]);
  const [senseiInitialContext, setSenseiInitialContext] = useState<string>('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openGoogleAuthModal = () => setIsAuthModalOpen(true);
  const closeGoogleAuthModal = () => setIsAuthModalOpen(false);

  // Sync sound service preference
  useEffect(() => {
    soundService.enabled = user.soundEnabled;
  }, [user.soundEnabled]);

  // 1. GẮN USER ID KHI LƯU DỮ LIỆU: Lưu vào đúng key LocalStorage của UID và đồng bộ Firestore
  useEffect(() => {
    const currentUid = user.userId || auth.currentUser?.uid || user.authProfile?.uid || 'guest';
    storageService.saveUser(user, currentUid);

    // Đồng bộ lên Firestore nếu tài khoản đã đăng nhập
    if (currentUid !== 'guest') {
      firestoreSyncService.saveUserData(user);
    }
  }, [user]);

  const showToast = useCallback((text: string, icon: string, type: GameToast['type'] = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, text, icon, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const setView = (tab: ViewTab) => {
    soundService.play('click');
    setViewInternal(tab);
    switch (tab) {
      case 'home':
        setBreadcrumbs(['Trang Chủ']);
        break;
      case 'map':
        setBreadcrumbs(['Bản Đồ', selectedLevel]);
        break;
      case 'battle':
        setBreadcrumbs(['Đấu Trường Battle']);
        break;
      case 'study':
        setBreadcrumbs(['Học Tập & AI Sensei']);
        break;
      case 'custom_knowledge':
        setBreadcrumbs(['Kho Kiến Thức Tự Thêm']);
        break;
      case 'daily':
        setBreadcrumbs(['Nhiệm Vụ Hàng Ngày']);
        break;
      case 'achievements':
        setBreadcrumbs(['Huy Hiệu & Thành Tích']);
        break;
      case 'profile':
        setBreadcrumbs(['Hồ Sơ Kiếm Sĩ']);
        break;
      case 'review':
        setBreadcrumbs(['Sổ Tay Ôn Tập']);
        break;
    }
  };

  const addXp = useCallback((amount: number, reason?: string) => {
    setUser((prev) => {
      let currentXp = prev.xp + amount;
      let totalXp = prev.totalXp + amount;
      let currentLevel = prev.level;
      let neededXp = getXpForLevel(currentLevel);

      let leveledUp = false;
      while (currentXp >= neededXp) {
        currentXp -= neededXp;
        currentLevel += 1;
        neededXp = getXpForLevel(currentLevel);
        leveledUp = true;
      }

      if (leveledUp) {
        soundService.play('levelUp');
        showToast(`CHÚC MỪNG! BẠN ĐÃ THĂNG LÊN CẤP ${currentLevel}!`, '🎉', 'levelUp');
      } else if (reason) {
        showToast(`+${amount} XP: ${reason}`, '⚡', 'combo');
      }

      return {
        ...prev,
        xp: currentXp,
        totalXp: totalXp,
        level: currentLevel,
      };
    });
  }, [showToast]);

  const recordCorrectAnswer = useCallback((item: LearningItem, combo: number) => {
    setUser((prev) => {
      const updated = { ...prev };
      // Daily quest increment
      updated.dailyQuests = updated.dailyQuests.map((q) => {
        if (q.type === 'questions' && q.current < q.target) {
          return { ...q, current: q.current + 1 };
        }
        return q;
      });

      // Categories learned
      if (item.category === 'vocabulary') updated.vocabLearnedCount += 1;
      if (item.category === 'kanji') updated.kanjiLearnedCount += 1;
      if (item.category === 'grammar') updated.grammarLearnedCount += 1;

      // If it's a custom knowledge item, increase its mastery
      if (item.isCustom && item.id.startsWith('custom_') && updated.customKnowledge[item.id]) {
        const cur = updated.customKnowledge[item.id];
        updated.customKnowledge[item.id] = {
          ...cur,
          mastery: Math.min(5, (cur.mastery || 0) + 1)
        };
      }

      // Check combo achievement
      if (combo >= 10 && !updated.unlockedAchievements.includes('combo_king')) {
        updated.unlockedAchievements = [...updated.unlockedAchievements, 'combo_king'];
        showToast('Mở khóa thành tích: Vua Combo Tốc Độ!', '⚡', 'achievement');
      }

      // Check Kanji Hunter achievement
      if (updated.kanjiLearnedCount >= 20 && !updated.unlockedAchievements.includes('kanji_hunter')) {
        updated.unlockedAchievements = [...updated.unlockedAchievements, 'kanji_hunter'];
        showToast('Mở khóa thành tích: Thợ Săn Hán Tự!', '🈶', 'achievement');
      }

      return updated;
    });
  }, [showToast]);

  const recordWrongAnswer = useCallback((item: LearningItem) => {
    soundService.play('wrong');
    setUser((prev) => {
      const existing = prev.wrongQuestions[item.id];
      const updatedWrong = {
        ...prev.wrongQuestions,
        [item.id]: {
          questionId: item.id,
          item,
          failedCount: existing ? existing.failedCount + 1 : 1,
          lastFailedDate: new Date().toISOString()
        }
      };
      return {
        ...prev,
        wrongQuestions: updatedWrong
      };
    });
  }, []);

  const completeStage = useCallback((stageId: string, stars: number, score: number, _maxCombo: number) => {
    soundService.play('victory');
    setUser((prev) => {
      const existing = prev.completedStages[stageId];
      const isNewCompletion = !existing || !existing.completed;

      const updatedStages = {
        ...prev.completedStages,
        [stageId]: {
          completed: true,
          score: Math.max(score, existing?.score || 0),
          stars: Math.max(stars, existing?.stars || 0),
          clearedAt: new Date().toISOString()
        }
      };

      const updatedQuests = prev.dailyQuests.map((q) => {
        if (q.type === 'stage' && q.current < q.target) {
          return { ...q, current: q.current + 1 };
        }
        return q;
      });

      let achievements = [...prev.unlockedAchievements];
      if (isNewCompletion && !achievements.includes('first_step')) {
        achievements.push('first_step');
        showToast('Mở khóa huy hiệu: Bước Chân Đầu Tiên!', '🌱', 'achievement');
      }

      // If finished N4 or N3
      if (stageId.startsWith('n4_') && !achievements.includes('n3_challenger')) {
        achievements.push('n3_challenger');
        showToast('Mở khóa thành tích: Kẻ Khiêu Chiến N3!', '👑', 'achievement');
      }

      return {
        ...prev,
        completedStages: updatedStages,
        dailyQuests: updatedQuests,
        unlockedAchievements: achievements,
        battlesWon: prev.battlesWon + 1
      };
    });
  }, [showToast]);

  const claimDailyQuest = (questId: string) => {
    soundService.play('victory');
    setUser((prev) => {
      const targetQuest = prev.dailyQuests.find((q) => q.id === questId);
      if (!targetQuest || targetQuest.isClaimed || targetQuest.current < targetQuest.target) {
        return prev;
      }

      const updatedQuests = prev.dailyQuests.map((q) =>
        q.id === questId ? { ...q, isClaimed: true } : q
      );

      // Check if all are completed & claimed
      const allDone = updatedQuests.every((q) => q.isClaimed);

      // Add quest XP
      addXp(targetQuest.rewardXp, `Hoàn thành nhiệm vụ: ${targetQuest.titleVi}`);

      if (allDone) {
        addXp(300, 'THƯỞNG LỚN: Hoàn thành tất cả nhiệm vụ ngày!');
        showToast('🏆 DAILY COMPLETE! +300 XP Thưởng Tuyệt Đối!', '🏆', 'levelUp');
      }

      return {
        ...prev,
        dailyQuests: updatedQuests
      };
    });
  };

  const toggleSound = () => {
    setUser((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
    soundService.play('click');
  };

  const toggleFurigana = () => {
    setUser((prev) => ({ ...prev, furiganaEnabled: !prev.furiganaEnabled }));
    soundService.play('click');
  };

  const setLanguage = (lang: 'vi' | 'jp') => {
    setUser((prev) => ({ ...prev, language: lang }));
    soundService.play('click');
  };

  const updateUserAvatar = (avatar: string, username?: string) => {
    setUser((prev) => ({
      ...prev,
      avatar,
      username: username || prev.username
    }));
    soundService.play('click');
    showToast('Đã lưu thông tin hồ sơ!', '✅');
  };

  /**
   * Chuyển đổi và nạp dữ liệu riêng biệt cho từng tài khoản (cách ly hoàn toàn giữa các UID)
   */
  const handleUserAccountChange = useCallback(async (uid: string, profile: UserAuthProfile) => {
    // 1. Nạp ngay lập tức dữ liệu độc lập của UID từ LocalStorage (key: nihongo_quest_user_${uid})
    const localData = storageService.loadUser(uid, profile);
    setUser(localData);

    // 2. LỌC DỮ LIỆU KHI TRUY VẤN: Gọi Firestore với .where('userId', '==', uid)
    try {
      const cloudData = await firestoreSyncService.fetchUserData(uid);
      if (cloudData && cloudData.userId === uid) {
        const mergedData: UserStats = {
          ...cloudData,
          userId: uid,
          authProfile: profile
        };
        setUser(mergedData);
        storageService.saveUser(mergedData, uid);
      } else {
        // Nếu trên đám mây chưa có dữ liệu cho UID này, lưu bản khởi tạo độc lập lên Firestore
        await firestoreSyncService.saveUserData(localData);
      }
    } catch (err) {
      console.warn('[GameContext] Lỗi khi đồng bộ dữ liệu đám mây:', err);
    }
  }, []);

  // 3. XỬ LÝ KHI ĐĂNG NHẬP / ĐĂNG XUẤT QUA FIREBASE AUTH:
  useEffect(() => {
    const unsubscribe = googleAuthService.onAuthStateChange(async (profile, errorMsg) => {
      if (errorMsg) {
        soundService.play('wrong');
        showToast(errorMsg, '⚠️');
        // Khi lỗi hoặc bị từ chối: xóa sạch dữ liệu trên state và chuyển về Khách
        const cleanGuest = storageService.logoutAndResetToGuest();
        setUser(cleanGuest);
        setActiveStage(null);
      } else if (profile && profile.uid) {
        // 2. Tự động ẩn mọi popup/overlay tài khoản khi người dùng đã authenticated thành công qua onAuthStateChanged
        setIsAuthModalOpen(false);
        // Người dùng đăng nhập tài khoản Google mới -> Lập tức fetch lại dữ liệu riêng biệt
        await handleUserAccountChange(profile.uid, profile);
      } else {
        // Trạng thái Chưa đăng nhập / Guest
        setUser((prev) => {
          if (prev.userId === 'guest' && !prev.authProfile?.isLoggedIn) {
            return prev;
          }
          return storageService.loadUser('guest');
        });
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [handleUserAccountChange, showToast]);

  // Đăng nhập bằng Google qua Firebase Auth SDK signInWithPopup
  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const result = await googleAuthService.signInWithFirebasePopup();
      const profile = result.profile;
      if (!profile || !profile.uid) {
        throw new Error('Không nhận được UID người dùng từ Google.');
      }

      // 1. ĐÓNG MODAL/POPUP SAU KHI ĐĂNG NHẬP THÀNH CÔNG:
      // Ngay sau khi xác thực thành công (nhận được result.user/profile), gọi ngay hàm đóng popup/modal
      setIsAuthModalOpen(false);

      soundService.play('victory');

      // 2. ĐỒNG BỘ TRẠNG THÁI NGƯỜI DÙNG:
      // Cập nhật state user đồng thời để giao diện chính tự động render mà không bị kẹt ở popup
      await handleUserAccountChange(profile.uid, profile);

      showToast(`Đăng nhập thành công! Chào mừng ${profile.displayName || profile.email}`, '🌟', 'levelUp');
      return true;
    } catch (err: any) {
      soundService.play('wrong');
      showToast(err?.message || 'Lỗi khi đăng nhập bằng Google', '⚠️');
      return false;
    }
  };

  // 3. XỬ LÝ KHI ĐĂNG XUẤT:
  // Khi người dùng đăng xuất (logout), phải xóa toàn bộ dữ liệu tạm thời trên giao diện state/store.
  const logoutAuth = async () => {
    soundService.play('click');
    await googleAuthService.logout();

    // Xóa sạch dữ liệu trên state, trả về state Khách độc lập (0 điểm, level 1, không lẫn dữ liệu tài khoản vừa thoát)
    const cleanGuest = storageService.logoutAndResetToGuest();
    setUser(cleanGuest);
    setActiveStage(null);
    setViewInternal('home');
    setBreadcrumbs(['Trang Chủ']);
    showToast('Đã đăng xuất tài khoản Google. Toàn bộ dữ liệu tạm thời đã được làm sạch.', '👋');
  };

  // 1. GẮN USER ID KHI TẠO MỚI DỮ LIỆU KIẾN THỨC TỰ THÊM (CUSTOM KNOWLEDGE)
  const addCustomKnowledge = (item: Omit<CustomKnowledgeItem, 'id' | 'createdAt' | 'mastery'>) => {
    const id = `custom_${Date.now()}`;
    const currentUid = auth.currentUser?.uid || user.userId || user.authProfile?.uid || 'guest';

    const newItem: CustomKnowledgeItem = {
      ...item,
      id,
      userId: currentUid, // Bắt buộc đính kèm userId
      createdAt: new Date().toISOString(),
      mastery: 1
    };

    setUser((prev) => ({
      ...prev,
      userId: currentUid,
      customKnowledge: {
        ...prev.customKnowledge,
        [id]: newItem
      }
    }));

    soundService.play('correct');
    addXp(30, 'Tự thêm kiến thức mới vào kho báu cá nhân');
    showToast(`Đã thêm kiến thức: "${newItem.term}" (+30 XP)!`, '✨');
  };

  const updateCustomKnowledge = (id: string, updates: Partial<CustomKnowledgeItem>) => {
    setUser((prev) => {
      if (!prev.customKnowledge[id]) return prev;
      return {
        ...prev,
        customKnowledge: {
          ...prev.customKnowledge,
          [id]: {
            ...prev.customKnowledge[id],
            ...updates
          }
        }
      };
    });
    soundService.play('click');
    showToast('Đã cập nhật thẻ kiến thức!', '💾');
  };

  const deleteCustomKnowledge = (id: string) => {
    setUser((prev) => {
      const copy = { ...prev.customKnowledge };
      delete copy[id];
      return {
        ...prev,
        customKnowledge: copy
      };
    });
    soundService.play('click');
    showToast('Đã xóa thẻ kiến thức!', '🗑️');
  };

  // Play custom knowledge cards as an interactive flash battle
  const playCustomKnowledgeStage = (cards: CustomKnowledgeItem[]) => {
    if (cards.length === 0) {
      showToast('Chưa có thẻ kiến thức nào để luyện tập!', '⚠️');
      return;
    }

    // Convert custom items into dynamic LearningItems
    const dynamicQuestions: LearningItem[] = cards.map((card, idx) => {
      // Pick distractor choices from other cards or standard set
      const otherMeanings = cards
        .filter((c) => c.id !== card.id)
        .map((c) => c.meaningVi);

      const defaultDistractors = [
        'Học tập chăm chỉ mỗi ngày',
        'Chúc một ngày tốt lành',
        'Thời tiết hôm nay rất đẹp',
        'Cảm ơn sự giúp đỡ tận tình'
      ];

      const pool = [...otherMeanings, ...defaultDistractors];
      const shuffledDistractors = pool
        .filter((m) => m !== card.meaningVi)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const allChoices = [card.meaningVi, ...shuffledDistractors].sort(() => Math.random() - 0.5);

      return {
        id: card.id,
        level: card.level,
        category: (card.category === 'phrase' ? 'conversation' : card.category) as any,
        question: card.term,
        furigana: card.furigana,
        choices: allChoices,
        correctAnswer: card.meaningVi,
        explanation: card.notes || `Ý nghĩa chuẩn xác: ${card.meaningVi}.`,
        example: card.exampleJp || card.term,
        translation: card.exampleVi || card.meaningVi,
        difficulty: 2,
        audioText: card.term,
        isCustom: true
      };
    });

    // Create a temporary custom Stage
    const customStage: Stage = {
      id: `stage_custom_${Date.now()}`,
      level: cards[0].level || 'N5',
      stageNumber: 99,
      titleVi: 'Đấu Trường Kiến Thức Cá Nhân',
      titleJp: 'マイクエスト・カスタム試練',
      descriptionVi: `Luyện tập ${cards.length} thẻ kiến thức do chính bạn thêm vào kho lưu trữ!`,
      descriptionJp: '自作単語・文法カードでスピード特訓！',
      gameType: 'flash_battle',
      requiredLevel: 1,
      questionIds: dynamicQuestions.map((q) => q.id),
      rewardXp: cards.length * 15,
      icon: '💎'
    };

    // Store temporary questions in window memory for retrieval by game engine
    (window as any).__customStageQuestions = dynamicQuestions;

    setActiveStage(customStage);
    setBreadcrumbs(['Kho Kiến Thức', 'Luyện Tập Tùy Biến']);
  };

  const exportUserData = (): string => {
    return JSON.stringify(user, null, 2);
  };

  const importUserData = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData) as UserStats;
      if (!parsed.username || !parsed.level) {
        throw new Error('Dữ liệu không hợp lệ');
      }
      parsed.userId = user.userId || auth.currentUser?.uid || 'guest';
      setUser(parsed);
      storageService.saveUser(parsed, parsed.userId);
      soundService.play('victory');
      showToast('Đồng bộ dữ liệu thành công!', '🎉');
      return true;
    } catch (e) {
      showToast('Tệp sao lưu không đúng định dạng!', '❌');
      return false;
    }
  };

  const resetProgress = () => {
    const currentUid = user.userId || auth.currentUser?.uid || user.authProfile?.uid || 'guest';
    const fresh = storageService.resetAll(currentUid);
    setUser(fresh);
    setViewInternal('home');
    setBreadcrumbs(['Trang Chủ']);
    showToast('Đã đặt lại toàn bộ tiến độ chơi của tài khoản hiện tại!', '🔄');
  };

  const openSenseiWithContext = (contextPrompt: string) => {
    setSenseiInitialContext(contextPrompt);
    setView('study');
  };

  return (
    <GameContext.Provider
      value={{
        user,
        view,
        setView,
        activeStage,
        setActiveStage,
        selectedLevel,
        setSelectedLevel,
        breadcrumbs,
        setBreadcrumbs,
        addXp,
        recordCorrectAnswer,
        recordWrongAnswer,
        completeStage,
        claimDailyQuest,
        toggleSound,
        toggleFurigana,
        setLanguage,
        updateUserAvatar,
        resetProgress,
        toasts,
        showToast,
        openSenseiWithContext,
        senseiInitialContext,
        loginWithGoogle,
        logoutAuth,
        isAuthModalOpen,
        openGoogleAuthModal,
        closeGoogleAuthModal,
        addCustomKnowledge,
        updateCustomKnowledge,
        deleteCustomKnowledge,
        playCustomKnowledgeStage,
        exportUserData,
        importUserData
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
