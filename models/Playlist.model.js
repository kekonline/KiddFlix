const { Schema, model } = require("mongoose");

const playlistSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required.']
        },
        child: {
            type: Schema.Types.ObjectId,
            ref: "Child"
        },
        video: [{
            type: Schema.Types.ObjectId,
            ref: "Video"
        }]
    }
);

const Playlist = model("Playlist", playlistSchema);
module.exports = Playlist;
