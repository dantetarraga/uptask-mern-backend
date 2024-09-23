import { Router } from 'express'
import { ProjectController } from '../controllers/project.controller'
import { projectValidator } from '../validators/project.validator'
import { validatorFields } from '../middlewares/validator.fields'

const projectRouter = Router()

projectRouter.get('/', ProjectController.getAllProjects)
projectRouter.post(
  '/',
  [...projectValidator],
  validatorFields,
  ProjectController.createProject
)

export default projectRouter
