import Mongoose from "mongoose";

const { Schema } = Mongoose;

const clubSchema = new Schema({
  clubname: String,
  description: String,
  county: String,
  latitude: Number,
  longitude: Number,
  sportgroundid: {
    type: Schema.Types.ObjectId,
    ref: "Sportground",
  },
});

export const Club = Mongoose.model("Club", clubSchema);
