//Imports
const algoliasearch = require('algoliasearch');
const {v4: uuidv4} = require('uuid');

//Firebase stuff
const functions = require('firebase-functions');
const admin = require('firebase-admin');

//External APIs
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;

const ALGOLIA_INDEX_NAME = "drive";
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);


//Functions for drive uploads
exports.addedToDrive = functions.https.onCall((data) => {
  return admin.firestore().collection('users').doc(data.uid).collection('drive')
  .doc(data.info.name).set({
    uploaded: new Date(data.info.timeCreated),
    size: data.info.size,
    type: data.type
  });
});

//Function for searching through drive
exports.toDocIndex = functions.firestore.document('users/{userID}/drive/{docID}')
.onCreate((snap, context) => {
  //get the document object
  const doc = snap.data();
  //create 'objectID field' for Algolia
  doc.objectID = uuidv4();
  doc.name = context.params.docID;
  doc.owner = context.params.userID;
  //Write to algolia index
  const index = client.initIndex(ALGOLIA_INDEX_NAME);
  return index.saveObject(doc);
})
