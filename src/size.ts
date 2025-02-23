import React from "react";
import useResizeObserver from "@react-hook/resize-observer";

export function useSize<T extends HTMLElement>(
  target: React.RefObject<T | null>
): DOMRect {
  const [size, setSize] = React.useState<DOMRect>(new DOMRect());

  React.useLayoutEffect(() => {
    const rect =
      target?.current === null
        ? new DOMRect()
        : target.current.getBoundingClientRect();
    setSize(rect);
  }, [target, target.current]);

  // Where the magic happens
  useResizeObserver(target, (entry) => {
    const rect = entry.target.getBoundingClientRect();
    setSize(rect);
  });
  return size;
}
