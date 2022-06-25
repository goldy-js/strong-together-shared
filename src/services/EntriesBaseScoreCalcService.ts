import Service from "@goldyjs/shared/lib/Service"

import { IActivity } from "../types/activity"
import { ISharedEntry } from "../types/entry"

export default class EntriesBaseScoreCalcService extends Service {
  entries: ISharedEntry[]

  constructor(entries: ISharedEntry[]) {
    super()
    this.entries = entries
  }

  call() {
    return this.entries
      .map(this.entryToScore)
      .reduce((acc, score) => acc + score, 0)
  }

  entryToScore = (entry: ISharedEntry) =>
    activityScoreHash[entry.activity] * entry.count
}

const activityScoreHash: Record<IActivity, number> = {
  "Pull ups": 2,
  "Push ups": 1,
  "Cold approach": 15,
  Meditation: 3.5,
  Workout: 3.5,
  "Cold Shower": 50,
  "Mountain climbing": 0.5,
}
