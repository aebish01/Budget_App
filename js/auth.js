import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

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
const auth = getAuth(app);

const authStateChanged = (callback) => {
    return onAuthStateChanged(auth, callback);
};

// Log Firebase configuration details
console.log("Firebase App Name:", app.name);
console.log("Firebase Configuration:", app.options);

document.addEventListener("DOMContentLoaded", function () {
  // Event listener for the signup form
  var signupForm = document.getElementById("signup-form");
  console.log(signupForm); // Check if signupForm is null

  if (signupForm) {
      signupForm.addEventListener("submit", function (event) {
          event.preventDefault(); // Prevent the default form submission
          console.log("Signup form submitted");
          var email = document.getElementById('Email').value;
          console.log(email);
          var password = document.getElementById('password').value;
          console.log(password);
          createAccount(email, password);
      });
  }

  document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
    console.log("Login form submitted");
    var email = document.getElementById('Email').value;
    var password = document.getElementById('password').value;
    login(email, password);
  });
  document.getElementById("logout-button").addEventListener("click", function () {
    logout();
  });

  // Function to handle user authentication state changes
  onAuthStateChanged(auth, (user) => {
      if (user) {
          // User is signed in
          console.log('User is signed in:', user);
          console.log('Firebase connection is established.');
          // Additional logic for authenticated user, e.g., redirect or display user information
      } else {
          // No user is signed in
          console.log('No user is signed in');
          console.log('Firebase connection may not be established.');
          // Additional logic for signed-out state
      }
  });
});

// Function to handle user account creation
function createAccount(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // User created successfully
          var user = userCredential.user;
          console.log('User created:', user);
          // Redirect or perform any other actions after successful account creation
      })
      .catch((error) => {
          // Handle errors here
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error('Error creating user:', errorMessage);
      });
}
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

  export { auth, authStateChanged, onAuthStateChanged, login, logout, createAccount };
//document.addEventListener("DOMContentLoaded", function () {
  // Event listener for the login form


//   // Event listener for the logout button


//   // Event listener for the signup form
//   // Event listener for the signup form
//   document.getElementById("signup-form").addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent the default form submission
//     console.log("Signup form submitted");
//     var email = document.getElementById('Email').value;
//     console.log(email);
//     var password = document.getElementById('password').value;
//     console.log(password);
//     createAccount(email, password);
//   });

//   // Function to handle user authentication state changes
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is signed in
//       console.log('User is signed in:', user);
//       // Additional logic for authenticated user, e.g., redirect or display user information
//     } else {
//       // No user is signed in
//       console.log('No user is signed in');
//       // Additional logic for signed-out state
//     }
//   });


// // Function to handle user login


// // Function to handle user logout



// }
