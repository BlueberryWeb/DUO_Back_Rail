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
exports.deleteProfile = exports.updateProfile = exports.addProfile = exports.getProfile = exports.getProfiles = void 0;
const Profile_1 = __importDefault(require("../models/Profile"));
const getProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const profiles = yield Profile_1.default.find({ id_user: id });
        if (profiles.length > 0) {
            res.json({
                status: 200,
                profiles
            });
        }
        else if (profiles.length === 0) {
            res.json({
                status: 204,
                message: 'El usuario no tiene perfiles registrados'
            });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: '', devTool: error.message });
        console.log(error);
    }
});
exports.getProfiles = getProfiles;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_profile } = req.params;
        const profile = yield Profile_1.default.findById({ _id: id_profile });
        if (!profile) {
            return res.json({
                status: 401,
                message: 'Perfil no encontrado'
            });
        }
        res.json({
            status: 200,
            profile
        });
    }
    catch (error) {
        res.status(500).json({ status: 500, message: 'Error al obtener información del perfil', devTool: error.message });
        console.log(error);
    }
});
exports.getProfile = getProfile;
const addProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const profile = new Profile_1.default(body);
        profile.save();
        console.log(req.user);
        if (profile) {
            res.json({
                status: 200,
                message: 'Perfil creado'
            });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: '', devTool: error.message });
        console.log(error);
    }
});
exports.addProfile = addProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { image, name, likes, id } = req.body;
        const profile = yield Profile_1.default.findById(id);
        if (profile) {
            profile.image = image;
            profile.likes = likes;
            profile.name = name;
            profile.save();
            console.log(profile);
            res.json({
                status: 200,
                message: 'Perfil actualizado'
            });
        }
    }
    catch (error) {
        res.status(500).json({ status: 500, message: '', devTool: error.message });
        console.log(error);
    }
});
exports.updateProfile = updateProfile;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield Profile_1.default.deleteOne({ _id: id });
        res.json({
            status: 200,
            message: 'Perfil eliminado'
        });
    }
    catch (error) {
        res.status(500).json({ status: 500, message: '', devTool: error.message });
        console.log(error);
    }
});
exports.deleteProfile = deleteProfile;
//# sourceMappingURL=profileController.js.map