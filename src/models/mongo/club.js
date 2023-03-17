import Mongoose from "mongoose";

const { Schema } = Mongoose;

const clubSchema = new Schema({
  clubname: String,
  description: String,
  county: String,
  latitude: Number,
  lonitude: Number,
  sportgroundid: {
    type: Schema.Types.ObjectId,
    ref: "Sportground",
  },
});

export const Club = Mongoose.model("Club", clubSchema);
