import{
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_FAILURE,
  SET_PRES
} from "../actions";

export default(state = {
  isCreating: false,
  creationFailure: false,
  currentPres: {}
}, action) => {
  switch(action.type){
    case SET_PRES:
      return{
        ...state,
        currentPres: action.pres
      }
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
