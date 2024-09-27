import { Request, Response, NextFunction, RequestHandler } from 'express'
import Task from '../models/task.model'
import { ITask } from '../interface/task.interface'

declare global {
  namespace Express {
    interface Request {
      task: ITask
    }
  }
}

export const validateTaskExists: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { taskId } = req.params

  const task = await Task.findById(taskId).populate('project', 'projectName clientName description')

  if (task === null || task === undefined) return res.status(404).json({ message: 'Task not found' })

  req.task = task

  next()
}

export const validateTaskProject: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const task = req.task
  const project = req.project

  if (task.project.id.toString() !== project.id) return res.status(403).json({ message: 'Unauthorized' })

  next()
}
