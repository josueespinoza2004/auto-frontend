import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CarFormEdit from "@/components/cars/cars-form-edit";


async function EditCarPage({ params }: Props) {
  console.log(params) // Log the car ID to the console for debugging
  const cars= await getCarById(params.id); // Assuming getCarById is defined elsewhere
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Editar Carro</CardTitle>
        </CardHeader>
        <CardContent>
          <CarFormEdit cars={cars} />
        </CardContent>
      </Card>
    </div>
  );
}
export default EditCarPage;