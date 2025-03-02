"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSize = useSize;
var react_1 = require("react");
var resize_observer_1 = require("@react-hook/resize-observer");
function useSize(target) {
    var _a = react_1.default.useState(new DOMRect()), size = _a[0], setSize = _a[1];
    /** Get the size on initial layout */
    react_1.default.useLayoutEffect(function () {
        var _a, _b;
        setSize((_b = (_a = target === null || target === void 0 ? void 0 : target.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect()) !== null && _b !== void 0 ? _b : new DOMRect());
    }, [target, target.current]);
    /** ...and again whenever things resize. */
    (0, resize_observer_1.default)(target, function (entry) {
        setSize(entry.target.getBoundingClientRect());
    });
    return size;
}
