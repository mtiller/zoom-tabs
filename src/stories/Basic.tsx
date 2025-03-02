import { Sidebar, ZoomProvider } from "../../pkg";
import css from "./basic.css?inline";

export interface BasicProps {}

export const Basic = (_props: BasicProps) => {
  return (
    <div>
      <style>{css.toString()}</style>
      <ZoomProvider>
        <Sidebar aspectRatio={1.6}>
          <p>Sample content 1</p>
          <p>Sample content 2</p>
          <p>Sample content 3</p>
        </Sidebar>
      </ZoomProvider>
    </div>
  );
};
