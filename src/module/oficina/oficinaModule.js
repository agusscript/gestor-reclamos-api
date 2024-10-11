import databaseConnection from "../../config/database.js";
import OficinaController from "./controller/oficinaController.js";
import OficinaRepository from "./repository/oficinaRepository.js";
import OficinaService from "./service/oficinaService.js";

export default function oficinaModule(app) {
  const oficinaRepository = new OficinaRepository(databaseConnection);
  const oficinaService = new OficinaService(oficinaRepository);
  const oficinaController = new OficinaController(oficinaService);
  oficinaController.configRoutes(app);
}