import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import AppError from "../errorHelpers/AppError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let success = false;
  let message = "Something went wrong!";
  let error = err;

  // Handle AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    error = err;
  }
  // Handle Prisma Unique Constraint Error
  else if (err.code === "P2002") {
    statusCode = httpStatus.CONFLICT;
    message = `${err.meta?.target?.[0] || "Field"} already exists`;
    error = err;
  }
  // Handle Prisma Record Not Found
  else if (err.code === "P2025") {
    statusCode = httpStatus.NOT_FOUND;
    message = "Record not found";
    error = err;
  }
  // Handle JSON Parse Error
  else if (err instanceof SyntaxError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Invalid JSON";
    error = err;
  }

  res.status(statusCode).json({
    success,
    message,
    error:
      process.env.NODE_ENV === "production"
        ? { message }
        : { message: error.message, stack: error.stack },
  });
};

export default globalErrorHandler;