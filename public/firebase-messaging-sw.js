importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');


// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyC8drfAGMjO_NZyp81ZmVpCaKIPZZnYkE4",
    authDomain: "notificationpwa-96fa8.firebaseapp.com",
    projectId: "notificationpwa-96fa8",
    storageBucket: "notificationpwa-96fa8.firebasestorage.app",
    messagingSenderId: "252969259945",
    appId: "1:252969259945:web:e1f2d4693de7c47e8e2ab8",
    measurementId: "G-05Q9HRR5ZC"
};


firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

});