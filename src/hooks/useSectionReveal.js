import { useRef } from 'react';
import { revealSection, useGSAP } from '../animations/gsapConfig.js';

/** Attach the shared data-attribute reveals to a section. Returns the scope ref. */
export default function useSectionReveal(extra) {
  const ref = useRef(null);
  useGSAP(
    () => {
      const mm = revealSection(ref.current);
      const cleanup = extra?.(ref.current);
      return () => {
        mm.revert();
        if (typeof cleanup === 'function') cleanup();
      };
    },
    { scope: ref },
  );
  return ref;
}
