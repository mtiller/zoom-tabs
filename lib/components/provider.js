"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var contexts_1 = require("../contexts");
var ZoomProvider = function (props) {
    var _a = react_1.default.useState({
        slotData: new Map(),
        outlet: null,
        outletSize: new DOMRect(),
        active: false,
    }), state = _a[0], setState = _a[1];
    var setExpanded = react_1.default.useCallback(function (id, expanded) {
        var slotData = state.slotData;
        var slot = slotData.get(id);
        if (slot && slot.expanded) {
            slotData.set(id, __assign(__assign({}, slot), { expanded: expanded }));
            setState(__assign(__assign({}, state), { slotData: slotData }));
        }
    }, [state, setState]);
    var expandSlot = react_1.default.useCallback(function (id) {
        var slotData = state.slotData;
        var slot = slotData.get(id);
        if (slot && !slot.expanded) {
            slotData.forEach(function (value, key) {
                slotData.set(key, __assign(__assign({}, value), { expanded: false }));
            });
            slotData.set(id, __assign(__assign({}, slot), { expanded: true }));
            setState(__assign(__assign({}, state), { slotData: slotData, active: true }));
        }
    }, [state, setState]);
    var setSlotSize = react_1.default.useCallback(function (id, rect) {
        var slotData = state.slotData;
        var slot = slotData.get(id);
        if (slot && slot.size !== rect) {
            slotData.set(id, __assign(__assign({}, slot), { size: rect }));
            setState(__assign(__assign({}, state), { slotData: slotData }));
        }
    }, [state, setState]);
    var setOutletSize = react_1.default.useCallback(function (rect) {
        if (state.outletSize !== rect) {
            setState(__assign(__assign({}, state), { outletSize: rect }));
        }
    }, [state, setState]);
    var setOutlet = react_1.default.useCallback(function (ref) {
        setState(__assign(__assign({}, state), { outlet: ref }));
    }, [state, setState]);
    var registerSlot = react_1.default.useCallback(function (id) {
        var slotData = state.slotData;
        var slot = slotData.get(id);
        if (slot !== undefined) {
            return;
        }
        slotData.set(id, {
            expanded: id === props.initiallyOpen,
            target: null,
            size: new DOMRect(),
        });
        setState(__assign(__assign({}, state), { slotData: slotData }));
    }, [state, setState]);
    var controls = {
        expandSlot: expandSlot,
        setExpanded: setExpanded,
        registerSlot: registerSlot,
        setSlotSize: setSlotSize,
        setOutletSize: setOutletSize,
        setOutlet: setOutlet,
    };
    return ((0, jsx_runtime_1.jsx)(contexts_1.zoomContext.Provider, { value: { state: state, controls: controls }, children: props.children }));
};
exports.ZoomProvider = ZoomProvider;
