
var admin = require("firebase-admin");

var serviceAccount = require("../config/fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ecom-4b6a0-default-rtdb.firebaseio.com"
});

module.exports = admin;