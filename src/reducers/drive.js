import{
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAILURE
} from "../actions";

export default(state = {
  isUploading: false,
  uploadFailure: false,
  isLoading: false,
  loadFailure: false,
  currentDocURL: ""
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
    case LOAD_REQUEST:
      return{
        ...state,
        isLoading: true,
      }
    case LOAD_SUCCESS:
      return{
        ...state,
        isLoading: false,
        loadFailure: false,
        currentDocURL: action.url
      }
    case LOAD_FAILURE:
      return{
        ...state,
        isLoading: false,
        loadFailure: true
      }
    default:
      return state
  }
}
