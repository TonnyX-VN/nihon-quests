import { UserAuthProfile } from '../types/game';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  FirebaseUser
} from './firebase';

export const AUTH_LOCAL_KEY = 'nihongo_quest_google_auth';

export const googleAuthService = {
  /**
   * Đăng nhập bằng Google sử dụng hàm chuẩn `signInWithPopup(auth, googleProvider)` của Firebase Auth SDK.
   * Cho phép mọi tài khoản Google đăng nhập trực tiếp.
   */
  async signInWithFirebasePopup(): Promise<{ success: boolean; profile?: UserAuthProfile; error?: string }> {
    try {
      // 1. Gọi trực tiếp signInWithPopup của Firebase Auth SDK
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (!user || !user.email) {
        throw new Error('Không nhận được thông tin email từ Google.');
      }

      // 2. Tạo profile người dùng và cho phép đăng nhập trực tiếp
      const profile: UserAuthProfile = {
        provider: 'google',
        isLoggedIn: true,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL || undefined,
        uid: user.uid,
        loggedInAt: new Date().toISOString()
      };

      return {
        success: true,
        profile
      };
    } catch (err: any) {
      console.error('[Firebase Auth] Error during signInWithPopup:', err);

      // Xử lý các mã lỗi phổ biến của Firebase
      let errorMessage = err?.message || 'Đăng nhập Google thất bại.';
      if (err?.code === 'auth/api-key-not-valid') {
        errorMessage = 'API Key của Firebase không hợp lệ hoặc bị giới hạn. Vui lòng kiểm tra lại Google Cloud / Firebase API Key.';
      } else if (err?.code === 'auth/operation-not-allowed') {
        errorMessage = 'Chưa bật nhà cung cấp Google trong Firebase Console (Authentication > Sign-in method > Google).';
      } else if (err?.code === 'auth/unauthorized-domain') {
        errorMessage = 'Tên miền chưa được thêm vào Authorized Domains trên Firebase Console (Authentication > Settings > Authorized domains).';
      } else if (err?.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Cửa sổ đăng nhập Google đã bị đóng.';
      } else if (err?.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Yêu cầu mở cửa sổ đăng nhập đã bị hủy.';
      } else if (err?.code === 'auth/popup-blocked') {
        errorMessage = 'Trình duyệt đã chặn cửa sổ Popup. Vui lòng cho phép popup để đăng nhập.';
      }

      return {
        success: false,
        error: errorMessage
      };
    }
  },

  /**
   * Đăng xuất khỏi Firebase Auth và xóa sạch phiên làm việc
   */
  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('[Firebase Auth] SignOut warning:', err);
    }

    if (typeof window !== 'undefined') {
      try {
        sessionStorage.clear();
        localStorage.removeItem(AUTH_LOCAL_KEY);
        localStorage.removeItem('nihongo_quest_auth_session');
        localStorage.removeItem('nihongo_quest_auth_token');
        localStorage.removeItem('nihongo_quest_current_user');
      } catch (err) {
        console.error('[Google Auth] Logout cleanup error:', err);
      }
    }
  },

  /**
   * Lắng nghe trạng thái đăng nhập thực tế từ Firebase Auth (onAuthStateChanged)
   */
  onAuthStateChange(callback: (profile: UserAuthProfile | null, errorMsg?: string) => void) {
    return onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser && firebaseUser.email) {
        const profile: UserAuthProfile = {
          provider: 'google',
          isLoggedIn: true,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          photoURL: firebaseUser.photoURL || undefined,
          uid: firebaseUser.uid,
          loggedInAt: new Date().toISOString()
        };
        callback(profile);
      } else {
        callback(null);
      }
    });
  }
};
