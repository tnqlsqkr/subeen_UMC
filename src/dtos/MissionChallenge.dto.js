export const bodyToMission = (body) => {
    return {
      member_id : body.memberId,
      mission_id : body.missionId,
      status : body.status,
    };
};
  
export const responseFromMissionStatus = (body) => {
  return {
      id : body.id.toString(),
      member_id : body.memberId.toString(),
      mission_id : body.missionId.toString(),
      status : body.status, 
  };
};

export const responseFromInProcessMissions = (missions) => {
  return {
      data: missions.map(mission => ({
          id: mission.id,
          storeId: mission.storeId,
          reward: mission.reward,
          deadline: mission.deadline,
          missionSpec: mission.missionSpec,
          status: mission.status,
      })),
  };
};