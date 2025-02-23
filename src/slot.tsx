import React, { JSX, useEffect } from "react";
import { useSlot, zoomContext, ZoomContextData } from "./context";
import { useSize } from "./size";

export interface ZoomSlotProps {
  id: string;
  children: JSX.Element;
  context?: React.Context<ZoomContextData>;
}

export const ZoomSlot = (props: ZoomSlotProps) => {
  const { controls } = React.useContext(props.context ?? zoomContext);
  const data = useSlot(props.id);
  const target = React.useRef<HTMLDivElement>(null);
  const size = useSize(target);

  useEffect(() => {
    controls.registerSlot(props.id);
  }, [controls.registerSlot, props.id]);
  useEffect(() => {
    controls.setSlotSize(props.id, size);
  }, [controls.setSlotSize, props.id, size]);
  console.log(`slot data for ${props.id}: `, data);
  return (
    <div
      ref={target}
      style={{
        width: "100%",
        height: "100%",
        border: `1px solid ${props.id}`,
        boxSizing: "border-box",
      }}
    >
      {/* <div
        style={{
          float: "left",
          position: "fixed",
          top: size.top,
          left: size.left,
          width: 500,
          height: 500,
          transform: "scale(50%, 50%, 0, 0)",
          transformOrigin: "top left",
          transition: "transform 2s",
          border: "1px solid white",
          boxSizing: "border-box",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      >
        Static
      </div> */}
      <button onClick={() => controls?.expandSlot(props.id)}>Expand</button>
      {data && (
        <div>
          <p>Expanded: {`${data.expanded}`}</p>
          <pre>
            ({data.rect.x}, {data.rect.y}) {data.rect.width}x{data.rect.height}
          </pre>
        </div>
      )}
      {props.children}
    </div>
  );
};
