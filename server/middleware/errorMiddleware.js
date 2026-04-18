// Centralized Error Handler Middleware
import { logger } from '../lib/logger.js'

export const errorHandler = (err, req, res, next) => {
  logger.error({
    err: { message: err.message, stack: err.stack, name: err.name },
    requestId: req.id,
    userId: req.user?.id,
    path: req.path,
    method: req.method,
    statusCode: res.statusCode,
  }, 'Request error')

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode).json({
    message: err.message,
    requestId: req.id,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export const notFound = (req, res, next) => {
  const error = new Error('Not Found — ' + req.originalUrl)
  res.status(404)
  next(error)
}
