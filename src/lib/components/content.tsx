import { JSX } from "react";

export interface SlotContentProps {
  overlay?: JSX.Element;
  children: JSX.Element;
}

export const SlotContent = (props: SlotContentProps) => {
  return props.children;
};
