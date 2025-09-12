import { useState, useEffect, useRef, useCallback } from 'react';

import { IUseDebounceOptions } from '@interface/common';

export function useDebounce<T>(value: T, options: IUseDebounceOptions = {}): [T, () => void] {
  const { delay = 300, immediate = false } = options;
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const timer = useRef<NodeJS.Timeout | null>(null);
  const firstCall = useRef(true);

  // Cancel any pending debounce
  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  useEffect(() => {
    if (immediate && firstCall.current) {
      setDebouncedValue(value);
      firstCall.current = false;
      return;
    }

    cancel(); // clear previous timer

    timer.current = setTimeout(() => {
      setDebouncedValue(value);
      timer.current = null;
    }, delay);

    return () => cancel(); // cleanup on unmount or value change
  }, [value, delay, immediate, cancel]);

  return [debouncedValue, cancel];
}
