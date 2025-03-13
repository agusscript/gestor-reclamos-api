export default class ComplaintTypeController {
  constructor(complaintTypeService, authRequest) {
    this.complaintTypeService = complaintTypeService;
    this.authRequest = authRequest;
    this.ROUTE_BASE = "/complaint-type";
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
      const complaintTypes = await this.complaintTypeService.getAll();
      res.status(200);
      res.send({ data: complaintTypes });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error retrieving complaint types" });
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

      const complaintType = await this.complaintTypeService.getOneById(id);

      if (!complaintType) {
        res.status(404);
        res.send({ message: "Complaint type not found" });
        return;
      }

      res.status(200);
      res.send({ data: complaintType });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error retrieving the complaint type" });
    }
  }

  async create(req, res) {
    try {
      const complaintType = await this.complaintTypeService.create(req.body);
      res.status(201);
      res.send({ data: complaintType });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error creating the complaint type" });
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

      const complaintType = await this.complaintTypeService.update(id, req.body);

      if (!complaintType) {
        res.status(404);
        res.send({ message: "Complaint type not found" });
        return;
      }

      res.status(200);
      res.send({ data: complaintType });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error updating the complaint type" });
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

      const complaintType = await this.complaintTypeService.delete(id);

      if (!complaintType) {
        res.status(404);
        res.send({ message: "Complaint type not found" });
        return;
      }

      res.status(200);
      res.send({ message: "Complaint type successfully deleted" });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error deleting the complaint type" });
    }
  }
}
