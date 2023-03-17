import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/clubs.json"));
db.data = { clubs: [] };

export const clubJsonStore = {
  async getAllClubs() {
    await db.read();
    return db.data.clubs;
  },

  async addClub(sportgroundId, club) {
    await db.read();
    club._id = v4();
    club.sportgroundid = sportgroundId;
    db.data.clubs.push(club);
    await db.write();
    return club;
  },

  async getClubsBySportgroundId(id) {
    await db.read();
    return db.data.clubs.filter((club) => club.sportgroundid === id);
  },

  async getClubById(id) {
    await db.read();
    return db.data.clubs.find((club) => club._id === id);
  },

  async deleteClub(id) {
    await db.read();
    const index = db.data.clubs.findIndex((club) => club._id === id);
    db.data.clubs.splice(index, 1);
    await db.write();
  },

  async deleteAllClubs() {
    db.data.clubs = [];
    await db.write();
  },

  async updateClub(club, updatedClub) {
    club.clubname = updatedClub.clubname;
    club.description = updatedClub.description;
    club.county = updatedClub.county;
    club.latitude = updatedClub.latitude;
    club.longitude = updatedClub.longitude;
    await db.write();
  },
};
