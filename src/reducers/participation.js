import {
  NEW_PARTICIPATION,
  NEW_SUCCESS,
  NEW_FAILURE
} from "../actions";

export default( state ={
  isCreating: false,
  creationFailure: false
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
    default:
      return state
  }
}
