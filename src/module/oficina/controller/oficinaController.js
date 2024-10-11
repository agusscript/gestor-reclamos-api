export default class OficinaController {
  constructor(oficinaService) {
    this.oficinaService = oficinaService;
    this.ROUTE_BASE = "/oficina";
  }

  configRoutes(app) {
    const ROUTE = this.ROUTE_BASE;

    app.get(this.ROUTE_BASE, this.getAll.bind(this));
    app.get(`${ROUTE}/:id`, this.getOneById.bind(this));
    app.post(ROUTE, this.create.bind(this));
    app.patch(`${ROUTE}/:id`, this.update.bind(this));
    app.delete(`${ROUTE}/:id`, this.delete.bind(this));
  }

  async getAll(req, res) {
    try {
      const office = await this.oficinaService.getAll();
      res.status(200);
      res.send({ data: office });
    } catch (error) {
      res.status(500);
      res.send({ data: "Error al obtener las oficinas" });
    }
  }

  async getOneById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400);
        res.send({ data: "Debe indicar un id" });
        return;
      }

      const office = await this.oficinaService.getOneById(id);

      if (!office) {
        res.status(404);
        res.send({ data: "Oficina no encontrada" });
        return;
      }

      res.status(200);
      res.send({ data: office });
    } catch (error) {
      res.status(500);
      res.send({ data: "Error al obtener la oficina" });
    }
  }

  async create(req, res) {
    try {
      const office = await this.oficinaService.create(req.body);
      res.status(201);
      res.send({ data: office });
    } catch (error) {
      res.status(500);
      res.send({ data: "Error al crear la oficina" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400);
        res.send({ data: "Debe indicar un id" });
        return;
      }

      const office = await this.oficinaService.update(id, req.body);

      if (!office) {
        res.status(404);
        res.send({ data: "Oficina no encontrada" });
        return;
      }

      res.status(200);
      res.send({ data: office });
    } catch (error) {
      res.status(500);
      res.send({ data: "Error al actualizar la oficina" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400);
        res.send({ data: "Debe indicar un id" });
        return;
      }

      const office = await this.oficinaService.delete(id);

      if (!office) {
        res.status(404);
        res.send({ data: "Oficina no encontrada" });
        return;
      }

      res.status(200);
      res.send({ data: "Oficina eliminada exitosamente" });
    } catch (error) {
      res.status(500);
      res.send({ data: "Error al eliminar la oficina" });
    }
  }
}