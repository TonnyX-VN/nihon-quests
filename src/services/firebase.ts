import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  Auth,
  User as FirebaseUser
} from 'firebase/auth';

/**
 * CẤU HÌNH FIREBASE AUTH (CODE NGẦM)
 * Chứa trực tiếp thông số Firebase project. Bạn có thể sửa trực tiếp tại đây
 * hoặc cấu hình qua các biến môi trường VITE_FIREBASE_* trong .env
 */
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSySampleApiKeyNihongoQuest2026",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nihongo-quest-auth.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nihongo-quest-auth",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nihongo-quest-auth.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "102938475610",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:102938475610:web:8a9b0c1d2e3f4a5b"
};

// Khởi tạo Firebase App
let app: FirebaseApp;
try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
} catch {
  app = initializeApp(firebaseConfig);
}

// Khởi tạo Auth
export const auth: Auth = getAuth(app);

// Khởi tạo Google Provider với thuộc tính bắt buộc prompt: 'select_account'
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
googleProvider.addScope('profile');
googleProvider.addScope('email');

/**
 * DANH SÁCH TÀI KHOẢN ĐƯỢC PHÉP TRUY CẬP (WHITELIST NGẦM)
 * Chỉ những email được khai báo dưới đây mới có quyền đăng nhập.
 */
export const WHITELIST_EMAILS: string[] = [
  'nguyendongduc1991@gmail.com',
  'admin@nihongoquest.com'
];

/**
 * Kiểm tra xem một email có nằm trong danh sách được phép truy cập hay không
 */
export function isEmailAuthorized(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.toLowerCase().trim();
  return WHITELIST_EMAILS.some((allowed) => allowed.toLowerCase().trim() === normalized);
}

// Re-export các phương thức Firebase Auth cần thiết
export { signInWithPopup, signOut, onAuthStateChanged, type FirebaseUser };
