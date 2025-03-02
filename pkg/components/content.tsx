import React from "react";
import { JSX } from "react";

export interface SlotContentProps {
  overlay?: JSX.Element;
  children: JSX.Element | ((size: DOMRect) => JSX.Element);
}

export const SlotContent = (props: SlotContentProps) => {
  return typeof props.children;
};

export const slotContentType = React.createElement(SlotContent).type;
