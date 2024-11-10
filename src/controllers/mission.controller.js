import { StatusCodes } from "http-status-codes";
import { listInProcessMissionsService } from "../services/mission.service.js";


export const getInProcessMissionsController = async (req, res, next) => {
    const memberId = parseInt(req.params.memberId);
    try {
        const missions = await listInProcessMissionsService(memberId);
        res.status(StatusCodes.OK).json({ result: missions });
    } catch (error) {
        next(error);
    }
};