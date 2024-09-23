import { body, param } from 'express-validator'

export const validateProjectFields = [
  body('projectName').notEmpty().withMessage('Project name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('clientName').notEmpty().withMessage('Client name is required')
]

export const validateProjectId = [
  param('id').isMongoId().withMessage('ID not valid')
]
