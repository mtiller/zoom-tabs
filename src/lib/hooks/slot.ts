import React from "react";
import { zoomContext } from "../contexts";

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
