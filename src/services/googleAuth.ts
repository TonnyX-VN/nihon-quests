import { UserAuthProfile } from '../types/game';

export const AUTH_SESSION_KEY = 'nihongo_quest_auth_session';
export const AUTH_LOCAL_KEY = 'nihongo_quest_google_auth';
export const AUTH_TOKEN_KEY = 'nihongo_quest_auth_token';

/**
 * Cấu hình Google Auth Provider theo chuẩn Firebase Auth / Google OAuth.
 * Bắt buộc thiết lập `prompt: 'select_account'` theo yêu cầu
 * để luôn hiển thị danh sách chọn tài khoản Google chứ không tự động đăng nhập tài khoản cũ.
 */
export interface GoogleAuthProviderInstance {
  providerId: string;
  scopes: string[];
  customParameters: {
    prompt: 'select_account';
    [key: string]: string;
  };
  setCustomParameters: (params: Record<string, string>) => GoogleAuthProviderInstance;
}

/**
 * Factory tạo Google Auth Provider với thuộc tính bắt buộc `prompt: 'select_account'`
 */
export function createGoogleAuthProvider(): GoogleAuthProviderInstance {
  const provider: GoogleAuthProviderInstance = {
    providerId: 'google.com',
    scopes: ['profile', 'email', 'openid'],
    customParameters: {
      prompt: 'select_account',
    },
    setCustomParameters(params: Record<string, string>) {
      Object.assign(this.customParameters, params);
      return this;
    }
  };

  // Đảm bảo bắt buộc đặt prompt: 'select_account'
  provider.setCustomParameters({ prompt: 'select_account' });
  return provider;
}

export const defaultGoogleProvider = createGoogleAuthProvider();

export const googleAuthService = {
  /**
   * Lấy cấu hình custom parameters của Google Provider (bắt buộc prompt: 'select_account')
   */
  getCustomParameters() {
    return defaultGoogleProvider.customParameters;
  },

  /**
   * Kiểm tra xem có phiên đăng nhập Google hợp lệ đang hoạt động trong phiên hiện tại không.
   * Mặc định khi mở mới ứng dụng không tự động phục hồi mock session.
   */
  hasActiveGoogleSession(): boolean {
    if (typeof window === 'undefined') return false;
    try {
      const session = sessionStorage.getItem(AUTH_SESSION_KEY);
      if (session) {
        const parsed = JSON.parse(session);
        return parsed?.provider === 'google' && parsed?.isLoggedIn === true;
      }
      return false;
    } catch {
      return false;
    }
  },

  /**
   * Lấy profile phiên hiện tại nếu đã đăng nhập rõ ràng
   */
  getCurrentSessionProfile(): UserAuthProfile | null {
    if (typeof window === 'undefined') return null;
    try {
      const session = sessionStorage.getItem(AUTH_SESSION_KEY);
      if (session) {
        const parsed = JSON.parse(session);
        if (parsed?.provider === 'google' && parsed?.isLoggedIn === true) {
          return parsed;
        }
      }
      return null;
    } catch {
      return null;
    }
  },

  /**
   * Xử lý Đăng nhập Google với thuộc tính bắt buộc prompt: 'select_account'
   */
  signInWithGoogle(email: string, displayName: string, photoURL?: string): UserAuthProfile {
    // Luôn áp dụng provider có prompt: 'select_account'
    const provider = createGoogleAuthProvider();
    console.log(
      `[Google Auth] Executing sign-in with provider: ${provider.providerId}, prompt: '${provider.customParameters.prompt}' for ${email}`
    );

    const profile: UserAuthProfile = {
      provider: 'google',
      isLoggedIn: true,
      email,
      displayName: displayName || email.split('@')[0],
      photoURL: photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(displayName || email)}`,
      uid: `g_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      loggedInAt: new Date().toISOString()
    };

    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(profile));
        localStorage.setItem(AUTH_LOCAL_KEY, JSON.stringify(profile));
      } catch {
        // ignore
      }
    }

    return profile;
  },

  /**
   * Yêu cầu 5: Cập nhật hàm Đăng xuất (Logout)
   * Xóa sạch phiên làm việc (Session), localStorage và đưa ứng dụng về trạng thái Khách (Guest) hoàn toàn.
   */
  logout() {
    if (typeof window !== 'undefined') {
      try {
        // Xóa sạch session storage
        sessionStorage.removeItem(AUTH_SESSION_KEY);
        sessionStorage.clear();

        // Xóa sạch các khóa liên quan đến Google Auth trong localStorage
        localStorage.removeItem(AUTH_SESSION_KEY);
        localStorage.removeItem(AUTH_LOCAL_KEY);
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem('nihongo_quest_current_user');
      } catch (err) {
        console.error('[Google Auth] Error during logout cleanup:', err);
      }
    }
  }
};
