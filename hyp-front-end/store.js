import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

const initialState = {};

const middleware = [thunk]


const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware),
    // other store enhancers if any
  ))

// console.log(store.getState());


export default store