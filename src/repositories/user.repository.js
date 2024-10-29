import { pool } from "../db.config.js";

// User 데이터 삽입
export const addStore = async (data) => { 
// DB pool에서 사용 가능한 연결을 가져옴 
  const conn = await pool.getConnection(); 

  try {
    const [confirm] = await pool.query( 
      `SELECT EXISTS(SELECT 1 FROM store WHERE store_id = ?) as isExistStore;`,
      data.store_id 
    ); 
	
    if (confirm[0].isExistStore) {
      return null;
    }

		//result에는 inserId,affectedRows를 담고 음
    const [result] = await pool.query(
      `INSERT INTO store (name,address, region_id, score) VALUES (?, ?, ?, ?);`,
      [
        data.name,
        data.address,
        data.region_id,
        data.score,
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

// 사용자 정보 얻기
export const getStore = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    const [store] = await pool.query(`SELECT * FROM store WHERE id = ?;`, storeId);

    console.log(user);

    if (store.length === 0) {
      return null;
    }

    return store;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};