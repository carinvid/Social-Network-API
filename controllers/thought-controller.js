const { Thought, User } = require("../models");

const thoughtController = {
  // To GET all Thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbData) => res.json(dbData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // To create a Thought via POST Method
  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => res.json(err));
  },

  // To GET a Thought @ _ID
  getThoughtsID({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // To PUT (Update) Thoughts Reaction @ _ID
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      {
        _id: params.id,
      },
      body,
      { new: true, runValidators: true }
    )
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // To create a Reaction response to a Thought connecting via _ID
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No User found with this id" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // To DELETE a Thought @ _ID
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No Thought found with this id" });
          return;
        }
        res.json({ message: "Thought deleted" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // To delete a reaction at cooresponding _ID
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .select("-__v")
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No reaction found with this id" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = thoughtController;
