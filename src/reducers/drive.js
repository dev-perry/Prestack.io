import{
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE
} from "../actions";

export default(state = {
  isUploading: false,
  uploadFailure: false
}, action) => {
  switch (action.type) {
    case UPLOAD_REQUEST:
      return{
        ...state,
        isUploading: true,
        uploadFailure: false
      }
    case UPLOAD_SUCCESS:
      return{
        ...state,
        isUploading: false,
        uploadFailure: false
      }
    case UPLOAD_FAILURE:
      return{
        ...state,
        isUploading: false,
        uploadFailure: true
      }
    default:
      return state
  }
}
