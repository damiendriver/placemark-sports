import { Club } from "./club.js";

export const clubMongoStore = {
  async getAllClubs() {
    const clubs = await Club.find().lean();
    return clubs;
  },

  async addClub(sportgroundId, club) {
    club.sportgroundid = sportgroundId;
    const newClub = new Club(club);
    const clubObj = await newClub.save();
    return this.getClubById(clubObj._id);
  },

  async getClubsBySportgroundId(id) {
    const clubs = await Club.find({ sportgroundid: id }).lean();
    return clubs;
  },

  async getClubById(id) {
    if (id) {
      const club = await Club.findOne({ _id: id }).lean();
      return club;
    }
    return null;
  },

  async deleteClub(id) {
    try {
      await Club.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllClubs() {
    await Club.deleteMany({});
  },

  async updateClub(club, updatedClub) {
    const clubDoc = await Club.findOne({ _id: club._id });
    clubDoc.clubname = updatedClub.clubname;
    clubDoc.description = updatedClub.description;
    clubDoc.county = updatedClub.county
    clubDoc.latitude = updatedClub.latitude;
    clubDoc.longitude = updatedClub.longitude;
    await clubDoc.save();
  },
};

