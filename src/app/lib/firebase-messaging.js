// lib/firebase-messaging.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: 'AIzaSyA1hwxA6yoy_yToHBoc92KqEbnpqgH2pjw',
    authDomain: 'chatter-289f4.firebaseapp.com',
    projectId: 'chatter-289f4',
    storageBucket: 'chatter-289f4.firebasestorage.app',
    messagingSenderId: '931888914529',
    appId: '1:931888914529:web:d7f32265c11afb9760ca20',
};

const app = initializeApp(firebaseConfig);

const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

export { messaging, getToken, onMessage };
