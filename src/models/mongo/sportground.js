import Mongoose from "mongoose";

const { Schema } = Mongoose;

const sportgroundSchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Sportground = Mongoose.model("Sportground", sportgroundSchema);
