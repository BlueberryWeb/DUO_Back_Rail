"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'This field is required'],
    },
    last_name: {
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
    },
    password: {
        type: String,
        required: [true, 'This field is required'],
    },
    role: {
        type: String,
        required: [true, 'This field is required'],
    },
    status: {
        type: String,
        required: [true, 'This field is required'],
    },
    stripeCustomerId: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
UserSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, user = __rest(_a, ["__v", "_id"]);
    user.uid = _id;
    return user;
};
// Scopes //
UserSchema.statics.verifyUserExistence = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ email: email });
        if (!user) {
            return { status: 404 };
        }
        return { status: 200 };
    });
};
UserSchema.statics.allUser = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield this.find().select('-password -createdAt -updatedAt -stripeCustomerId');
        if (!users) {
            return { status: 201, message: 'There is no data to load' };
        }
        return users;
    });
};
UserSchema.statics.findUser = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.aggregate([
            { $match: { email: email } },
            {
                $lookup: {
                    from: 'profiles',
                    let: { userId: '$_id' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$id_user', '$$userId'] } } },
                        { $addFields: { uid: '$_id' } },
                        {
                            $project: {
                                __v: 0,
                                _id: 0,
                                id_user: 0,
                                createdAt: 0,
                                updatedAt: 0
                            }
                        }
                    ],
                    as: 'profiles'
                }
            }
        ]);
        if (user.length > 0) {
            const _a = user[0], { __v, password, _id } = _a, _user = __rest(_a, ["__v", "password", "_id"]);
            _user.uid = _id;
            return _user;
        }
        else {
            return null;
        }
    });
};
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map