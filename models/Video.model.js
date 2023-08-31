const { Schema, model } = require("mongoose");

const videoSchema = new Schema(
    {
        link: {
            type: String,
            trim: true,
            required: [true, 'Link is required.']
        },
        watched: {
            type: Boolean,
            default: false
        },
        dateAdded: {
            type: Date,
            default: Date.now
        }
    }
);

const Video = model("Video", videoSchema);
module.exports = Video;
