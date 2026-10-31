import { useCallback, useEffect, useRef, useState } from 'react';

const resolveInitialValue = (initialValue) =>
  typeof initialValue === 'function' ? initialValue() : initialValue;

export function useLocalStorage(key, initialValue) {
  const initialValueRef = useRef(initialValue);

  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return resolveInitialValue(initialValueRef.current);
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) return JSON.parse(item);
    } catch (error) {
      console.warn(`[FlowBoard] Unable to read "${key}" from localStorage.`, error);
    }

    return resolveInitialValue(initialValueRef.current);
  });

  const setValue = useCallback((value) => {
    setStoredValue((currentValue) =>
      typeof value === 'function' ? value(currentValue) : value,
    );
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const serializedValue = JSON.stringify(storedValue);
      if (window.localStorage.getItem(key) !== serializedValue) {
        window.localStorage.setItem(key, serializedValue);
      }
    } catch (error) {
      console.warn(
        `[FlowBoard] Unable to write "${key}" to localStorage.`,
        error,
      );
    }
  }, [key, storedValue]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== key || event.newValue === null) return;

      try {
        setStoredValue(JSON.parse(event.newValue));
      } catch (error) {
        console.warn(
          `[FlowBoard] Unable to sync "${key}" from another tab.`,
          error,
        );
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key]);

  return [storedValue, setValue];
}
