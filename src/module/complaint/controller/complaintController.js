import { validateCreate } from "./validations.js";

export default class ComplaintController {
  constructor(complaintService, authRequest, validationService, reportService) {
    this.complaintService = complaintService;
    this.authRequest = authRequest;
    this.validationService = validationService;
    this.reportService = reportService;
    this.ROUTE_BASE = "/complaint";
  }

  configRoutes(app) {
    const ROUTE = this.ROUTE_BASE;

    app.get(this.ROUTE_BASE, this.authRequest(["Admin"]), this.getAll.bind(this));
    app.get(`${ROUTE}/:id`, this.authRequest(["Admin", "Client"]), this.getOneById.bind(this));
    app.get(`${ROUTE}/report/:format`, this.authRequest(["Admin"]), this.generateReport.bind(this));
    app.post(
      ROUTE, this.authRequest(["Admin", "Client"]),
      validateCreate(this.validationService),
      this.create.bind(this)
    );
    app.patch(`${ROUTE}/:id`, this.authRequest(["Admin"]), this.update.bind(this));
    app.patch(`${ROUTE}/:id/cancel`, this.authRequest(["Admin", "Client"]), this.cancel.bind(this));
  }

  async getAll(req, res) {
    try {
      const complaints = await this.complaintService.getAll();
      res.status(200);
      res.send({ data: complaints });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error retrieving complaints" });
    }
  }

  async getOneById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400);
        res.send({ message: "An ID must be provided" });
        return;
      }

      const complaint = await this.complaintService.getOneById(id);

      if (!complaint) {
        res.status(404);
        res.send({ message: "Complaint not found" });
        return;
      }

      res.status(200);
      res.send({ data: complaint });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error retrieving the complaint" });
    }
  }

  async generateReport(req, res) {
    try {
      const { format } = req.params;

      if (format !== 'pdf') {
        res.status(400);
        res.send({ message: "Unsupported format. Only PDF is allowed" });
        return;
      }

      const reportData = await this.complaintService.getReportData();
      const pdfBuffer = await this.reportService.generatePDF(reportData);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="report.pdf"',
      });
      res.end(pdfBuffer);
    } catch (error) {
      res.status(500);
      res.send({ message: "Error generating the report" });
    }
  }

  async create(req, res) {
    const errors = await this.validationService.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.user;
      const userData = { ...req.body, idUserCreator: id };
      const complaint = await this.complaintService.create(userData);
      res.status(201);
      res.send({ data: complaint });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error creating the complaint" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400);
        res.send({ message: "An ID must be provided" });
        return;
      }

      const complaint = await this.complaintService.update(id, req.body);

      if (!complaint) {
        res.status(404);
        res.send({ message: "Complaint not found" });
        return;
      }

      res.status(200);
      res.send({ data: complaint });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error updating the complaint" });
    }
  }

  async cancel(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400);
        res.send({ message: "An ID must be provided" });
        return;
      }

      const complaint = await this.complaintService.getOneById(id);

      if (!complaint) {
        res.status(404);
        res.send({ message: "Complaint not found" });
        return;
      }

      if (complaint.status !== "Created") {
        res.status(400);
        res.send({ message: "Only complaints with status 'Created' can be canceled" });
        return;
      }

      const updatedComplaint = await this.complaintService.update(id);

      res.status(200);
      res.send({ message: "Complaint canceled successfully", data: updatedComplaint });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error canceling the complaint" });
    }
  }
}
