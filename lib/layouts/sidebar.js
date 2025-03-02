"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var components_1 = require("../components");
var Sidebar = function (_a) {
    var children = _a.children, aspectRatio = _a.aspectRatio, width = _a.width, gap = _a.gap;
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", { style: {
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "100%",
                boxSizing: "border-box",
            }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                        display: "flex",
                        gap: gap,
                        width: width,
                        flexDirection: "column",
                        boxSizing: "border-box",
                    }, children: children.map(function (child, index) { return ((0, jsx_runtime_1.jsx)("div", { style: {
                            aspectRatio: aspectRatio,
                            boxSizing: "border-box",
                        }, children: (0, jsx_runtime_1.jsx)(components_1.ZoomSlot, { slot: "slot".concat(index), children: child }) }, "slot".concat(index))); }) }), (0, jsx_runtime_1.jsx)("div", { style: {
                        width: "100%",
                        paddingLeft: gap,
                        aspectRatio: aspectRatio,
                        boxSizing: "border-box",
                    }, children: (0, jsx_runtime_1.jsx)(components_1.ZoomOutlet, {}) })] }) }));
};
exports.Sidebar = Sidebar;
