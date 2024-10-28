import { pool } from "../db.config.js";

export const addReview = async (data) => {  
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
      `INSERT INTO review (store_id, member_id, score, body) VALUES (?, ?, ?, ?);`,
      [
        data.store_id,
        data.member_id,
        data.score,
        data.body
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


export const getReview = async (reviewId) => {
  const conn = await pool.getConnection();

  try {
    const [review] = await pool.query(`SELECT * FROM review WHERE id = ?;`, reviewId);

    console.log(review);

    if (review.length === 0) {
      return null;
    }
    return review;
    
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
