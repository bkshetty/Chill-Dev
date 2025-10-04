import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

const googleProvider = new GoogleAuthProvider();

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  isVerifiedWoman: boolean;
  createdAt: Date;
}

export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName: string,
  isWoman: boolean
): Promise<UserProfile> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update the user's display name
    await updateProfile(user, { displayName });

    // Create user profile in Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName,
      isVerifiedWoman: isWoman,
      createdAt: new Date()
    };

    await setDoc(doc(db, 'users', user.uid), userProfile);

    return userProfile;
  } catch (error) {
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string): Promise<UserProfile> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get user profile from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    } else {
      throw new Error('User profile not found');
    }
  } catch (error) {
    throw error;
  }
};

export const signInWithGoogle = async (): Promise<UserProfile> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if user profile exists
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    } else {
      // Create new user profile for Google sign-in
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || 'Anonymous',
        isVerifiedWoman: false, // Default to false, user needs to verify
        createdAt: new Date()
      };

      await setDoc(doc(db, 'users', user.uid), userProfile);
      return userProfile;
    }
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const getCurrentUserProfile = async (): Promise<UserProfile | null> => {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};
