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

  static async getTasksByProject (req: Request, res: Response): Promise<Response> {
    const project = req.project

    const tasks = await Task.find({ project: project.id })
      .populate('project', 'projectName clientName description')

    if (tasks.length === 0) return res.status(404).json({ message: 'No tasks found' })

    return res.status(200).json({ data: tasks })
  }

  static async getTaskById (req: Request, res: Response): Promise<Response> {
    const { taskId } = req.params

    const task = await Task.findById(taskId).populate('project', 'projectName clientName description')

    if (task === null || task === undefined) return res.status(404).json({ message: 'Task not found' })

    if (task.project.id.toString() !== req.project.id) return res.status(403).json({ message: 'Unauthorized' })

    return res.status(200).json({ data: task })
  }

  static async updateTask (req: Request, res: Response): Promise<Response> {
    const { taskId } = req.params

    const task = await Task.findById(taskId)

    if (task === null || task === undefined) return res.status(404).json({ message: 'Task not found' })
    if (req.project.id !== task.project.toString()) return res.status(403).json({ message: 'Unauthorized' })

    task.set(req.body)
    const updateTask = await task.save()

    if (updateTask === null || updateTask === undefined) return res.status(500).json({ message: 'Error updating task' })

    return res.status(200).json({ message: 'Task updated', data: updateTask })
  }

  static async deleteTask (req: Request, res: Response): Promise<Response> {
    const { taskId } = req.params

    const task = await Task.findById(taskId)

    if (task === null || task === undefined) return res.status(404).json({ message: 'Task not found' })
    if (req.project.id !== task.project.toString()) return res.status(403).json({ message: 'Unauthorized' })

    req.project.tasks = req.project.tasks.filter((task) => task?.toString() !== taskId)

    await Promise.allSettled([req.project.save(), task.deleteOne()])
      .then((results) => {
        results.forEach((result) => {
          if (result.status === 'rejected') {
            return res.status(500).json({ message: 'Error deleting task' })
          }
        })
      })

    return res.status(200).json({ message: 'Task deleted' })
  }
}
