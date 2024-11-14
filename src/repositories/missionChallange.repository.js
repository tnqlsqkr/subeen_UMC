import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";
import { MissionStatusUpdateError } from "../errors.js";

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
        const member = await prisma.member.findUnique({
            where: { id: data.member_id }
        });

        if (!member) {
            throw new MissionStatusUpdateError("존재하지 않는 사용자입니다.", { memberId: data.member_id });
        }

        const mission = await prisma.mission.findUnique({
            where: { id: data.mission_id }
        });

        if (!mission) {
            throw new MissionStatusUpdateError("존재하지 않는 미션입니다.", { missionId: data.mission_id });
        }

        const existingMissionRecord = await prisma.memberMission.findFirst({
            where: {
                memberId: data.member_id,
                missionId: data.mission_id,
            },
        });

        if (!existingMissionRecord) {
            throw new MissionStatusUpdateError("해당 미션에 대한 기록이 없습니다.");
        }

        if (existingMissionRecord.status === "진행 완료") {
            throw new MissionStatusUpdateError("이미 완료된 미션입니다.");
        }

        if (existingMissionRecord.status !== "진행중") {
            throw new MissionStatusUpdateError("진행 중인 미션이 아닙니다.");
        }

        const updateMissionStatus = await prisma.memberMission.update({
            where: {
                id: existingMissionRecord.id,
            },
            data: {
                status: "진행 완료",
                updatedAt: new Date(),
            },
        });

        return updateMissionStatus.id;
    } catch (error) {
        if (error instanceof MissionStatusUpdateError) {
            throw error;
        }
        throw new MissionStatusUpdateError(
            "미션 상태 업데이트 중 오류가 발생했습니다.",
            { error: error.message }
        );
    }
};
