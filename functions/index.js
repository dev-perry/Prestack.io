const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

//Functions for drive uploads/deletes
exports.addedToDrive = functions.https.onCall((data) => {
  return admin.firestore().collection('users').doc(data.uid).collection('drive')
  .doc(data.info.name).set({
    uploaded: new Date(data.info.timeCreated),
    size: data.info.size,
    type: data.type
  });
});
exports.deletedFromDrive = functions.https.onCall((data) => {
  return admin.firestore().collection('users').doc(data.uid).collection('drive')
  .doc(data.info.name).delete()
})

// //Functions for user signups
// exports.createUserDoc = functions.https.onCall((data) => {
//   return admin.firestore().collection('users').doc(data.uid).set({
//     email: data.email,
//     displayName: data.displayName,
//     billing: false
//   })
// });
// exports.createUserDocProvider = functions.auth.user().onCreate((user) => {
//   if(user.providerData[0].providerId !== "password"){
//     return admin.firestore().collection('users').doc(user.uid).set({
//       email: user.providerData[0].email,
//       displayName: user.providerData[0].displayName,
//       billing: false
//     })
//   }else{
//     return null;
//   }
// });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
