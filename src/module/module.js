import officeModule from "./office/officeModule.js";
import reclamoModule from "./reclamo/reclamoModule.js";
import reclamoEstadoModule from "./reclamoEstado/reclamoEstadoModule.js";
import reclamoTipoModule from "./reclamoTipo/reclamoTipoModule.js";
import userModule from "./user/userModule.js";
import authModule from "./auth/authModule.js";

export default function initModules(app) {
  userModule(app);
  officeModule(app);
  reclamoModule(app);
  reclamoEstadoModule(app);
  reclamoTipoModule(app);
  authModule(app);
}