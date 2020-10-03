import{
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_FAILURE,
  SET_PRES,
  SET_BUILD
} from "../actions";

export default(state = {
  isCreating: false,
  creationFailure: false,
  currentPres: {},
  build: {}
}, action) => {
  switch(action.type){
    case SET_PRES:
      return{
        ...state,
        currentPres: action.pres
      }
    case SET_BUILD:
      return{
        ...state,
        build: action.build
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
