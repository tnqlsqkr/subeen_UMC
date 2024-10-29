import { pool } from "../db.config.js";

export const addMission = async (data) => {  
  const conn = await pool.getConnection(); 

  try {
    const [confirm] = await conn.query(
      `SELECT EXISTS(SELECT 1 FROM store WHERE id = ?) AS isExistStore;`,
      data.store_id
    );
		
		
    if (!confirm[0].isExistStore) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO mission (store_id, reward, deadline, mission_spec) VALUES (?, ?, ?, ?);`,
      [
        data.store_id,
        data.reward,
        data.deadline,
        data.mission_spec
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


export const getMission = async (missionId) => {
  const conn = await pool.getConnection();

  try {
    const [mission] = await pool.query(`SELECT * FROM mission WHERE id = ?;`, missionId);

    console.log(mission);

    if (mission.length === 0) {
      return null;
    }
    return mission;
    
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
