import React from "react";
import { useSize } from "../hooks/size";
import { zoomContext, ZoomContextData } from "../contexts/zoom";

export interface ZoomOutletProps {
  context?: React.Context<ZoomContextData>;
}

export const ZoomOutlet = (props: ZoomOutletProps) => {
  const { controls } = React.useContext(props.context ?? zoomContext);

  const target = React.useRef<HTMLDivElement>(null);
  const size = useSize(target);

  React.useEffect(() => {
    controls.setOutletSize(size);
  }, [controls.setOutletSize, size]);

  return (
    <div
      ref={target}
      style={{
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
      }}
    ></div>
  );
};
