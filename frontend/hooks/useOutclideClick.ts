import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * A hook to detect clicks outside of a given element and trigger a callback function.
 *
 * @param {RefObject<HTMLElement> | HTMLElement | null} ref - The reference to the HTML element.
 * @param {(event: MouseEvent | TouchEvent) => void} callback - The callback function to be called on an outside click.
 * @param {string} [excludeClassName] - A class name to exclude triggering the outside click event.
 *
 * @example
 * const ref = useRef<HTMLElement | null>(null);
 * useOutsideClick(ref, () => console.log('Outside clicked!'));
 */
export const useOutsideClick = (
  ref: RefObject<HTMLElement> | HTMLElement | null,
  callback: (event: MouseEvent | TouchEvent) => void,
  excludeClassName?: string,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref) return

      const refObj = ref instanceof HTMLElement ? ref : ref.current

      if (
        !refObj ||
        refObj.contains(event.target as Node) ||
        (excludeClassName &&
          ((event.target as Element).classList.contains(excludeClassName) ||
            (event.target as Element).closest(`.${excludeClassName}`)))
      ) {
        return
      }

      callback(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, callback, excludeClassName]) // Added `excludeClassName` to the dependency array
}
