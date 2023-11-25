// Import the necessary functions from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWhEMagw30n3aWvNZL4o8LX040g5Fiz8k",
  authDomain: "budget-urself.f irebaseapp.com",
  projectId: "budget-urself",
  storageBucket: "budget-urself.appspot.com",
  messagingSenderId: "791531012957",
  appId: "1:791531012957:web:0e454962b583894af99eb4",
  measurementId: "G-7ZJLE5TJ5P" 
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User successfully logged in
      var user = userCredential.user;
      console.log('User logged in:', user);
      // Redirect or perform any other actions after successful login
    })
    .catch((error) => {
      // Handle errors here
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('Error logging in:', errorMessage);
    });
}
//logout
function logout() {
  signOut(auth)
    .then(() => {
      // User signed out successfully
      console.log('User signed out');
      // Redirect or perform any other actions after successful logout
    })
    .catch((error) => {
      // Handle errors here
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('Error signing out:', errorMessage);
    });
}

function createAccount(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User created successfully
      var user = userCredential.user;
      console.log('User created:', user);
    })
    .catch((error) => {
      // Handle errors here
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('Error creating user:', errorMessage);
    });
}
document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission
  console.log("Form submitted");
  var email = document.getElementById('Email').value;
  var password = document.getElementById('password').value;
  login(email, password);
});

document.getElementById("logout-button").addEventListener("click", function () {
  logout();
});

document.getElementById("signup-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission
  console.log("Form submitted");
  var email = document.getElementById('Email').value;
  var password = document.getElementById('password').value;
  createAccount(email, password);
});
