import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { createMission  } from "../services/mission.service.js";

export const missionController = async (req, res, next) => {
  console.log("미션 추가하기를 요청했습니다!");
  console.log("body:", req.body); 

  const newMission = await createMission(bodyToMission(req.body));
  res.status(StatusCodes.OK).json({ result: newMission });
};
