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
exports.getCategories = void 0;
const Categories_1 = __importDefault(require("../models/Categories"));
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Categories_1.default.find().select('name color_title description');
        if (categories.length === 0) {
            return res.json({
                status: 202,
                message: 'No Data'
            });
        }
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Internal Server Error', devTool: error.message });
        console.log(error);
    }
});
exports.getCategories = getCategories;
//# sourceMappingURL=categoriesController.js.map