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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditCategories = void 0;
const Categories_1 = __importDefault(require("../../models/Categories"));
const EditCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = Object.assign({}, req.body);
        const CategorieUpdate = yield Categories_1.default.findOneAndUpdate({ _id: body.uid }, { color_title: body.color_title, name: body.name, description: body.description }, { new: true });
        if (CategorieUpdate) {
            const Category_Push = yield CategorieUpdate.populate('id_user');
            const data = {
                uid: Category_Push._id,
                UserName: `${Category_Push.id_user.name} ${Category_Push.id_user.lastname}`,
                color: Category_Push.color_title,
                name: Category_Push.name,
                description: Category_Push.description,
            };
            res.json({ status: 200, data: data });
        }
        else {
            console.log('no encontrado');
            res.json({ status: 500 });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Internal Server Error', devTool: error.message });
        console.log(error);
    }
});
exports.EditCategories = EditCategories;
//# sourceMappingURL=putCategories.js.map