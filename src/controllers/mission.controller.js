import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import {  createMission, listInProcessMissionsService } from "../services/mission.service.js";
import { ActiveMissionListFetchError } from "../errors.js";

export const missionController = async (req, res, next) => {
    /*
    #swagger.summary = '가게에 미션 추가 API';
    #swagger.requestBody = {
	    required : true,
	    content : {
		    "application/json": {
			    schema : {
				    type : "object",
				    properties : {
					    storeId: { type: "number" },
					    reward: { type: "number" },
					    deadline: { type: "string", format: "date" },
					    missionSpec: { type: "string" }
			    	}
			    }
	    	}
	    }
    };
    #swagger.responses[200] = {
        description: "가게에 미션 추가 성공 응답",
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
                                reward: { type: "number" },
                                deadline: { type: "string", format: "date" },
                                missionSpec : { type: "string" },
                                status : { type: "string" }
                            }
                        }
                    }
                }
            }
        }
    };
    #swagger.responses[400] = {
        description: "가게에 미션 추가 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "U001" },
                                reason: { type: "string" },
                                data: { type: "object" }
                            }
                        },
                        success: { type: "object", nullable: true, example: null }
                    }
                }
            }
        }
    };
    */
    console.log("미션 추가하기를 요청했습니다!");
    console.log("body:", req.body); 
  
    const newMission = await createMission(bodyToMission(req.body));
    res.status(StatusCodes.OK).json({ result: newMission });
  };

export const getInProcessMissionsController = async (req, res, next) => {
    /*
    #swagger.summary = '진행 중인 미션 목록 조회 API';
    #swagger.responses[200] = {
        description: "진행 중인 미션 목록 조회 성공 응답",
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
                                            user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
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

    try {
        const memberId = parseInt(req.params.memberId);
        const missions = await listInProcessMissionsService(memberId);
        res.status(StatusCodes.OK).success(missions);

    } catch (error) {
        if (error instanceof ActiveMissionListFetchError) {
            res.status(error.statusCode).error({
                errorCode: error.errorCode,
                reason: error.reason,
                data: error.data
            });[]
        } else {
            next(error);
        }
    }
};