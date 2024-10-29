import { pool } from "../db.config.js";

export const modifyStatus = async (data) => {  
  const conn = await pool.getConnection(); 

  try {
    const [confirm] = await conn.query(
      `SELECT EXISTS(
         SELECT 1 FROM member_mission 
         WHERE member_id = ? AND mission_id = ? AND status = "도전중"
       ) AS isExistStatus;`,
      [data.member_id, data.mission_id]
    );
		
		
    if (confirm[0].isExistStatus) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO member_mission (member_id, mission_id, status) VALUES (?, ?, ?);`,
      [
        data.member_id,
        data.mission_id,
        data.status
      ]

    );
    return result.insertId;
    
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};


export const getStatus = async (modifyStatusId) => {
  const conn = await pool.getConnection();

  try {
    const [missionStatus] = await pool.query(`SELECT * FROM member_mission WHERE id = ?;`, modifyStatusId);

    console.log(missionStatus);

    if (missionStatus.length === 0) {
      return null;
    }
    return missionStatus;
    
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
