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
const ShoppingCart = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.ObjectId,
        ref: "User",
        required: true
    },
    subscription: {
        type: mongoose_1.Schema.ObjectId,
        ref: "Subscription",
        required: true,
    }
}, {
    timestamps: true,
});
ShoppingCart.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, shopping_cart_detail = __rest(_a, ["__v", "_id"]);
    shopping_cart_detail.uid = _id;
    return shopping_cart_detail;
};
exports.default = (0, mongoose_1.model)('Shopping_cart', ShoppingCart);
//# sourceMappingURL=Shopping_cart.js.map