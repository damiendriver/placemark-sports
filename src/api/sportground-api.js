import Boom from "@hapi/boom";
import { IdSpec, SportgroundArraySpec, SportgroundSpec, SportgroundSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const sportgroundApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const sportgrounds = await db.sportgroundStore.getAllSportgrounds();
        return sportgrounds;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: SportgroundArraySpec, failAction: validationError },
    description: "Get all sportgrounds",
    notes: "Returns all sportgrounds",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
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
    tags: ["api"],
    description: "Find a Sportground",
    notes: "Returns a sportground",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: SportgroundSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
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
    tags: ["api"],
    description: "Create a Sportground",
    notes: "Returns the newly created sportground",
    validate: { payload: SportgroundSpec, failAction: validationError },
    response: { schema: SportgroundSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
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
    tags: ["api"],
    description: "Delete a sportground",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.sportgroundStore.deleteAllSportgrounds();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all SportgroundApi",
  },
};
