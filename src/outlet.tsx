export interface ZoomOutletProps {}

export const ZoomOutlet = (props: ZoomOutletProps) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "1px solid blue",
        boxSizing: "border-box",
      }}
    >
      Outlet
    </div>
  );
};
