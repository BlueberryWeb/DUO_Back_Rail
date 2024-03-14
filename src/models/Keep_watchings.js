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
const Keep_watchings = new mongoose_1.Schema({
    Profiles: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    videos: [
        {
            videos: {
                type: String,
                required: [true, 'This field is required'],
            },
            current_watch: {
                type: Number,
                required: true
            }
        }
    ],
});
Keep_watchings.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, keep_watching = __rest(_a, ["__v", "_id"]);
    keep_watching.uid = _id;
    return keep_watching;
};
const keep_watching = (0, mongoose_1.model)('keep_watching', Keep_watchings);
exports.default = keep_watching;
//# sourceMappingURL=Keep_watchings.js.map