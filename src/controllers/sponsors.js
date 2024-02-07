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
exports.addSponsors = void 0;
const Sponsor_1 = __importDefault(require("../models/Sponsor"));
const addSponsors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingSponsor = yield Sponsor_1.default.findOne({ email: req.body.email });
        if (existingSponsor) {
            return res.status(400).json({ error: 'El email del patrocinador ya está registrado, por favor espera un correo para completar tu registro.' });
        }
        const sponsor = new Sponsor_1.default(req.body);
        yield sponsor.save();
        return res.json({ status: 200, message: 'Sponsor creado exitosamente' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
    }
});
exports.addSponsors = addSponsors;
//# sourceMappingURL=sponsors.js.map