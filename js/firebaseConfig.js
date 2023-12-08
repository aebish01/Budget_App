import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js';


const firebaseConfig = {
  apiKey: "AIzaSyAWhEMagw30n3aWvNZL4o8LX040g5Fiz8k",
  authDomain: "budget-urself.firebaseapp.com",
  projectId: "budget-urself",
  storageBucket: "budget-urself.appspot.com",
  messagingSenderId: "791531012957",
  appId: "1:791531012957:web:0e454962b583894af99eb4",
  measurementId: "G-7ZJLE5TJ5P" 
};

const app = initializeApp(firebaseConfig);
//const messaging = getMessaging(app);

export default app;
