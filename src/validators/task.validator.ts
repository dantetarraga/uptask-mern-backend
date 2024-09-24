import { body, param } from 'express-validator'

export const validateTaskFields = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required')
]

export const validateTaskId = [
  param('taskId').isMongoId().withMessage('ID not valid')
]
