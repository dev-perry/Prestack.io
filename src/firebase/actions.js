import firebase from "./index";
import {receiveLogin, loginError} from "../actions"

//Function that returns date when passed Firestore timestamp object
export const getDate = (date) => {
    const options = {month: 'short', year: 'numeric', day: 'numeric' }
    var dateStamp = new Date(date.seconds * 1000);
    return dateStamp.toLocaleDateString(undefined, options);
  }

//For provider sign-in
export const providerSignIn = (provider) => dispatch => {
  firebase.auth().signInWithPopup(provider).then(function(result){
    //receive the user object
    dispatch(receiveLogin(result.user));
  })
  .catch(error => {
    //dispatch login error
    dispatch(loginError(error));
  })
}

//For user document creation
export const createUserDoc = firebase.functions().httpsCallable('users-createUserDoc');
//For drive document creation
export const addedToDrive = firebase.functions().httpsCallable('drive-addedToDrive');
