// updateStudent.js
const pool = require('./db'); // 確保 db.js 與此檔在同一資料夾

async function updateStudentName(studentId, newName) {
  let conn;
  try {
    conn = await pool.getConnection();

    // 先查詢是否有該學號的學生
    const [rows] = await conn.query(
      'SELECT * FROM STUDENT WHERE Student_ID = ?',
      [studentId]
    );

    if (rows.length === 0) {
      console.log('查無此人');
      return; // 結束程式
    }

    // 有找到，再進行更新
    const sql = 'UPDATE STUDENT SET Name = ? WHERE Student_ID = ?';
    await conn.query(sql, [newName, studentId]);
    console.log('✅ 已更新學生名稱');

  } catch (err) {
    console.error('❌ 操作失敗：', err.message);
  } finally {
    if (conn) conn.release();
  }
}

// 測試：修改 S10911002 的姓名
updateStudentName('S10911002', '施美君');
