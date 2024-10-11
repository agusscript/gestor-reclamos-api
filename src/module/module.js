import reclamoEstadoModule from "./reclamoEstado/reclamoEstadoModule.js";
import reclamoTipoModule from "./reclamoTipo/reclamoTipoModule.js";
import usuarioModule from "./usuario/usuarioModule.js";

export default function initModules(app) {
  usuarioModule(app);
  reclamoEstadoModule(app);
  reclamoTipoModule(app);
}