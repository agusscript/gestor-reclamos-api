import dotenv from 'dotenv';
dotenv.config();

import databaseConnection from "../../../config/database.js";
import { sendMail } from "../../notificaciones/Mailer.js";
import ReclamoEstadoService from "../../reclamoEstado/service/reclamoEstadoService.js";
import UsuarioRepository from "../../usuario/repository/usuarioRepository.js";
import UsuarioService from "../../usuario/service/usuarioService.js";
import ReclamoEstadoRepository from "../../reclamoEstado/repository/reclamoEstadoRepository.js";

export default class ReclamoService {
  constructor(reclamoRepository) {
    this.reclamoRepository = reclamoRepository;
    this.usuarioService = new UsuarioService(new UsuarioRepository(databaseConnection))
    this.reclamoEstadoService = new ReclamoEstadoService(new ReclamoEstadoRepository(databaseConnection))
    this.mailer = sendMail
  }

  async getAll() {
    return await this.reclamoRepository.getAll();
  }

  async getOneById(id) {
    return await this.reclamoRepository.getOneById(id);
  }

  async getIdReclamoEstadoByReclamoId(id) {
    let reclamoEstado = await this.reclamoRepository.getOneById(id)
    let reclamoEstadoID = reclamoEstado.idReclamoEstado
    return reclamoEstadoID;
  }

  async getClienteByReclamoID(id) {
    return await this.reclamoRepository.getClienteByReclamoID(id);
  }

  async create(reclamo) {
    if (!reclamo.idReclamoEstado) {
      reclamo.idReclamoEstado = 1;
    }

    return await this.reclamoRepository.create(reclamo);
  }

  async update(id, changes) {
    if (!changes) {
      changes = { idReclamoEstado: 3 };
    }

    return await this.reclamoRepository.update(id, changes);
  }

  async updateAndSendMail(id, changes) {
    const respuesta = await this.reclamoRepository.updateAndSendMail(id, changes);
    let clienteId = await this.getClienteByReclamoID(id)
    let correo = await this.usuarioService.getCorreoByUsuarioID(clienteId)
    let idReclamoEstado = await this.getIdReclamoEstadoByReclamoId(id)
    let estado = await this.reclamoEstadoService.getDescripcionByIdReclamoEstado(idReclamoEstado)
    let data = {
      "body": {
        "from": process.env.EMAIL_FROM,
        "pass": process.env.EMAIL_APP_PASS,
        "to": correo,
        "subject": "Notificación",
        "text": "Notificación",
        "html": "<h2> Se cambio el estado de tu reclamo a " + estado + " </h2>"
      }
    }
    this.mailer(data)
    return respuesta
  }
}