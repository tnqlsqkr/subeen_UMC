import { StatusCodes } from "http-status-codes";
import { listUserReviewsService } from "../services/review.service.js";


export const getMyReviewsController = async (req, res, next) => {
    const memberId = parseInt(req.params.memberId);
    try {
        const result = await listUserReviewsService(memberId);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
};