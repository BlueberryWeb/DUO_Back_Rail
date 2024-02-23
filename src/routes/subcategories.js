"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subcategoriresController_1 = require("../controllers/subcategoriresController");
const router = (0, express_1.Router)();
router.get('/get-subcategories', subcategoriresController_1.getSubcategories);
module.exports = router;
//# sourceMappingURL=subcategories.js.map