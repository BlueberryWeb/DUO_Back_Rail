"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const multer_1 = __importDefault(require("multer"));
const getRequests_1 = require("../controllers/UserController/getRequests");
const postRequets_1 = require("../controllers/UserController/postRequets");
const router = (0, express_1.Router)();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
// Get Requests //
router.get('/get-all-users', getRequests_1.getUsers);
router.get('/verify-user-existence/:email', getRequests_1.verifyUser);
// Post Requests //
router.post('/add_user', postRequets_1.addUser);
// router.post('/add_user', upload.single('document'), addUser);
//Patch/Put Request //
router.patch('/update-password', usersController_1.updatePassword),
    module.exports = router;
//# sourceMappingURL=user.js.map