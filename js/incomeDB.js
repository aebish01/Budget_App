
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
  import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
  //import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  //import firebase from "firebase/app";
 // import "firebase/firestore";
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
    const db = getFirestore(app);
/////////////////////////////////////////////////////////////////////////    
    // Function to display income on the website
  // Function to display income on the website
async function displayIncome() {
    // Get a reference to the "income" collection
    const tasksCol = collection(db, "income");
  
    try {
      // Retrieve data from Firestore
      const taskSnapshot = await getDocs(tasksCol);
  
      // Iterate through the documents in the collection
      taskSnapshot.forEach((doc) => {
        // Access the data in each document
        const incomeData = doc.data();
  
        const incomeType = incomeData.type ? "Employment Income" : "Business Income";
        // Create HTML elements dynamically
        const card = document.createElement("div");
        card.className = "col s12 m6 l4";
        card.innerHTML = `
          <div class="card grey lighten-5">
            <div class="card-content grey-text darken-5">
              <span class="card-title">${incomeType}</span>
              <p>Annual Income: ${incomeData.yearlyIncome}</p>
              <p>Estimated Monthly Income: ${incomeData.estIncome}</p>
            </div>
            <div class="card-action">
              <button class="waves-effect waves-light btn purple"><i class="material-icons left">edit</i>Edit</button>
              &emsp;&emsp;
              <button class="waves-effect waves-light btn red"><i class="material-icons left">delete</i>Delete</button>
            </div>
          </div>
        `;
  
        // Append the card to the "income cards" section
        document.getElementById("income-cards").appendChild(card);
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }
  
  // Call the displayIncome function to initially load data
  displayIncome();
  //////////////////////////////////////////////////////////////////
  //bills 

  //savings