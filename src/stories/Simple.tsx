import { Sidebar } from "../lib";

export interface SimpleLayoutsProps {
  aspectRatio: number;
  width: string;
  gap: number;
}

export const SimpleLayouts = (props: SimpleLayoutsProps) => {
  return (
    <div style={{ width: "100%" }}>
      <Sidebar
        width={props.width}
        aspectRatio={props.aspectRatio}
        gap={props.gap}
      >
        <span>Foo</span>
        <div style={{ aspectRatio: props.aspectRatio, width: "100%" }}>Bar</div>
      </Sidebar>
    </div>
  );
};
