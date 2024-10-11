export default class ReclamoTipoController {
  constructor(reclamoTipoService) {
    this.reclamoTipoService = reclamoTipoService;
    this.ROUTE_BASE = "/reclamo-tipo";
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
      const reclamoEstados = await this.reclamoTipoService.getAll();
      res.status(200);
      res.send({ data: reclamoEstados });
    } catch (error) {
      res.status(500);
      res.send({ data: "Error al obtener los tipos de reclamo" });
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

      const reclamoTipo = await this.reclamoTipoService.getOneById(id);

      if (!reclamoTipo) {
        res.status(404);
        res.send({ data: "Tipo de reclamo no encontrado" });
        return;
      }

      res.status(200);
      res.send({ data: reclamoTipo });
    } catch (error) {
      res.status(500);
      res.send({ data: "Error al obtener el tipo de reclamo" });
    }
  }

  async create(req, res) {
    try {
      const reclamoTipo = await this.reclamoTipoService.create(req.body);
      res.status(201);
      res.send({ data: reclamoTipo });
    } catch (error) {
      res.status(500);
      res.send({ data: "Error al crear el tipo de reclamo" });
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

      const reclamoTipo = await this.reclamoTipoService.update(id, req.body);

      if (!reclamoTipo) {
        res.status(404);
        res.send({ data: "Tipo de reclamo no encontrado" });
        return;
      }

      res.status(200);
      res.send({ data: reclamoTipo });
    } catch (error) {
      res.status(500);
      res.send({ data: "Error al actualizar el tipo de reclamo" });
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

      const reclamoTipo = await this.reclamoTipoService.delete(id);

      if (!reclamoTipo) {
        res.status(404);
        res.send({ data: "Tipo de reclamo no encontrado" });
        return;
      }

      res.status(200);
      res.send({ data: "Tipo de reclamo eliminado exitosamente" });
    } catch (error) {
      res.status(500);
      res.send({ data: "Error al eliminar el tipo de reclamo" });
    }
  }
}