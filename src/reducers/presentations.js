import{
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_FAILURE
} from "../actions";

export default(state = {
  isCreating: false,
  creationFailure: false
}, action) => {
  switch(action.type){
    case CREATE_REQUEST:
      return{
        ...state,
        isCreating: true,
        creationFailure: false
      }
    case CREATE_SUCCESS:
      return{
        ...state,
        isCreating: false,
        creationFailure: false
      }
    case CREATE_FAILURE:
      return{
        ...state,
        isCreating: false,
        creationFailure: true
      }
    default:
      return state
  }
}
