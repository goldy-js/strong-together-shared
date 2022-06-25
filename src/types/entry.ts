import { IActivity } from "./activity"

export interface ISharedEntry {
  userId: string
  activity: IActivity
  count: number
  createdAt: Date
  updatedAt: Date
}
