import React from "react";
import {
  ZoomContextControls,
  ZoomContextState,
  zoomContext,
} from "../contexts";

export interface ZoomProviderProps {
  initiallyOpen?: string;
  children: JSX.Element | JSX.Element[] | string;
}
export const ZoomProvider = (props: ZoomProviderProps) => {
  const [state, setState] = React.useState<ZoomContextState>({
    slotData: new Map(),
    outlet: null,
    outletSize: new DOMRect(),
    active: false,
  });
  const setExpanded = React.useCallback(
    (id: string, expanded: boolean) => {
      const slotData = state.slotData;
      const slot = slotData.get(id);
      if (slot && slot.expanded) {
        slotData.set(id, { ...slot, expanded: expanded });
        setState({ ...state, slotData });
      }
    },
    [state, setState]
  );
  const expandSlot = React.useCallback(
    (id: string) => {
      const slotData = state.slotData;
      const slot = slotData.get(id);
      if (slot && !slot.expanded) {
        slotData.forEach((value, key) => {
          slotData.set(key, { ...value, expanded: false });
        });
        slotData.set(id, { ...slot, expanded: true });
        setState({ ...state, slotData, active: true });
      }
    },
    [state, setState]
  );
  const setSlotSize = React.useCallback(
    (id: string, rect: DOMRect) => {
      const slotData = state.slotData;
      const slot = slotData.get(id);
      if (slot && slot.size !== rect) {
        slotData.set(id, { ...slot, size: rect });
        setState({ ...state, slotData });
      }
    },
    [state, setState]
  );
  const setOutletSize = React.useCallback(
    (rect: DOMRect) => {
      if (state.outletSize !== rect) {
        setState({ ...state, outletSize: rect });
      }
    },
    [state, setState]
  );
  const setOutlet = React.useCallback(
    (ref: React.RefObject<HTMLDivElement>) => {
      setState({ ...state, outlet: ref });
    },
    [state, setState]
  );

  const registerSlot = React.useCallback(
    (id: string) => {
      const slotData = state.slotData;
      const slot = slotData.get(id);
      if (slot !== undefined) {
        return;
      }
      slotData.set(id, {
        expanded: id === props.initiallyOpen,
        target: null,
        size: new DOMRect(),
      });
      setState({ ...state, slotData });
    },
    [state, setState]
  );
  const controls: ZoomContextControls = {
    expandSlot,
    setExpanded,
    registerSlot,
    setSlotSize,
    setOutletSize,
    setOutlet,
  };
  return (
    <zoomContext.Provider value={{ state, controls }}>
      {props.children}
    </zoomContext.Provider>
  );
};
