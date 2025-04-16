export default class ComplaintService {
  constructor(complaintRepository, userService, emailService) {
    this.complaintRepository = complaintRepository;
    this.userService = userService;
    this.emailService = emailService;
  }

  async getAll() {
    return await this.complaintRepository.getAll();
  }

  async getOneById(id) {
    return await this.complaintRepository.getOneById(id);
  }

  async getReportData() {
    return await this.complaintRepository.getReportData();
  }

  async create(complaint) {
    if (!complaint.idComplaintStatus) {
      complaint.idComplaintStatus = 1;
    }

    return await this.complaintRepository.create(complaint);
  }

  async update(id, changes) {
    if (!changes) {
      changes = { idComplaintStatus: 3 };

      const complaint = await this.getOneById(id);

      const idUserCreator = complaint.idUserCreator;
      const userCreator = await this.userService.getOneById(idUserCreator);
      const emailTo = userCreator.email;

      await this.emailService.send({
        from: process.env.EMAIL_FROM,
        to: emailTo,
        subject: "Cambio en el estado de su reclamo",
        template: "complaintStatus",
        context: {
          name: userCreator.name,
          lastName: userCreator.lastName,
          id,
          estado: "Cancelado",
        }
      });
    }

    return await this.complaintRepository.update(id, changes);
  }
}