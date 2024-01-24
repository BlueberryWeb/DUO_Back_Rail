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
const PurchaseDetailsSchema = new mongoose_1.Schema({
    id_user: {
        type: mongoose_1.Schema.ObjectId,
        ref: 'User',
        required: [true, 'This field is required']
    },
    order: {
        type: String,
        required: [true, 'This field is required']
    },
    pay_method: {
        type: String,
        required: [true, 'This field is required']
    },
    bill: {
        type: Boolean,
        required: true
    },
    stripe_order: {
        type: String,
        required: false
    },
    paypal_order: {
        type: String,
        required: false
    },
    original_price: {
        type: Number,
        required: [true, 'This field is required']
    },
    discount: {
        type: Number,
        required: [true, 'This field is required']
    },
    final_price: {
        type: Number,
        required: [true, 'This field is required']
    }
});
PurchaseDetailsSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, details = __rest(_a, ["__v", "_id"]);
    details.uid = _id;
    return details;
};
const PurchaseDetails = (0, mongoose_1.model)('PurchaseDetails', PurchaseDetailsSchema);
exports.default = PurchaseDetails;
//# sourceMappingURL=Purchase_details.js.map