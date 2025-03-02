import React from "react";

export interface ZoomContextControls {
  registerSlot: (id: string) => void;
  expandSlot: (id: string) => void;
  setExpanded: (id: string, expanded: boolean) => void;
  setSlotSize: (id: string, rect: DOMRect) => void;
  setOutletSize: (rect: DOMRect) => void;
  setOutlet: (ref: React.RefObject<HTMLDivElement>) => void;
}

/**
 * This is the complete state associated with the ZoomContext (both per slot
 * data, outlet data and general preferences)
 **/
export interface ZoomContextState {
  /** Information about individual slots */
  slotData: Map<string, SlotData>;
  /** A `ref` to the outlet */
  outlet: React.RefObject<HTMLDivElement> | null;
  /** The size of the outlet */
  outletSize: DOMRect;
  /** Whether animations are active */
  active: boolean;
}

/** This is information we store about each slot */
interface SlotData {
  expanded: boolean;
  target: React.RefObject<HTMLDivElement> | null;
  size: DOMRect;
}

export interface ZoomContextData {
  controls: ZoomContextControls;
  state: ZoomContextState;
}

export const zoomContext = React.createContext<ZoomContextData>(
  undefined as any as ZoomContextData
);
