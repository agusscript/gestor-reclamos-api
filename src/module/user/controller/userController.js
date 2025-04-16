export default class UserController {
  constructor(userService, authRequest) {
    this.userService = userService;
    this.authRequest = authRequest;
    this.ROUTE_BASE = "/user";
  }

  configRoutes(app) {
    const ROUTE = this.ROUTE_BASE;

    app.get(this.ROUTE_BASE, this.authRequest(["Admin"]), this.getAll.bind(this));
    app.get(`${ROUTE}/:id`, this.authRequest(["Admin"]), this.getOneById.bind(this));
    app.post(ROUTE, this.authRequest(["Admin"]), this.create.bind(this));
    app.patch(`${ROUTE}/:id`, this.authRequest(["Admin", "Client"]), this.update.bind(this));
    app.delete(`${ROUTE}/:id`, this.authRequest(["Admin"]), this.delete.bind(this));
  }

  async getAll(req, res) {
    try {
      const user = await this.userService.getAll();
      res.status(200);
      res.send({ data: user });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error getting users" });
    }
  }

  async getOneById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400);
        res.send({ message: "You must enter an id" });
        return;
      }

      const user = await this.userService.getOneById(id);

      if (!user) {
        res.status(404);
        res.send({ message: "User not found" });
        return;
      }

      res.status(200);
      res.send({ data: user });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error getting user" });
    }
  }

  async create(req, res) {
    try {
      const user = await this.userService.create(req.body);
      res.status(201);
      res.send({ data: user });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error creating user" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400);
        res.send({ message: "You must enter an id" });
        return;
      }

      const { userId, userRol } = req.user;
      const { idUserTipo } = req.body;

      if (idUserTipo && userRol !== "Admin") {
        res.status(403);
        res.send({ message: "You do not have permission to change the user's role" });
        return;
      }

      if (Number(userId) !== Number(id) && userRol !== "Admin") {
        res.status(403);
        res.send({ message: "You do not have permission to update this user" });
        return;
      }

      const user = await this.userService.update(id, req.body);

      if (!user) {
        res.status(404);
        res.send({ message: "User not found" });
        return;
      }

      res.status(200);
      res.send({ data: user });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error updating user" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400);
        res.send({ message: "You must enter an id" });
        return;
      }

      const user = await this.userService.delete(id);

      if (!user) {
        res.status(404);
        res.send({ message: "User not found" });
        return;
      }

      res.status(200);
      res.send({ message: "User successfully deleted" });
    } catch (error) {
      res.status(500);
      res.send({ message: "Error deleting user" });
    }
  }
}