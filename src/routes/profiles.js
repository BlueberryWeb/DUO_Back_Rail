"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profileController_1 = require("../controllers/profileController");
const authToken_1 = require("../middleware/Auth/authToken");
const authValidate_1 = require("../middleware/Auth/authValidate");
const router = (0, express_1.Router)();
router.get('/all-profiles/:id', [
    authValidate_1.isAuthenticated,
    authToken_1.validToken
], profileController_1.getProfiles);
router.get('/single-profile/:id_profile', [
    authValidate_1.isAuthenticated,
    authToken_1.validToken
], profileController_1.getProfile);
router.post('/save-profile', [authToken_1.validToken], profileController_1.addProfile);
router.post('/update-profile', [authToken_1.validToken], profileController_1.updateProfile);
router.delete('/deleteProfile/:id', profileController_1.deleteProfile);
module.exports = router;
//# sourceMappingURL=profiles.js.map