import { Club } from "./club.js";

export const clubMongoStore = {
  async getClubsBySportgroundId(id) {
    const clubs = await Club.find({ sportgroundid: id }).lean();
    return clubs;
  },
};
