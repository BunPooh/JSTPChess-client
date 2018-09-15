import { Action } from 'redux';

import { ExampleActionTypes, IExampleState } from './types';

export function getDefaultState(): IExampleState {
  return {
    count: 0
  };
}

export const exampleReducer = (
  state: IExampleState = getDefaultState(),
  action: Action
) => {
  switch (action.type) {
    case ExampleActionTypes.INCREMENT:
      return { count: state.count + 1 };
    case ExampleActionTypes.DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
};
