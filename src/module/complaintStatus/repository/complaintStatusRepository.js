export default class ComplaintStatusRepository {
  constructor(database) {
    this.database = database;
  }

  async getAll() {
    try {
      const sqlQuery = "SELECT * FROM complaint_status WHERE active = 1";
      const [result] = await this.database.query(sqlQuery);
      return result;
    } catch (error) {
      console.error("Error retrieving complaint statuses: ", error);
      throw error;
    }
  }

  async getOneById(id) {
    try {
      const sqlQuery = "SELECT * FROM complaint_status WHERE id = ? AND active = 1";
      const [rows] = await this.database.query(sqlQuery, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error retrieving complaint status: ", error);
      throw error;
    }
  }

  async create(complaintStatus) {
    try {
      const sqlQuery = "INSERT INTO complaint_status SET ?";
      const [result] = await this.database.query(sqlQuery, [complaintStatus]);
      const createdComplaintStatus = await this.getOneById(result.insertId);
      return createdComplaintStatus;
    } catch (error) {
      console.error("Error creating complaint status: ", error);
      throw error;
    }
  }

  async update(id, changes) {
    try {
      const sqlQuery = "UPDATE complaint_status SET ? WHERE id = ?";
      await this.database.query(sqlQuery, [changes, id]);
      const complaintStatus = await this.getOneById(id);
      return complaintStatus;
    } catch (error) {
      console.error("Error updating complaint status: ", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const complaintStatus = await this.getOneById(id);

      if (!complaintStatus) {
        return false;
      }

      const sqlQuery = "UPDATE complaint_status SET active = 0 WHERE id = ?";
      const [result] = await this.database.query(sqlQuery, [id]);
      return result.affectedRows === 1;
    } catch (error) {
      console.error("Error in logical deletion of complaint status: ", error);
      throw error;
    }
  }
}
