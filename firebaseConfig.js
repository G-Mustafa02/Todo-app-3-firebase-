  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDP_EuJz4b4Z5dF1se7VAvRVbYeyeoehjk",
    authDomain: "first-firebase-prj-c41ac.firebaseapp.com",
    projectId: "first-firebase-prj-c41ac",
    storageBucket: "first-firebase-prj-c41ac.firebasestorage.app",
    messagingSenderId: "1096907115442",
    appId: "1:1096907115442:web:74aabbb614f13088fa72ab"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
