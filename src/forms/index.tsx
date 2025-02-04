import { useActionState } from 'react';
import { createReducerContext } from '../core';
// TODO: Doesn't add anything other than wraps the useActionState hook, remove this if not needed
// TODO: Think about if we can add validation but with zod or yup user can do it themselves 
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