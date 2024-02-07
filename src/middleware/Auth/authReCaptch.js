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
exports.ReCaptcha = void 0;
const axios_1 = __importDefault(require("axios"));
const ReCaptcha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { value } = req.body;
    const url = `https://recaptchaenterprise.googleapis.com/v1/projects/duotest-1704923020844/assessments?key=${process.env.RECAPTCHA_API_KEY}`;
    const requestBody = {
        "event": {
            "token": value,
            "siteKey": process.env.RECATPCHA_PRIVATE_KEY,
            "expectedAction": "login"
        }
    };
    try {
        const response = yield axios_1.default.post(url, requestBody, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        });
        const { score } = response.data.riskAnalysis;
        // console.log(score);
        if (score >= 0.5) {
            return res.json({ success: true });
        }
        else {
            return res.json({ success: false });
        }
    }
    catch (error) {
        console.error('Error al verificar reCAPTCHA:', error.message);
    }
});
exports.ReCaptcha = ReCaptcha;
//# sourceMappingURL=authReCaptch.js.map