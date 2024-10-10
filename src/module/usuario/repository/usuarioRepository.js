export default class UsuarioRepository {
  constructor(database) {
    this.database = database;
  }

  async getAll() {
    try {
      const sqlQuery = "SELECT * FROM usuarios WHERE activo = 1";
      const [result] = await this.database.query(sqlQuery);
      return result;
    } catch (error) {
      console.error("Error en la consulta de usuarios: ", error);
      throw error;
    }
  }

  async getOneById(id) {
    try {
      const sqlQuery = "SELECT * FROM usuarios WHERE idUsuario = ? AND activo = 1";
      const [rows] = await this.database.query(sqlQuery, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error en la consulta de usuario: ", error);
      throw error;
    }
  }

  async create(user) {
    try {
      const sqlQuery = "INSERT INTO usuarios SET ?";
      const [result] = await this.database.query(sqlQuery, [user]);
      const createdUser = this.getOneById(result.insertId);
      return createdUser;
    } catch (error) {
      console.error("Error en la creación de usuario: ", error);
      throw error;
    }
  }

  async update(id, changes) {
    try {
      const sqlQuery = "UPDATE usuarios SET ? WHERE idUsuario = ?";
      await this.database.query(sqlQuery, [changes, id]);
      const user = await this.getOneById(id);
      return user;
    } catch (error) {
      console.error("Error en la actualización de usuario: ", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const user = await this.getOneById(id);

      if (!user) {
        return false;
      }

      const sqlQuery = "UPDATE usuarios SET activo = 0 WHERE idUsuario = ?";
      const [result] = await this.database.query(sqlQuery, [id]);
      return result.affectedRows === 1;
    } catch (error) {
      console.error("Error en la eliminación lógica de usuario: ", error);
      throw error;
    }
  }
}