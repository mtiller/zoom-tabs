import React, { JSX, useEffect } from "react";
import { useSlot, zoomContext, ZoomContextData } from "./context";
import { useSize } from "./size";

export interface ZoomSlotProps {
  id: string;
  children: JSX.Element;
  context?: React.Context<ZoomContextData>;
}

export const ZoomSlot = (props: ZoomSlotProps) => {
  const { controls, state } = React.useContext(props.context ?? zoomContext);
  const outletSize = state.outletSize;
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
  const sx = size.width / outletSize.width;
  const sy = size.height / outletSize.height;
  const dx = outletSize.x - size.x;
  const dy = outletSize.y - size.y;

  const contentCss: React.CSSProperties = data?.expanded
    ? {
        transform: `scale(1.0, 1.0)`,
        top: dy,
        left: dx,
      }
    : {
        transform: `scale(${sx}, ${sy})`,
        top: 0,
        left: 0,
      };

  return (
    <div
      ref={target}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        border: `1px solid ${props.id}`,
        boxSizing: "border-box",
      }}
    >
      {/* Click target */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          zIndex: 10,
        }}
        onClick={() => {
          console.log("Click to expand ", props.id);
          controls?.expandSlot(props.id);
        }}
      >
        Click Target
      </div>
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        Overlay
      </div>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          width: outletSize.width,
          height: outletSize.height,
          transformOrigin: "top left",
          ...contentCss,
          transition: "transform 0.5s, top 0.5s, left 0.5s",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          boxSizing: "border-box",
        }}
      >
        {props.children}
      </div>
      <button onClick={() => controls?.expandSlot(props.id)}>Expand</button>
      {data && (
        <div>
          <p>Expanded: {`${data.expanded}`}</p>
          <pre>
            ({data.size.x}, {data.size.y}) {data.size.width}x{data.size.height}
          </pre>
        </div>
      )}
    </div>
  );
};
