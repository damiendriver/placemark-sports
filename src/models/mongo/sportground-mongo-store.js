import { Sportground } from "./sportground.js";
import { clubMongoStore } from "./club-mongo-store.js";

export const sportgroundMongoStore = {
  async getAllSportgrounds() {
    const sportgrounds = await Sportground.find().lean();
    return sportgrounds;
  },

  async getSportgroundById(id) {
    if (id) {
      const sportground = await Sportground.findOne({ _id: id }).lean();
      if (sportground) {
        sportground.clubs = await clubMongoStore.getClubsBySportgroundId(sportground._id);
      }
      return sportground;
    }
    return null;
  },

  async addSportground(sportground) {
    const newSportground = new Sportground(sportground);
    const sportgroundObj = await newSportground.save();
    return this.getSportgroundById(sportgroundObj._id);
  },

  async getUserSportgrounds(id) {
    const sportground = await Sportground.find({ userid: id }).lean();
    return sportground;
  },

  async deleteSportgroundById(id) {
    try {
      await Sportground.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllSportgrounds() {
    await Sportground.deleteMany({});
  }
};
