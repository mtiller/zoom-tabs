import React from "react";
import useResizeObserver from "@react-hook/resize-observer";

export function useSize<T extends HTMLElement>(
  target: React.RefObject<T | null>
): DOMRect {
  const [size, setSize] = React.useState<DOMRect>(new DOMRect());

  /** Get the size on initial layout */
  React.useLayoutEffect(() => {
    setSize(target?.current?.getBoundingClientRect() ?? new DOMRect());
  }, [target, target.current]);

  /** ...and again whenever things resize. */
  useResizeObserver(target, (entry) => {
    setSize(entry.target.getBoundingClientRect());
  });
  return size;
}
