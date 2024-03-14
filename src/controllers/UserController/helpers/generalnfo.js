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
exports.saveGeneralInfo = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../../../models/User"));
const saveGeneralInfo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = ['Subscriber', 'Admin'];
        const body = Object.assign(Object.assign({}, data), { password: bcryptjs_1.default.hashSync(data.password, bcryptjs_1.default.genSaltSync()), status: 'pending' });
        if (!roles.includes(body.role)) {
            throw { code: 400, message: 'Invalid role provided' };
        }
        const user = new User_1.default(body);
        try {
            yield user.save();
        }
        catch (error) {
            if (error.code === 11000 || error.code === 11001) {
                throw { code: 400, message: 'Email address already in use' };
            }
            throw error;
        }
        return { success: true, data: user };
    }
    catch (error) {
        return { success: false, error };
    }
});
exports.saveGeneralInfo = saveGeneralInfo;
//# sourceMappingURL=generalnfo.js.map