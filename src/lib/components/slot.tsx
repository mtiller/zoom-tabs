import React, { JSX, useEffect, useLayoutEffect } from "react";
import { useSlot, zoomContext, ZoomContextData } from "./context";
import { useSize } from "../hooks/size";

export interface ZoomSlotProps {
  id: string;
  children: JSX.Element;
  context?: React.Context<ZoomContextData>;
}

const maskCss: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  boxSizing: "border-box",
  transformOrigin: "top left",
};

const transitionCSS: React.CSSProperties = {
  transition: "transform 0.5s, top 0.5s, left 0.5s, opacity 2s",
};

export const ZoomSlot = (props: ZoomSlotProps) => {
  const { controls, state } = React.useContext(props.context ?? zoomContext);
  const outletSize = state.outletSize;
  const data = useSlot(props.id);
  const target = React.useRef<HTMLDivElement>(null);
  const size = useSize(target);
  const [addTransition, setAddTransition] = React.useState(false);

  useEffect(() => {
    controls.registerSlot(props.id);
  }, [controls.registerSlot, props.id]);
  useEffect(() => {
    controls.setSlotSize(props.id, size);
  }, [controls.setSlotSize, props.id, size]);
  useLayoutEffect(() => {
    setTimeout(() => setAddTransition(true), 10);
  });
  console.log(`slot data for ${props.id}: `, data);
  const sx = size.width / outletSize.width;
  const sy = size.height / outletSize.height;
  const dx = outletSize.x - size.x;
  const dy = outletSize.y - size.y;

  const expanded = data?.expanded ?? false;

  const contentCss: React.CSSProperties = expanded
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

  const overlayCss: React.CSSProperties = expanded
    ? {
        transform: `scale(${1.0 / sx}, ${1.0 / sy})`,
        opacity: 0,
      }
    : {
        transform: `scale(1.0, 1.0)`,
        opacity: 0.5,
      };

  const overlay =
    props.children.type.name === "SlotContent"
      ? props.children.props["overlay"]
      : null;

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
          ...(addTransition ? transitionCSS : {}),
          width: "100%",
          height: "100%",
          zIndex: 10,
        }}
        onClick={() => {
          if (expanded) {
            controls.setExpanded(props.id, false);
          } else {
            controls.expandSlot(props.id);
          }
        }}
      ></div>
      {/* Overlay */}
      <div
        style={{
          display: "flex",
          ...maskCss,
          ...(addTransition ? transitionCSS : {}),
          width: size.width,
          height: size.height,
          justifyContent: "space-around",
          alignItems: "center",
          ...contentCss,
          ...overlayCss,
          backgroundColor: "rgba(255, 0, 255, 0.5)",
        }}
      >
        {overlay}
      </div>

      {/* Content */}
      <div
        style={{
          ...maskCss,
          ...(addTransition ? transitionCSS : {}),
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
