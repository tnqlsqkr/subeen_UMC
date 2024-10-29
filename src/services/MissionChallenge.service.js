import { modifyStatus, getStatus } from "../repositories/MissionChallenge.repository.js";
import { responseFromMissionStatus } from "../dtos/MissionChallenge.dto.js";

export const createMissionStatus  = async (data) => {
  const modifyStatusId = await modifyStatus({
	  member_id : body.member_id,
    mission_id : body.mission_id,
    status : body.staus,
  });

  if (modifyStatusId === null) {
    throw new Error("이미 도전중인 미션입니다. ");
  }

  const missionStatus = await getStatus(modifyStatusId);
  return responseFromMissionStatus(missionStatus);
};