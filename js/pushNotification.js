import app from "./firebaseConfig.js"
import { getMessaging, getToken } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-messaging.js';

const messaging = getMessaging(app);
const token = "BFH5C8b71no2b2AImRcL1CQHDnEhzU-Vd3IUs8PWn-eVLgobk-q_WKVWQK361vtX-Vvr5yuUULk63JWu_2IjSvU";

// Function to subscribe to push notifications using Firebase Cloud Messaging
async function subscribeToPushNotifications() {
    try {
      getToken(messaging, {vapidKey: token})
        // Add the logic to handle the obtained token, e.g., send it to the server
        console.log("Token:", token);
    } catch (error) {
        console.error("Error getting token:", error);
    }
}

// You can call the function to subscribe when needed
subscribeToPushNotifications();

const subscribeButton = document.getElementById("subscribeButton");

// Add an event listener to the button
subscribeButton.addEventListener("click", () => {
    // Call the subscribeToPushNotifications function when the button is clicked
    subscribeToPushNotifications();
});
