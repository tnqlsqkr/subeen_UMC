export const bodyToMission = (body) => {
    return {
        member_id : body.member_id,
      mission_id : body.mission_id,
      status : body.status,
    };
  };
  
  export const responseFromMissionStatus = (review) => {
    return {
      id : body.id,
        member_id : body.member_id,
      mission_id : body.mission_id,
      status : body.status, 
    };
  };