import { v4 } from "uuid";
import { clubMemStore } from "./club-mem-store.js";

let sportgrounds = [];

export const sportgroundMemStore = {
  async getAllSportgrounds() {
    return sportgrounds;
  },

  async addSportground(sportground) {
    sportground._id = v4();
    sportgrounds.push(sportground);
    return sportground;
  },

  async getSportgroundById(id) {
    const list = sportgrounds.find((sportground) => sportground._id === id);
    if (list) {
      list.clubs = await clubMemStore.getClubsBySportgroundId(list._id);
      return list;
    }
    return null;
  },

  async getUserSportgrounds(userid) {
    return sportgrounds.filter((sportground) => sportground.userid === userid);
  },

  async deleteSportgroundById(id) {
    const index = sportgrounds.findIndex((sportground) => sportground._id === id);
    if (index !== -1) sportgrounds.splice(index, 1);
  },

  async deleteAllSportgrounds() {
    sportgrounds = [];
  },
};
