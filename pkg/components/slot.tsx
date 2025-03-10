import React, { useEffect } from "react";
import { zoomContext, ZoomContextData } from "../contexts/zoom";
import { useSize, useSlot } from "../hooks";
import { isSlotContent } from "./content";

export interface ZoomSlotProps {
  // The slot id to associate with the ZoomSlot
  slot: string;
  children: React.ReactNode | ((size: DOMRect) => React.ReactNode);
  // An alternative context in case we cannot use an enclosing provider
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

  // See if there is an overlay defined for this slot
  const overlay = extractOverlay(props.children);

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
        className="zoom-slot-click"
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
        className="zoom-slot-overlay"
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
        className="zoom-slot-content"
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

function extractOverlay(children: ZoomSlotProps["children"]) {
  if (typeof children === "function") {
    return null;
  }
  if (isSlotContent(children)) {
    return children.props.overlay;
  }
  return null;
}

function renderChildren(
  children: ZoomSlotProps["children"],
  outletSize: DOMRect
): React.ReactNode {
  // This the child a function?  If so, pass size to it...
  if (typeof children === "function") {
    return children(outletSize);
  }
  // Is the child an instance of `SlotContent`?
  if (isSlotContent(children)) {
    const schildren = children.props.children;
    // Is it a function, if so call it with the outlet size
    if (typeof schildren === "function") {
      return schildren(outletSize);
    }
    // Otherwise just return it
    return schildren;
  }

  // In all other cases, just render the children
  return children;
}
