export default class AuthController {
  constructor(authService, validationService) {
    this.authService = authService;
    this.validationService = validationService;
    this.ROUTE_BASE = "/auth";
  }

  configRoutes(app) {
    app.post(`${this.ROUTE_BASE}/sign-up`, this.validateSignUp(), this.signUp.bind(this));
    app.post(`${this.ROUTE_BASE}/sign-in`, this.validateSignIn(), this.signIn.bind(this));
  }

  validateSignUp() {
    return [
      this.validationService.body('nombre').exists().withMessage('El nombre es requerido'),
      this.validationService.body('apellido').exists().withMessage('El apellido es requerido'),
      this.validationService
        .body('correoElectronico')
        .isEmail()
        .withMessage('correoElectronico debe ser un email válido'),
      this.validationService
        .body('contrasenia')
        .isLength({ min: 6 })
        .withMessage('La contrasenia debe tener al menos 6 caracteres'),
      this.validationService
        .body('idUsuarioTipo')
        .optional()
        .isEmpty()
        .withMessage('No se puede enviar la propiedad idTipoUsuario')
    ];
  }

  validateSignIn() {
    return [
      this.validationService
        .body('correoElectronico')
        .isEmail()
        .withMessage('correoElectronico debe ser un email válido'),
      this.validationService
        .body('contrasenia')
        .exists()
        .withMessage('La contrasenia es requerida'),
    ];
  }

  async signUp(req, res) {
    const errors = await this.validationService.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await this.authService.signUp(req.body);
      res.status(201);
      res.send({ message: "Usuario registrado correctamente!", data: user });
    } catch (error) {
      console.error(error);
      res.status(400);
      res.send({ message: "Error al registrar el usuario" });
    }
  };

  async signIn(req, res) {
    const errors = await this.validationService.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { correoElectronico, contrasenia } = req.body;
      const { token } = await this.authService.signIn(correoElectronico, contrasenia);
      res.status(200);
      res.send({ message: "Inicio de sesión exitoso!", data: token });
    } catch (error) {
      console.error(error);
      res.status(400);
      res.send({ message: "Error al iniciar sesión" });
    }
  };
}