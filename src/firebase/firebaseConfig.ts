import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyBJV4px9MgfZ6slR77Qwkf8zEYgLRhvKDI',
	authDomain: 'twitterclone-ef552.firebaseapp.com',
	projectId: 'twitterclone-ef552',
	storageBucket: 'twitterclone-ef552.appspot.com',
	messagingSenderId: '372149048251',
	appId: '1:372149048251:web:9f9181ca9f279a2661aa9e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const provider = new GoogleAuthProvider();
