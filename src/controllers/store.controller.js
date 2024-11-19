import { createStore,listStoreReviews, listStoreMissionsService } from "../services/store.service.js";
import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";

export const addStoreController = async (req, res, next) => {
    /*
    #swagger.summary = '가게 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              address: { type: "string" },
              regionId: { type: "number" },
	            score : { type: "number" }
            }
          }
        }
      }
    }
    #swagger.responses[200] = {
        description: "가게 추가 성공",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "SUCCESS" },
                        error: { type: "object", nullable: true, example: null },
                    },
                    success: {
                        type: "object",
                        properties: {
                            id: { type: "number" },
                        }
                    } 
                }
            }
        } 
    };
    #swagger.responses[400] = {
        description: "가게 추가 실패",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: { 
                            type: "object",
                            properties: {
                                errorCode: { type: "string" },
                                reason: { type: "string" },
                                data: { type: "object"}
                            }
                        },
                        success: { type: "object", nullable: true, example: null }
                    }
                }
            }
        } 
    };    
    */

  console.log("해당 지역에 가게 추가를 요청합니다");
  console.log("body:", req.body);

  const user = await createStore(bodyToStore(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};

export const handleListStoreReviews = async (req, res, next) => {
    /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
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
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        member: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        content: { type: "string" }
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
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};

export const getStoreMissionsController = async (req, res, next) => {
 /*
    #swagger.summary = '가게의 미션 목록 조회 API';
    #swagger.responses[200] = {
      description: "가게의 미션 목록 조회 성공 응답",
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
                        storeName: { type: "string"},
                        reward : { type : "number" },
                        deadline: { type: "string", format: "date" },
                        missionSpec: { type: "string"},
                        createdAt: { type: "string", format: "date" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type:  "string", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */

  const storeId = parseInt(req.params.storeId);
  try {
      const missions = await listStoreMissionsService(storeId);
      res.status(StatusCodes.OK).json({ result: missions });
  } catch (error) {
      next(error);
  }
};