import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const sportgroundApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const sportgrounds = await db.sportgroundStore.getAllSportgrounds();
        return sportgrounds;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },


  findOne: {
    auth: false,
    async handler(request) {
      try {
        const sportground = await db.sportgroundStore.getSportgroundById(request.params.id);
        if (!sportground) {
          return Boom.notFound("No Sportground with this id");
        }
        return sportground;
      } catch (err) {
        return Boom.serverUnavailable("No Sportground with this id");
      }
    },
  },


  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const sportground = request.payload;
        const newSportground = await db.sportgroundStore.addSportground(sportground);
        if (newSportground) {
          return h.response(newSportground).code(201);
        }
        return Boom.badImplementation("error creating sportground");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const sportground = await db.sportgroundStore.getSportgroundById(request.params.id);
        if (!sportground) {
          return Boom.notFound("No Sportground with this id");
        }
        await db.sportgroundStore.deleteSportgroundById(sportground._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Sportground with this id");
      }
    },
  },


  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.sportgroundStore.deleteAllSportgrounds();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
}