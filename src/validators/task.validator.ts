import { body } from 'express-validator'

export const validateTask = [
  body('name').isEmpty().withMessage('Name is required'),
  body('description').isEmpty().withMessage('Description is required')
]
