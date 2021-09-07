const router = require("express").Router();

// Imported Constants
const {
  createThought,
  getAllThoughts,
  getThoughtsID,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

// Root Routes
router.route("/").post(createThought).get(getAllThoughts);

// Routing for Reaction Creation
router.route("/:thoughtId/reactions").post(createReaction);

// Seperate Routing for Reaction Deletion
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

// Routing @ Specific ID
router
  .route("/:id")
  .get(getThoughtsID)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
