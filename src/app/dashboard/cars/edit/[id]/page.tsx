import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CarForm from "@/components/cars/car-form";

export default function EditCarPage({ params }: { params: { id: string } }) {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Editar Carro</CardTitle>
        </CardHeader>
        <CardContent>
          <CarForm carId={params.id} />
        </CardContent>
      </Card>
    </div>
  );
}