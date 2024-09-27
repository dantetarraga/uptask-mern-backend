import { body, param } from 'express-validator'
import { taskStatus } from '../interface/task.interface'

export const validateTaskFields = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required')
]

export const validateTaskId = [
  param('taskId').isMongoId().withMessage('ID not valid')
]

export const validateStatus = [
  body('status')
    .isIn(Object.values(taskStatus))
    .withMessage('Invalid status')
    .notEmpty()
    .withMessage('Status is required')
]
