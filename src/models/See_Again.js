"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const See_Again = new mongoose_1.Schema({
    Profiles: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    Content: [
        {
            type: String,
            required: [true, 'This field is required'],
        }
    ],
});
See_Again.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, See_again = __rest(_a, ["__v", "_id"]);
    See_again.uid = _id;
    return See_again;
};
const See_again = (0, mongoose_1.model)('See_Again', See_Again);
exports.default = See_again;
//# sourceMappingURL=See_Again.js.map