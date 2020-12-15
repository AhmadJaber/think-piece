import { useReducer } from 'react';

const reducer = (previousState = {}, updatedState = {}) => {
  return { ...previousState, ...updatedState };
};

export const useSetState = (initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setState = (updatedState) => dispatch(updatedState);
  return [state, setState];
};
