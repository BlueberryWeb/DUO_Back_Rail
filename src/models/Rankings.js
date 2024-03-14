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
const RankingsSchema = new mongoose_1.Schema({
    profiles: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Profile',
        required: [true, 'This field is required']
    },
    content: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Contents',
        required: [true, 'This field is required']
    },
    value: {
        type: String,
        required: [true, 'This field is required']
    },
});
RankingsSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, ranking = __rest(_a, ["__v", "_id"]);
    ranking.uid = _id;
    return ranking;
};
const Rankings = (0, mongoose_1.model)('Rankings', RankingsSchema);
exports.default = Rankings;
//# sourceMappingURL=Rankings.js.map