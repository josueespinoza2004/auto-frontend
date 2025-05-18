import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input'

import React from 'react'

function BrandsAddPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Nueva Marca</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <Label>Marca</Label>
            <Input />
            <Label>Descripcion</Label>
            <Input />
            <br />
            <Button>Agregar Marca</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default BrandsAddPage