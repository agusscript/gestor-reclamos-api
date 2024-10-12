export default class ReclamoService {
  constructor(reclamoRepository) {
    this.reclamoRepository = reclamoRepository;
  }

  async getAll() {
    return await this.reclamoRepository.getAll();
  }

  async getOneById(id) {
    return await this.reclamoRepository.getOneById(id);
  }

  async create(reclamo) {
    return await this.reclamoRepository.create(reclamo);
  }

  async update(id, changes) {
    return await this.reclamoRepository.update(id, changes);
  }
}