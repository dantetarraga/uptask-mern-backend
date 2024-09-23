import { Router } from 'express'
import { ProjectController } from '../controllers/project.controller'
import {
  validateProjectId,
  validateProjectFields
} from '../validators/project.validator'
import { validatorFields } from '../middlewares/validator.fields'

const projectRouter = Router()

projectRouter.get('/', ProjectController.getAllProjects)
projectRouter.get(
  '/:id',
  validateProjectId,
  validatorFields,
  ProjectController.getProjectById
)
projectRouter.post(
  '/',
  [...validateProjectFields],
  validatorFields,
  ProjectController.createProject
)
projectRouter.put(
  '/:id',
  validateProjectId,
  validateProjectFields,
  ProjectController.updateProject
)
projectRouter.delete(
  '/:id',
  validateProjectId,
  ProjectController.deleteProject
)

export default projectRouter
