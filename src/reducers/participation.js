import {
  NEW_PARTICIPATION,
  NEW_SUCCESS,
  NEW_FAILURE,
  TARGET_CLASS
} from "../actions";

export default( state ={
  isCreating: false,
  creationFailure: false,
  targetClass: {}
}, action) => {
  switch (action.type) {
    case NEW_PARTICIPATION:
      return{
        ...state,
        isCreating: true,
        creationFailure: false
      }
    case NEW_SUCCESS:
      return{
        ...state,
        isCreating: false,
        creationFailure: false
      }
    case NEW_FAILURE:
      return{
        ...state,
        isCreating: false,
        creationFailure: true
      }
    case TARGET_CLASS:
      return{
        ...state,
        targetClass: action.classObj
      }
    default:
      return state
  }
}
