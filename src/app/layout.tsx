import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './global.css'

export const metadata: Metadata = {
  title: 'EcoTrack — Pequeños hábitos, gran impacto',
  description: 'Calcula y entiende tu huella de carbono con EcoTrack.',
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
