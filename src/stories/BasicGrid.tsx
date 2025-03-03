import { ZoomOutlet, ZoomProvider, ZoomSlot } from "../../pkg";
import css from "./basic.css?inline";

export interface BasicGridProps {}

export const BasicGrid = (props: BasicGridProps) => {
  return (
    <div>
      <style>{css.toString()}</style>

      <ZoomProvider>
        <div className="parent">
          <div className="div1">
            <ZoomSlot slot="ul">Upper Left</ZoomSlot>
          </div>
          <div className="div2">
            <ZoomSlot slot="lr">Lower Right</ZoomSlot>
          </div>
          <div className="div3">
            <ZoomSlot slot="ll">Lower Left</ZoomSlot>
          </div>
          <div className="div4">
            <ZoomSlot slot="ur">Upper Right</ZoomSlot>
          </div>
          <div className="div5">
            <ZoomOutlet />
          </div>
        </div>
      </ZoomProvider>
    </div>
  );
};
