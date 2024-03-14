"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getCategories_1 = require("../controllers/Categories/getCategories");
const postCategories_1 = require("../controllers/Categories/postCategories");
const deleteCategories_1 = require("../controllers/Categories/deleteCategories");
const putCategories_1 = require("../controllers/Categories/putCategories");
const router = (0, express_1.Router)();
router.get('/get-categories', getCategories_1.getCategories);
router.get('/get-categories-admin', getCategories_1.getCategoriesAdmin);
router.post('/add-category', postCategories_1.AddCategories);
router.put('/edit-category', putCategories_1.EditCategories);
router.delete('/delete-category/:id', deleteCategories_1.DeleteCategories);
module.exports = router;
//# sourceMappingURL=categories.js.map