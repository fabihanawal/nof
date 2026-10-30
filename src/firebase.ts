import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  orderBy,
  Firestore,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import {
  INITIAL_SITE_SETTINGS,
  INITIAL_NEWS,
  CORE_PROJECTS,
  NATIONAL_LEADERSHIP,
  INITIAL_DISTRICTS,
  INITIAL_GALLERY,
  INITIAL_EVENTS,
  SAMPLE_MEMBERS,
  INITIAL_SLIDES,
} from './data/initialData';

// Initialize Firebase Configuration (Supports both Vercel Environment Variables & local config file)
const effectiveFirebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfig.projectId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfig.appId,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfig.authDomain,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || firebaseConfig.firestoreDatabaseId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfig.messagingSenderId,
};

// Initialize Firebase App
export const app = getApps().length > 0 ? getApp() : initializeApp(effectiveFirebaseConfig);

// Initialize Firestore with custom database ID if available
export const db: Firestore =
  effectiveFirebaseConfig.firestoreDatabaseId && effectiveFirebaseConfig.firestoreDatabaseId !== '(default)'
    ? getFirestore(app, effectiveFirebaseConfig.firestoreDatabaseId)
    : getFirestore(app);

// Helper collection names matching user prompt
export const COLLECTIONS = {
  USERS: 'users',
  MEMBERS: 'members',
  LEADERS: 'leaders',
  NEWS: 'news',
  GALLERY: 'gallery',
  EVENTS: 'events',
  DISTRICTS: 'districts',
  PROJECTS: 'projects',
  SETTINGS: 'settings',
  SLIDES: 'slides',
} as const;

// Firestore Seeder / Initializer to ensure all collections exist with rich data
export async function seedInitialDataIfEmpty(): Promise<boolean> {
  try {
    const settingsRef = doc(db, COLLECTIONS.SETTINGS, 'general');
    const settingsSnap = await getDoc(settingsRef);

    if (!settingsSnap.exists()) {
      // Seed Settings
      await setDoc(settingsRef, INITIAL_SITE_SETTINGS);

      // Seed News
      for (const item of INITIAL_NEWS) {
        await setDoc(doc(db, COLLECTIONS.NEWS, item.id), item);
      }

      // Seed Projects
      for (const item of CORE_PROJECTS) {
        await setDoc(doc(db, COLLECTIONS.PROJECTS, item.id), item);
      }

      // Seed Leaders
      for (const item of NATIONAL_LEADERSHIP) {
        await setDoc(doc(db, COLLECTIONS.LEADERS, item.id), item);
      }

      // Seed Gallery
      for (const item of INITIAL_GALLERY) {
        await setDoc(doc(db, COLLECTIONS.GALLERY, item.id), item);
      }

      // Seed Events
      for (const item of INITIAL_EVENTS) {
        await setDoc(doc(db, COLLECTIONS.EVENTS, item.id), item);
      }

      // Seed Sample Members
      for (const item of SAMPLE_MEMBERS) {
        await setDoc(doc(db, COLLECTIONS.MEMBERS, item.id), item);
      }

      // Seed Districts (top 20 or all key units)
      for (const item of INITIAL_DISTRICTS) {
        await setDoc(doc(db, COLLECTIONS.DISTRICTS, item.id), item);
      }

      // Seed Slides
      for (const item of INITIAL_SLIDES) {
        await setDoc(doc(db, COLLECTIONS.SLIDES, item.id), item);
      }

      console.log('Firebase Firestore successfully seeded with Nari Odhikar Foundation data!');
      return true;
    }
    return false;
  } catch (error) {
    console.warn('Firestore initial seeding skipped or running offline:', error);
    return false;
  }
}
