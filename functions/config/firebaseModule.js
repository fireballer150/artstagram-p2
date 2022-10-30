var admin = require("firebase-admin");

var serviceAccount = require("../service/serviceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://artstagram-p1-default-rtdb.firebaseio.com",
});
// const admAuth = admin.auth();
// console.log("$$$$$$$$$$$$admin.auth", admAuth);
// const ex1 = admAuth.createUser({
//   email: "codename@code.com",
//   password: "12345678",
// });
// console.log("$$$$$$$$$$$$ex1", ex1);

module.exports = admin;
