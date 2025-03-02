import React from "react";

export interface SlotContentProps {
  /** Allows an overlay element to be provided */
  overlay?: React.ReactNode;
  /**
   * Children can be either a ReactNode or a function that, for a given size
   * returns a React.Node.
   */
  children: React.ReactNode | ((size: DOMRect) => React.ReactNode);
}

export const SlotContent = (_props: SlotContentProps) => {
  return <div></div>;
};

const slotContentType = React.createElement(SlotContent).type;

export function isSlotContent(
  elem: React.ReactNode
): elem is React.ReactElement<SlotContentProps> {
  return (
    React.isValidElement(elem) &&
    typeof elem.type !== "string" &&
    elem.type.name === slotContentType.name
  );
}
