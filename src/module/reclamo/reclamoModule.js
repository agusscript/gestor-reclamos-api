import databaseConnection from "../../config/database.js";
import ReclamoController from "./controller/reclamoController.js";
import ReclamoRepository from "./repository/reclamoRepository.js";
import ReclamoService from "./service/reclamoService.js";


export default function reclamoModule(app) {
  const reclamoRepository = new ReclamoRepository(databaseConnection);
  const reclamoService = new ReclamoService(reclamoRepository);
  const reclamoController = new ReclamoController(reclamoService);
  reclamoController.configRoutes(app);
}