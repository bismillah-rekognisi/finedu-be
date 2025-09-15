import { AppError } from "../error/appError.js";

export default function errorHandler(err, req, res, next) {
    console.error(err);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.message,
            status: err.statusCode
        });
    }

    return res.status(500).json({
        error: "Internal server error",
        status: 500,
    });
}