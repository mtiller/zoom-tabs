"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotContentType = exports.SlotContent = void 0;
var react_1 = require("react");
var SlotContent = function (props) {
    return typeof props.children;
};
exports.SlotContent = SlotContent;
exports.slotContentType = react_1.default.createElement(exports.SlotContent).type;
