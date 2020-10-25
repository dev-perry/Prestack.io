import {combineReducers} from "redux";
import auth from "./auth";
import drive from "./drive";
import presentations from "./presentations";
import participation from "./participation";
import search from "./search";
import ReduxStore from "@uppy/store-redux";

const reducers = {auth, drive, presentations, participation, search};

export default combineReducers({
  ...reducers,
  uppy: ReduxStore.reducer
});
