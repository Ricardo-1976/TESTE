import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import swaggerUI from 'swagger-ui-express';

import createConnection from "@shared/infra/typeorm";
import { AppError } from "@shared/errors/AppError";

createConnection();

import "@shared/container";

const app = express();

import swaggerFile from "../../../swagger.json";

import { router } from "./routes";

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message!}`,
    });
  }
);

app.listen(3333, () => console.log("Server is running!"));
