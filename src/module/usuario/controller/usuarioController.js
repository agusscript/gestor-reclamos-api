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
      const usuario = await this.usuarioService.getAll();
      res.status(200);
      res.send({ data: usuario });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al obtener los usuarios" });
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

      const usuario = await this.usuarioService.getOneById(id);

      if (!usuario) {
        res.status(404);
        res.send({ message: "Usuario no encontrado" });
        return;
      }

      res.status(200);
      res.send({ data: usuario });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al obtener el usuario" });
    }
  }

  async create(req, res) {
    try {
      const usuario = await this.usuarioService.create(req.body);
      res.status(201);
      res.send({ data: usuario });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al crear el usuario" });
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

      const usuario = await this.usuarioService.update(id, req.body);

      if (!usuario) {
        res.status(404);
        res.send({ message: "Usuario no encontrado" });
        return;
      }

      res.status(200);
      res.send({ data: usuario });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al actualizar el usuario" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400);
        res.send({ message: "Debe indicar un id" });
        return;
      }

      const usuario = await this.usuarioService.delete(id);

      if (!usuario) {
        res.status(404);
        res.send({ message: "Usuario no encontrado" });
        return;
      }

      res.status(200);
      res.send({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error al eliminar el usuario" });
    }
  }
}