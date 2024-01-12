import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RefreshCcw, SendHorizonal } from 'lucide-react'
import Image from 'next/image'
import { SpeedInsights } from "@vercel/speed-insights/next"
import Link from 'next/link'
import { CardsMetric } from './components/metric'
import { CardsDataTable } from './components/data-table'

export default function Home() {
  return (
    
    <div className='w-full flex bg-gray-100'>
      <div className='w-1/2  p-3'>
      <div className='py-3'>
        <CardsDataTable/>
      </div>

      </div>
      <div className='w-1/2  p-3'>
        <div>
          <Button className='font-bold'>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Actualizar
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
