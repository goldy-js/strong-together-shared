import Service from "@goldyjs/shared/lib/Service"

import { ISharedEntry } from "../types/entry"

import DailyEntriesBonusCalcService from "./DailyEntriesBonusCalcService"

export default class EntriesBonusCalcService extends Service {
  entries: ISharedEntry[]

  constructor(entries: ISharedEntry[]) {
    super()
    this.entries = entries
  }

  call() {
    return {
      daily: DailyEntriesBonusCalcService.call(this.entries),
    }
  }
}
