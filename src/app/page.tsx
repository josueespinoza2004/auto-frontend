import React from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

function HomePage() {
  return (
    <div className="flex justify-between">
      <h1 className="text-4xl font-bold">Concesionario de Autos</h1>
      <Link href="/brands/add" className={buttonVariants()}>
        Crear Marca
      </Link>
    </div>
  )
}

export default HomePage