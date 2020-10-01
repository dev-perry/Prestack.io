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

const ALGOLIA_INDEX_NAME = "presentations";
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);


//Create top-level presentations when users create sub-level presentations
exports.presCreated = functions.firestore.document('users/{userID}/presentations/{presID}')
.onCreate((snap, context) => {
  //get data from presentation object
  const pres = snap.data();
  //access user doc
  var user = db.collection("users").doc(context.params.userID);
  //sublevel presentation
  var subPres = db.collection("users").doc(context.params.userID)
  .collection("presentations").doc(context.params.presID)
  //new toplevel presentation
  var topPres = db.collection("presentations");
  //Dual writes transaction
  return user.get().then((uDoc) => {
    if(!uDoc.exists){
      //eslint-disable-next-line
      throw "User does not exist!";
    }
    return uDoc.data().displayName;
  })
  .then((uName) =>
    topPres.add({
      created: pres.created,
      desc: pres.desc,
      downloadable: pres.downloadable,
      draft: pres.draft,
      owner: {
        displayName: uName,
        ref: user,
        pid: context.params.presID
      },
      title: pres.title
    })
  )
  .then((topRef) =>
  subPres.update({
    ref: topRef
  })
)
.catch(error => console.log("Function fail:", error))
})

//Function for searching through presentation
exports.toPresIndex = functions.firestore.document('users/{userID}/presentations/{presID}')
.onCreate((snap, context) => {
  //get the presentation object
  const pres = {
    name: snap.data().title,
    created: snap.data().created,
    desc: snap.data().desc,
    owner: context.params.userID
  };
  pres.objectID = uuidv4();
  const index = client.initIndex(ALGOLIA_INDEX_NAME);
  return index.saveObject(pres);
})

//Function for updating top-level pres when sub-level changes
exports.presChange = functions.firestore.document('users/{userID}/presentations/{presID}')
.onUpdate((change, context) => {
  //Get object after change
  const newValue = change.after.data();
  //Get reference to top-Level
  var topLevel = change.after.data().ref;
  return topLevel.update({
    title: newValue.title,
    desc: newValue.desc,
    draft: newValue.draft,
    downloadable: newValue.downloadable
  })
})
