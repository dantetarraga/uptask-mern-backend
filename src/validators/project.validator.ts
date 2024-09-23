import { body } from 'express-validator'

export const projectValidator = [
  body('projectName').withMessage('Project name is required'),
  body('description').withMessage('Description is required'),
  body('clientName').withMessage('Client name is required')
]
