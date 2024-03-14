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
exports.verifyUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../../models/User"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.allUser();
        if (!users) {
            return res.json({
                status: 201,
                message: 'No users to load'
            });
        }
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ status: 500, message: '', devTool: error.message });
        console.log(error);
    }
});
exports.getUsers = getUsers;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const data = yield User_1.default.verifyUserExistence(email);
        if (!data) {
            return res.json({
                status: 400,
                message: 'Usuario no encontrado. Verifique el correo electrónico y e inténtalo de nuevo'
            });
        }
        res.json(data);
    }
    catch (error) {
        res.json({
            status: 500,
            message: 'Error interno del servidor',
            devTool: error.message
        });
    }
});
exports.verifyUser = verifyUser;
//# sourceMappingURL=getRequests.js.map