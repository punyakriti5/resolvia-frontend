// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { FIREBASE_API_KEY } from './constants';
//import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${FIREBASE_API_KEY}`,
  authDomain: 'resolvia-13516.firebaseapp.com',
  projectId: 'resolvia-13516',
  storageBucket: 'resolvia-13516.appspot.com',
  messagingSenderId: '612407864285',
  appId: '1:612407864285:web:a95bca3bf06d859ef5e434',
  measurementId: 'G-Y8E9L598C2',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
