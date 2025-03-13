export default class AuthService {
  constructor(jwtService, hashService, userService) {
    this.jwtService = jwtService;
    this.hashService = hashService;
    this.userService = userService;
  }

  async signUp(userData) {
    const existingUser = await this.userService.getOneByEmail(userData.email);

    if (existingUser) {
      throw new Error("The email has already been registered")
    };

    userData.password = await this.hashService.hash(userData.password, 10);
    return await this.userService.create(userData);
  };

  async signIn(email, password) {
    const user = await this.userService.getOneByEmail(email);
    const signInError = new Error("The username or password is incorrect");

    if (!user) {
      throw signInError;
    };

    const isPasswordValid = await this.hashService.compare(password, user.password);

    if (!isPasswordValid) {
      throw signInError;
    };

    const { id, role } = user;

    const token = this.jwtService.sign(
      { id, role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token };
  };
};