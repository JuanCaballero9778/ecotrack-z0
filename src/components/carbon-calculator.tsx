'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Bike,
  Bus,
  Car,
  Check,
  CircleHelp,
  Footprints,
  Leaf,
  Plane,
  RotateCcw,
  TrainFront,
  Utensils,
  Zap,
} from 'lucide-react'

import { Button } from '@/src/components/ui/button'
import { calculateFootprint, type ActivityKey, type FootprintResult } from '@/src/lib/carbon'
import { cn } from '@/src/lib/utils'

const EXAMPLES = ['Hoy comí carne y viajé 20km en bus', 'Fui 10km en carro', 'Caminé 3km']
const ICONS: Record<ActivityKey, typeof Leaf> = { beef: Utensils, chicken: Utensils, pork: Utensils, bus: Bus, car: Car, motorcycle: Bike, train: TrainFront, plane: Plane, bike: Bike, walk: Footprints, electricity: Zap }

type HistoryItem = { text: string; result: FootprintResult & { ok: true } }

function formatKg(value: number) {
  return value.toLocaleString('es-ES', { minimumFractionDigits: value === 0 ? 0 : 2, maximumFractionDigits: 2 })
}

function impactLabel(total: number) {
  if (total <= 2) return { label: 'Impacto bajo', tone: 'text-primary', detail: 'Vas por muy buen camino.' }
  if (total <= 8) return { label: 'Impacto moderado', tone: 'text-accent-foreground', detail: 'Hay oportunidades para mejorar.' }
  return { label: 'Impacto alto', tone: 'text-destructive', detail: 'Pequeños cambios pueden marcar la diferencia.' }
}

export function CarbonCalculator() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<FootprintResult | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const totalBarMax = useMemo(() => (result?.ok ? Math.max(result.totalKg, 0.01) : 1), [result])
  const impact = result?.ok ? impactLabel(result.totalKg) : null

  function handleCalculate() {
    const nextResult = calculateFootprint(text)
    setResult(nextResult)
    if (nextResult.ok && text.trim()) setHistory((current) => [{ text: text.trim(), result: nextResult }, ...current.filter((item) => item.text !== text.trim())].slice(0, 3))
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background px-4 py-6 text-foreground sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-secondary px-3 py-1.5 text-sm font-semibold text-secondary-foreground shadow-sm">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground"><Leaf className="size-3.5" /></span>
              EcoTrack
            </div>
            <div className="space-y-2">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Convierte tus hábitos en impacto positivo.</h1>
              <p className="max-w-xl text-base leading-7 text-muted-foreground">Calcula tu huella de carbono describiendo tu día en lenguaje natural y descubre dónde puedes hacer la diferencia.</p>
            </div>
          </div>
          <div className="hidden items-center gap-3 rounded-2xl border border-primary/10 bg-card px-4 py-3 shadow-sm sm:flex">
            <div className="flex size-9 items-center justify-center rounded-xl bg-accent text-accent-foreground"><Check className="size-4" /></div>
            <div><p className="text-xs text-muted-foreground">Cálculo privado</p><p className="text-sm font-semibold">100% local y seguro</p></div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.08fr_.92fr] lg:items-start">
          <section className="rounded-3xl border border-primary/10 bg-card p-5 shadow-xl shadow-primary/5 sm:p-7">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div><p className="mb-1 text-sm font-semibold uppercase tracking-wider text-primary">Tu actividad</p><h2 className="text-2xl font-semibold tracking-tight">¿Qué hiciste hoy?</h2></div>
              <div className="rounded-xl bg-secondary p-2.5 text-secondary-foreground"><CircleHelp className="size-5" /></div>
            </div>
            <label htmlFor="activity-input" className="sr-only">Describe tus actividades</label>
            <textarea id="activity-input" value={text} onChange={(event) => { setText(event.target.value); if (result) setResult(null) }} onKeyDown={(event) => { if (event.key === 'Enter' && (event.metaKey || event.ctrlKey) && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); handleCalculate() } }} rows={6} placeholder="Ej. Hoy comí carne y viajé 20km en bus" className="w-full resize-none rounded-2xl border border-input bg-background px-4 py-4 text-base leading-7 outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/10" />
            <div className="mt-4 flex flex-wrap gap-2">{EXAMPLES.map((example) => <button key={example} type="button" onClick={() => { setText(example); setResult(null) }} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary/40 hover:bg-secondary hover:text-foreground">{example}</button>)}</div>
            <Button type="button" size="lg" onClick={handleCalculate} className="mt-6 h-12 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90 sm:w-auto sm:px-7">Calcular mi huella <ArrowRight className="ml-2 size-4" /></Button>
            <p className="mt-3 text-center text-xs text-muted-foreground sm:text-left">Presiona Ctrl + Enter para calcular rápidamente</p>
          </section>

          {result?.ok ? <section className="overflow-hidden rounded-3xl border border-primary/15 bg-primary p-5 text-primary-foreground shadow-xl shadow-primary/20 sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="text-sm font-medium text-primary-foreground/70">Tu huella estimada</p><p className="mt-2 text-5xl font-semibold tracking-tight">{formatKg(result.totalKg)} <span className="text-lg font-medium text-primary-foreground/70">kg CO₂e</span></p></div><button type="button" onClick={() => { setResult(null); setText('') }} aria-label="Nuevo cálculo" className="rounded-xl bg-primary-foreground/10 p-2.5 transition hover:bg-primary-foreground/20"><RotateCcw className="size-4" /></button></div><div className="mt-6 rounded-2xl bg-primary-foreground/10 p-4"><div className="flex items-center justify-between text-sm"><span className={cn('font-semibold', impact?.tone === 'text-primary' ? 'text-accent' : 'text-primary-foreground')}>{impact?.label}</span><span className="text-primary-foreground/65">de 10 kg recomendados</span></div><div className="mt-3 h-2.5 overflow-hidden rounded-full bg-primary-foreground/15"><div className="h-full rounded-full bg-accent transition-all" style={{ width: `${Math.min((result.totalKg / 10) * 100, 100)}%` }} /></div><p className="mt-3 text-xs text-primary-foreground/70">{impact?.detail}</p></div><div className="mt-7 space-y-3"><p className="text-sm font-semibold text-primary-foreground/80">Desglose de actividades</p>{result.activities.map((activity) => { const Icon = ICONS[activity.key]; const width = `${Math.max((activity.kgCO2 / totalBarMax) * 100, activity.kgCO2 === 0 ? 4 : 8)}%`; return <div key={activity.key} className="rounded-2xl bg-primary-foreground/10 p-3"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-xl bg-primary-foreground/15"><Icon className="size-4" /></span><div><p className="text-sm font-medium">{activity.label}</p><p className="text-xs text-primary-foreground/60">{activity.quantity} {activity.unit}</p></div></div><p className="text-sm font-semibold">{formatKg(activity.kgCO2)} kg</p></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-primary-foreground/15"><div className="h-full rounded-full bg-accent" style={{ width }} /></div></div> })}</div></section> : <section className="flex min-h-[360px] flex-col justify-between rounded-3xl border border-dashed border-primary/20 bg-secondary/50 p-6 sm:p-7"><div><div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-card text-primary shadow-sm"><Leaf className="size-7" /></div><h2 className="max-w-sm text-2xl font-semibold tracking-tight">Tu impacto empieza con una conversación.</h2><p className="mt-3 max-w-sm leading-7 text-muted-foreground">Escribe una actividad y te mostraremos una estimación clara, útil y fácil de entender.</p></div><div className="rounded-2xl border border-primary/10 bg-card/80 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-primary">Consejo</p><p className="mt-1 text-sm leading-6 text-muted-foreground">Incluye distancias y cantidades para obtener un resultado más preciso.</p></div></section>}
        </div>

        {result && !result.ok && <p role="alert" className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{result.message}</p>}
        {history.length > 0 && <section className="rounded-3xl border border-primary/10 bg-card p-5 shadow-lg shadow-primary/5 sm:p-7"><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-semibold uppercase tracking-wider text-primary">Actividad reciente</p><h2 className="mt-1 text-xl font-semibold">Tus últimos cálculos</h2></div><span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">{history.length} guardados</span></div><div className="mt-5 grid gap-3 md:grid-cols-3">{history.map((item) => <button type="button" key={item.text} onClick={() => { setText(item.text); setResult(item.result) }} className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background p-4 text-left transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"><span className="min-w-0"><span className="block truncate text-sm font-medium">{item.text}</span><span className="mt-1 block text-xs text-muted-foreground">Cálculo reciente</span></span><span className="shrink-0 text-sm font-semibold text-primary">{formatKg(item.result.totalKg)} kg</span></button>)}</div></section>}
        <footer className="pb-2 text-center text-xs text-muted-foreground">EcoTrack · Entiende tu impacto, transforma tus hábitos.</footer>
      </div>
    </main>
  )
}
