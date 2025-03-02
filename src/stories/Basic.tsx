import { Sidebar, ZoomProvider } from "../../pkg";

export interface BasicProps {}

export const Basic = (_props: BasicProps) => {
  return (
    <ZoomProvider>
      <Sidebar aspectRatio={1.6}>
        <p>Sample content 1</p>
        <p>Sample content 2</p>
        <p>Sample content 3</p>
      </Sidebar>
    </ZoomProvider>
  );
};
