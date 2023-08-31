const { Schema, model } = require("mongoose");

const childSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required.']
        },

        picture: {
            type: String
        },
        userType: {
            type: String,
            default: "child"
        },
        parent: {
            type: Schema.Types.ObjectId,
            ref: "Parent"
        }
    }
);

const Child = model("Child", childSchema);
module.exports = Child;
