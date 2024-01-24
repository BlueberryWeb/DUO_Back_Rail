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
const CouponSchema = new mongoose_1.Schema({
    id_user: {
        type: String,
        required: false
    },
    code: {
        type: String,
        required: [true, 'This field is required']
    },
    type: {
        type: String,
        required: [true, 'This field is required']
    },
    value: {
        type: Number,
        required: [true, 'This field is required']
    },
});
CouponSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, coupon = __rest(_a, ["__v", "_id"]);
    coupon.uid = _id;
    return coupon;
};
exports.default = (0, mongoose_1.model)('Coupon', CouponSchema);
//# sourceMappingURL=Coupon.js.map