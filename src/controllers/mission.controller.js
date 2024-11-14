import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import {  createMission, listInProcessMissionsService } from "../services/mission.service.js";
import { ActiveMissionListFetchError } from "../errors.js";

export const missionController = async (req, res, next) => {
    console.log("미션 추가하기를 요청했습니다!");
    console.log("body:", req.body); 
  
    const newMission = await createMission(bodyToMission(req.body));
    res.status(StatusCodes.OK).json({ result: newMission });
  };

export const getInProcessMissionsController = async (req, res, next) => {
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