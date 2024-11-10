import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";

export const addReview = async (data) => {
    try {
      const created = await prisma.review.create({
        data: {
          storeId: data.store_id,
          memberId: data.member_id,
          score: data.score,
          body: data.body
        }
      });
      return created.id; // 새로 생성된 리뷰의 ID 반환
    } catch (err) {
      throw new Error(
        `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
      );
    }
};


export const getReview = async (reviewId) => {
    try {
        const review = await prisma.review.findFirstOrThrow({ where: { id: reviewId } });
        return review;
    } catch (error) {
        console.error("Error fetching review:", error);
        throw new Error("Review not found");
    }
};

//특정 사용자가 작성한 리뷰 조회 
export const getUserReviews = async (memberId) => {
    try{
        const reviews = await prisma.review.findMany({
            where : {memberId : memberId},
            include : {user : true},
        });
        return reviews;
    } catch(err){
        console.log("Error fetching userReviews: ", error);
        throw new Error("User Reviews not found");
    }
}

//특정 가게의 모든 리뷰 조회
export const getAllStoreReviews = async (storeId)=> {
    try {
        const reviews = await prisma.review.findMany({
            where : {storeId : storeId},
            include : { memberr : true},
        });
    } catch(error){
        console.log("Error fetching get all store reviews: ", error);
        throw new Error("Store reviews not found");
    }
}