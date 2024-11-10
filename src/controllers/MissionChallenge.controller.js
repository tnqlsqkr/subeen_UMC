import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/MissionChallenge.dto.js";
import { createMissionStatus, markMissionAsCompleteService } from "../services/MissionChallenge.service.js";

export const missionStatusController = async (req, res, next) => {
  console.log("미션 상태 변경을 요청했습니다!");
  console.log("body:", req.body); 

  const newMissionStatus = await createMissionStatus(bodyToMission(req.body));
  res.status(StatusCodes.OK).json({ result: newMissionStatus });
};

export const completeMissionController = async (req, res, next) => {
  console.log("진행 중인 미션을 진행 완료로 변경 요청");
  console.log("body:", req.body);

  try {
      const missionId = await markMissionAsCompleteService(bodyToMission(req.body));
      if (!missionId) {
          return res.status(StatusCodes.NOT_FOUND).json({ message: "진행 중인 미션이 아닙니다." });
      }
      res.status(StatusCodes.OK).json({ result: missionId });
  } catch (error) {
      next(error);
  }
};