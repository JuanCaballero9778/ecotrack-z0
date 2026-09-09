import { parseActivities } from './parser'
import type { FootprintResult } from './types'

export function calculateFootprint(rawText: string): FootprintResult {
  const input = rawText.trim()
  if (!input) {
    return {
      ok: false,
      error: 'empty',
      message: 'Escribe una actividad para calcular tu huella de carbono.',
    }
  }

  const activities = parseActivities(input)
  if (activities.length === 0) {
    return {
      ok: false,
      error: 'no_match',
      message:
        'No detecté actividades conocidas. Prueba con algo como “Hoy comí carne y viajé 20km en bus”.',
    }
  }

  const totalKg = Number(
    activities.reduce((sum, item) => sum + item.kgCO2, 0).toFixed(3),
  )

  return {
    ok: true,
    input,
    totalKg,
    activities,
  }
}
