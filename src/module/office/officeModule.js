import databaseConnection from "../../config/database.js";
import authMiddleware from "../../middleware/auth.js";
import OfficeController from "./controller/officeController.js";
import OfficeRepository from "./repository/officeRepository.js";
import OfficeService from "./service/officeService.js";

export default function officeModule(app) {
  const authRequest = authMiddleware;
  const officeRepository = new OfficeRepository(databaseConnection);
  const officeService = new OfficeService(officeRepository);
  const officeController = new OfficeController(officeService, authRequest);
  officeController.configRoutes(app);
}