import { body, param } from 'express-validator'

export const validateTaskFields = [
  body('name').isEmpty().withMessage('Name is required'),
  body('description').isEmpty().withMessage('Description is required')
]

export const validateTaskId = [
  param('taskId').isMongoId().withMessage('ID not valid')
]
