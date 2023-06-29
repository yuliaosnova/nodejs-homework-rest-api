const express = require("express");

const ctrl = require("../../controllers");

const { validateBody } = require("../../middlewares");

const { schemas } = require("../../models/user");

const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrl.auth.register
);

router.post("/login", validateBody(schemas.loginSchema), ctrl.auth.login);

router.get("/verify/:verificationCode", ctrl.auth.verify);

router.post(
  "/verify",
  validateBody(schemas.userEmailSchema),
  ctrl.auth.resendVerify
);

router.post("/logout", authenticate, ctrl.auth.logout);

module.exports = router;
