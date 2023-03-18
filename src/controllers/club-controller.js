import { ClubSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const clubController = {
  index: {
    handler: async function (request, h) {
      const sportground = await db.sportgroundStore.getSportgroundById(request.params.id);
      const club = await db.clubStore.getClubById(request.params.clubid);
      const viewData = {
        title: "Edit Clubname",
        sportground: sportground,
        club: club,
      };
      return h.view("club-view", viewData);
    },
  },

  update: {
    validate: {
      payload: ClubSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("club-view", { title: "Edit club error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const club = await db.clubStore.getClubById(request.params.clubid);
      const newClub = {
        clubname: request.payload.clubname,
        description: request.payload.description,
        county: request.payload.county,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude)
      };
      await db.clubStore.updateClub(club, newClub);
      return h.redirect(`/sportground/${request.params.id}`);
    },
  },
};
