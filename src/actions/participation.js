import firebase from "../firebase";

var db = firebase.firestore();

//Follong for participation creation
export const NEW_PARTICIPATION = "NEW_PARTICIPATION";
export const NEW_SUCCESS = "NEW_SUCCESS";
export const NEW_FAILURE = "NEW_FAILURE";

//Following for setting target classes
export const TARGET_CLASS = "TARGET_CLASS";

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

//Action for setting target class
const targetClass = (classObj) => {
  return{
    type: TARGET_CLASS,
    classObj
  };
}

export const newParticipation = (participation) => (dispatch, getState) => {
  //Indicate participation is being created
  dispatch(requestCreate());
  const state = getState();
  db.collection("users").doc(state.auth.user.uid).collection("participation")
  .add({
    title: participation.title,
    duration: parseInt(participation.duration),
    prompt: participation.prompt,
    type: participation.type,
    choices: participation.choices ? participation.choices : null
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

export const setTarget = (id) => (dispatch, getState) => {
  const state = getState();
  let classArray = state.auth.attributes.teaching;
  let target = classArray.filter(function(e){
    //returns array that only has one item in it mathcing id
    return e.id === id;
  })
  //Set targetClass field in reducer
  dispatch(targetClass(target[0]));
}
