import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BrandTable from "../../../components/brands/brand-table";

function BrandsTablePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Tabla de Marcas</CardTitle>
        </CardHeader>
        <CardContent>
          <BrandTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default BrandsTablePage;
