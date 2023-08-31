const { Schema, model } = require("mongoose");

const parentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.']
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    yearOfBirth: {
      type: Number,
      required: [true, 'Year of birth is required.']
    },

    picture: {
      type: String
    },
    userType: {
      type: String,
      default: "parent"
    }
  }
);

const Parent = model("Parent", parentSchema);
module.exports = Parent;
