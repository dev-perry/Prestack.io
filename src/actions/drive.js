import firebase from "../firebase";

var storage = firebase.storage().ref();

//Following for async upload actions
export const UPLOAD_REQUEST = "UPLOAD_REQUEST";
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
export const UPLOAD_FAILURE = "UPLOAD_FAILURE";

//Actions for drive reducer
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
      dispatch(uploadSuccess());
    })
    .catch(function(error){
      //Indicate error occurred during upload
      dispatch(uploadFailure(error));
    })
  });
}
