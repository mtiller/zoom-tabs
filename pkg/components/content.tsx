import React from "react";
import { JSX } from "react";

export interface SlotContentProps {
  /** Allows an overlay element to be provided */
  overlay?: JSX.Element;
  /**
   * Children can be either a JSX.Element or a function that, for a given size
   * returns a JSX.Element.
   */
  children: JSX.Element | ((size: DOMRect) => JSX.Element);
}

export const SlotContent = (_props: SlotContentProps) => {
  return <div></div>;
};

export const slotContentType = React.createElement(SlotContent).type;
