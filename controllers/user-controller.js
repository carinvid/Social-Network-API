const { User, Thought } = require("../models");

const userController = {
  // To GET all users
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbData) => res.json(dbData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // To create a User via POST method
  createUser({ body }, res) {
    User.create(body)
      .then((dbData) => res.json(dbData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // To GET a User @ _ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
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

  // To PUT (Update) User @ _ID
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
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

  // To DELETE a User @ _ID
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        // To Find and PULL Friends
        User.updateMany(
          { friends: { $in: params.id } },
          { $pull: { friends: params.id } }
        )
          .then(() => {
            // To delete USER and Cooresponding friends
            Thought.deleteMany({ username: dbData.username })
              .then(() => {
                res.json({ message: "User deleted" });
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json(err);
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // To PUT (Update)/ Add a friend to linking User Profile
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
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

  // To DELETE a friend from linking User Profile
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbData) => res.json(dbData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = userController;
