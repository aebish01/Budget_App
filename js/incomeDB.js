// Import the necessary functions from the Firebase SDK
import app from "./firebaseConfig.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { auth, authStateChanged, login, logout, createAccount } from "./auth.js";

// Initialize Firebase
document.addEventListener("DOMContentLoaded", async function () {
  const db = getFirestore(app);

  // Function to display income on the website
  async function displayIncome() {
    authStateChanged(async (user) => {
      console.log('User available:', user);
      if (!user) {
        console.log('User not authenticated. Income data will not be displayed.');
        return;
      }

      // Get a reference to the "income" collection
      const tasksCol = collection(db, "income");

      try {
        // Retrieve data from Firestore
        const taskSnapshot = await getDocs(tasksCol);

        // Get the "income-cards" container
        const incomeCardsContainer = document.getElementById("income-cards");

        // Clear existing content in the container
        incomeCardsContainer.innerHTML = "";

        // Iterate through the documents in the collection
        taskSnapshot.forEach((doc) => {
          // Access the data in each document
          const incomeData = doc.data();

          // Create HTML elements dynamically
          const card = document.createElement("div");
          card.className = "col s12 m6 l4";
          card.innerHTML = `
            <div class="card grey lighten-5">
              <div class="card-content grey-text darken-5">
                <span class="card-title">${incomeData.type}</span>
                <p>Annual Income: ${incomeData.yearlyIncome}</p>
                <p>Estimated Monthly Income: ${incomeData.estIncome}</p>
              </div>
              <div class="card-action">
                <button class="waves-effect waves-light btn purple edit-btn"><i class="material-icons left">edit</i>Edit</button>
                &emsp;&emsp;
                <button class="waves-effect waves-light btn red delete-btn"><i class="material-icons left">delete</i>Delete</button>
              </div>
            </div>
          `;
          card.dataset.docId = doc.id;

          // Add click event listener to the delete button
          const deleteButton = card.querySelector('.delete-btn');
          deleteButton.addEventListener('click', async (event) => {
            try {
              event.stopPropagation(); // Prevent card click event from triggering

              // Get the document ID from the data attribute
              const docId = card.dataset.docId;

              // Call the delete function with the document ID
              await deleteIncome(docId);
            } catch (error) {
              console.error("Error handling delete button click: ", error);
            }
          });

          // Add click event listener to the edit button
          const editButton = card.querySelector('.edit-btn');
          editButton.addEventListener('click', async (event) => {
            try {
              event.stopPropagation(); // Prevent card click event from triggering

              // Get the document ID from the data attribute
              const docId = card.dataset.docId;

              // Get the updated values (you can modify this part based on your UI)
              const updatedType = prompt("Enter updated type (Employment/Business):");
              const updatedAnnualIncome = prompt("Enter updated annual income:");
              const updatedEstimatedMonthlyIncome = prompt("Enter updated estimated monthly income:");

              // Call the update function with the document ID and updated values
              await updateIncome(docId, {
                type: updatedType,
                yearlyIncome: updatedAnnualIncome,
                estIncome: updatedEstimatedMonthlyIncome
              });
            } catch (error) {
              console.error("Error handling edit button click: ", error);
            }
          });

          // Add a margin to the bottom of the card for spacing
          card.style.marginBottom = '15px';

          // Append the card to the "income cards" section
          incomeCardsContainer.appendChild(card);
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    });
  }

  // Call the displayIncome function to initially load data
  displayIncome();

  // Event listener for the "Add" button
  document.getElementById("income-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
    console.log("Form submitted");

    // Check if the user is authenticated before adding income
    const user = auth.currentUser;
    if (user) {
      // Get values from the form
      const type = document.querySelector('input[name="group1"]:checked').value;
      const annualIncome = document.getElementById("yearlyIncome").value;
      const estimatedMonthlyIncome = document.getElementById("estIncome").value;

      // Add income to Firebase
      addIncome(type, annualIncome, estimatedMonthlyIncome);
    } else {
      console.log('User not authenticated. Cannot add income.');
    }
  });

  async function addIncome(type, annualIncome, estimatedMonthlyIncome) {
    console.log("Adding income");
    const incomeCollection = collection(db, "income");

    try {
      // Add a new document with the provided data
      await addDoc(incomeCollection, {
        type: type,
        yearlyIncome: annualIncome,
        estIncome: estimatedMonthlyIncome
      });

      // After adding income, refresh the display
      displayIncome();
    } catch (error) {
      console.error("Error adding income: ", error);
    }
  }

  async function deleteIncome(docId) {
    const incomeCollection = collection(db, "income");

    try {
      // Delete the document with the specified ID
      await deleteDoc(doc(incomeCollection, docId));

      // After deleting income, refresh the display
      displayIncome();
    } catch (error) {
      console.error("Error deleting income: ", error);
    }
  }

  async function updateIncome(docId, updatedData) {
    const incomeCollection = collection(db, "income");

    try {
      // Update the document with the specified ID and updated data
      await updateDoc(doc(incomeCollection, docId), updatedData);

      // After updating income, refresh the display
      displayIncome();
    } catch (error) {
      console.error("Error updating income: ", error);
    }
  }
  document.getElementById("logout-button").addEventListener("click", function () {
    logout();
});
  
});


