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
exports.ZoomSlot = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var zoom_1 = require("../contexts/zoom");
var hooks_1 = require("../hooks");
var content_1 = require("./content");
var maskCss = {
    position: "absolute",
    top: 0,
    left: 0,
    boxSizing: "border-box",
    transformOrigin: "top left",
};
var transitionCSS = {
    transition: "transform 0.5s, top 0.5s, left 0.5s, opacity 0.5s",
};
var ZoomSlot = function (props) {
    var _a, _b;
    var _c = react_1.default.useContext((_a = props.context) !== null && _a !== void 0 ? _a : zoom_1.zoomContext), controls = _c.controls, state = _c.state;
    var outletSize = state.outletSize;
    var data = (0, hooks_1.useSlot)(props.slot);
    var target = react_1.default.useRef(null);
    var size = (0, hooks_1.useSize)(target);
    (0, react_1.useEffect)(function () {
        controls.registerSlot(props.slot);
    }, [controls.registerSlot, props.slot]);
    (0, react_1.useEffect)(function () {
        controls.setSlotSize(props.slot, size);
    }, [controls.setSlotSize, props.slot, size]);
    var sx = size.width / outletSize.width;
    var sy = size.height / outletSize.height;
    var dx = outletSize.x - size.x;
    var dy = outletSize.y - size.y;
    var expanded = (_b = data === null || data === void 0 ? void 0 : data.expanded) !== null && _b !== void 0 ? _b : false;
    var contentCss = expanded
        ? {
            transform: "scale(1.0, 1.0)",
            top: dy,
            left: dx,
        }
        : {
            transform: "scale(".concat(sx, ", ").concat(sy, ")"),
            top: 0,
            left: 0,
        };
    var overlayCss = expanded
        ? {
            transform: "scale(".concat(1.0 / sx, ", ").concat(1.0 / sy, ")"),
            opacity: 0,
        }
        : {
            transform: "scale(1.0, 1.0)",
            opacity: 1,
        };
    var overlay = typeof props.children === "function"
        ? null
        : props.children.type.name === content_1.slotContentType.name
            ? props.children.props["overlay"]
            : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: target, style: {
            position: "relative",
            width: "100%",
            height: "100%",
            border: "1px solid ".concat(props.slot),
            boxSizing: "border-box",
        }, children: [(0, jsx_runtime_1.jsx)("div", { style: __assign(__assign(__assign({}, maskCss), (state.active ? transitionCSS : {})), { width: "100%", height: "100%", zIndex: 10 }), onClick: function () {
                    if (expanded) {
                        controls.setExpanded(props.slot, false);
                    }
                    else {
                        controls.expandSlot(props.slot);
                    }
                } }), (0, jsx_runtime_1.jsx)("div", { style: __assign(__assign(__assign(__assign(__assign(__assign({ display: "flex" }, maskCss), (state.active ? transitionCSS : {})), { width: size.width, height: size.height, justifyContent: "space-around", alignItems: "center" }), contentCss), overlayCss), { zIndex: expanded ? -5 : 5 }), children: overlay }), (0, jsx_runtime_1.jsx)("div", { style: __assign(__assign(__assign(__assign(__assign({}, maskCss), (state.active ? transitionCSS : {})), { width: outletSize.width, height: outletSize.height }), contentCss), { backgroundColor: "rgba(255, 255, 255, 0.5)" }), children: renderChildren(props.children, outletSize) })] }));
};
exports.ZoomSlot = ZoomSlot;
function renderChildren(children, outletSize) {
    // This the child a function?  If so, pass size to it...
    if (typeof children === "function") {
        return children(outletSize);
    }
    // Is the child an instance of `SlotContent` and does it _that_ have a function
    // as a child?  If so, pass size to it...
    if (children.type.name === content_1.slotContentType.name) {
        if (typeof children.props["children"] === "function") {
            return children.props["children"](outletSize);
        }
        return children.props["children"];
    }
    // In all other cases, just
    return children;
}
