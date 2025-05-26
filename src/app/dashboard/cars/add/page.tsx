import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CarForm} from "@/components/cars/car-form";


function CarsAddPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Nuevo Carro</CardTitle>
        </CardHeader>
        <CardContent>
          <CarForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default CarsAddPage;