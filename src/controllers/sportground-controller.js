import { db } from "../models/db.js";
import { ClubSpec } from "../models/joi-schemas.js";

export const sportgroundController = {
  index: {
    handler: async function (request, h) {
      const sportground = await db.sportgroundStore.getSportgroundById(request.params.id);
      const viewData = {
        title: "Sportground",
        sportground: sportground,
      };
      return h.view("sportground-view", viewData);
    },
  },

  addClub: {
    validate: {
      payload: ClubSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const currentSportground = await db.sportgroundStore.getSportgroundById(request.params.id);
        return h.view("sportground-view", { title: "Add club error", sportground: currentSportground, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const sportground = await db.sportgroundStore.getSportgroundById(request.params.id);
      const newClub = {
        clubname: request.payload.clubname,
        description: request.payload.description,
        county: request.payload.county,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
      };
      await db.clubStore.addClub(sportground._id, newClub);
      return h.redirect(`/sportground/${sportground._id}`);
    },
  },
  deleteClub: {
    handler: async function(request, h) {
      const sportground = await db.sportgroundStore.getSportgroundById(request.params.id);
      await db.clubStore.deleteClub(request.params.clubid);
      return h.redirect(`/sportground/${sportground._id}`);
    },
  },

};
