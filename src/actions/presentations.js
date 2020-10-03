import firebase from "../firebase";

var db = firebase.firestore();

//Following for setting current presentation
export const SET_PRES = "SET_PRES";
//Set current build for editor
export const SET_BUILD = "SET_BUILD";
//Following for presentation creation
export const CREATE_REQUEST = "CREATE_REQUEST";
export const CREATE_SUCCESS = "CREATE_SUCCESS";
export const CREATE_FAILURE = "CREATE_FAILURE";

//Action for setting presentation
const setPres = (pres) => {
  return{
    type: SET_PRES,
    pres
  }
}
//Action for setting build
const setBuild = (build) => {
  return{
    type: SET_BUILD,
    build
  }
}

//Actions for creation
const requestCreate = () => {
  return{
    type: CREATE_REQUEST
  };
}
const requestSuccess = () => {
  return{
    type: CREATE_SUCCESS
  };
}
const requestFailure = (error) => {
  console.log(error);
  return{
    type: CREATE_FAILURE,
    error
  }
}

//Action creator for setting presentation
export const setPresentation = pres => dispatch =>{
  //set reducer
  dispatch(setPres(pres));
}

//Action creator for setting build
export const setConstruct = build => dispatch => {
  //set reducer
  dispatch(setBuild(build));
}

//Action creator for presentation creation
export const createPresentation = (pres) => (dispatch, getState) => {
  //Indicate presentation is being created
  dispatch(requestCreate());
  const state = getState();
  db.collection("users").doc(state.auth.user.uid).collection("presentations")
  .add({
    title: pres.title,
    desc: pres.desc,
    downloadable: (pres.downloadable ? true : false),
    draft: true,
    created: new Date()
  })
  .then(function(docRef){
    //Indicate presentation creation was successful
    dispatch(requestSuccess());
  })
  .catch(function(error){
    //Indicate an error occurred
    dispatch(requestFailure(error));
  })
}
