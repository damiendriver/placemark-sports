import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { clubJsonStore } from "./club-json-store.js";

const db = new Low(new JSONFile("./src/models/json/sportgrounds.json"));
db.data = { sportgrounds: [] };

export const sportgroundJsonStore = {
  async getAllSportgrounds() {
    await db.read();
    return db.data.sportgrounds;
  },

  async addSportground(sportground) {
    await db.read();
    sportground._id = v4();
    db.data.sportgrounds.push(sportground);
    await db.write();
    return sportground;
  },

  async getSportgroundById(id) {
    await db.read();
    let list = db.data.sportgrounds.find((sportground) => sportground._id === id);
    if (list) {
      list.clubs = await clubJsonStore.getClubsBySportgroundId(list._id);
    } else {
      list = null;
    }
    return list;
  },


  async getUserSportgrounds(userid) {
    await db.read();
    return db.data.sportgrounds.filter((sportground) => sportground.userid === userid);
  },

  async deleteSportgroundById(id) {
    await db.read();
    const index = db.data.sportgrounds.findIndex((sportground) => sportground._id === id);
    if (index !== -1) db.data.sportgrounds.splice(index, 1);
    await db.write();
  },

  async deleteAllSportgrounds() {
    db.data.sportgrounds = [];
    await db.write();
  },
};
