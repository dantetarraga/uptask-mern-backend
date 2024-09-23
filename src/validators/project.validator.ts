import { body } from 'express-validator'

export const projectValidator = [
  body('projectName').notEmpty().withMessage('Project name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('clientName').notEmpty().withMessage('Client name is required')
]
