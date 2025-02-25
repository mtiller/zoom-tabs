import { Sidebar } from "../lib";
import { SlotContent } from "../lib/components/content";
import { Vega, VegaLite } from "react-vega";
import { barChartData, barChartSpec } from "./specs";
import "./vega.css";

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
          {(size) => (
            <Vega
              width={size.width * 0.95}
              height={size.height * 0.9}
              renderer="svg"
              spec={barChartSpec as any}
              data={barChartData}
              actions={false}
            />
          )}
        </SlotContent>
        <SlotContent overlay={<h1>Overlay</h1>}>
          {(size) => (
            <Vega
              width={size.width * 0.95}
              height={size.height * 0.9}
              spec={barChartSpec as any}
              data={barChartData}
              actions={false}
            />
          )}
        </SlotContent>
        <SlotContent overlay={<h1>Overlay</h1>}>
          {(size) => (
            <Vega
              width={size.width * 0.95}
              height={size.height * 0.9}
              spec={barChartSpec as any}
              data={barChartData}
              actions={false}
            />
          )}
        </SlotContent>
        <SlotContent overlay={<h1>Overlay</h1>}>
          {(size) => (
            <Vega
              width={size.width * 0.95}
              height={size.height * 0.9}
              spec={barChartSpec as any}
              data={barChartData}
              actions={false}
            />
          )}
        </SlotContent>
      </Sidebar>
    </div>
  );
};
