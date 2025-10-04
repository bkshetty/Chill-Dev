import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
// Replace these values with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAzQFgJtr8Sd2BMOPo0F4kZc8YeCVzn5Yc",
  authDomain: "safe-route-d062e.firebaseapp.com",
  projectId: "safe-route-d062e",
  storageBucket: "safe-route-d062e.firebasestorage.app",
  messagingSenderId: "774193267121",
  appId: "1:774193267121:web:85d5ea8fe9487026ff3d90",
  measurementId: "G-WSPXEKNV82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);

export default app;
