import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BrandForm from "@/components/brands/brand-form";

export default function EditBrandPage({ params }: { params: { id: string } }) {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Editar Marca</CardTitle>
        </CardHeader>
        <CardContent>
          <BrandForm brandId={params.id} />
        </CardContent>
      </Card>
    </div>
  );
}