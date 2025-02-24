import { JSX } from "react";
import { ZoomOutlet, ZoomProvider, ZoomSlot } from "../components";

export interface SidebarProps {
  /** This is the ratio of width to height */
  aspectRatio: number;
  width: string;
  gap?: number;
  children: JSX.Element[];
}

export const Sidebar = ({
  children,
  aspectRatio,
  width,
  gap,
}: SidebarProps) => {
  return (
    <ZoomProvider>
      {/* Overall <div> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Sidebar <div> */}
        <div
          style={{
            display: "flex",
            gap: gap,
            width: width,
            flexDirection: "column",
            boxSizing: "border-box",
          }}
        >
          {children.map((child, index) => (
            <div
              key={`slot${index}`}
              style={{
                aspectRatio: aspectRatio,
                boxSizing: "border-box",
              }}
            >
              <ZoomSlot id={`slot${index}`}>{child}</ZoomSlot>
            </div>
          ))}
        </div>
        {/* Outlet <div> */}
        <div
          style={{
            width: "100%",
            paddingLeft: gap,
            aspectRatio: aspectRatio,
            boxSizing: "border-box",
          }}
        >
          <ZoomOutlet />
        </div>
      </div>
    </ZoomProvider>
  );
};
