import { createStore, applyMiddleware, } from 'redux'
import rootReducer from './reducers/RootReducer'
import logger from 'redux-logger'
import { loadState, saveState } from './LocalStorageSync';
import { composeWithDevTools } from 'redux-devtools-extension';
import throttle from 'lodash.throttle'
import thunk from 'redux-thunk';
import addBoard from "./actions/AddBoard";

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

const persistedState = loadState();

const Store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(...middlewares),
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
  console.log('saving...');

  const appState = {
    boardIds: Store.getState().boardIds,
    boards: Store.getState().boards,
    cards: Store.getState().cards,
    racks: Store.getState().racks,
    ui: Store.getState().ui,
  }
  saveState(appState)
}, 1000));


export default Store;
