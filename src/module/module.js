import oficinaModule from "./oficina/oficinaModule.js";
import reclamoModule from "./reclamo/reclamoModule.js";
import reclamoEstadoModule from "./reclamoEstado/reclamoEstadoModule.js";
import reclamoTipoModule from "./reclamoTipo/reclamoTipoModule.js";
import usuarioModule from "./usuario/usuarioModule.js";

export default function initModules(app) {
  usuarioModule(app);
  oficinaModule(app);
  reclamoModule(app);
  reclamoEstadoModule(app);
  reclamoTipoModule(app);
}