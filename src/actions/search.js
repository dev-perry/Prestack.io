export const SET_SEARCHING = "SET_SEARCHING";
export const SET_HITS = "SET_HITS";

const setSearching = (state) => {
  return{
    type: SET_SEARCHING,
    state
  }
}

const setHits = (hits) => {
  return{
    type: SET_HITS,
    hits
    }
}

export const hitList = hits => dispatch => {
  //set hit hits
  dispatch(setHits(hits));
}

export const searchState = searching => dispatch => {
  //set search state
  dispatch(setSearching(searching));
}
