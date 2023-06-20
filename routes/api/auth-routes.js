const express = require("express");

const ctrl = require("../../controllers/auth");

const {validateBody} = require("../../middlewares");

const {schemas} = require("../../models/user");

const {authenticate} = require("../../middlewares");

const router = express.Router();


router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/:id", validateBody(schemas.updateSchema), ctrl.update)

module.exports = router;