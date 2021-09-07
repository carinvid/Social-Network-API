const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema(
  {
    // Username Creation
    username: {
      type: String,
      required: "Please enter a Username!",
      trim: true,
      unique: true,
    },
    // Email Creation/Validation
    email: {
      type: String,
      required: true,
      unique: true,
      // To use a Regular Expression to filter through the given Email (Validation)
      validate: function (email) {
        return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        );
      },
    },
    // Referencing to 'Thoughts'
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    // Referencing to 'Friends' via Self Reference
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // Model Config
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// To return the length of the friends using a Virtual
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
