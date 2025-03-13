import officeModule from "./office/officeModule.js";
import reclamoModule from "./reclamo/reclamoModule.js";
import complaintStatusModule from "./complaintStatus/complaintStatusModule.js";
import complaintTypeModule from "./reclamoTipo/complaintTypeModule.js";
import userModule from "./user/userModule.js";
import authModule from "./auth/authModule.js";

export default function initModules(app) {
  userModule(app);
  officeModule(app);
  reclamoModule(app);
  complaintStatusModule(app);
  complaintTypeModule(app);
  authModule(app);
}