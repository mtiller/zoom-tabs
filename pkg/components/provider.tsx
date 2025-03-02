import React from "react";
import {
  ZoomContextControls,
  ZoomContextState,
  zoomContext,
} from "../contexts";

/** Properties for a ZoomProvider */
export interface ZoomProviderProps {
  /** Indicates which slot, if any, is initially open */
  initiallyOpen?: string;
  /** The children of the ZoomProvider */
  children: React.ReactNode;
}

/**
 * The goal of the ZoomProvider is to provide context to the children.  That
 * context is largely the state of a controller that provides information to
 * each slot about how to render itself.
 *
 * @param props
 * @returns
 */
export const ZoomProvider = (props: ZoomProviderProps) => {
  // Initialize the state of the controller
  const [state, setState] = React.useState<ZoomContextState>({
    slotData: new Map(),
    outlet: null,
    outletSize: new DOMRect(),
    active: false,
  });

  // Register a whole series of callbacks that can be called to register
  // slots or to manipulate the state of the controller.

  // Given a slot id, this sets the expanded state for that slot.
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

  // Expand a given slot (and close all others)
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

  // Record the size of a given slot.  This is called whenever the size of that
  // slot changes.
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

  // Record the size of the outlet component.  This is called whenever the size
  // of the outlet changes.
  const setOutletSize = React.useCallback(
    (rect: DOMRect) => {
      if (state.outletSize !== rect) {
        setState({ ...state, outletSize: rect });
      }
    },
    [state, setState]
  );

  // Record the RefObject for the outlet (not sure we need this for anything?!?)
  const setOutlet = React.useCallback(
    (ref: React.RefObject<HTMLDivElement>) => {
      setState({ ...state, outlet: ref });
    },
    [state, setState]
  );

  // Register a new slot with the given name.
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

  // Construct the controls
  const controls: ZoomContextControls = {
    expandSlot,
    setExpanded,
    registerSlot,
    setSlotSize,
    setOutletSize,
    setOutlet,
  };
  // Instantiate a ZoomContext and inject the state and controls
  return (
    <zoomContext.Provider value={{ state, controls }}>
      {props.children}
    </zoomContext.Provider>
  );
};
