import databaseConnection from "../../config/database.js";
import authMiddleware from "../../middleware/auth.js";
import EmailService from "../email/emailService.js";
import UsuarioRepository from "../usuario/repository/usuarioRepository.js";
import UsuarioService from "../usuario/service/usuarioService.js";
import ReclamoController from "./controller/reclamoController.js";
import ReclamoRepository from "./repository/reclamoRepository.js";
import ReclamoService from "./service/reclamoService.js";
import expressValidator from "express-validator"
import nodeMailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

export default function reclamoModule(app) {
  const authRequest = authMiddleware;
  const validationService = expressValidator;
  const pathService = path;
  const templateService = hbs;

  const usuarioRepository = new UsuarioRepository(databaseConnection);
  const usuarioService = new UsuarioService(usuarioRepository);
  const emailService = new EmailService(nodeMailer, pathService, templateService);

  const reclamoRepository = new ReclamoRepository(databaseConnection);
  const reclamoService = new ReclamoService(reclamoRepository, usuarioService, emailService);
  const reclamoController = new ReclamoController(reclamoService, authRequest, validationService);

  reclamoController.configRoutes(app);
}