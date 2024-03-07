const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with your service account key
const serviceAccount = require('./yumhubb28-firebase-adminsdk-y3i8m-26c0d9fd7b.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Function to send a custom notification
function sendCustomNotification(title, body, recipientToken) {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: recipientToken,
  };


  return admin.messaging().send(message)
    .then((response) => {
      console.log('Successfully sent notification:', response);
    })
    .catch((error) => {
      console.error('Error sending notification:', error);
    });
}

module.exports = sendCustomNotification;
