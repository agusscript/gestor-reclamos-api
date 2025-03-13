export default class ComplaintTypeRepository {
  constructor(database) {
    this.database = database;
  }

  async getAll() {
    try {
      const sqlQuery = "SELECT * FROM complaint_type WHERE active = 1";
      const [result] = await this.database.query(sqlQuery);
      return result;
    } catch (error) {
      console.error("Error retrieving complaint types: ", error);
      throw error;
    }
  }

  async getOneById(id) {
    try {
      const sqlQuery = "SELECT * FROM complaint_type WHERE id = ? AND active = 1";
      const [rows] = await this.database.query(sqlQuery, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error retrieving complaint type: ", error);
      throw error;
    }
  }

  async create(complaintType) {
    try {
      const sqlQuery = "INSERT INTO complaint_type SET ?";
      const [result] = await this.database.query(sqlQuery, [complaintType]);
      const createdComplaintType = await this.getOneById(result.insertId);
      return createdComplaintType;
    } catch (error) {
      console.error("Error creating complaint type: ", error);
      throw error;
    }
  }

  async update(id, changes) {
    try {
      const sqlQuery = "UPDATE complaint_type SET ? WHERE id = ?";
      await this.database.query(sqlQuery, [changes, id]);
      const complaintType = await this.getOneById(id);
      return complaintType;
    } catch (error) {
      console.error("Error updating complaint type: ", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const complaintType = await this.getOneById(id);

      if (!complaintType) {
        return false;
      }

      const sqlQuery = "UPDATE complaint_type SET active = 0 WHERE id = ?";
      const [result] = await this.database.query(sqlQuery, [id]);
      return result.affectedRows === 1;
    } catch (error) {
      console.error("Error in logical deletion of complaint type: ", error);
      throw error;
    }
  }
}
