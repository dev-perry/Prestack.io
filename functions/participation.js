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
      duration: part.duration,
      points: part.points,
      prompt: part.prompt,
      title: part.title,
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

//Send notification + data to user devices when participation module is activated
exports.sendCurrent = functions.https.onCall(async (data) => {
  const {participationID, idList} = data;

  //get array of user tokens
  const getDeviceTokens = idList.map(id =>
    db.collection('users')
    .doc(id).get().then((doc) =>  doc.data().notifyToken)
    .catch(e => console.log(e))
  );

  //get participation details
  const getParticipation = db.collection('participation')
        .doc(participationID).get().then((doc) => {
          let dataObject = doc.data();
          return dataObject;
        })
        .catch(e => console.log(e));

  //Object containing participation details
  let notifyObj;

  //Array containing user tokens
  let tokens;

  const results = await Promise.all([getDeviceTokens, getParticipation]);
  tokens = results[0];
  notifyObj = results[1];

  //Set body based on participation type
  function bodyLabel(type){
    switch (type) {
      case "cloud":
        return "Add to your class word cloud"
      case "quiz":
        return "Take your quiz"
      case "poll":
        return "Send in a poll response"
      case "photo":
        return "Add to your class photo wall"
      default:
        return null
    }
  }

  //Notification details
  const payload = {
    notification:{
      title: 'New class participation!',
      body: bodyLabel(notifyObj.type)
    },
    data: notifyObj
  }

  //Filter tokens array for any null/undefined values
  tokens = tokens.filter((el) => {
     return el !== null;
   });

   const response = await admin.messaging().sendToDevice(tokens, payload);

   //Check if error occurred for each message
   const errorTokens = [];
   response.results.forEach((result,index) => {
     const error = result.error;
     if(error){
       console.error('Failure sending notification to', tokens[index], error);
       errorTokens.push(tokens[index]);
     }
   });

   return Promise.all(errorTokens);
});
