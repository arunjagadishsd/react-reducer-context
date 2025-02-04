import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch
} from 'react';

export function createReducerContext<State, Action>(
  reducer: (state: State, action: Action) => State,
  initialState: State
) {
  const StateContext = createContext<State | undefined>(undefined);
  const DispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

  const Provider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </StateContext.Provider>
    );
  };

  const useStateContext = () => {
    const state = useContext(StateContext);
    if (!state) throw new Error('Missing Provider');
    return state;
  };

  const useDispatchContext = () => {
    const dispatch = useContext(DispatchContext);
    if (!dispatch) throw new Error('Missing Provider');
    return dispatch;
  };

  return { Provider, useStateContext, useDispatchContext };
}