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
const ProfileSchema = new mongoose_1.Schema({
    id_user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'This field is required']
    },
    image: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: [true, 'This field is required'],
    },
    likes: [{
            type: String,
            required: [true, 'This field is required'],
        }]
}, {
    timestamps: true,
});
ProfileSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, password, _id } = _a, profile = __rest(_a, ["__v", "password", "_id"]);
    profile.uid = _id;
    return profile;
};
// Scopes //
// End Scopes //
const Profile = (0, mongoose_1.model)('Profile', ProfileSchema);
exports.default = Profile;
//# sourceMappingURL=Profile.js.map