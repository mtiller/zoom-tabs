import React, { JSX, useEffect } from "react";
import { zoomContext, ZoomContextData } from "../contexts/zoom";
import { useSize, useSlot } from "../hooks";
import { slotContentType } from "./content";

export interface ZoomSlotProps {
  slot: string;
  children: JSX.Element | ((size: DOMRect) => JSX.Element);
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
  transition: "transform 0.5s, top 0.5s, left 0.5s, opacity 0.5s",
};

export const ZoomSlot = (props: ZoomSlotProps) => {
  const { controls, state } = React.useContext(props.context ?? zoomContext);
  const outletSize = state.outletSize;
  const data = useSlot(props.slot);
  const target = React.useRef<HTMLDivElement>(null);
  const size = useSize(target);

  useEffect(() => {
    controls.registerSlot(props.slot);
  }, [controls.registerSlot, props.slot]);
  useEffect(() => {
    controls.setSlotSize(props.slot, size);
  }, [controls.setSlotSize, props.slot, size]);
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
        opacity: 1,
      };

  const overlay =
    typeof props.children === "function"
      ? null
      : props.children.type.name === slotContentType.name
      ? props.children.props["overlay"]
      : null;

  return (
    <div
      ref={target}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        border: `1px solid ${props.slot}`,
        boxSizing: "border-box",
      }}
    >
      {/* Click target */}
      <div
        style={{
          ...maskCss,
          ...(state.active ? transitionCSS : {}),
          width: "100%",
          height: "100%",
          zIndex: 10,
        }}
        onClick={() => {
          if (expanded) {
            controls.setExpanded(props.slot, false);
          } else {
            controls.expandSlot(props.slot);
          }
        }}
      ></div>
      {/* Overlay */}
      <div
        style={{
          display: "flex",
          ...maskCss,
          ...(state.active ? transitionCSS : {}),
          width: size.width,
          height: size.height,
          justifyContent: "space-around",
          alignItems: "center",
          ...contentCss,
          ...overlayCss,
          zIndex: expanded ? -5 : 5,
        }}
      >
        {overlay}
      </div>

      {/* Content */}
      <div
        style={{
          ...maskCss,
          ...(state.active ? transitionCSS : {}),
          width: outletSize.width,
          height: outletSize.height,
          ...contentCss,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      >
        {renderChildren(props.children, outletSize)}
      </div>
    </div>
  );
};

function renderChildren(
  children: ZoomSlotProps["children"],
  outletSize: DOMRect
): JSX.Element {
  // This the child a function?  If so, pass size to it...
  if (typeof children === "function") {
    return children(outletSize);
  }
  // Is the child an instance of `SlotContent` and does it _that_ have a function
  // as a child?  If so, pass size to it...
  if (children.type.name === slotContentType.name) {
    if (typeof children.props["children"] === "function") {
      return children.props["children"](outletSize);
    }
    return children.props["children"];
  }

  // In all other cases, just
  return children;
}
