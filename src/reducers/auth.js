import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  GET_SEARCH_KEY,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  GET_ATTRIBUTES,
  SET_ATTRIBUTES
} from "../actions/";

//changes in state that will occur based on actions
export default (state={
  isLoggingIn: false,
  isLoggingOut: false,
  isSigningUp: false,
  isVerifying: false,
  loginError: false,
  logoutError: false,
  signupError: false,
  isAuthenticated: false,
  verifyingError: false,
  fetchingAttributes: false,
  user: {},
  attributes: {},
  searchKey: ""
}, action)=>{
  switch(action.type){
    case LOGIN_REQUEST:
      return{
          ...state,
          isLoggingIn: true,
          loginError: false
        };
    case LOGIN_SUCCESS:
      return{
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.user
      };
      case LOGIN_FAILURE:
        return{
          ...state,
          isLoggingIn: false,
          isAuthenticated: false,
          loginError: true
        };
      case LOGOUT_REQUEST:
        return{
          ...state,
          isLoggingOut: true,
          logoutError: false
        };
      case LOGOUT_SUCCESS:
        return{
          ...state,
          isLoggingOut: false,
          isAuthenticated: false,
          user: {},
          searchKey: ""
        };
      case LOGOUT_FAILURE:
        return{
          ...state,
          isLoggingOut: false,
          logoutError: true
        };
      case SIGNUP_REQUEST:
        return{
          ...state,
          isSigningUp: true,
          signupError: false
        };
      case SIGNUP_SUCCESS:
        return{
          ...state,
          isSigningUp: false,
          signupError: false
        };
      case SIGNUP_FAILURE:
        return{
          ...state,
          isSigningUp: false,
          signupError: true
        };
      case GET_SEARCH_KEY:
        return{
          ...state,
          searchKey: action.key
        }
      case VERIFY_REQUEST:
        return{
          ...state,
          isVerifying: true
        };
      case VERIFY_SUCCESS:
        return{
          ...state,
          isVerifying: false
        };
      case GET_ATTRIBUTES:
        return{
          ...state,
          fetchingAttributes: true
        };
      case SET_ATTRIBUTES:
        return{
          ...state,
          fetchingAttributes: false,
          attributes: action.doc
        };
     default:
     return state;
  }
}
