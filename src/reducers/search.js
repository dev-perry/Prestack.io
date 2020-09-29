import {
  SET_SEARCHING,
  SET_HITS
} from "../actions";

export default (state = {
  isSearching: false,
  searchResults: []
}, action) => {
  switch(action.type){
    case SET_SEARCHING:
      return{
        ...state,
        isSearching: action.state
      }
    case SET_HITS:
      return{
        ...state,
        searchResults: action.hits
      }
    default:
      return state
  }
}
