import React, { JSX } from "react";

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
  slotData: Map<string, SlotData>;
  outlet: React.RefObject<HTMLDivElement> | null;
  outletSize: DOMRect;
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

export const ZoomProvider = (props: {
  children: JSX.Element | JSX.Element[] | string;
}) => {
  const [state, setState] = React.useState<ZoomContextState>({
    slotData: new Map(),
    outlet: null,
    outletSize: new DOMRect(),
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
        setState({ ...state, slotData });
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
      slotData.set(id, { expanded: false, target: null, size: new DOMRect() });
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

export function useSlot(id: string) {
  const { controls, state } = React.useContext(zoomContext);
  React.useEffect(() => {
    controls.registerSlot(id);
  }, [controls, id]);
  return React.useMemo(() => {
    const ret = state.slotData.get(id);
    return ret;
  }, [state, state.slotData, id]);
}
