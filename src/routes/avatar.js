"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const avatarController_1 = require("../controllers/avatarController");
const router = (0, express_1.Router)();
router.get('/get-avatars', avatarController_1.getAvatars);
module.exports = router;
//# sourceMappingURL=avatar.js.map