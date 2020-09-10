import {combineReducers} from "redux";
import auth from "./auth";
import drive from "./drive";
import presentations from "./presentations";
import ReduxStore from "@uppy/store-redux";

const reducers = {auth, drive, presentations};

export default combineReducers({
  ...reducers,
  uppy: ReduxStore.reducer
});
