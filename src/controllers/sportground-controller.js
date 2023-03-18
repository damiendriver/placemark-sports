import { db } from "../models/db.js";
import { ClubSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

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

  uploadImage: {
    handler: async function (request, h) {
      try {
        const sportground = await db.sportgroundStore.getSportgroundById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          sportground.img = url;
          await db.sportgroundStore.updateSportground(sportground);
        }
        return h.redirect(`/sportground/${sportground._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/sportground/${sportground._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

};
