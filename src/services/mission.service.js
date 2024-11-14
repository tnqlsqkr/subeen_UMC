import { addMission, getMission, getInProcessMissions } from "../repositories/mission.repository.js";
import { responseFromInProcessMissions } from "../dtos/mission.dto.js";
import { ActiveMissionListFetchError } from "../errors.js"; 

export const createMission  = async (data) => {
    const addMissionId = await addMission({
        store_id : data.store_id,
      reward : data.reward,
      deadline : data.deadline,
      mission_spec : data.mission_spec,
    });
  
    if (addMissionId === null) {
      throw new Error("존재하지 않는 가게입니다.");
    }
  
    const mission = await getMission(addMissionId);
    return responseFromMission(mission);
  };

export const listInProcessMissionsService = async (memberId) => {
    try {
        if (!memberId || isNaN(memberId)) {
            throw new ActiveMissionListFetchError("올바르지 않은 사용자 ID입니다.");
        }

        const missions = await getInProcessMissions(memberId);
        return responseFromInProcessMissions(missions);
    } catch (error) {
        if (error instanceof ActiveMissionListFetchError) {
            throw error;
        }
        throw new Error("진행 중인 미션 목록 조회 중 오류가 발생했습니다.");
    }
};

