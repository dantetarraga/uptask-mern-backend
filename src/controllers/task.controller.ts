import { Response, Request } from 'express'
import Task from '../models/task.model'

export class TaskController {
  static async createTask (req: Request, res: Response): Promise<Response> {
    const project = req.project

    console.log(project)

    const task = new Task(req.body)
    task.project = project.id
    project.tasks.push(task.id)

    await Promise.allSettled([task.save(), project.save()])
      .then((results) => {
        results.forEach((result) => {
          if (result.status === 'rejected') {
            return res.status(500).json({ message: 'Error creating task' })
          }
        })
      })

    return res.status(201).json({ message: 'Task created', task })
  }

  static async getAllTask (req: Request, res: Response): Promise<Response> {
    const project = req.project

    const tasks = await Task.find({ project: project.id })

    if (tasks.length === 0) return res.status(404).json({ message: 'No tasks found' })

    return res.status(200).json({ data: tasks })
  }
}
