import React, { JSX, useEffect } from "react";
import { useSlot, zoomContext, ZoomContextData } from "./context";
import { useSize } from "../hooks/size";

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

  const maskCss: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    boxSizing: "border-box",
    transformOrigin: "top left",
    transition: "transform 0.5s, top 0.5s, left 0.5s, opacity 2s",
  };

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

  const overlayCss: React.CSSProperties = data?.expanded
    ? {
        opacity: 0,
      }
    : {
        opacity: 0.5,
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
          ...maskCss,
          width: "100%",
          height: "100%",
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
          ...maskCss,
          width: outletSize.width,
          height: outletSize.height,
          ...contentCss,
          ...overlayCss,
          backgroundColor: "rgba(255, 0, 255, 0.5)",
        }}
      >
        Overlay
      </div>

      {/* Content */}
      <div
        style={{
          ...maskCss,
          width: outletSize.width,
          height: outletSize.height,
          ...contentCss,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      >
        {props.children}
      </div>
    </div>
  );
};
