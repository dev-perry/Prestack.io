import {combineReducers} from "redux";
import auth from "./auth";
import drive from "./drive";
import ReduxStore from "@uppy/store-redux";

const reducers = {auth, drive};

export default combineReducers({
  ...reducers,
  uppy: ReduxStore.reducer
});
