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
exports.DeleteCategories = void 0;
const Categories_1 = __importDefault(require("../../models/Categories"));
const DeleteCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Categories_1.default.deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            res.json({ status: 200 });
        }
        else {
            console.log('No se encontró la categoría');
        }
    }
    catch (error) {
        console.error('Error al eliminar la categoría:', error);
    }
});
exports.DeleteCategories = DeleteCategories;
//# sourceMappingURL=deleteCategories.js.map