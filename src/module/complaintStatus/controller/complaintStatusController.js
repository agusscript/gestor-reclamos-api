export default class ComplaintStatusController {
  constructor(complaintStatusService, authRequest) {
    this.complaintStatusService = complaintStatusService;
    this.authRequest = authRequest;
    this.ROUTE_BASE = "/complaint-status";
  }

  configRoutes(app) {
    const ROUTE = this.ROUTE_BASE;

    app.get(this.ROUTE_BASE, this.authRequest(["Admin"]), this.getAll.bind(this));
    app.get(`${ROUTE}/:id`, this.authRequest(["Admin"]), this.getOneById.bind(this));
    app.post(ROUTE, this.authRequest(["Admin"]), this.create.bind(this));
    app.patch(`${ROUTE}/:id`, this.authRequest(["Admin"]), this.update.bind(this));
    app.delete(`${ROUTE}/:id`, this.authRequest(["Admin"]), this.delete.bind(this));
  }

  async getAll(req, res) {
    try {
      const complaintStatusList = await this.complaintStatusService.getAll();
      res.status(200);
      res.send({ data: complaintStatusList });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error retrieving complaint status list" });
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

      const complaintStatus = await this.complaintStatusService.getOneById(id);

      if (!complaintStatus) {
        res.status(404);
        res.send({ message: "Complaint status not found" });
        return;
      }

      res.status(200);
      res.send({ data: complaintStatus });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error retrieving the complaint status" });
    }
  }

  async create(req, res) {
    try {
      const complaintStatus = await this.complaintStatusService.create(req.body);
      res.status(201);
      res.send({ data: complaintStatus });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error creating the complaint status" });
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

      const complaintStatus = await this.complaintStatusService.update(id, req.body);

      if (!complaintStatus) {
        res.status(404);
        res.send({ message: "Complaint status not found" });
        return;
      }

      res.status(200);
      res.send({ data: complaintStatus });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error updating the complaint status" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400);
        res.send({ message: "An ID must be provided" });
        return;
      }

      const complaintStatus = await this.complaintStatusService.delete(id);

      if (!complaintStatus) {
        res.status(404);
        res.send({ message: "Complaint status not found" });
        return;
      }

      res.status(200);
      res.send({ message: "Complaint status successfully deleted" });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error deleting the complaint status" });
    }
  }
}