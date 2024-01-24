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
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const payload = { uid: uid || '' };
        try {
            const user = yield user_1.default.findById(uid);
            if (!user) {
                reject('User not found.');
                return;
            }
            const secretPassJwt = process.env.SECRET_PASS_JWT || '';
            if (!secretPassJwt) {
                reject('SECRET_PASS_JWT no tiene un valor definido');
                return;
            }
            jsonwebtoken_1.default.sign(payload, secretPassJwt, { expiresIn: '1d' }, (err, token) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    reject('No fue posible generar el token de sesión.');
                }
                else {
                    resolve(token || '');
                }
            }));
        }
        catch (error) {
            console.log(error.message);
            reject(error.message);
        }
    }));
};
exports.generateJWT = generateJWT;
//# sourceMappingURL=newToken.js.map