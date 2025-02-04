'use client';
import { useEffect } from 'react';
import { deserializeState } from './serialization';

export const useHydrate = <T,>(
  dispatch: (action: { type: 'HYDRATE'; payload: T }) => void,
  serverState: string
) => {
  useEffect(() => {
    if (serverState) {
      dispatch({
        type: 'HYDRATE',
        payload: deserializeState<T>(serverState)
      });
    }
  }, [serverState, dispatch]);
};