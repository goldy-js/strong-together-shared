import { ISharedPeriod } from "./period"

export interface ISharedBonus {
  period: ISharedPeriod
  description: string
  points: number
  userId: string
}
