import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SendHorizonal } from 'lucide-react'
import Image from 'next/image'
import { SpeedInsights } from "@vercel/speed-insights/next"
import Link from 'next/link'

export default function Home() {
  return (
    
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
      <SpeedInsights/>
      </div>
      <div className="mb-4">
        <Image
          src="/ups-logo.png"
          width={200}
          height={150}
          alt="ups-logo"
        />
      </div>
      
      <div className="text-center my-6">
        <div className="text-2xl font-bold w-1/2 mx-auto flex">
          ANÁLISIS DE TÉCNICAS Y ESTRATEGIAS DE SEGURIDAD EN DISPOSITIVOS IOT PARA PROTEGER LOS DATOS TRANSMITIDOS
        </div>
      </div>
      
      <div className="grid w-full max-w-sm items-center gap-1.5 space-y-1 pb-3">
        <Label htmlFor="email" className='font-semibold'>Correo</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
      
      <div className="grid w-full max-w-sm items-center gap-1.5 space-y-1">
        <Label htmlFor="password" className='font-semibold'>Contraseña</Label>
        <Input type="password" id="password" placeholder="Contraseña" />
      </div>
      

      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Link href="/admin">
      <Button className="w-full mt-4">
        Ingresar
        <SendHorizonal className="ml-2 h-4 w-4" />
      </Button>
      </Link>
      </div>
      
      
    </div>
  )
}
