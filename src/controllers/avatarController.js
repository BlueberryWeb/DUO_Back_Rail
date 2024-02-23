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
exports.getAvatars = void 0;
const Avatars_1 = __importDefault(require("../models/Avatars"));
const getAvatars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const avatars = yield Avatars_1.default.find();
        if (avatars.length === 0) {
            res.json({
                status: 202,
                message: 'No Data'
            });
        }
        res.json(avatars);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Error interno de servidor', devTool: error.message });
        console.log(error);
    }
});
exports.getAvatars = getAvatars;
//# sourceMappingURL=avatarController.js.map