//Imports
const algoliasearch = require('algoliasearch');
const {v4: uuidv4} = require('uuid');

//Firebase stuff
const functions = require('firebase-functions');
const admin = require('firebase-admin');

//Databse variable for calls
var db = admin.firestore();

//External APIs
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;

const ALGOLIA_INDEX_NAME = "participation";
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

//Function for participation searching
exports.toParticipationIndex = functions.firestore.document('users/{userID}/participation/{partID}')
.onCreate((snap, context) => {
  //get the participation object
  const participation = {
    name: snap.data().title,
    type: snap.data().type,
    owner: context.params.userID,
    participationID: context.params.partID
  };
  participation.objectID = uuidv4();
  const index = client.initIndex(ALGOLIA_INDEX_NAME);
  return index.saveObject(participation);
});

//Create top-level participations when users create sub-level participations
exports.participationCreated = functions.firestore.document('users/{userID}/participation/{partID}')
.onCreate((snap, context) => {
  //get data from participation object
  const part = snap.data();
  //access user doc
  var user = db.collection("users").doc(context.params.userID);
  //sublevel participation
  var subPres = db.collection("users").doc(context.params.userID)
  .collection("participation").doc(context.params.partID)
  //new toplevel participation
  var topPres = db.collection("participation");
  //Dual writes
  return user.get().then((uDoc) => {
    if(!uDoc.exists){
      //eslint-disable-next-line
      throw "User does not exist!";
    }
    return uDoc.data().displayName;
  })
  .then((uName) =>
    topPres.add({
      prompt: part.prompt,
      title: part.title,
      choices: part.choices ? part.choices : null,
      type: part.type,
      owner: {
        displayName: uName,
        id: context.params.userID
      }
    })
  )
  .then((topRef) =>
  subPres.update({
    ref: topRef
  })
)
.catch(error => console.log("Function fail:", error))
});

//// TODO: Update this to be able to handle edits to participation
//Function for updating top-level participation when sub-level changes
exports.participationChange = functions.firestore.document('users/{userID}/participation/{partID}')
.onUpdate((change, context) => {
  //Get object after change
  const newValue = change.after.data();
  //Get reference to top-Level
  var topLevel = change.after.data().ref;
  return topLevel.update({
    duration: newValue.duration,
    points: newValue.points
  });
});
