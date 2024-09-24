import { Router } from 'express'
import { TaskController } from '../controllers/task.controller'
import { validateProjectExists } from '../middlewares/project-exists.middleware'
import { validateTaskFields, validateTaskId } from '../validators/task.validator'
import { validatorFields } from '../middlewares/validator-fields.middleware'

const taskRouter = Router()
taskRouter.param('projectId', validateProjectExists)

taskRouter.post(
  '/:projectId/tasks',
  [...validateTaskFields],
  validatorFields,
  TaskController.createTask
)

taskRouter.get(
  '/:projectId/tasks',
  TaskController.getTasksByProject
)

taskRouter.get(
  '/:projectId/tasks/:taskId',
  validateTaskId,
  validatorFields,
  TaskController.getTaskById
)

export default taskRouter
