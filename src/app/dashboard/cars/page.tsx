import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CarTable } from "@/components/cars/car-table";

function BrandsTablePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Tabla de Carros</CardTitle>
        </CardHeader>
        <CardContent>
          <CarTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default BrandsTablePage;