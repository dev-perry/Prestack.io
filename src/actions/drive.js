import firebase from "../firebase";
import {addedToDrive} from "../firebase/actions";

var storage = firebase.storage().ref();

//Following for async upload actions
export const UPLOAD_REQUEST = "UPLOAD_REQUEST";
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
export const UPLOAD_FAILURE = "UPLOAD_FAILURE";

//Following for async document loading actions
export const LOAD_REQUEST = "LOAD_REQUEST";
export const LOAD_SUCCESS = "LOAD_SUCCESS";
export const LOAD_FAILURE = "LOAD_FAILURE";

//Actions for upload reducer
const requestUpload = () => {
  return{
    type: UPLOAD_REQUEST
  }
};
const uploadSuccess = () => {
  return{
    type: UPLOAD_SUCCESS
  }
}
const uploadFailure = (error) => {
  console.log(error);
  return{
    type: UPLOAD_FAILURE
  }
}

//Actions for loading reducer
const requestLoad = () => {
  return{
    type: LOAD_REQUEST
  }
}
const loadSuccess = (url) => {
  return{
    type: LOAD_SUCCESS,
    url
  }
}
const loadFailure = (error) => {
  console.log(error);
  return{
    type: LOAD_FAILURE
  }
}

export const uploadFile = (files) => (dispatch, getState) => {
  //Indicate file upload is occurring
  dispatch(requestUpload());
  const state = getState();
  files.forEach(file => {
    var metaData = {
      customMetadata : {
        'extension': file.extension
      }
    }
    storage.child(`users/${state.auth.user.uid}/drive/${file.name}`).put(file.data, metaData).then(function(snapshot){
      //Indicate file successfully uploaded
      addedToDrive({uid:state.auth.user.uid, info:snapshot.metadata, type: snapshot.metadata.customMetadata.extension});
      dispatch(uploadSuccess());
    })
    .catch(function(error){
      //Indicate error occurred during upload
      dispatch(uploadFailure(error));
    })
  });
}

export const loadFile = (name) => (dispatch, getState) =>{
  //Indicate file load is occurring
  dispatch(requestLoad());
  const state = getState();
  storage.child(`users/${state.auth.user.uid}/drive/${name}`).getDownloadURL()
  .then(function(url){
    dispatch(loadSuccess(url))
  }).catch(function(error){
    //Indicate error occurred during loading
    dispatch(loadFailure(error))
  })
}
