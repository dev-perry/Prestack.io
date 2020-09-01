import firebase from "./index";
import {receiveLogin, loginError} from "../actions"

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
export const createUserDoc = firebase.functions().httpsCallable('createUserDoc');
