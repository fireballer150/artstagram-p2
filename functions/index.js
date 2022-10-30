const functions = require("firebase-functions");
const clientApi = require("./router/client");
// console.log("functions$$$$$$$$$", functions);
exports.clientApi = functions.https.onRequest(clientApi);
