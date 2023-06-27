const express = require("express");
const { authenticate, validateBody, upload } = require("../../middlewares");

const ctrl = require("../../controllers");

const { schemas } = require("../../models/user");

const router = express.Router();

router.use(authenticate);

router.get("/current", ctrl.users.getCurrent);
router.patch("/avatars", upload.single("avatar"), ctrl.users.updateAvatar);
router.patch("/:id", validateBody(schemas.updateSchema), ctrl.users.update);

module.exports = router;
