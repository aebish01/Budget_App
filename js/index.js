import app from "./firebaseConfig.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { auth, onAuthStateChanged, authStateChanged, login, logout, createAccount } from "./auth.js";

async function displayTotalIncome() {
    const db = getFirestore(app);
    authStateChanged(async (user) => {
      console.log('User available:', user);
  
      if (!user) {
        console.log('User not authenticated. Income data will not be displayed.');
        return;
      }
  
      const tasksCol = collection(db, "income");
  
      try {
        const taskSnapshot = await getDocs(tasksCol);
  
        let totalAnnualIncome = 0;  // Initialize total annual income
  
        taskSnapshot.forEach((doc) => {
          const incomeData = doc.data();
          const annualIncome = parseFloat(incomeData.yearlyIncome) || 0;
            console.log("here");
          totalAnnualIncome += annualIncome;
        });
  
        // Update the content of the total annual income paragraph
        const totalIncomeParagraph = document.getElementById("totalAnnualIncome");
  
        if (totalIncomeParagraph) {
          totalIncomeParagraph.textContent = `$${totalAnnualIncome.toFixed(2)}`;
        } else {
          console.error("Element with ID 'totalAnnualIncome' not found.");
        }
  
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    });
    
  }
  /////////////////////////////////////////

  async function displayTotalBringHomeIncome() {
    const db = getFirestore(app);
    authStateChanged(async (user) => {
      console.log('User available:', user);
  
      if (!user) {
        console.log('User not authenticated. Income data will not be displayed.');
        return;
      }
  
      const tasksCol = collection(db, "income");
  
      try {
        const taskSnapshot = await getDocs(tasksCol);
  
        let totalHomeIncome = 0;  // Initialize total annual income
  
        taskSnapshot.forEach((doc) => {
          const incomeData = doc.data();
          const homeIncome = parseFloat(incomeData.estIncome) || 0;
            console.log("here");
          totalHomeIncome += homeIncome;
        });
  
        // Update the content of the total annual income paragraph
        const totalIncomeParagraph = document.getElementById("totalHomeIncome");
  
        if (totalIncomeParagraph) {
          totalIncomeParagraph.textContent = `$${totalHomeIncome.toFixed(2)}`;
        } else {
          console.error("Element with ID 'totalHomeIncome' not found.");
        }
  
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    });
    
  }
///////////////////////////////////////////////////////////
  async function displayTotalBills() {
    const db = getFirestore(app);
    authStateChanged(async (user) => {
      console.log('User available:', user);
  
      if (!user) {
        console.log('User not authenticated. Income data will not be displayed.');
        return;
      }
  
      const tasksCol = collection(db, "bill");
  
      try {
        const taskSnapshot = await getDocs(tasksCol);
  
        let totalBills = 0;  // Initialize total annual income
  
        taskSnapshot.forEach((doc) => {
          const billData = doc.data();
          const bills = parseFloat(billData.cost) || 0;
            console.log("here");
          totalBills += bills;
        });
  
        // Update the content of the total annual income paragraph
        const totalBillParagraph = document.getElementById("totalBills");
  
        if (totalBillParagraph) {
          totalBillParagraph.textContent = `$${totalBills.toFixed(2)}`;
        } else {
          console.error("Element with ID 'totalBills' not found.");
        }
  
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    });
    
  }

  //////////////////////////////////////////////////////

  async function displayTotalSavings() {
    const db = getFirestore(app);
    authStateChanged(async (user) => {
      console.log('User available:', user);
  
      if (!user) {
        console.log('User not authenticated. Income data will not be displayed.');
        return;
      }
  
      const tasksCol = collection(db, "savings");
  
      try {
        const taskSnapshot = await getDocs(tasksCol);
  
        let totalSavings = 0;  // Initialize total annual income
  
        taskSnapshot.forEach((doc) => {
          const savingData = doc.data();
          const savings = parseFloat(savingData.amount) || 0;
            console.log("here");
          totalSavings += savings;
        });
  
        // Update the content of the total annual income paragraph
        const totalSavingsParagraph = document.getElementById("totalSavings");
  
        if (totalSavingsParagraph) {
          totalSavingsParagraph.textContent = `$${totalSavings.toFixed(2)}`;
        } else {
          console.error("Element with ID 'totalSavings' not found.");
        }
  
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    });
    
  }
  displayTotalSavings();
  displayTotalBills(); 
  displayTotalBringHomeIncome();
  displayTotalIncome();
  