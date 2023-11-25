// Import the necessary functions from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to display expenses on the website
async function displayExpenses() {
  // Get a reference to the "bill" collection
  const billCollection = collection(db, "bill");

  try {
    // Retrieve data from Firestore
    const billSnapshot = await getDocs(billCollection);

    // Get the "bill-cards" container
    const billCardsContainer = document.getElementById("bill-cards");

    // Clear existing content in the container
    billCardsContainer.innerHTML = "";

    // Iterate through the documents in the collection
    billSnapshot.forEach((doc) => {
      // Access the data in each document
      const billData = doc.data();

      // Create HTML elements dynamically (similar to your existing code)
      const card = document.createElement("div");
      card.className = "col s12 m6 l4";
      card.innerHTML = `
        <div class="card grey lighten-5">
          <div class="card-content grey-text darken-5">
            <span class="card-title">${billData.type}</span>
            <p>Expense Description: ${billData.description}</p>
            <p>Expense Monthly Cost: ${billData.cost}</p>
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
          await deleteBill(docId);
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
          const updatedType = prompt("Enter updated type (Necessity/Need/Want):");
          const updatedDescription = prompt("Enter updated description:");
          const updatedMonthlyCost = prompt("Enter updated estimated monthly cost:");

          // Call the update function with the document ID and updated values
          await updateBill(docId, {
            type: updatedType,
            description: updatedDescription,
            cost: updatedMonthlyCost
          });
        } catch (error) {
          console.error("Error handling edit button click: ", error);
        }
      });

      // Add a margin to the bottom of the card for spacing
      card.style.marginBottom = '15px';

      // Append the card to the "bill cards" section
      billCardsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

// Call the displayExpenses function to initially load data
displayExpenses();

// Event listener for the "Add" button
document.getElementById("bill-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission
  console.log("Form submitted");
  const type = document.querySelector('input[name="group1"]:checked');
  
  if (type) {
    // If a radio button is selected, get its value
    const typeValue = type.value;

    // Get values from the other form fields
    const monthlyCost = document.getElementById("monthlyCost").value;
    const description = document.getElementById("description").value;

    // Add expense to Firebase
    addExpense(typeValue, monthlyCost, description);
  } else {
    // If no radio button is selected, handle the error or prompt the user
    console.error("Please select a type (Necessity/Need/Want).");
    // You might want to display an error message to the user here.
  }
});

// Function to add an expense to Firebase
async function addExpense(type, monthlyCost, description) {
  console.log("Adding expense");
  const billCollection = collection(db, "bill");

  try {
    // Add a new document with the provided data
    await addDoc(billCollection, {
      type: type,
      cost: monthlyCost,
      description: description
    });

    // After adding an expense, refresh the display
    displayExpenses();
  } catch (error) {
    console.error("Error adding expense: ", error);
  }
}

// Function to delete an expense from Firebase
async function deleteBill(docId) {
  const billCollection = collection(db, "bill");

  try {
    // Delete the document with the specified ID
    await deleteDoc(doc(billCollection, docId));

    // After deleting an expense, refresh the display
    displayExpenses();
  } catch (error) {
    console.error("Error deleting expense: ", error);
  }
}

// Function to update an expense in Firebase
async function updateBill(docId, updatedData) {
  const billCollection = collection(db, "bill");

  try {
    // Update the document with the specified ID and updated data
    await updateDoc(doc(billCollection, docId), updatedData);

    // After updating an expense, refresh the display
    displayExpenses();
  } catch (error) {
    console.error("Error updating expense: ", error);
  }
}