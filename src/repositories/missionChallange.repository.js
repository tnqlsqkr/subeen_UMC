import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";

export const modifyStatus = async (data) => {  
    try {
        const existingMission = await prisma.memberMission.findFirst({ 
            where: {
                memberId: data.member_id,
                missionId : data.mission_id,
                status : "도전중"
            } 
        });
    
        if (!existingMission) {
          return null;
        }
      
        const newMissionStatus = await prisma.memberMission.update({
            where :{
                id : existingMission.id,
            },
            data: {
                status : "진행중"
            } 
        });

        return newMissionStatus.id;   
    
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    }
};


export const getStatus = async (modifyStatusId) => {
    try {
        const missionStatus = await prisma.memberMission.findFirstOrThrow({ where: { id: modifyStatusId } });

        return missionStatus;
    } catch (error) {
        console.error("Error fetching missionStatus:", error);
        throw new Error("MissionStatus not found");
    }
};

//내가 진행 중인 미션을 진행 완료로 바꾸기
export const completeMission = async(data) => {
    try {
       const existingMissionRecord = await prisma.memberMission.findFirst({
            where : {
              memberId : data.memberId,
              missionId : data.missionId,
             status : "도전중",
            },
       });

       if(!existingMissionRecord){ return null;}

       const updateMissionStatus = await prisma.memberMission.create({
            where : {
              id : existingMissionRecord.id,
            },
            data:{
                status : "진행 완료",
                updatedAt : new Date(),
            },
        });

        return updateMissionStatus.id;
    } catch (error){
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    }
}
