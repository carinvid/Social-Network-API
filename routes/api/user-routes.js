const router = require("express").Router();

// Imported Constants
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// Root Routes
router.route("/").get(getAllUser).post(createUser);

// Social/Friends Routing
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

// Routing @ Specific ID
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
