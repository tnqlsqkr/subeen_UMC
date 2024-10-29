import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/MissionChallenge.dto.js";
import { createMissionStatus  } from "../services/MissionChallenge.service.js";

export const missionStatusController = async (req, res, next) => {
  console.log("미션 상태 변경을 요청했습니다!");
  console.log("body:", req.body); 

  const newMissionStatus = await createMissionStatus(bodyToMission(req.body));
  res.status(StatusCodes.OK).json({ result: newMissionStatus });
};
