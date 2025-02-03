import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from 'react';

export function createReducerContext<State, Action>(
  reducer: React.Reducer<State, Action>,
  initialState: State
) {
  const StateContext = createContext<State | undefined>(undefined);
  const DispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

  const Provider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
      <StateContext.Provider value= { state } >
      <DispatchContext.Provider value={ dispatch }>
        { children }
        </DispatchContext.Provider>
        </StateContext.Provider>
    );
};

const useStateContext = () => {
  const state = useContext(StateContext);
  if (state === undefined) {
    throw new Error('useStateContext must be used within a Provider');
  }
  return state;
};

const useDispatchContext = () => {
  const dispatch = useContext(DispatchContext);
  if (dispatch === undefined) {
    throw new Error('useDispatchContext must be used within a Provider');
  }
  return dispatch;
};

return { Provider, useStateContext, useDispatchContext };
}