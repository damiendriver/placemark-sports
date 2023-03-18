import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { sportgroundController } from "./controllers/sportground-controller.js";
import { clubController } from "./controllers/club-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addsportground", config: dashboardController.addSportground },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/sportground/{id}", config: sportgroundController.index },
  { method: "POST", path: "/sportground/{id}/addclub", config: sportgroundController.addClub },

  { method: "GET", path: "/dashboard/deletesportground/{id}", config: dashboardController.deleteSportground },
  { method: "GET", path: "/sportground/{id}/deleteclub/{clubid}", config: sportgroundController.deleteClub },

  { method: "GET", path: "/club/{id}/editclub/{clubid}", config: clubController.index },
  { method: "POST", path: "/club/{id}/updateclub/{clubid}", config: clubController.update },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }


];

