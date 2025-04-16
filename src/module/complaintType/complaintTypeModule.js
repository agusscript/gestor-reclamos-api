import databaseConnection from "../../config/database.js";
import authMiddleware from "../../middleware/auth.js";
import ComplaintTypeController from "./controller/complaintTypeController.js";
import ComplaintTypeRepository from "./repository/complaintTypeRepository.js";
import ComplaintTypeService from "./service/complaintTypeService.js";

export default function complaintTypeModule(app) {
  const authRequest = authMiddleware;
  const complaintTypeRepository = new ComplaintTypeRepository(databaseConnection);
  const complaintTypeService = new ComplaintTypeService(complaintTypeRepository);
  const complaintTypeController = new ComplaintTypeController(complaintTypeService, authRequest);
  complaintTypeController.configRoutes(app);
}