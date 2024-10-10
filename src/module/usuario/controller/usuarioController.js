export default class UsuarioController {
  constructor(usuarioService) {
    this.usuarioService = usuarioService;
    this.ROUTE_BASE = "/usuario";
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
      const user = await this.usuarioService.getAll();
      res.status(200);
      res.send({ data: user });
    } catch (error) {
      res.status(500);
      res.send({ data: "Error al obtener los usuarios" });
    }
  }

  async getOneById(req, res) {
    try {
      const { id } = req.params;
      const user = await this.usuarioService.getOneById(id);

      if (!user) {
        res.status(404);
        res.send({ data: "Usuario no encontrado" });
        return;
      }

      res.status(200);
      res.send({ data: user });
    } catch (error) {
      res.status(500);
      res.send({ data: "Error al obtener el usuario" });
    }
  }

  async create(req, res) {
    try {
      const user = await this.usuarioService.create(req.body);
      res.status(201);
      res.send({ data: user });
    } catch (error) {
      res.status(500);
      res.send({ data: "Error al crear el usuario" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const user = await this.usuarioService.update(id, req.body);

      if (!user) {
        res.status(404);
        res.send({ data: "Usuario no encontrado" });
        return;
      }

      res.status(200);
      res.send({ data: user });
    } catch (error) {
      res.status(500);
      res.send({ data: "Error al actualizar el usuario" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await this.usuarioService.delete(id);

      if (!user) {
        res.status(404);
        res.send({ data: "Usuario no encontrado" });
        return;
      }

      res.status(200);
      res.send({ data: "Usuario eliminado exitosamente" });
    } catch (error) {
      res.status(500);
      res.send({ data: "Error al eliminar el usuario" });
    }
  }
}