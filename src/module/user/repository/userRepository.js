export default class UserRepository {
  constructor(database) {
    this.database = database;
  }

  async getAll() {
    try {
      const sqlQuery = "SELECT * FROM user WHERE active = 1";
      const [result] = await this.database.query(sqlQuery);
      return result;
    } catch (error) {
      console.error("Error in user query: ", error);
      throw error;
    }
  }

  async getOneById(id) {
    try {
      const sqlQuery = `
      SELECT u.*, ut.description as role
      FROM user u
      INNER JOIN user_type ut ON u.idUserType = ut.id
      WHERE u.id = ? AND u.active = 1
    `;
      const [rows] = await this.database.query(sqlQuery, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error in user query: ", error);
      throw error;
    }
  }

  async getOneByEmail(email) {
    try {
      const sqlQuery = `
      SELECT u.*, ut.description as role
      FROM user u
      INNER JOIN user_type ut ON u.idUserType = ut.id
      WHERE u.email = ? AND u.active = 1
    `;
      const [rows] = await this.database.query(sqlQuery, [email]);
      return rows[0];
    } catch (error) {
      console.error("Error in user query: ", error);
      throw error;
    }
  }

  async create(user) {
    try {
      const sqlQuery = "INSERT INTO user SET ?";
      const [result] = await this.database.query(sqlQuery, [user]);
      const createdUser = await this.getOneById(result.insertId);
      return createdUser;
    } catch (error) {
      console.error("Error creating user: ", error);
      throw error;
    }
  }

  async update(id, changes) {
    try {
      const sqlQuery = "UPDATE user SET ? WHERE id = ?";
      await this.database.query(sqlQuery, [changes, id]);
      const user = await this.getOneById(id);
      return user;
    } catch (error) {
      console.error("User update failed: ", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const user = await this.getOneById(id);

      if (!user) {
        return false;
      }

      const sqlQuery = "UPDATE user SET active = 0 WHERE id = ?";
      const [result] = await this.database.query(sqlQuery, [id]);
      return result.affectedRows === 1;
    } catch (error) {
      console.error("Error in logical user deletion: ", error);
      throw error;
    }
  }
}
