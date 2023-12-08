//messaging-sw.js
import app from "./firebaseConfig.js"
import { getMessaging } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-messaging.js';


const messaging = getMessaging(app);

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});