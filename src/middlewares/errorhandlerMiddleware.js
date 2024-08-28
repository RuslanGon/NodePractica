import { HttpError } from "http-errors";
import { MongooseError } from "mongoose";

export const errorhandlerMiddleware = (error, req, res, next) => {
  if (error instanceof HttpError) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
    });
  }

  if(error instanceof MongooseError) {
    return res.status(500).json({
        status: 500,
        message: 'Mongose error',
        data: {
         message: error.data,
        }
      });
  }

  res.status(500).json({
    status: 500,
    message: 'Internal server error',
    data: {
      message: error.message,
    },
  });
};
