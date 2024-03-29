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
const SponsorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'This field is required'],
    },
    lastname: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: [true, 'This field is required'],
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: [true, 'This field is required'],
    }
}, {
    timestamps: true,
});
SponsorSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, password, _id } = _a, user = __rest(_a, ["__v", "password", "_id"]);
    user.uid = _id;
    return user;
};
const Sponsor = (0, mongoose_1.model)('Sponsor', SponsorSchema);
exports.default = Sponsor;
//# sourceMappingURL=Sponsor.js.map