import React from "react";
import { useSize } from "../hooks/size";
import { zoomContext, ZoomContextData } from "../contexts/zoom";

export interface ZoomOutletProps {
  /** This allows the outlet to override the context to be used */
  context?: React.Context<ZoomContextData>;
}

/**
 * This component is used to indicate the space that the thumbnail should expand
 * into.
 */
export const ZoomOutlet = (props: ZoomOutletProps) => {
  // Get the context
  const { controls } = React.useContext(props.context ?? zoomContext);

  // Create a ref for the outlet
  const target = React.useRef<HTMLDivElement>(null);
  // Determine the size of the outlet
  const size = useSize(target);

  // Anytime the size of the outlet changes, let the controller know
  React.useEffect(() => {
    controls.setOutletSize(size);
  }, [controls.setOutletSize, size.x, size.y, size.width, size.height]);

  return (
    <div
      ref={target}
      style={{
        width: "100%",
        height: "100%",
      }}
    ></div>
  );
};
