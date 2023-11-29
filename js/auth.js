// // Import the necessary functions from the Firebase SDK
// //import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
// import app from "./firebaseConfig.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAWhEMagw30n3aWvNZL4o8LX040g5Fiz8k",
//   authDomain: "budget-urself.firebaseapp.com",
//   projectId: "budget-urself",
//   storageBucket: "budget-urself.appspot.com",
//   messagingSenderId: "791531012957",
//   appId: "1:791531012957:web:0e454962b583894af99eb4",
//   measurementId: "G-7ZJLE5TJ5P" 
// };

// // Initialize Firebase
// //const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // Event listener for the login form
// document.getElementById("login-form").addEventListener("submit", function (event) {
//   event.preventDefault(); // Prevent the default form submission
//   console.log("Login form submitted");
//   var email = document.getElementById('Email').value;
//   var password = document.getElementById('password').value;
//   login(email, password);
// });

// // Event listener for the logout button
// document.getElementById("logout-button").addEventListener("click", function () {
//   logout();
// });

// // Event listener for the signup form
// document.getElementById("signup-form").addEventListener("submit", function (event) {
//   event.preventDefault(); // Prevent the default form submission
//   console.log("Signup form submitted");
//   var email = document.getElementById('Email').value;
//   var password = document.getElementById('password').value;
//   createAccount(email, password);
// });

// // Function to handle user authentication state changes
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in
//     console.log('User is signed in:', user);
//     // Additional logic for authenticated user, e.g., redirect or display user information
//   } else {
//     // No user is signed in
//     console.log('No user is signed in');
//     // Additional logic for signed-out state
//   }
// });

// // Function to handle user login
// function login(email, password) {
//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // User successfully logged in
//       var user = userCredential.user;
//       console.log('User logged in:', user);
//       // Redirect or perform any other actions after successful login
//     })
//     .catch((error) => {
//       // Handle errors here
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       console.error('Error logging in:', errorMessage);
//     });
// }

// // Function to handle user logout
// function logout() {
//   signOut(auth)
//     .then(() => {
//       // User signed out successfully
//       console.log('User signed out');
//       // Redirect or perform any other actions after successful logout
//     })
//     .catch((error) => {
//       // Handle errors here
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       console.error('Error signing out:', errorMessage);
//     });
// }

// // Function to handle user account creation
// function createAccount(email, password) {
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // User created successfully
//       var user = userCredential.user;
//       console.log('User created:', user);
//     })
//     .catch((error) => {
//       // Handle errors here
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       console.error('Error creating user:', errorMessage);
//     });
// }
// auth.js

import app from "./firebaseConfig.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

const auth = getAuth(app);

// Function to handle user authentication state changes
const authStateChanged = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Function to handle user login
const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Function to handle user logout
const logout = () => {
  return signOut(auth);
};

// Function to handle user account creation
const createAccount = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export { auth, authStateChanged, login, logout, createAccount };

