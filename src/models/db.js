import { userMemStore } from "./mem/user-mem-store.js";
import { sportgroundMemStore } from "./mem/sportground-mem-store.js";
import { clubMemStore } from "./mem/club-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { sportgroundJsonStore } from "./json/sportground-json-store.js";
import { clubJsonStore } from "./json/club-json-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { sportgroundMongoStore } from "./mongo/sportground-mongo-store.js";
import { clubMongoStore } from "./mongo/club-mongo-store.js";

export const db = {
  userStore: null,
  sportgroundStore: null,
  clubStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
    this.userStore = userJsonStore;
    this.sportgroundStore = sportgroundJsonStore;
    this.clubStore = clubJsonStore;
    break;
    case "mongo":
        this.userStore = userMongoStore;
        this.sportgroundStore = sportgroundMongoStore;
        this.clubStore = clubMongoStore;
        connectMongo();
        break;
    default:
    this.userStore = userMemStore;
    this.sportgroundStore = sportgroundMemStore;
    this.clubStore = clubMemStore;
    }
  },
};
