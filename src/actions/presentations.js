import firebase from "../firebase";

var db = firebase.firestore();


//Following for presentation creation
export const CREATE_REQUEST = "CREATE_REQUEST";
export const CREATE_SUCCESS = "CREATE_SUCCESS";
export const CREATE_FAILURE = "CREATE_FAILURE";


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
