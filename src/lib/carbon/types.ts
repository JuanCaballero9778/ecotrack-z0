import type { ActivityKey } from './emission-factors'

export type DetectedActivity = {
  key: ActivityKey
  label: string
  quantity: number
  unit: string
  kgCO2: number
}

export type FootprintSuccess = {
  ok: true
  input: string
  totalKg: number
  activities: DetectedActivity[]
}

export type FootprintError = {
  ok: false
  error: 'empty' | 'no_match'
  message: string
}

export type FootprintResult = FootprintSuccess | FootprintError
