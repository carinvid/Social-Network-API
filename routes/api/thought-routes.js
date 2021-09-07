const router = require("express").Router();

// Imported Constants
const {
  addThought,
  getAllThoughts,
  getThoughtsById,
  updateThought,
  addReaction,
  deleteThought,
} = require("../../controllers/thought-controller");

// Root Routes
router.route("/").post(addThought).get(getAllThoughts);

// Routing for Reaction Creation
router.route("/:thoughtsbyId/reactions").post(addReaction);

// Seperate Routing for Reaction Deletion
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

// /id
router
  .route("/:id")
  .get(getThoughtsById)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
