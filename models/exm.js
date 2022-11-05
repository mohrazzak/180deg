const db = require(`../config/db`);

class Exm {
  constructor(uniData) {
    this.url = uniData.url;
    this.theYear = uniData.theYear;
    this.uni_id = uniData.uni_id;
  }

  save() {
    const values = [this.url, this.theYear, this.uni_id];
    let sql = `
    INSERT INTO old_exam (
    url,
    theYear,
    uni_id
    ) VALUES (?);`;
    return db.query(sql, [values]);
  }

  static findAll() {
    const sql = `SELECT * FROM old_exam;`;
    return db.execute(sql);
  }

  static findById(id) {
    const sql = `SELECT * FROM old_exam WHERE id = ?;`;
    return db.query(sql, id);
  }

  static update(values) {
    const sql = `UPDATE old_exam SET url = ?, theYear = ?, uni_id = ? where id = ?;`;
    return db.query(sql, values);
  }
  static async delete(id) {
    const sql = `DELETE FROM old_exam WHERE id = ?;`;
    await db.query(sql, id);
  }
}

module.exports = Exm;
