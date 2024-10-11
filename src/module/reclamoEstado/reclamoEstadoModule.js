import databaseConnection from "../../config/database.js";
import ReclamoEstadoController from "./controller/reclamoEstadoController.js";
import ReclamoEstadoRepository from "./repository/reclamoEstadoRepository.js";
import ReclamoEstadoService from "./service/reclamoEstadoService.js";

export default function reclamoEstadoModule(app) {
  const reclamoEstadoRepository = new ReclamoEstadoRepository(databaseConnection);
  const reclamoEstadoService = new ReclamoEstadoService(reclamoEstadoRepository);
  const reclamoEstadoController = new ReclamoEstadoController(reclamoEstadoService);
  reclamoEstadoController.configRoutes(app);
}