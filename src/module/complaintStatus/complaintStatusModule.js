import databaseConnection from "../../config/database.js";
import authMiddleware from "../../middleware/auth.js";
import ComplaintStatusController from "./controller/complaintStatusController.js";
import ComplaintStatusRepository from "./repository/complaintStatusRepository.js";
import ComplaintStatusService from "./service/complaintStatusService.js";

export default function complaintStatusModule(app) {
  const authRequest = authMiddleware;
  const complaintStatusRepository = new ComplaintStatusRepository(databaseConnection);
  const complaintStatusService = new ComplaintStatusService(complaintStatusRepository);
  const complaintStatusController = new ComplaintStatusController(complaintStatusService, authRequest);
  complaintStatusController.configRoutes(app);
}