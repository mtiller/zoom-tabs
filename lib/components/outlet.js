"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomOutlet = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var size_1 = require("../hooks/size");
var zoom_1 = require("../contexts/zoom");
var ZoomOutlet = function (props) {
    var _a;
    var controls = react_1.default.useContext((_a = props.context) !== null && _a !== void 0 ? _a : zoom_1.zoomContext).controls;
    var target = react_1.default.useRef(null);
    var size = (0, size_1.useSize)(target);
    react_1.default.useEffect(function () {
        controls.setOutletSize(size);
    }, [controls.setOutletSize, size]);
    return ((0, jsx_runtime_1.jsx)("div", { ref: target, style: {
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
        } }));
};
exports.ZoomOutlet = ZoomOutlet;
