import React, { JSX, useEffect } from "react";
import { useSlot, zoomContext, ZoomContextData } from "./context";

export interface ZoomSlotProps {
  id: string;
  children: JSX.Element;
  context?: React.Context<ZoomContextData>;
}

export const ZoomSlot = (props: ZoomSlotProps) => {
  const { controls } = React.useContext(props.context ?? zoomContext);
  const data = useSlot(props.id);

  const observeRef = React.useCallback(
    (target: HTMLDivElement) => {
      // the callback ref fires often without a target, so only process when we have a target
      if (!target) {
        return;
      }

      console.log("Mounted ZoomSlot with id ", props.id);
    },
    [props.id]
  );

  useEffect(() => {
    controls.registerSlot(props.id);
  });
  console.log(`slot data for ${props.id}: `, data);
  return (
    <div
      ref={observeRef}
      style={{
        width: "100%",
        height: "100%",
        border: `1px solid ${props.id}`,
        boxSizing: "border-box",
      }}
    >
      <button onClick={() => controls?.expandSlot(props.id)}>Expand</button>
      {data && <p>Expanded: {data.expanded}</p>}
      {props.children}
    </div>
  );
};
