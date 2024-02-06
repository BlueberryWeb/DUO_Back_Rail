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
exports.validToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../models/User"));
const validToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('auth-token');
    console.log(token);
    if (!token) {
        return res.json({
            status: 401,
            message: 'No se encontró el token de sesión.'
        });
    }
    try {
        if (!process.env.SECRET_PASS_JWT) {
            return res.status(500).json({ error: 'SECRET_PASS_JWT no tiene un valor definido' });
        }
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.SECRET_PASS_JWT);
        const user = yield User_1.default.findById(uid);
        if (!user) {
            return res.json({
                status: 401,
                message: 'Usuario no encontrado.'
            });
        }
        req.user = user,
            next();
    }
    catch (error) {
        res.json({
            status: 401,
            message: 'Token de sesión invalido.',
            devTool: error.message
        });
    }
});
exports.validToken = validToken;
//# sourceMappingURL=authToken.js.map