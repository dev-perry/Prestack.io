const functions = require('firebase-functions');
const admin = require('firebase-admin');

//Functions for user signups
exports.createUserDoc = functions.https.onCall((data) => {
  return admin.firestore().collection('users').doc(data.uid).set({
    email: data.email,
    displayName: data.displayName,
    billing: false
  })
});
exports.createUserDocProvider = functions.auth.user().onCreate((user) => {
  if(user.providerData[0].providerId !== "password"){
    return admin.firestore().collection('users').doc(user.uid).set({
      email: user.providerData[0].email,
      displayName: user.providerData[0].displayName,
      billing: false
    })
  }else{
    return null;
  }
});
