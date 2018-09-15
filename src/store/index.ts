// This provides a Redux middleware which connects to our `react-router` instance.
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { applyMiddleware, combineReducers, createStore, DeepPartial, Store } from 'redux';
import reduxThunk from 'redux-thunk';

import { exampleReducer } from './example';
import { IApplicationState } from './types';

const rootReducer = combineReducers<IApplicationState>({
  example: exampleReducer
});

export function configureStore(
  history: History,
  initialState: DeepPartial<IApplicationState> = {}
): Store<IApplicationState> {
  // create the composing function for our middlewares
  return createStore(
    connectRouter(history)(rootReducer),
    initialState,
    applyMiddleware(routerMiddleware(history), reduxThunk)
  );
}
