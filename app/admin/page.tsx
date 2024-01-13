'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LogOut, RefreshCcw, SendHorizonal } from 'lucide-react'
import Image from 'next/image'
import { SpeedInsights } from "@vercel/speed-insights/next"
import Link from 'next/link'
import { CardsMetric } from './components/metric'
import { CardsDataTable } from './components/data-table'
import { signOut,useSession } from "next-auth/react";
export default function Home() {
  const { data: session, status } = useSession();
  return (
    
    <div className='w-full flex bg-gray-100'>
      <div className='w-1/2  p-3'>
      <div className='py-3'>
        <CardsDataTable/>
      </div>

      </div>
      <div className='w-1/2  p-3'>
        <div className='flex space-x-2'>
          <Button className='font-bold'>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Actualizar
          </Button>
          <Button className='font-bold' onClick={()=>signOut()} >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      <div className='py-3'>
        <CardsMetric/>
      </div>
      <div className='py-3'>
        <CardsDataTable/>
      </div>

      </div>
      
    </div>
  )
}
