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
 * CẤU HÌNH FIREBASE AUTH CHÍNH XÁC
 * Dự án: nihon-quests
 * Đã cấu hình apiKey chuẩn để khắc phục hoàn toàn lỗi 'auth/api-key-not-valid'
 */
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDwIbLOCeV5XFvJRsU5cE2FqVm0DRU76Vk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nihon-quests.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nihon-quests",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nihon-quests.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "973410735031",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:973410735031:web:d2676ff447d91a2664ce32",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-783SCZW47J"
};

// Khởi tạo Firebase App đảm bảo duy nhất 1 instance
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
