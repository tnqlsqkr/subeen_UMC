import { createStore,listStoreReviews, listStoreMissionsService } from "../services/store.service.js";
import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";

export const addStoreController = async (req, res, next) => {
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
  const storeId = parseInt(req.params.storeId);
  try {
      const missions = await listStoreMissionsService(storeId);
      res.status(StatusCodes.OK).json({ result: missions });
  } catch (error) {
      next(error);
  }
};