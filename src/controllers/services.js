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
exports.FindCity = void 0;
const axios_1 = __importDefault(require("axios"));
const FindCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cp } = req.params;
    try {
        const response = yield axios_1.default.get(`https://api.tau.com.mx/dipomex/v1/codigo_postal?cp=${cp}`, {
            headers: {
                'APIKEY': process.env.API_KEY_DIPOMEX,
            },
        });
        return res.json(response.data);
    }
    catch (err) {
        return res.json({ status: 500 });
    }
});
exports.FindCity = FindCity;
//# sourceMappingURL=services.js.map