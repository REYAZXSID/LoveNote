// public/firebase-messaging-sw.js

// Using compat scripts for broader compatibility in service worker environment
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

// Your web app's Firebase configuration, provided by user
const firebaseConfig = {
    apiKey: "AIzaSyB7PdsvXsTpHmmFOOr02NH3jBXsKGSTKQQ",
    authDomain: "crossfireclash-1ecec.firebaseapp.com",
    projectId: "crossfireclash-1ecec",
    storageBucket: "crossfireclash-1ecec.firebasestorage.app",
    messagingSenderId: "565296893344",
    appId: "1:565296893344:web:5d3bab6fae248a54ae28c5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
    image: payload.notification.image
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
