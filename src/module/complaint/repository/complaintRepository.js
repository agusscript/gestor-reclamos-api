export default class ComplaintRepository {
  constructor(database) {
    this.database = database;
  }

  async getAll() {
    try {
      const sqlQuery = "SELECT * FROM complaint";
      const [result] = await this.database.query(sqlQuery);
      return result;
    } catch (error) {
      console.error("Error retrieving complaints: ", error);
      throw error;
    }
  }

  async getOneById(id) {
    try {
      const sqlQuery = `
      SELECT c.*, cs.description as status, ct.description as complaintType
      FROM complaint c
      INNER JOIN complaint_status cs ON c.idComplaintStatus = cs.id
      INNER JOIN complaint_type ct ON c.idComplaintType = ct.id
      WHERE c.id = ?
    `;
      const [rows] = await this.database.query(sqlQuery, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error retrieving complaint: ", error);
      throw error;
    }
  }

  async getReportData() {
    try {
      const sqlQuery = "CALL total_complaint_status()";
      const [result] = await this.database.query(sqlQuery);
      return result[0];
    } catch (error) {
      console.error("Error retrieving report data: ", error);
      throw error;
    }
  }

  async create(complaint) {
    try {
      const sqlQuery = "INSERT INTO complaint SET ?, createdDate = NOW()";
      const [result] = await this.database.query(sqlQuery, [complaint]);
      const createdComplaint = await this.getOneById(result.insertId);
      return createdComplaint;
    } catch (error) {
      console.error("Error creating complaint: ", error);
      throw error;
    }
  }

  async update(id, changes) {
    try {
      const sqlQuery = "UPDATE complaint SET ? WHERE id = ?";
      await this.database.query(sqlQuery, [changes, id]);
      const complaint = await this.getOneById(id);
      return complaint;
    } catch (error) {
      console.error("Error updating complaint: ", error);
      throw error;
    }
  }
}
