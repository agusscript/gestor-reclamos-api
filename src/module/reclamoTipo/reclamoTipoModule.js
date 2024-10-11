import databaseConnection from "../../config/database.js";
import ReclamoTipoController from "./controller/reclamoTipoController.js";
import ReclamoTipoRepository from "./repository/reclamoTipoRepository.js";
import ReclamoTipoService from "./service/reclamoTipoService.js";

export default function reclamoTipoModule(app) {
  const reclamoTipoRepository = new ReclamoTipoRepository(databaseConnection);
  const reclamoTipoService = new ReclamoTipoService(reclamoTipoRepository);
  const reclamoTipoController = new ReclamoTipoController(reclamoTipoService);
  reclamoTipoController.configRoutes(app);
}