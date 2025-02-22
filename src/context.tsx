import React, { JSX } from "react";

export interface ZoomContextControls {
  registerSlot: (id: string) => void;
  expandSlot: (id: string) => void;
}

/**
 * This is the complete state associated with the ZoomContext (both per slot
 * data, outlet data and general preferences)
 **/
export interface ZoomContextState {
  slotData: Map<string, SlotData>;
}

/** This is information we store about each slot */
interface SlotData {
  expanded: boolean;
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
        slotData.set(id, { expanded: true });
        setState({ slotData });
      }
    },
    [state, setState]
  );
  const registerSlot = React.useCallback(
    (id: string) => {
      const slotData = state.slotData;
      if (state.slotData.has(id)) {
        return;
      }
      slotData.set(id, { expanded: false });
      setState({ slotData });
    },
    [state, setState]
  );
  const controls: ZoomContextControls = {
    expandSlot,
    registerSlot,
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
  return React.useMemo(
    () => state.slotData.get(id),
    [state, state.slotData, id]
  );
}
