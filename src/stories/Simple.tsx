import { Sidebar } from "../lib";

export const SimpleLayouts = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Sidebar width="20%" aspectRatio={1.6}>
        <span>Foo</span>
        <span>Bar</span>
      </Sidebar>
    </div>
  );
};
