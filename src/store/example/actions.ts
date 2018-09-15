import { Dispatch } from 'redux';

import { ExampleActionTypes } from './types';

// Normal redux action for increment
export function increment() {
  return {
    type: ExampleActionTypes.INCREMENT
  };
}

// Normal redux action for decrement
export function decrement() {
  return {
    type: ExampleActionTypes.DECREMENT
  };
}

// Async Action
export function asyncThinkAction(text: string) {
  return async (dispatch: Dispatch) => {
    try {
      // first increment
      dispatch(increment());
      await new Promise(r => setTimeout(r, 1000));
      // then decrement
      dispatch(decrement());
    } catch (e) {
      // In the case some error occured, do something
    }
  };
}
