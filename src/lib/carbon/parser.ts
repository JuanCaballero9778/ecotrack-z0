import { EMISSION_FACTORS, type ActivityKey } from './emission-factors'
import type { DetectedActivity } from './types'

type DistanceHit = {
  value: number
  start: number
  end: number
}

type TransportKey = Extract<
  ActivityKey,
  'bus' | 'car' | 'motorcycle' | 'train' | 'plane' | 'bike' | 'walk'
>

const DISTANCE_RE =
  /(\d+(?:[.,]\d+)?)\s*(?:km|kilómetros|kilometros|kilómetro|kilometro)\b/gi

const KWH_RE =
  /(\d+(?:[.,]\d+)?)\s*(?:kwh|kw\/h|kilovatios?\s*hora|kilowatts?\s*hora)\b/gi

function wordPattern(inner: string): RegExp {
  return new RegExp(`(?<![\\p{L}\\p{N}])(?:${inner})(?![\\p{L}\\p{N}])`, 'giu')
}

const TRANSPORT_RULES: Array<{ key: TransportKey; pattern: RegExp }> = [
  { key: 'bus', pattern: wordPattern('bus|autob[uú]s|colectivo') },
  { key: 'car', pattern: wordPattern('carro|coche|auto|autom[oó]vil|veh[ií]culo') },
  { key: 'motorcycle', pattern: wordPattern('motocicleta|moto') },
  { key: 'train', pattern: wordPattern('tren|metro|subte|ferrocarril') },
  { key: 'plane', pattern: wordPattern('avi[oó]n|vuelo|vol[eé]') },
  { key: 'bike', pattern: wordPattern('bicicleta|bici') },
  { key: 'walk', pattern: wordPattern('camin[eé]|caminar|caminando|a[\\s-]?pie') },
]

const FOOD_RULES: Array<{
  key: Extract<ActivityKey, 'beef' | 'chicken' | 'pork'>
  pattern: RegExp
}> = [
  { key: 'beef', pattern: wordPattern('carne|res|hamburguesa|bistec|asado') },
  { key: 'chicken', pattern: wordPattern('pollo|pechuga') },
  { key: 'pork', pattern: wordPattern('cerdo|chuleta|jam[oó]n') },
]

const WINDOW_CHARS = 56

function parseDecimal(raw: string): number {
  return Number.parseFloat(raw.replace(',', '.'))
}

function findAll(text: string, regex: RegExp): RegExpExecArray[] {
  const matches: RegExpExecArray[] = []
  const clone = new RegExp(regex.source, regex.flags)
  let match: RegExpExecArray | null
  while ((match = clone.exec(text)) !== null) {
    matches.push(match)
  }
  return matches
}

function findDistances(text: string): DistanceHit[] {
  return findAll(text, DISTANCE_RE).map((match) => ({
    value: parseDecimal(match[1]),
    start: match.index,
    end: match.index + match[0].length,
  }))
}

function keywordDistance(
  text: string,
  hit: DistanceHit,
  pattern: RegExp,
): number | null {
  const from = Math.max(0, hit.start - WINDOW_CHARS)
  const to = Math.min(text.length, hit.end + WINDOW_CHARS)
  const snippet = text.slice(from, to)
  const matches = findAll(snippet, pattern)
  if (matches.length === 0) return null

  return Math.min(
    ...matches.map((match) => {
      const absStart = from + match.index
      const absEnd = absStart + match[0].length
      return Math.min(
        Math.abs(absStart - hit.start),
        Math.abs(absEnd - hit.end),
        Math.abs(absStart - hit.end),
        Math.abs(absEnd - hit.start),
      )
    }),
  )
}

function resolveTransport(text: string, hit: DistanceHit): TransportKey | null {
  let winner: { key: TransportKey; score: number } | null = null
  for (const rule of TRANSPORT_RULES) {
    const score = keywordDistance(text, hit, rule.pattern)
    if (score === null) continue
    if (!winner || score < winner.score) {
      winner = { key: rule.key, score }
    }
  }
  return winner?.key ?? null
}

function addQuantity(
  bucket: Map<ActivityKey, number>,
  key: ActivityKey,
  quantity: number,
) {
  if (!Number.isFinite(quantity) || quantity <= 0) return
  bucket.set(key, (bucket.get(key) ?? 0) + quantity)
}

function detectFood(text: string, bucket: Map<ActivityKey, number>) {
  for (const rule of FOOD_RULES) {
    const matches = findAll(text, rule.pattern)
    if (matches.length === 0) continue

    let servings = 0
    for (const match of matches) {
      const prefix = text.slice(Math.max(0, match.index - 24), match.index)
      const qtyMatch = /(\d+(?:[.,]\d+)?)\s*(?:porciones?\s+de\s+)?$/i.exec(
        prefix,
      )
      servings += qtyMatch ? parseDecimal(qtyMatch[1]) : 1
    }
    addQuantity(bucket, rule.key, servings)
  }
}

function detectElectricity(text: string, bucket: Map<ActivityKey, number>) {
  const kwhHits = findAll(text, KWH_RE)
  if (kwhHits.length > 0) {
    for (const match of kwhHits) {
      addQuantity(bucket, 'electricity', parseDecimal(match[1]))
    }
    return
  }

  if (!/\b(electricidad|luz el[eé]ctrica)\b/i.test(text)) return
  const nearby = /(\d+(?:[.,]\d+)?)/.exec(text)
  if (nearby) addQuantity(bucket, 'electricity', parseDecimal(nearby[1]))
}

export function parseActivities(rawText: string): DetectedActivity[] {
  const text = rawText.normalize('NFC').trim().toLowerCase()
  const quantities = new Map<ActivityKey, number>()

  for (const hit of findDistances(text)) {
    const key = resolveTransport(text, hit)
    if (key) addQuantity(quantities, key, hit.value)
  }

  detectFood(text, quantities)
  detectElectricity(text, quantities)

  return [...quantities.entries()].map(([key, quantity]) => {
    const factor = EMISSION_FACTORS[key]
    return {
      key,
      label: factor.label,
      quantity,
      unit: factor.unit,
      kgCO2: Number((quantity * factor.kgCO2PerUnit).toFixed(3)),
    }
  })
}
