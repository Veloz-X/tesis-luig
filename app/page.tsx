"use client";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SendHorizonal } from 'lucide-react'
import Image from 'next/image'
import { SpeedInsights } from "@vercel/speed-insights/next"
import Link from 'next/link'
import { signIn,useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("admin@fastery.dev");
  const [password, setPassword] = useState<string>("Abc123");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(responseNextAuth);

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      
      return;
    }

    router.push("/admin");
  };
  return (
    
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        {session ? 'Sesión iniciada' : 'No hay sesión'}
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
      
      <div className="text-center my-4">
        <div className="text-2xl font-bold w-1/2 mx-auto flex ">
          ANÁLISIS DE TÉCNICAS Y ESTRATEGIAS DE SEGURIDAD EN DISPOSITIVOS IOT PARA PROTEGER LOS DATOS TRANSMITIDOS
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="w-full max-w-sm items-center">
      <div className="grid w-full max-w-sm items-center gap-1.5 space-y-1 pb-3">
        <Label htmlFor="email" className='font-semibold'>Correo</Label>
        <Input type="email" id="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
      </div>
      
      <div className="grid w-full max-w-sm items-center gap-1.5 space-y-1">
        <Label htmlFor="password" className='font-semibold'>Contraseña</Label>
        <Input type="password" id="password" placeholder="Contraseña" value={password} onChange={(event) => setPassword(event.target.value)}/>
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
      <Button className="w-full mt-4">
        Ingresar
        <SendHorizonal className="ml-2 h-4 w-4" />
      </Button>
      <div className='text-center py-4 font-semibold'>
      <div className='text-sm'>Ing. Luigi Emanuel Bohorquez Reyes</div>
        <div className='text-sm'>Ing. Kristy Johely Alcivar Alvarado</div>
      </div>
      </div>
      </form>
      <Toaster />
      
      {errors.length > 0 && (
        <div>
            {errors.map((error) => (
             toast.error(`Error`, {
              action: {
                label: 'Cerrar',
                onClick: () => console.log('Cerrar')
              },
              description: `${error}`,
            })
            ))}
        </div>
      )}
      
      
    </div>
  )
}
