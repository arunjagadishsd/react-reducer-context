import { useActionState } from 'react';
import { createReducerContext } from '../core';

export function createFormContext<State, Action, FormData>(
  reducer: (state: State, action: Action) => State,
  formAction: (prevState: State, formData: FormData) => Promise<Action>,
  initialState: Awaited<State>
) {
  const { Provider, useStateContext, useDispatchContext } =
    createReducerContext(reducer, initialState);

  const useFormAction = () => {
    const dispatch = useDispatchContext();
    const [_state, actionResult, isPending] = useActionState<State, FormData>(
      async (prev, data) => {
        const action = await formAction(prev, data);
        dispatch(action);
        return prev; // Return state for form tracking
      },
      initialState
    );

    return { formAction: actionResult, isPending };
  };

  return { Provider, useStateContext, useFormAction };
}