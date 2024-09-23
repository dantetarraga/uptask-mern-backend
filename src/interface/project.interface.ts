import { Document, PopulatedDoc } from 'mongoose'
import { ITask } from './task.interface'

export interface IProject extends Document {
  projectName: string
  clientName: string
  description: string
  tasks: Array<PopulatedDoc<ITask & Document>>
}
