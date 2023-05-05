// Import the Firebase Admin SDK
const admin = require("firebase-admin");
const serviceAccount = require("./firebaseConfig.json");

// Initialize the Firebase Admin SDK with the project credentials and database URL
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://iushare-51a0e-default-rtdb.europe-west1.firebasedatabase.app/",
});

module.exports = admin; //Export the admin object for use in other parts of your code
