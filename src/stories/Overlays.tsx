import { Sidebar, ZoomProvider, SlotContent } from "../../lib";
import { Vega } from "react-vega";
import { barChartData, barChartSpec } from "./specs/bar-chart";
import "./vega.css";
import "./Overlay.css";
import { treeMapSpec } from "./specs/treemap";
import { parallelSpec } from "./specs/parallel";
import React from "react";
import { mapSpec } from "./specs/map";

export interface OverlaysProps {
  aspectRatio: number;
  width: string;
  gap: number;
}

export const Overlays = (props: OverlaysProps) => {
  const [actions, setActions] = React.useState(false);
  // This is needed to get the vega stuff to re-read its data.
  React.useLayoutEffect(() => {
    setTimeout(() => setActions(true), 50);
  });
  return (
    <ZoomProvider>
      <div>
        <div style={{ textAlign: "center" }}>
          <h1>Organizing Data</h1>
          <p style={{ margin: "auto", width: "50em" }}>
            In this example, each slot's content is still visible when it is
            minimized. However, a textual description of each slot is
            super-imposed over the thumbprint to provide more context to the end
            user.
          </p>
        </div>
        <div style={{ width: "100%" }}>
          <Sidebar
            width={props.width}
            aspectRatio={props.aspectRatio}
            gap={props.gap}
          >
            <SlotContent overlay={<h1>Bar Chart</h1>}>
              {(size) => (
                <Vega
                  width={size.width * 0.95}
                  height={size.height * 0.9}
                  renderer="svg"
                  spec={barChartSpec as any}
                  data={barChartData}
                  actions={actions}
                />
              )}
            </SlotContent>
            <SlotContent overlay={<h1>Scatter Plot</h1>}>
              {(size) => (
                <Vega
                  width={size.width * 0.95}
                  height={size.height * 0.9}
                  spec={treeMapSpec as any}
                  actions={actions}
                />
              )}
            </SlotContent>
            <SlotContent overlay={<h1>Heatmap</h1>}>
              {(size) => (
                <Vega
                  width={size.width * 0.95}
                  height={size.height * 0.9}
                  spec={parallelSpec as any}
                  actions={actions}
                />
              )}
            </SlotContent>
            <SlotContent overlay={<h1>Sankey Diagram</h1>}>
              {(size) => (
                <Vega
                  width={size.width * 0.95}
                  height={size.height * 0.9}
                  spec={mapSpec as any}
                  actions={actions}
                />
              )}
            </SlotContent>
          </Sidebar>
        </div>
      </div>
    </ZoomProvider>
  );
};
