import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { Platform } from 'react-native';

type NullableGeneric<T> = T | null;
type UseStateHook<T> = [NullableGeneric<T>, (value: NullableGeneric<T>) => void];

function useAsyncState<T>(initialValue: NullableGeneric<T> = null): UseStateHook<T> {
  return useReducer(
    (state: NullableGeneric<T>, action: NullableGeneric<T> = null): NullableGeneric<T> => action,
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync<T>(key: string, value: NullableGeneric<T>) {
  let stringifiedValue = JSON.stringify(value);
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, stringifiedValue);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value == null) {
      await deleteItemAsync(key);
    } else {
      await setItemAsync(key, stringifiedValue);
    }
  }
}

export function useStorageState<T>(key: string, initialValue: NullableGeneric<T>): UseStateHook<T> {
  // state.
  const [state, setState] = useAsyncState<T>(initialValue);

  // read
  useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          const stringifiedValue = localStorage.getItem(key);
          const value = stringifiedValue ? (parseJSON(stringifiedValue) as T) : initialValue;
          setState(value);
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      getItemAsync(key).then(value => {
        const stateValue = value ? (parseJSON(value) as T) : initialValue;
        setState(stateValue);
      });
    }
  }, [key]);

  // write
  const setValue = useCallback(
    (value: NullableGeneric<T>) => {
      const stringifiedValue = JSON.stringify(value);
      setState(value);
      setStorageItemAsync(key, stringifiedValue);
    },
    [key]
  );

  return [state, setValue];
}

function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '')
  } catch {
    console.log('parsing error on', { value })
    return undefined
  }
}
