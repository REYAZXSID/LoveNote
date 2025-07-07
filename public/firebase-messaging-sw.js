// public/firebase-messaging-sw.js
// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7PdsvXsTpHmmFOOr02NH3jBXsKGSTKQQ",
    authDomain: "crossfireclash-1ecec.firebaseapp.com",
    projectId: "crossfireclash-1ecec",
    storageBucket: "crossfireclash-1ecec.firebasestorage.app",
    messagingSenderId: "565296893344",
    appId: "1:565296893344:web:5d3bab6fae248a54ae28c5",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    image: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
