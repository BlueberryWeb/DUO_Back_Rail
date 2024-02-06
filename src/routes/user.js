"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
router.post('/find-user-by-email', usersController_1.findUserByEmail);
router.post('/add_user', upload.single('document'), usersController_1.addUser);
router.patch('/update-password', usersController_1.updatePassword),
    module.exports = router;
//# sourceMappingURL=user.js.map