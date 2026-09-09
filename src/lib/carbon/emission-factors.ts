/**
 * Factores de emisión estimados (kg CO2e).
 * Valores educativos de orden de magnitud; no sustituyen un inventario formal.
 */

export const EMISSION_FACTORS = {
  beef: { kgCO2PerUnit: 6.5, unit: 'porción', label: 'Carne' },
  chicken: { kgCO2PerUnit: 1.6, unit: 'porción', label: 'Pollo' },
  pork: { kgCO2PerUnit: 2.4, unit: 'porción', label: 'Cerdo' },
  bus: { kgCO2PerUnit: 0.089, unit: 'km', label: 'Bus' },
  car: { kgCO2PerUnit: 0.192, unit: 'km', label: 'Carro' },
  motorcycle: { kgCO2PerUnit: 0.113, unit: 'km', label: 'Moto' },
  train: { kgCO2PerUnit: 0.041, unit: 'km', label: 'Tren / metro' },
  plane: { kgCO2PerUnit: 0.255, unit: 'km', label: 'Avión' },
  bike: { kgCO2PerUnit: 0.021, unit: 'km', label: 'Bicicleta' },
  walk: { kgCO2PerUnit: 0, unit: 'km', label: 'Caminar' },
  electricity: { kgCO2PerUnit: 0.4, unit: 'kWh', label: 'Electricidad' },
} as const

export type ActivityKey = keyof typeof EMISSION_FACTORS

export const ACTIVITY_KEYS = Object.keys(EMISSION_FACTORS) as ActivityKey[]
