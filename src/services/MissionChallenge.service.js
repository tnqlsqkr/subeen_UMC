import { modifyStatus, getStatus } from "../repositories/missionChallange.repository.js";
import { responseFromMissionStatus } from "../dtos/MissionChallenge.dto.js";
import { completeMission } from "../repositories/missionChallange.repository.js";

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


export const markMissionAsCompleteService = async (data) => {
  try {
      if (!data.member_id || !data.mission_id) {
          throw new MissionStatusUpdateError("필수 정보가 누락되었습니다.");
      }

      const missionId = await completeMission(data);
      return missionId;
  } catch (error) {
      if (error instanceof MissionStatusUpdateError) {
          throw error;
      }
      throw new Error("미션 완료 처리 중 오류가 발생했습니다.");
  }
};