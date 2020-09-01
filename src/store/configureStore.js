import {applyMiddleware, createStore, compose} from "redux";
import thunkMiddleware from "redux-thunk";

import {verifyAuth} from "../actions";
import rootReducer from "../reducers";

export default function configureStore(persistedState){
  const store = createStore(
    rootReducer,
    persistedState,
    compose(
      applyMiddleware(thunkMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  store.dispatch(verifyAuth());
  return store;
}
