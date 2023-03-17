import { db } from "../models/db.js";
import { SportgroundSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const sportgrounds = await db.sportgroundStore.getUserSportgrounds(loggedInUser._id);
      const viewData = {
        title: "Placemark Dashboard",
        user: loggedInUser,
        sportgrounds: sportgrounds,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addSportground: {
    validate: {
      payload: SportgroundSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Sportground error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newSportGround = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.sportgroundStore.addSportground(newSportGround);
      return h.redirect("/dashboard");
    },
  },
  deleteSportground: {
    handler: async function (request, h) {
      const sportground = await db.sportgroundStore.getSportgroundById(request.params.id);
      await db.sportgroundStore.deleteSportgroundById(sportground._id);
      return h.redirect("/dashboard");
    },
  },

};


