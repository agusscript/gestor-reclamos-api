export default class OfficeService {
  constructor(officeRepository) {
    this.officeRepository = officeRepository;
  }

  async getAll() {
    return await this.officeRepository.getAll();
  }

  async getOneById(id) {
    return await this.officeRepository.getOneById(id);
  }

  async create(office) {
    return await this.officeRepository.create(office);
  }

  async update(id, changes) {
    return await this.officeRepository.update(id, changes);
  }

  async delete(id) {
    return await this.officeRepository.delete(id);
  }
}