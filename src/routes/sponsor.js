"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sponsors_1 = require("../controllers/sponsors");
const router = (0, express_1.Router)();
router.post('/add', sponsors_1.addSponsors);
module.exports = router;
//# sourceMappingURL=sponsor.js.map