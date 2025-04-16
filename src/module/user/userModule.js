import databaseConnection from "../../config/database.js";
import authMiddleware from "../../middleware/auth.js";
import UserController from "./controller/userController.js";
import UserRepository from "./repository/userRepository.js";
import UserService from "./service/userService.js";

export default function userModule(app) {
  const authRequest = authMiddleware;
  const userRepository = new UserRepository(databaseConnection);
  const userService = new UserService(userRepository);
  const userController = new UserController(userService, authRequest);
  userController.configRoutes(app);
}