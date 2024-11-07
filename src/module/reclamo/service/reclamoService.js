export default class ReclamoService {
  constructor(reclamoRepository, usuarioService, emailService) {
    this.reclamoRepository = reclamoRepository;
    this.usuarioService = usuarioService;
    this.emailService = emailService;
  }

  async getAll() {
    return await this.reclamoRepository.getAll();
  }

  async getOneById(id) {
    return await this.reclamoRepository.getOneById(id);
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

      const reclamo = await this.getOneById(id);

      const idUsuarioCreador = reclamo.idUsuarioCreador;
      const usuarioCreador = await this.usuarioService.getOneById(idUsuarioCreador);
      const emailTo = usuarioCreador.correoElectronico;

      await this.emailService.send(
        process.env.EMAIL_FROM,
        emailTo,
        "Cambio en el estado de su reclamo",
        "Su reclamo ha cambiado de estado"
      );
    }

    return await this.reclamoRepository.update(id, changes);
  }
}