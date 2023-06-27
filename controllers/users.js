const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../models/user");

const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.resolve("public", "avatars");

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const updateSubscriptionStatus = async (req, res) => {
  const { id } = req.params;

  const result = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const updateAvatar = async (req, res) => {
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsDir, filename);
  const userId = req.user._id;

  await fs.rename(oldPath, newPath);
  const avatar = path.join("avatars", filename);
  Jimp.read(avatar).then((avatar) => {
    return avatar.resize(250, 250).write(avatar);
  });

  await User.findByIdAndUpdate(userId, { avatar });
  res.json({ avatar });
};

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  update: ctrlWrapper(updateSubscriptionStatus),
  updateAvatar: ctrlWrapper(updateAvatar),
};
