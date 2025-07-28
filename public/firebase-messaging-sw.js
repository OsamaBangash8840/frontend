// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.1/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyA1hwxA6yoy_yToHBoc92KqEbnpqgH2pjw",
    authDomain: "chatter-289f4.firebaseapp.com",
    projectId: "chatter-289f4",
    storageBucket: "chatter-289f4.firebasestorage.app",
    messagingSenderId: "931888914529",
    appId: "1:931888914529:web:d7f32265c11afb9760ca20",
    measurementId: "G-XLPBHHBRF6"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/logo.png", // You can place a custom logo in public/
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
