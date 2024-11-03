import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import databaseConnection from "../../config/database.js";
import UserRepository from "../../module/usuario/repository/usuarioRepository.js";
import UserService from "../../module/usuario/service/usuarioService.js";
import AuthController from "./controller/authController.js";
import AuthService from "./service/authService.js";

export default function authModule(app) {
  const jwtService = jwt;
  const hashService = bcrypt;

  const userRepository = new UserRepository(databaseConnection);
  const userService = new UserService(userRepository);
  const authService = new AuthService(jwtService, hashService, userService);
  const authController = new AuthController(authService);

  authController.configRoutes(app);
}