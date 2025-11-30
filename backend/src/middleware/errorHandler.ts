import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../custom-types';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError | ZodError | Prisma.PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error: ApiError = {
    message: 'Internal server error',
  };

  if (err instanceof AppError) {
    error.message = err.message;
    return res.status(err.statusCode).json(error);
  }

  if (err instanceof ZodError) {
    error.message = 'Validation error';
    error.errors = err.flatten().fieldErrors;
    return res.status(400).json(error);
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        error.message = 'A record with this unique field already exists';
        return res.status(400).json(error);
      case 'P2025':
        error.message = 'Record not found';
        return res.status(404).json(error);
      default:
        error.message = 'Database error';
        return res.status(500).json(error);
    }
  }

  console.error('Error:', err);
  return res.status(500).json(error);
};

export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
