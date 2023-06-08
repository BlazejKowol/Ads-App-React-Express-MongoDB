import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import adsRedux from './adsRedux';
import userRedux from './userRedux';

const subreducers = {
  ads: adsRedux,
  user: userRedux,
}

const reducer = combineReducers(subreducers);
const store = createStore(
  reducer,

  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

export default store;