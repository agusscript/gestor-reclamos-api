export default class ReclamoRepository {
  constructor(database) {
    this.database = database;
  }

  async getAll() {
    try {
      const sqlQuery = "SELECT * FROM reclamos";
      const [result] = await this.database.query(sqlQuery);
      return result;
    } catch (error) {
      console.error("Error en la consulta de los reclamos: ", error);
      throw error;
    }
  }

  async getOneById(id) {
    try {
      const sqlQuery = "SELECT * FROM reclamos WHERE idReclamo = ?";
      const [rows] = await this.database.query(sqlQuery, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error en la consulta del reclamo: ", error);
      throw error;
    }
  }

  async create(reclamo) {
    try {
      const sqlQuery = "INSERT INTO reclamos SET ?, fechaCreado = NOW()";
      const [result] = await this.database.query(sqlQuery, [reclamo]);
      const reclamoCreado = await this.getOneById(result.insertId);
      return reclamoCreado;
    } catch (error) {
      console.error("Error en la creación del reclamo: ", error);
      throw error;
    }
  }

  async update(id, changes) {
    try {
      const sqlQuery = "UPDATE reclamos SET ? WHERE idReclamo = ?";
      await this.database.query(sqlQuery, [changes, id]);
      const reclamo = await this.getOneById(id);
      return reclamo;
    } catch (error) {
      console.error("Error en la actualización del reclamo: ", error);
      throw error;
    }
  }
}