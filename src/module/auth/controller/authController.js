export default class AuthController {
  constructor(authService) {
    this.authService = authService;
    this.ROUTE_BASE = "/auth";
  }

  configRoutes(app) {
    app.post(`${this.ROUTE_BASE}/sign-up`, this.signUp.bind(this));
    app.post(`${this.ROUTE_BASE}/sign-in`, this.signIn.bind(this));
  }

  async signUp(req, res) {
    try {
      const user = await this.authService.signUp(req.body);
      res.status(201);
      res.send({ message: "Usuario registrado correctamente!", data: user });
    } catch (error) {
      res.status(400);
      console.log(error);
      res.send({ message: "Error al registrar el usuario" });
    }
  };

  async signIn(req, res) {
    try {
      const { correoElectronico, contrasenia } = req.body;

      if (!correoElectronico || !contrasenia) {
        return res.status(400).send({ message: "correoElectronico y contrasenia son requeridos" });
      }

      const { token } = await this.authService.signIn(correoElectronico, contrasenia);
      res.status(200);
      res.send({ message: "Inicio de sesión exitoso!", data: token });
    } catch (error) {
      res.status(400);
      console.log(error);
      res.send({ message: "Error al iniciar sesión" });
    }
  };
}