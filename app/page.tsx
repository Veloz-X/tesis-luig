import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SendHorizonal } from 'lucide-react'
import Image from 'next/image'
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
  return (
    
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
      <SpeedInsights/>
      </div>
      <div className="mb-8">
        <Image
          src="/ups-logo.png"
          width={400}
          height={400}
          alt="ups-logo"
        />
      </div>
      
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          ANÁLISIS DE TÉCNICAS Y ESTRATEGIAS DE SEGURIDAD EN DISPOSITIVOS IOT PARA PROTEGER LOS DATOS TRANSMITIDOS
        </h1>
      </div>
      
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Correo</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
      
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">Contraseña</Label>
        <Input type="password" id="password" placeholder="Contraseña" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Button className="w-full mt-4">
        Ingresar
        <SendHorizonal className="ml-2 h-4 w-4" />
      </Button>
      </div>
      
      
    </div>
  )
}
