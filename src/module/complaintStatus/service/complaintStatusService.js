export default class ComplaintStatusService {
  constructor(complaintStatusRepository) {
    this.complaintStatusRepository = complaintStatusRepository;
  }

  async getAll() {
    return await this.complaintStatusRepository.getAll();
  }

  async getOneById(id) {
    return await this.complaintStatusRepository.getOneById(id);
  }

  async create(complaintStatus) {
    return await this.complaintStatusRepository.create(complaintStatus);
  }

  async update(id, changes) {
    return await this.complaintStatusRepository.update(id, changes);
  }

  async delete(id) {
    return await this.complaintStatusRepository.delete(id);
  }
}