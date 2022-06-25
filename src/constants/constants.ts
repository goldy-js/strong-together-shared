export const CORE_ACTIVITIES = [
  "Meditation",
  "Mountain climbing",
  "Pull ups",
  "Push ups",
] as const

export const ACTIVITIES = [
  ...CORE_ACTIVITIES,
  "Workout",
  "Cold Shower",
  "Cold approach",
] as const

export const PERIODS = [
  "daily",
  "weekly",
  "monthly",
  "quarterly",
  "yearly",
] as const
