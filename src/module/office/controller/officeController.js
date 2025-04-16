export default class OfficeController {
  constructor(officeService, authRequest) {
    this.officeService = officeService;
    this.authRequest = authRequest;
    this.ROUTE_BASE = "/office";
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
      const offices = await this.officeService.getAll();
      res.status(200);
      res.send({ data: offices });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error retrieving offices" });
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

      const office = await this.officeService.getOneById(id);

      if (!office) {
        res.status(404);
        res.send({ message: "Office not found" });
        return;
      }

      res.status(200);
      res.send({ data: office });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error retrieving the office" });
    }
  }

  async create(req, res) {
    try {
      const office = await this.officeService.create(req.body);
      res.status(201);
      res.send({ data: office });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error creating the office" });
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

      const office = await this.officeService.update(id, req.body);

      if (!office) {
        res.status(404);
        res.send({ message: "Office not found" });
        return;
      }

      res.status(200);
      res.send({ data: office });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error updating the office" });
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

      const office = await this.officeService.delete(id);

      if (!office) {
        res.status(404);
        res.send({ message: "Office not found" });
        return;
      }

      res.status(200);
      res.send({ message: "Office successfully deleted" });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error deleting the office" });
    }
  }
}
