export default class OficinaRepository {
  constructor(database) {
    this.database = database;
  }

  async getAll() {
    try {
      const sqlQuery = "SELECT * FROM oficinas WHERE activo = 1";
      const [result] = await this.database.query(sqlQuery);
      return result;
    } catch (error) {
      console.error("Error en la consulta de oficinas: ", error);
      throw error;
    }
  }

  async getOneById(id) {
    try {
      const sqlQuery = "SELECT * FROM oficinas WHERE idOficina = ? AND activo = 1";
      const [rows] = await this.database.query(sqlQuery, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error en la consulta de oficina: ", error);
      throw error;
    }
  }

  async create(office) {
    try {
      const sqlQuery = "INSERT INTO oficinas SET ?";
      const [result] = await this.database.query(sqlQuery, [office]);
      const createdoffice = this.getOneById(result.insertId);
      return createdoffice;
    } catch (error) {
      console.error("Error en la creación de oficina: ", error);
      throw error;
    }
  }

  async update(id, changes) {
    try {
      const sqlQuery = "UPDATE oficinas SET ? WHERE idOficina = ?";
      await this.database.query(sqlQuery, [changes, id]);
      const office = await this.getOneById(id);
      return office;
    } catch (error) {
      console.error("Error en la actualización de oficina: ", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const office = await this.getOneById(id);

      if (!office) {
        return false;
      }

      const sqlQuery = "UPDATE oficinas SET activo = 0 WHERE idOficina = ?";
      const [result] = await this.database.query(sqlQuery, [id]);
      return result.affectedRows === 1;
    } catch (error) {
      console.error("Error en la eliminación lógica de oficina: ", error);
      throw error;
    }
  }
}