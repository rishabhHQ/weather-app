import { Request, Response, NextFunction } from 'express'

// A custom error class so we can attach a statusCode to any error

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500
  ) {
    super(message)
    this.name = 'AppError'
  }
}

// Express recognizes a function with 4 params as an error handler
// It catches anything passed to next(error) anywhere in the app

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = 'statusCode' in err ? err.statusCode : 500
  const message = err.message || 'Internal server error'

  console.error(`[${new Date().toISOString()}] ${statusCode} — ${message}`)

  res.status(statusCode).json({
    success: false,
    error: message,
    statusCode
  })
}