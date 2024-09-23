import { Document } from 'mongoose'

export interface IProject extends Document {
  projectName: string
  clientName: string
  description: string
}
