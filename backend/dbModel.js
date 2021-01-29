import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
    video_path: String,
    name: String,
});

//collection inside the database

export default mongoose.model("movies", movieSchema);