import { Document, Types } from 'mongoose'

export const taskStatus = {
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  PENDING: 'pending',
  UNDER_REVIEW: 'under_review',
  ON_HOLD: 'on_hold'
} as const

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

export interface ITask extends Document {
  name: string
  description: string
  project: Types.ObjectId
  status: TaskStatus
}
