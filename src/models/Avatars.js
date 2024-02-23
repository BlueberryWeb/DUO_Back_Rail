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
const AvatarsSchema = new mongoose_1.Schema({
    id_user: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: [true, 'This field is required']
    },
    name: {
        type: String,
        required: [true, 'This field is required']
    },
    description: {
        type: Number,
        required: [true, 'This field is required']
    },
});
AvatarsSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, avatar = __rest(_a, ["__v", "_id"]);
    avatar.uid = _id;
    return avatar;
};
const Avatars = (0, mongoose_1.model)('Avatars', AvatarsSchema);
exports.default = Avatars;
//# sourceMappingURL=Avatars.js.map