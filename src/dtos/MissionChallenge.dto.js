export const bodyToMission = (body) => {
    return {
      member_id : body.member_id,
      mission_id : body.mission_id,
      status : body.status,
    };
};
  
export const responseFromMissionStatus = (body) => {
  return {
      id : body.id,
      member_id : body.member_id,
      mission_id : body.mission_id,
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