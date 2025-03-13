import databaseConnection from "../../config/database.js";
import authMiddleware from "../../middleware/auth.js";
import EmailService from "../email/emailService.js";
import InformeService from "../informe/informeService.js";
import UsuarioRepository from "../user/repository/userRepository.js";
import UsuarioService from "../user/service/userService.js";
import ReclamoController from "./controller/reclamoController.js";
import ReclamoRepository from "./repository/reclamoRepository.js";
import ReclamoService from "./service/reclamoService.js";
import nodeMailerHandlebars from 'nodemailer-express-handlebars';
import expressValidator from "express-validator"
import handlebars from "handlebars";
import nodeMailer from 'nodemailer';
import puppeteer from "puppeteer";
import path from 'path';
import fs from 'fs';

export default function reclamoModule(app) {
  const templateService = nodeMailerHandlebars;
  const validationService = expressValidator;
  const htmlCompilerService = handlebars;
  const authRequest = authMiddleware;
  const browserService = puppeteer;
  const fileSystemService = fs;
  const pathService = path;

  const userRepository = new UsuarioRepository(databaseConnection);
  const userService = new UsuarioService(userRepository);
  const emailService = new EmailService(nodeMailer, pathService, templateService);
  const informeService = new InformeService(browserService, htmlCompilerService, pathService, fileSystemService);

  const reclamoRepository = new ReclamoRepository(databaseConnection);
  const reclamoService = new ReclamoService(reclamoRepository, userService, emailService);
  const reclamoController = new ReclamoController(reclamoService, authRequest, validationService, informeService);

  reclamoController.configRoutes(app);
}