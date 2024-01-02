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
const BillingSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'This field is required'],
    },
    rfc: {
        type: String,
        required: [true, 'This field is required'],
    },
    email: {
        type: String,
        required: [true, 'This field is required'],
    },
    phone: {
        type: String,
        required: [true, 'This field is required'],
    },
    street: {
        type: String,
        required: [true, 'This field is required'],
    },
    outdoor_num: {
        type: String,
        required: [true, 'This field is required'],
    },
    interior_num: {
        type: String,
        required: false
    },
    cp: {
        type: String,
        required: [true, 'This field is required'],
    },
    colony: {
        type: String,
        required: [true, 'This field is required'],
    },
    city: {
        type: String,
        required: [true, 'This field is required'],
    },
    state: {
        type: String,
        required: [true, 'This field is required'],
    },
    cfdi: {
        type: String,
        required: [true, 'This field is required'],
    },
    tax_regime: {
        type: String,
        required: [true, 'This field is required'],
    },
    tax_certificate: {
        type: String,
        required: [true, 'This field is required'],
    },
    status: {
        type: String,
        required: [true, 'This field is required'],
    },
    user: {
        type: mongoose_1.Schema.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true,
});
BillingSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, billing_detail = __rest(_a, ["__v", "_id"]);
    billing_detail.uid = _id;
    return billing_detail;
};
exports.default = (0, mongoose_1.model)('Billing', BillingSchema);
//# sourceMappingURL=Billing.js.map