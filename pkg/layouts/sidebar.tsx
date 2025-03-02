import { ZoomOutlet, ZoomSlot } from "../components";

export interface SidebarProps {
  /** This is the ratio of width to height for each component */
  aspectRatio: number;
  /** This is the minimum number of slots to be rendered */
  minSlots?: number;
  /** The gap between elements */
  gap?: number;
  /** Which side the thumbnails should be on */
  side?: "left" | "right" | "top" | "bottom";
  children: React.ReactElement[];
}

export const Sidebar = ({
  children,
  aspectRatio,
  side,
  gap,
  minSlots,
}: SidebarProps) => {
  side = side ?? "left";
  const vertical = side === "left" || side === "right";
  const overallDirection = vertical
    ? side === "left"
      ? "row"
      : "row-reverse"
    : side === "top"
    ? "column"
    : "column-reverse";
  const sidebarDirection = vertical ? "column" : "row";

  let nslots = children.length;
  if (minSlots && minSlots > nslots) {
    nslots = minSlots;
  }

  const sidebarCSS: React.CSSProperties = vertical
    ? {
        display: "flex",
        gap: gap,
        width: `${100 / nslots}%`,
        flexDirection: sidebarDirection,
      }
    : {
        display: "flex",
        gap: gap,
        flexDirection: sidebarDirection,
      };

  return (
    <div>
      {/* Overall <div> */}
      <div
        style={{
          display: "flex",
          flexDirection: overallDirection,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Sidebar <div> */}
        <div style={sidebarCSS}>
          {children.map((child, index) => (
            <div
              key={`slot${index}`}
              style={{
                aspectRatio: aspectRatio,
                width: vertical ? "100%" : `${100 / nslots}%`,
              }}
            >
              <ZoomSlot slot={`slot${index}`}>{child}</ZoomSlot>
            </div>
          ))}
        </div>
        {/* Outlet <div> */}
        <div
          style={{
            width: "100%",
            paddingLeft: gap,
            aspectRatio: aspectRatio,
          }}
        >
          <ZoomOutlet />
        </div>
      </div>
    </div>
  );
};
