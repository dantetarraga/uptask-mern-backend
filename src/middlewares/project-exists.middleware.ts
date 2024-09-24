import { Request, Response, NextFunction, RequestHandler } from 'express'
import Project from '../models/project.model'

export const validateProjectExists: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const project = await Project.findById(id)

  if (project === null || project === undefined) {
    return res.status(404).json({
      message: 'Project not found'
    })
  }

  req.body.project = project
  next()
}
