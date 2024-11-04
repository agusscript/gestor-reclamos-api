export default class ReclamoController {
  constructor(reclamoService, authRequest) {
    this.reclamoService = reclamoService;
    this.authRequest = authRequest;
    this.ROUTE_BASE = "/reclamo";
  }

  configRoutes(app) {
    const ROUTE = this.ROUTE_BASE;

    app.get(this.ROUTE_BASE, this.authRequest(["Administrador"]), this.getAll.bind(this));
    app.get(`${ROUTE}/:id`, this.authRequest(["Administrador"]), this.getOneById.bind(this));
    app.post(ROUTE, this.authRequest(["Administrador"]), this.create.bind(this));
    app.patch(`${ROUTE}/:id`, this.authRequest(["Administrador"]), this.update.bind(this));
  }

  async getAll(req, res) {
    try {
      const reclamo = await this.reclamoService.getAll();
      res.status(200);
      res.send({ data: reclamo });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al obtener los reclamos" });
    }
  }

  async getOneById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400);
        res.send({ message: "Debe indicar un id" });
        return;
      }

      const reclamo = await this.reclamoService.getOneById(id);

      if (!reclamo) {
        res.status(404);
        res.send({ message: "Reclamo no encontrada" });
        return;
      }

      res.status(200);
      res.send({ data: reclamo });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al obtener el reclamo" });
    }
  }

  async create(req, res) {
    try {
      const reclamo = await this.reclamoService.create(req.body);
      res.status(201);
      res.send({ data: reclamo });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al crear el reclamo" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400);
        res.send({ message: "Debe indicar un id" });
        return;
      }

      const reclamo = await this.reclamoService.update(id, req.body);

      if (!reclamo) {
        res.status(404);
        res.send({ message: "Reclamo no encontrado" });
        return;
      }

      res.status(200);
      res.send({ data: reclamo });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al actualizar el reclamo" });
    }
  }
}