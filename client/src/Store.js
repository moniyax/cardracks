import { createStore, applyMiddleware, } from 'redux'
import rootReducer from './reducers/RootReducer'
import logger from 'redux-logger'
import { loadState, saveState } from './LocalStorageSync';
import throttle from 'lodash.throttle'
import thunk from 'redux-thunk';
import promise from "redux-promise";

const middleware = [thunk,promise,];

if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}

const persistedState = loadState();

const Store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(...middleware),
);


const initState = {
  boardIds: Store.getState().boardIds,
  boards: Store.getState().boards,
  cards: Store.getState().cards,
  racks: Store.getState().racks,
  ui: Store.getState().ui,
}

saveState(initState)

Store.subscribe(throttle(() => {
  const appState = {
    boardIds: Store.getState().boardIds,
    boards: Store.getState().boards,
    cards: Store.getState().cards,
    racks: Store.getState().racks,
    ui: Store.getState().ui,
    auth: Store.getState().auth,
  }
  saveState(appState)
}, 1000));


export default Store;
