import { useEffect, type RefObject } from 'react';

/**
 * Generic hook to handle outside click events.
 * It will call the provided callback function when a click occurs outside the specified ref.
 * @param ref 
 * @param callback 
 * @param active 
 */
export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void,
  active: boolean = true
) {
  useEffect(() => {
    if (!active) return;

    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback, active]);
}
