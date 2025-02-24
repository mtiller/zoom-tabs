import { Sidebar } from "../lib";
import { SlotContent } from "../lib/components/content";

export interface OverlaysProps {
  aspectRatio: number;
  width: string;
  gap: number;
}

export const Overlays = (props: OverlaysProps) => {
  return (
    <div style={{ width: "100%" }}>
      <Sidebar
        width={props.width}
        aspectRatio={props.aspectRatio}
        gap={props.gap}
      >
        <SlotContent overlay={<h1>Overlay</h1>}>
          <span>Foo</span>
        </SlotContent>
        <div style={{ aspectRatio: props.aspectRatio, width: "100%" }}>Bar</div>
      </Sidebar>
    </div>
  );
};
