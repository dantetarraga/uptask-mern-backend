import { Router } from 'express'
import { TaskController } from '../controllers/task.controller'
import { validateProjectExists } from '../middlewares/project-exists.middleware'

const taskRouter = Router()

taskRouter.post(
  '/:projectId/tasks',
  validateProjectExists,
  TaskController.createTask
)

export default taskRouter
