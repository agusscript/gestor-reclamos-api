export default class OfficeRepository {
  constructor(database) {
    this.database = database;
  }

  async getAll() {
    try {
      const sqlQuery = "SELECT * FROM office WHERE active = 1";
      const [result] = await this.database.query(sqlQuery);
      return result;
    } catch (error) {
      console.error("Error in office query: ", error);
      throw error;
    }
  }

  async getOneById(id) {
    try {
      const sqlQuery = "SELECT * FROM office WHERE id = ? AND active = 1";
      const [rows] = await this.database.query(sqlQuery, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error in office query: ", error);
      throw error;
    }
  }

  async create(office) {
    try {
      const sqlQuery = "INSERT INTO office SET ?";
      const [result] = await this.database.query(sqlQuery, [office]);
      const createdOffice = await this.getOneById(result.insertId);
      return createdOffice;
    } catch (error) {
      console.error("Error creating office: ", error);
      throw error;
    }
  }

  async update(id, changes) {
    try {
      const sqlQuery = "UPDATE office SET ? WHERE id = ?";
      await this.database.query(sqlQuery, [changes, id]);
      const office = await this.getOneById(id);
      return office;
    } catch (error) {
      console.error("Office update failed: ", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const office = await this.getOneById(id);

      if (!office) {
        return false;
      }

      const sqlQuery = "UPDATE office SET active = 0 WHERE id = ?";
      const [result] = await this.database.query(sqlQuery, [id]);
      return result.affectedRows === 1;
    } catch (error) {
      console.error("Error in logical office deletion: ", error);
      throw error;
    }
  }
}
