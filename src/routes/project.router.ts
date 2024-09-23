import { Router } from 'express'
import { ProjectController } from '../controllers/project.controller'

const projectRouter = Router()

projectRouter.get('/', ProjectController.getAllProjects)
projectRouter.post('/', ProjectController.createProject)

export default projectRouter
