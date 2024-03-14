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
const CategoriesSchema = new mongoose_1.Schema({
    id_user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'This field is required']
    },
    color_title: {
        type: String,
        required: [true, 'This field is required']
    },
    name: {
        type: String,
        required: [true, 'This field is required']
    },
    description: {
        type: String,
        required: [true, 'This field is required']
    },
});
CategoriesSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, category = __rest(_a, ["__v", "_id"]);
    category.uid = _id;
    return category;
};
CategoriesSchema.statics.allCategories = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield this.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'id_user',
                        foreignField: '_id',
                        as: 'id_user'
                    }
                },
                {
                    $unwind: '$id_user'
                },
                {
                    $project: {
                        uid: '$_id',
                        UserName: { $concat: ['$id_user.name', ' ', '$id_user.lastname'] },
                        name: 1,
                        color: '$color_title',
                        description: 1,
                        _id: 0
                    }
                }
            ]);
            return data;
        }
        catch (error) {
            throw new Error('Internal Server Error');
        }
    });
};
const Categories = (0, mongoose_1.model)('Categories', CategoriesSchema);
exports.default = Categories;
//# sourceMappingURL=Categories.js.map