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
const Manage_Subscriptions = new mongoose_1.Schema({
    status: {
        type: String,
        required: [true, 'This field is required'],
    },
    start: {
        type: Date,
        required: [true, 'This field is required'],
    },
    end: {
        type: Date,
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
Manage_Subscriptions.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, manage_detail = __rest(_a, ["__v", "_id"]);
    manage_detail.uid = _id;
    return manage_detail;
};
exports.default = (0, mongoose_1.model)('Manage_Subscription', Manage_Subscriptions);
//# sourceMappingURL=Manage_subscriptions.js.map