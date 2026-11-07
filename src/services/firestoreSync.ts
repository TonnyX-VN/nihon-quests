import { db, auth, doc, setDoc, getDoc, collection, query, where, getDocs } from './firebase';
import { UserStats } from '../types/game';

export const firestoreSyncService = {
  /**
   * 1. GẮN USER ID KHI LƯU DỮ LIỆU
   * Bắt buộc phải đính kèm `userId` (lấy từ auth.currentUser.uid hoặc stats.userId)
   * vào đối tượng dữ liệu được lưu trên database Firestore.
   */
  async saveUserData(stats: UserStats): Promise<boolean> {
    const currentUid = auth.currentUser?.uid || stats.userId || stats.authProfile?.uid;
    if (!currentUid || currentUid === 'guest') {
      // Tài khoản khách không đồng bộ lên Cloud Firestore
      return false;
    }

    try {
      const dataToSave: UserStats & { userId: string; updatedAt: string } = {
        ...stats,
        userId: currentUid, // Bắt buộc đính kèm userId
        updatedAt: new Date().toISOString()
      };

      // Đảm bảo mọi thẻ customKnowledge con cũng được gắn userId
      if (dataToSave.customKnowledge) {
        const updatedCustomKnowledge = { ...dataToSave.customKnowledge };
        for (const key of Object.keys(updatedCustomKnowledge)) {
          if (!updatedCustomKnowledge[key].userId) {
            updatedCustomKnowledge[key] = {
              ...updatedCustomKnowledge[key],
              userId: currentUid
            };
          }
        }
        dataToSave.customKnowledge = updatedCustomKnowledge;
      }

      const docRef = doc(db, 'user_progress', currentUid);
      await setDoc(docRef, dataToSave, { merge: true });
      return true;
    } catch (err) {
      console.warn('[Firestore] Lưu dữ liệu đám mây thất bại (tiếp tục lưu LocalStorage):', err);
      return false;
    }
  },

  /**
   * 2. LỌC DỮ LIỆU KHI TRUY VẤN (QUERY)
   * Phải luôn thêm điều kiện lọc `.where('userId', '==', uid)`
   * để chỉ lấy đúng dữ liệu thuộc về tài khoản đang đăng nhập.
   */
  async fetchUserData(uid: string): Promise<UserStats | null> {
    if (!uid || uid === 'guest') return null;

    try {
      // 1. Thực hiện Query có điều kiện where('userId', '==', uid)
      const q = query(collection(db, 'user_progress'), where('userId', '==', uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data() as UserStats;
        if (docData.userId === uid) {
          return docData;
        }
      }

      // 2. Fallback kiểm tra trực tiếp Document theo docRef (nếu index query đang tạo)
      const docRef = doc(db, 'user_progress', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const docData = docSnap.data() as UserStats;
        if (docData.userId === uid) {
          return docData;
        }
      }

      return null;
    } catch (err) {
      console.warn('[Firestore] Truy vấn dữ liệu đám mây thất bại (sử dụng LocalStorage của UID):', err);
      return null;
    }
  }
};
