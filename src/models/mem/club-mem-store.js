import { v4 } from "uuid";

let clubs = [];

export const clubMemStore = {
  async getAllClubs() {
    return clubs;
  },

  async addClub(sportgroundId, club) {
    club._id = v4();
    club.sportgroundid = sportgroundId;
    clubs.push(club);
    return club;
  },

  async getClubsBySportgroundId(id) {
    return clubs.filter((club) => club.sportgroundid === id);
  },

  async getClubById(id) {
    return clubs.find((club) => club._id === id);
  },

  async getSportgroundClubs(sportgroundId) {
    return clubs.filter((club) => club.sportgroundid === sportgroundId);
  },

  async deleteClub(id) {
    const index = clubs.findIndex((club) => club._id === id);
    clubs.splice(index, 1);
  },

  async deleteAllClubs() {
    clubs = [];
  },

  async updateClub(club, updatedClub) {
    club.clubname = updatedClub.clubname;
    club.description = updatedClub.description;
    club.county = updatedClub.county;
    club.latitude = updatedClub.latitude;
    club.longitude = updatedClub.longitude;
  },
};
