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
      type: String,
      default: "https://res.cloudinary.com/dfnezrziy/image/upload/v1693817739/KiddFlix/ucfialncduyflzhixpca.jpg"
    },
    userType: {
      type: String,
      default: "parent"
    }
  }
);

const Parent = model("Parent", parentSchema);
module.exports = Parent;
