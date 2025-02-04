import { createReducerContext } from '../core';

type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

type AsyncAction<T> =
  | { type: 'START' }
  | { type: 'SUCCESS'; payload: T }
  | { type: 'ERROR'; payload: Error };

export function createAsyncContext<T>(fetcher: (...args: any[]) => Promise<T>) {
  const initialState: AsyncState<T> = {
    data: null,
    loading: false,
    error: null,
  };

  const reducer = (state: AsyncState<T>, action: AsyncAction<T>): AsyncState<T> => {
    switch (action.type) {
      case 'START':
        return { ...state, loading: true, error: null };
      case 'SUCCESS':
        return { data: action.payload, loading: false, error: null };
      case 'ERROR':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const { Provider, useStateContext, useDispatchContext } =
    createReducerContext(reducer, initialState);

  const useAsyncAction = () => {
    const dispatch = useDispatchContext();

    const fetchData = async (...args: any[]) => {
      try {
        dispatch({ type: 'START' });
        const data = await fetcher(...args);
        dispatch({ type: 'SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'ERROR', payload: error as Error });
      }
    };

    return fetchData;
  };

  return { Provider, useStateContext, useAsyncAction };
}