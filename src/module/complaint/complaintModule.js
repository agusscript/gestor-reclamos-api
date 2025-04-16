import databaseConnection from "../../config/database.js";
import authMiddleware from "../../middleware/auth.js";
import EmailService from "../email/emailService.js";
import ReportService from "../report/reportService.js";
import UsuarioRepository from "../user/repository/userRepository.js";
import UsuarioService from "../user/service/userService.js";
import ComplaintController from "./controller/complaintController.js";
import ComplaintRepository from "./repository/complaintRepository.js";
import ComplaintService from "./service/complaintService.js";
import nodeMailerHandlebars from 'nodemailer-express-handlebars';
import expressValidator from "express-validator"
import handlebars from "handlebars";
import nodeMailer from 'nodemailer';
import puppeteer from "puppeteer";
import path from 'path';
import fs from 'fs';

export default function complaintModule(app) {
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
  const reportService = new ReportService(browserService, htmlCompilerService, pathService, fileSystemService);

  const complaintRepository = new ComplaintRepository(databaseConnection);
  const complaintService = new ComplaintService(complaintRepository, userService, emailService);
  const complaintController = new ComplaintController(complaintService, authRequest, validationService, reportService);

  complaintController.configRoutes(app);
}