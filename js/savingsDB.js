
import app from "./firebaseConfig.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { auth, authStateChanged, login, logout, createAccount } from "./auth.js";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWhEMagw30n3aWvNZL4o8LX040g5Fiz8k",
  authDomain: "budget-urself.firebaseapp.com",
  projectId: "budget-urself",
  storageBucket: "budget-urself.appspot.com",
  messagingSenderId: "791531012957",
  appId: "1:791531012957:web:0e454962b583894af99eb4",
  measurementId: "G-7ZJLE5TJ5P"
};

// Initialize Firebase
document.addEventListener("DOMContentLoaded", async function () {
    //const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Initialize Firebase Authentication
    authStateChanged(async (user) => {
        if (user) {
            // User is authenticated, display savings data
            console.log('User available:', user);
            displaySavings();
        } else {
            // User is not authenticated, handle accordingly
            console.log("User not authenticated. Savings data will not be displayed.");
        }
    });

    async function displaySavings() {
        // Get a reference to the "savings" collection
        const savingsCol = collection(db, "savings");
    
        try {
            // Retrieve data from Firestore
            const savingsSnapshot = await getDocs(savingsCol);
    
            // Get the "saving-cards" container
            const savingCardsContainer = document.getElementById("saving-cards");
    
            // Clear existing content in the container
            savingCardsContainer.innerHTML = "";
    
            // Iterate through the documents in the collection
            savingsSnapshot.forEach((doc) => {
                // Access the data in each document
                const savingData = doc.data();
    
                // Create HTML elements dynamically
                const card = document.createElement("div");
                card.className = "col s12 m6 l4";
                card.innerHTML = `  
                    <div class="card grey lighten-5">
                        <div class="card-content saving grey-text darken-5">
                            <span class="card-title">Savings</span>
                            <p>Monthly Amount Added to Savings: ${savingData.amount}</p>
                            <p>Monthly Goal: ${savingData.monthlyGoal}</p>
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
                        await deleteSaving(docId);
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
                        const updatedSavingsAmount = prompt("Enter updated savings Amount:");
                        const updatedSavingsMonthlyGoal = prompt("Enter updated Monthly Savings Goal:");

                        // Call the update function with the document ID and updated values
                        await updateSavings(docId, {
                            amount: updatedSavingsAmount,
                            monthlyGoal: updatedSavingsMonthlyGoal
                        });
                    } catch (error) {
                        console.error("Error handling edit button click: ", error);
                    }
                });

                // Add a margin to the bottom of the card for spacing
                card.style.marginBottom = '15px';

                // Append the card to the "savings cards" section
                savingCardsContainer.appendChild(card);
            });
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    // Event listener for the "Add" button
    document.getElementById("savings-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission
        console.log("Form submitted");
        // Get values from the form
        const savings = document.getElementById("savings").value;
        const monthlyGoal = document.getElementById("monthlyGoal").value;

        // Add savings to Firebase
        addSavings(savings, monthlyGoal);
    });

    async function addSavings(savings, monthlyGoal) {
        console.log("Adding savings");
        const user = auth.currentUser;

        if (user) {
            const savingCollection = collection(db, "savings");

            try {
                // Add a new document with the provided data
                await addDoc(savingCollection, {
                    amount: savings,
                    monthlyGoal: monthlyGoal
                });

                // After adding savings, refresh the display
                displaySavings();
            } catch (error) {
                console.error("Error adding Savings: ", error);
            }
        } else {
            console.log('User not authenticated. Cannot add savings.');
        }
    }

    async function deleteSaving(docId) {
        const savingCollection = collection(db, "savings");
    
        try {
            // Delete the document with the specified ID
            await deleteDoc(doc(savingCollection, docId));
    
            // After deleting savings, refresh the display
            displaySavings();
        } catch (error) {
            console.error("Error deleting savings: ", error);
        }
    }

    async function updateSavings(docId, updatedData) {
        const savingCollection = collection(db, "savings");

        try {
            // Update the document with the specified ID and updated data
            await updateDoc(doc(savingCollection, docId), updatedData);

            // After updating savings, refresh the display
            displaySavings();
        } catch (error) {
            console.error("Error updating savings: ", error);
        }
    }

    document.getElementById("logout-button").addEventListener("click", function () {
        logout();
    });
});
