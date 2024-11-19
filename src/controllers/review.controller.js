import { StatusCodes } from "http-status-codes";
import { listUserReviewsService, createReview } from "../services/review.service.js";
import { bodyToReview } from "../dtos/review.dto.js";


export const reviewController = async (req, res, next) => {
    /*
    #swagger.summary = '리뷰 작성 API'
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        storeId: { type: "number"},
                        memberId: {type: "number" },
                        score: { type: "number" },
                        body: { type: "string"}
                    }
                }
            }
        }
    };
    
    #swagger.responses[200] = {
        description: "리뷰 작성 성공",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "SUCCESS" },
                        error: { type: "object", nullable: true, example: null },
                        success: {
                            type: "object",
                            properties: {
                                id: { type: "number" },
                                storeId: { type: "number" },
                                memberId: { type: "number" },
                                score: { type: "number" }, 
                                body: { type: "string" }
                            }
                        }
                    }
                }
            }
        }
    };
    */
  console.log("리뷰 추가하기를 요청했습니다!");
  console.log("body:", req.body); 

  const newReview = await createReview(bodyToReview(req.body));
  res.status(StatusCodes.OK).json({ result: newReview });
};

export const getMyReviewsController = async (req, res, next) => {
    /*
    #swagger.summary = '내 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        storeId: { type: "number" },
                        storeName: { type: "string" },
                        memberId: { type: "number" },
                        score : { type : "number"},
                        body: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
    try {
        const memberId = parseInt(req.params.memberId);
        const result = await listUserReviewsService(memberId);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
};