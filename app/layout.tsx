import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Testis',
  description: 'ANÁLISIS DE TÉCNICAS Y ESTRATEGIAS DE SEGURIDAD EN DISPOSITIVOS IOT PARA PROTEGER LOS DATOS TRANSMITIDOS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}<Analytics /></body>
    </html>
  )
}
