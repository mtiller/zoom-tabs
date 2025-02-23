import React, { JSX } from "react";

export interface ZoomContextControls {
  registerSlot: (id: string) => void;
  expandSlot: (id: string) => void;
  setSlotSize: (id: string, rect: DOMRect) => void;
  setOutletSize: (rect: DOMRect) => void;
}

/**
 * This is the complete state associated with the ZoomContext (both per slot
 * data, outlet data and general preferences)
 **/
export interface ZoomContextState {
  slotData: Map<string, SlotData>;
  outlet: DOMRect;
}

/** This is information we store about each slot */
interface SlotData {
  expanded: boolean;
  rect: DOMRect;
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
    outlet: new DOMRect(),
  });
  const expandSlot = React.useCallback(
    (id: string) => {
      const slotData = state.slotData;
      const slot = slotData.get(id);
      if (slot && !slot.expanded) {
        slotData.forEach((value, key) => {
          slotData.set(key, { ...value, expanded: false });
        });
        console.log(`Setting slot ${id} to expanded`);
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
      if (slot && slot.rect !== rect) {
        console.log(`Setting slot ${id} to rect: `, rect);
        slotData.set(id, { ...slot, rect });
        setState({ ...state, slotData });
      }
    },
    [state, setState]
  );
  const setOutletSize = React.useCallback(
    (rect: DOMRect) => {
      if (state.outlet !== rect) {
        setState({ ...state, outlet: rect });
      }
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
      slotData.set(id, { expanded: false, rect: new DOMRect() });
      setState({ ...state, slotData });
    },
    [state, setState]
  );
  const controls: ZoomContextControls = {
    expandSlot,
    registerSlot,
    setSlotSize,
    setOutletSize,
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
    console.log("useSlot returns: ", ret);
    return ret;
  }, [state, state.slotData, id]);
}
