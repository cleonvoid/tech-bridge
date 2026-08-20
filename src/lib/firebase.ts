import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, User, Auth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  Firestore
} from 'firebase/firestore';
import { TechnologyOffering } from '../types';
import appletConfig from '../../firebase-applet-config.json';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null, authInstance?: Auth | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: authInstance?.currentUser?.uid,
      email: authInstance?.currentUser?.email,
      isAnonymous: authInstance?.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let isConfigured = false;
let configErrorMessage: string | null = null;

const firebaseConfig = {
  apiKey: appletConfig.apiKey || import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: appletConfig.authDomain || import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: appletConfig.projectId || import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: appletConfig.storageBucket || import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: appletConfig.messagingSenderId || import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: appletConfig.appId || import.meta.env.VITE_FIREBASE_APP_ID,
};

const firestoreDatabaseId = appletConfig.firestoreDatabaseId || undefined;

if (firebaseConfig.apiKey && firebaseConfig.projectId) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = firestoreDatabaseId ? getFirestore(app, firestoreDatabaseId) : getFirestore(app);
    isConfigured = true;
  } catch (err) {
    console.warn('Firebase initialization warning:', err);
    configErrorMessage = err instanceof Error ? err.message : 'Lỗi khởi tạo Firebase';
    isConfigured = false;
  }
} else {
  configErrorMessage = 'Chưa cấu hình Firebase Project ID hoặc API Key';
}

export { app, auth, db };

export function isFirebaseAvailable(): boolean {
  return isConfigured && db !== null && auth !== null;
}

export function getFirebaseConfigStatus(): { available: boolean; message: string | null } {
  return {
    available: isFirebaseAvailable(),
    message: configErrorMessage
  };
}

/**
 * Ensures anonymous authentication is running in the background.
 */
export async function ensureAnonymousAuth(): Promise<User | null> {
  if (!auth) return null;

  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        unsubscribe();
        resolve(user);
      } else {
        try {
          const cred = await signInAnonymously(auth);
          unsubscribe();
          resolve(cred.user);
        } catch (err) {
          console.warn('Lỗi đăng nhập ẩn danh Firebase:', err);
          unsubscribe();
          resolve(null);
        }
      }
    });
  });
}

/**
 * Saves a user-created technology offering to Firestore
 */
export async function saveOfferingToFirestore(offering: TechnologyOffering): Promise<void> {
  if (!db || !auth) {
    throw new Error('Firebase chưa sẵn sàng. Vui lòng kiểm tra cấu hình Firebase.');
  }

  const user = auth.currentUser || (await ensureAnonymousAuth());
  if (!user) {
    throw new Error('Chưa thể xác thực người dùng ẩn danh để lưu dữ liệu.');
  }

  const sanitizedOffering: TechnologyOffering = {
    ...offering,
    ownerId: user.uid,
    source: 'user',
  };

  const path = `offerings/${offering.id}`;
  try {
    const docRef = doc(db, 'offerings', offering.id);
    await setDoc(docRef, sanitizedOffering);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path, auth);
  }
}

/**
 * Loads all user-created technology offerings from Firestore
 */
export async function fetchUserOfferingsFromFirestore(): Promise<TechnologyOffering[]> {
  if (!db || !auth) {
    return [];
  }

  // Ensure user is signed in to satisfy read rules (request.auth != null)
  await ensureAnonymousAuth();

  const path = 'offerings';
  try {
    const colRef = collection(db, 'offerings');
    const snapshot = await getDocs(colRef);
    const offerings: TechnologyOffering[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as TechnologyOffering;
      offerings.push(data);
    });
    return offerings;
  } catch (error) {
    console.warn('Lỗi khi tải danh sách từ Firestore:', error);
    // Non-blocking for UI, return empty array
    return [];
  }
}

/**
 * Deletes all offerings owned by the current anonymous user (Reset Demo)
 */
export async function deleteUserOwnedOfferings(userId: string): Promise<number> {
  if (!db || !auth || !userId) {
    return 0;
  }

  const path = 'offerings';
  try {
    const colRef = collection(db, 'offerings');
    const q = query(colRef, where('ownerId', '==', userId));
    const snapshot = await getDocs(q);

    let count = 0;
    const deletePromises = snapshot.docs.map(async (docSnap) => {
      const data = docSnap.data();
      if (data.ownerId === userId && data.source === 'user') {
        await deleteDoc(doc(db, 'offerings', docSnap.id));
        count++;
      }
    });

    await Promise.all(deletePromises);
    return count;
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path, auth);
    return 0;
  }
}
