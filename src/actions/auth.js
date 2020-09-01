import firebase from "../firebase";
import {providerSignIn, createUserDoc} from  "../firebase/actions";
//providers
var facebook = new firebase.auth.FacebookAuthProvider();
var google = new firebase.auth.GoogleAuthProvider();

//Async login requests
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

//Async logout requests
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

//Async signup requests
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

//Listener for auth state changes
export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

//Login actions
const requestLogin = ()=>{
  return{
    type: LOGIN_REQUEST
  };
};
export const receiveLogin = user =>{
  return{
    type: LOGIN_SUCCESS,
    user
  };
};
export const loginError = error => {
  console.log(error)
  return{
    type: LOGIN_FAILURE
  };
};

//Logout actions
const requestLogout = ()=>{
  return{
    type: LOGOUT_REQUEST
  };
};
const receiveLogout = ()=>{
  return{
    type: LOGOUT_SUCCESS
  };
};
const logoutError = error =>{
  console.log(error);
  return{
    type: LOGOUT_FAILURE
  };
};

//Signup actions
const requestSignUp = ()=>{
  return{
    type: SIGNUP_REQUEST
  };
};
const receiveSignUp = ()=>{
  return{
    type: SIGNUP_SUCCESS
  };
};
const signUpError = error =>{
  console.log(error);
  return{
    type: SIGNUP_FAILURE
  };
};

//Auth state changes actions
const verifyRequest = ()=>{
  return{
    type: VERIFY_REQUEST
  };
};
const verifySuccess = ()=>{
  return{
    type: VERIFY_SUCCESS
  };
};

//Login user
export const loginUser = (provider, email, password) => dispatch => {
  //dispatch loginRequest
  dispatch(requestLogin());
    if(provider === "google"){
      dispatch(providerSignIn(google));
    }
    else if(provider === "facebook"){
      dispatch(providerSignIn(facebook));
    }
    else{
      firebase.auth().signInWithEmailAndPassword(email,password)
      .then(user =>{
        //dispatch receiveLogin and deliver payload which is user object after success
        dispatch(receiveLogin(user));
      })
      .catch(error => {
        //dispatch loginError if login is unsucessful, error can be passed as payload
        dispatch(loginError());
      })
    }
}

//Logout user
export const logoutUser = () => dispatch => {
  //dispatch requestLogout action
  dispatch(requestLogout());
  firebase.auth().signOut()
  .then(()=>{
    //dispatch receiveLogout on successful logout
    dispatch(receiveLogout());
  })
  .catch(error => {
    //dispatch logoutEror if logout unsuccessful, error can be passed as payload
    dispatch(logoutError(error));
  })
};

//Signup user
export const signUpUser = (user) => dispatch =>{
    //dispatch requestSignUp action
    dispatch(requestSignUp());
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then((data)=>{
      if(data.user){
        data.user.updateProfile({
          displayName: `${user.fname} ${user.lname}`
        })
      createUserDoc({email: data.user.email, displayName: `${user.fname} ${user.lname}`, uid: data.user.uid})
      .then(function(result){
        dispatch(receiveSignUp());
      })
      .catch(function(error){
        dispatch(signUpError(error));
      })
      }
    })
    .catch(function(error) {
      //dispatch signUpError if signup unsucessful
      dispatch(signUpError(error));
});
}

//User auth state
export const verifyAuth = () => dispatch => {
  //dispatch verifyRequest to see if a user session is already in process (involves token checking)
  dispatch(verifyRequest());
  firebase.auth().onAuthStateChanged(user => {
    if(user !== null){
      //dispatch receiveLogin if user session already exists, which passes user object as payload
      dispatch(receiveLogin(user));
    }
    //dispatch verifySuccess, nothing occurs if no user exists
    dispatch(verifySuccess());
  });
};