import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SendHorizonal } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      
      <div className='space-y-3 '>
      <div>Tema de tesiss</div>
      {/* "ANÁLISIS DE TÉCNICAS Y ESTRATEGIAS DE SEGURIDADES IOT EN DISPOSITIVOS PARA PROTEGER LOS DATOS TRANSMITIDOS” */}
      <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
        <Label htmlFor="email">Correo</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">Contraseña</Label>
        <Input type="password" id="password" placeholder="Contraseña" />
      </div>
      <Button className='w-full'>
      Ingresar
      <SendHorizonal className="ml-2 h-4 w-4" />
    </Button>
      </div>
    </div>
  )
}
