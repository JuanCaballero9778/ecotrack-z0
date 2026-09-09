import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  calculateFootprint,
  EMISSION_FACTORS,
  parseActivities,
} from './index'

describe('parser de lenguaje natural', () => {
  it('detecta carne y bus en una frase combinada', () => {
    const activities = parseActivities(
      'Hoy comí carne y viajé 20km en bus',
    )
    const keys = activities.map((item) => item.key).sort()
    assert.deepEqual(keys, ['beef', 'bus'])

    const beef = activities.find((item) => item.key === 'beef')
    const bus = activities.find((item) => item.key === 'bus')
    assert.equal(beef?.quantity, 1)
    assert.equal(bus?.quantity, 20)
  })

  it('extrae kilómetros en carro', () => {
    const [car] = parseActivities('Fui 10km en carro')
    assert.equal(car?.key, 'car')
    assert.equal(car?.quantity, 10)
  })

  it('detecta caminar aunque el factor sea cero', () => {
    const [walk] = parseActivities('Caminé 3km')
    assert.equal(walk?.key, 'walk')
    assert.equal(walk?.quantity, 3)
    assert.equal(walk?.kgCO2, 0)
  })

  it('acepta km con espacio, comas y bicicleta', () => {
    const [bike] = parseActivities('Pedaleé 12,5 km en bicicleta')
    assert.equal(bike?.key, 'bike')
    assert.equal(bike?.quantity, 12.5)
  })
})

describe('cálculo de CO2', () => {
  it('suma factores de carne + bus', () => {
    const result = calculateFootprint('Hoy comí carne y viajé 20km en bus')
    assert.equal(result.ok, true)
    if (!result.ok) return

    const expected =
      EMISSION_FACTORS.beef.kgCO2PerUnit * 1 +
      EMISSION_FACTORS.bus.kgCO2PerUnit * 20
    assert.equal(result.totalKg, Number(expected.toFixed(3)))
  })

  it('calcula un trayecto en carro', () => {
    const result = calculateFootprint('Fui 10km en carro')
    assert.equal(result.ok, true)
    if (!result.ok) return
    assert.equal(
      result.totalKg,
      Number((EMISSION_FACTORS.car.kgCO2PerUnit * 10).toFixed(3)),
    )
  })

  it('rechaza texto vacío', () => {
    const result = calculateFootprint('   ')
    assert.equal(result.ok, false)
    if (result.ok) return
    assert.equal(result.error, 'empty')
  })

  it('rechaza frases sin actividades conocidas', () => {
    const result = calculateFootprint('Hoy vi una película')
    assert.equal(result.ok, false)
    if (result.ok) return
    assert.equal(result.error, 'no_match')
  })

  it('incluye electricidad en kWh', () => {
    const result = calculateFootprint('Consumí 5 kWh de electricidad')
    assert.equal(result.ok, true)
    if (!result.ok) return
    assert.equal(
      result.totalKg,
      Number((EMISSION_FACTORS.electricity.kgCO2PerUnit * 5).toFixed(3)),
    )
  })
})
