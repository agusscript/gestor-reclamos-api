import usuarioModule from "./usuario/usuarioModule.js";

export default function initModules(app) {
  usuarioModule(app);
}