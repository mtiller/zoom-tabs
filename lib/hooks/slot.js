"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSlot = useSlot;
var react_1 = require("react");
var contexts_1 = require("../contexts");
function useSlot(id) {
    var _a = react_1.default.useContext(contexts_1.zoomContext), controls = _a.controls, state = _a.state;
    react_1.default.useEffect(function () {
        controls.registerSlot(id);
    }, [controls, id]);
    return react_1.default.useMemo(function () {
        var ret = state.slotData.get(id);
        return ret;
    }, [state, state.slotData, id]);
}
