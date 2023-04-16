// Import the Firebase Admin SDK
const admin = require("firebase-admin");

// Import the Firebase project credentials from the firebaseConfig.js file
const firebaseConfig = require("./firebaseConfig");

// Initialize the Firebase Admin SDK with the project credentials and database URL
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL:
    "https://iushare-51a0e-default-rtdb.europe-west1.firebasedatabase.app/",
});

module.exports = admin; //Export the admin object for use in other parts of your code
