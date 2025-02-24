import { JSX } from "react";
import { ZoomOutlet, ZoomProvider, ZoomSlot } from "../components";

export interface SidebarProps {
  /** This is the ratio of width to height */
  aspectRatio: number;
  width: string;
  children: JSX.Element[];
}

export const Sidebar = ({ children, aspectRatio, width }: SidebarProps) => {
  return (
    <ZoomProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
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
        <div
          style={{
            width: "100%",
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
