const router = require("express").Router();

// Imported Constants
const {
  createThought,
  getAllThoughts,
  getThoughtsbyId,
  updateThought,
  createReaction,
  deleteThought,
} = require("../../controllers/thought-controller");

// Root Routes
router.route("/").post(createThought).get(getAllThoughts);

// Routing for Reaction Creation
router.route("/:thoughtsbyId/reactions").post(createReaction);

// Seperate Routing for Reaction Deletion
router.route("/:thoughtbyId/reactions/:reactionId").delete(deleteReaction);

// /api/pizzas/:id
router
  .route("/:id")
  .get(getThoughtsbyId)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
