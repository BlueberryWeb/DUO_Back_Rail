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
const ContentsSchema = new mongoose_1.Schema({
    id_subcategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Subcategories',
        required: [true, 'This field is required']
    },
    id_user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'This field is required']
    },
    image_banner: {
        type: String,
        required: [true, 'This field is required']
    },
    main_title: {
        type: String,
        required: [true, 'This field is required']
    },
    description: {
        type: String,
        required: [true, 'This field is required']
    },
    rank: {
        type: Number,
        required: [true, 'This field is required']
    },
    type: {
        type: String,
        required: [true, 'This field is required']
    },
    year: {
        type: Number,
        required: [true, 'This field is required']
    },
    author: {
        type: String,
        required: [true, 'This field is required']
    },
    staff: [{
            type: String,
            required: [true, 'This field is required'],
        }],
    preview: {
        type: String,
        required: [true, 'This field is required']
    },
    key_words: [{
            type: String,
            required: [true, 'This field is required'],
        }],
    classification: {
        type: String,
        required: [true, 'This field is required']
    },
});
ContentsSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, content = __rest(_a, ["__v", "_id"]);
    content.uid = _id;
    return content;
};
const Contents = (0, mongoose_1.model)('Contents', ContentsSchema);
exports.default = Contents;
//# sourceMappingURL=Contents.js.map