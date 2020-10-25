import firebase from "../firebase";

var db = firebase.firestore();

//Follong for participation creation
export const NEW_PARTICIPATION = "NEW_PARTICIPATION";
export const NEW_SUCCESS = "NEW_SUCCESS";
export const NEW_FAILURE = "NEW_FAILURE";

//Actions for creation
const requestCreate = () => {
  return{
    type: NEW_PARTICIPATION
  };
}
const requestSuccess = () => {
  return{
    type: NEW_SUCCESS
  };
}
const requestFailure = (error) => {
  console.log(error);
  return{
    type: NEW_FAILURE,
    error
  }
}

export const newParticipation = (participation) => (dispatch, getState) => {
  //Indicate participation is being created
  dispatch(requestCreate());
  const state = getState();
  db.collection("users").doc(state.auth.user.uid).collection("participation")
  .add({
    title: participation.title,
    duration: parseInt(participation.duration),
    points: parseInt(participation.points),
    prompt: participation.prompt,
    type: participation.type
  })
  .then(function(docRef){
    //Indicate participation creation was successful
    dispatch(requestSuccess());
  })
  .catch(function(error){
    //Indicate an error occurred
    dispatch(requestFailure(error));
  })
}
