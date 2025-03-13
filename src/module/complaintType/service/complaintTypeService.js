export default class ComplaintTypeService {
  constructor(complaintTypeRepository) {
    this.complaintTypeRepository = complaintTypeRepository;
  }

  async getAll() {
    return await this.complaintTypeRepository.getAll();
  }

  async getOneById(id) {
    return await this.complaintTypeRepository.getOneById(id);
  }

  async create(complaintType) {
    return await this.complaintTypeRepository.create(complaintType);
  }

  async update(id, changes) {
    return await this.complaintTypeRepository.update(id, changes);
  }

  async delete(id) {
    return await this.complaintTypeRepository.delete(id);
  }
}