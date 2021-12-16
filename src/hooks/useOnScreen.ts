import { RefObject, useRef, useState, useEffect } from 'react'

export default function useOnScreen(ref: RefObject<HTMLElement>): boolean {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting)
    );
  }, []);

  useEffect(() => {
    if (!ref || !ref.current) return;
    if(observerRef && observerRef.current) observerRef.current.observe(ref.current);

    return () => {
      if(observerRef && observerRef.current) observerRef.current.disconnect();
    };
  }, [ref]);

  return isOnScreen;
};
