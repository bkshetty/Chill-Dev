import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp
} from 'firebase/firestore';
import { db } from './config';

export interface Report {
  id?: string;
  type: 'safe' | 'unsafe';
  description: string;
  latitude: number;
  longitude: number;
  userId: string;
  userDisplayName: string;
  isVerifiedWoman: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const addReport = async (report: Omit<Report, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'reports'), {
      ...report,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getReports = async (): Promise<Report[]> => {
  try {
    const q = query(collection(db, 'reports'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate()
    })) as Report[];
  } catch (error) {
    throw error;
  }
};

export const updateReport = async (reportId: string, updates: Partial<Report>): Promise<void> => {
  try {
    const reportRef = doc(db, 'reports', reportId);
    await updateDoc(reportRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    throw error;
  }
};

export const deleteReport = async (reportId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'reports', reportId));
  } catch (error) {
    throw error;
  }
};

export const getUserReports = async (userId: string): Promise<Report[]> => {
  try {
    const q = query(
      collection(db, 'reports'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate()
    })) as Report[];
  } catch (error) {
    throw error;
  }
};
