import _ from "lodash"
import Service from "@goldyjs/shared/lib/Service"

import { CORE_ACTIVITIES } from "../constants/constants"
import { ISharedEntry } from "../types/entry"

import EntriesBaseScoreCalcService from "./EntriesBaseScoreCalcService"

export default class DailyEntriesBonusCalcService extends Service {
  entries: ISharedEntry[]

  constructor(entries: ISharedEntry[]) {
    super()
    this.entries = entries
  }

  call() {
    const byUser = _.groupBy(this.entries, "userId")

    return Object.entries(byUser).reduce((acc, [userId, entries]) => {
      const bonuses = this.buildDailyBonusesForUser(userId, entries)
      return { ...acc, [userId]: bonuses }
    }, {})
  }

  buildDailyBonusesForUser = (userId: string, entries: ISharedEntry[]) => {
    return [
      this.getBonusFor100BasePointsBefore9Am(userId, entries),
      this.getBonusFor200BasePointsBefore10Am(userId, entries),
      this.getBonusFor5OfEachCoreActivity(userId, entries),
      this.getBonusFor10OfEachCoreActivity(userId, entries),
      this.getBonusFor15OfEachCoreActivity(userId, entries),
    ].filter(Boolean)
  }

  getBonusFor100BasePointsBefore9Am = (
    userId: string,
    entries: ISharedEntry[],
  ) => {
    const before9Am = entries.filter((entry) => entry.createdAt.getHours() < 9)
    if (EntriesBaseScoreCalcService.call(before9Am) < 100) return

    return {
      period: "daily",
      description: "100 base points before 9 AM",
      points: 75,
      userId,
    }
  }

  getBonusFor200BasePointsBefore10Am = (
    userId: string,
    entries: ISharedEntry[],
  ) => {
    const before10Am = entries.filter(
      (entry) => entry.createdAt.getHours() < 10,
    )
    if (EntriesBaseScoreCalcService.call(before10Am) < 200) return

    return {
      period: "daily",
      description: "200 base points before 10 AM",
      points: 300,
      userId,
    }
  }

  getBonusFor5OfEachCoreActivity = (userId, entries: ISharedEntry[]) => {
    const byActivity = _.groupBy(entries, "activity")
    if (!byActivity["Cold Shower"]) return

    const isEligible = CORE_ACTIVITIES.every(
      (activity) =>
        (byActivity[activity] || [])
          .map((entry) => entry.count)
          .reduce((acc, count) => acc + count, 0) >= 5,
    )

    if (!isEligible) return

    return {
      period: "daily",
      description: "5 of each core activity",
      points: 100,
      userId,
    }
  }

  getBonusFor10OfEachCoreActivity = (userId, entries: ISharedEntry[]) => {
    const byActivity = _.groupBy(entries, "activity")
    if (!byActivity["Cold Shower"]) return

    const isEligible = CORE_ACTIVITIES.every(
      (activity) =>
        (byActivity[activity] || [])
          .map((entry) => entry.count)
          .reduce((acc, count) => acc + count, 0) >= 10,
    )

    if (!isEligible) return

    return {
      period: "daily",
      description: "10 of each core activity",
      points: 300,
      userId,
    }
  }

  getBonusFor15OfEachCoreActivity = (userId, entries: ISharedEntry[]) => {
    const byActivity = _.groupBy(entries, "activity")
    if (!byActivity["Cold Shower"]) return

    const isEligible = CORE_ACTIVITIES.every(
      (activity) =>
        (byActivity[activity] || [])
          .map((entry) => entry.count)
          .reduce((acc, count) => acc + count, 0) >= 15,
    )

    if (!isEligible) return

    return {
      period: "daily",
      description: "15 of each core activity",
      points: 600,
      userId,
    }
  }
}
