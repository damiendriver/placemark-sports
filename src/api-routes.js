import { userApi } from "./api/users-api.js";
import { sportgroundApi } from "./api/sportground-api.js";
import { clubApi } from "./api/club-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/sportgrounds", config: sportgroundApi.create },
  { method: "DELETE", path: "/api/sportgrounds", config: sportgroundApi.deleteAll },
  { method: "GET", path: "/api/sportgrounds", config: sportgroundApi.find },
  { method: "GET", path: "/api/sportgrounds/{id}", config: sportgroundApi.findOne },
  { method: "DELETE", path: "/api/sportgrounds/{id}", config: sportgroundApi.deleteOne },

  { method: "GET", path: "/api/clubs", config: clubApi.find },
  { method: "GET", path: "/api/clubs/{id}", config: clubApi.findOne },
  { method: "POST", path: "/api/sportgrounds/{id}/clubs", config: clubApi.create },
  { method: "DELETE", path: "/api/clubs", config: clubApi.deleteAll },
  { method: "DELETE", path: "/api/clubs/{id}", config: clubApi.deleteOne },

];