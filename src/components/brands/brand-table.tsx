"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Brand } from "../../interfaces/brand.interface";
import { getAllBrands } from "../../app/api/brands.api";
import { PiPlusCircleBold } from "react-icons/pi";
import { BiPencil, BiTrash } from "react-icons/bi";
import { deleteBrand } from "../../app/api/brands.api";
import { useRouter } from "next/navigation";

interface BrandsResponse {
  data: Brand[];
  total: number;
}

export function BrandTable() {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const [brandsData, setBrandsData] = useState<BrandsResponse>({
    data: [],
    total: 0,
  });

  const router = useRouter();

  const loadBrands = async (newOffset: number) => {
    const result = await getAllBrands(newOffset, limit);
    setBrandsData(result);
    setOffset(newOffset);
  };

  useEffect(() => {
    loadBrands(0);
  }, []);

  async function handleDelete(id: string) {
  try {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar esta marca?");
    if (!confirmDelete) return;

    // Llama a la API para eliminar la marca
    await deleteBrand(id);

    // Muestra un mensaje de éxito
    alert("Marca eliminada correctamente");

    // Recarga los datos de la tabla
    loadBrands(offset);
  } catch (error) {
    console.error("Error al eliminar la marca:", error);
    alert("Hubo un error al intentar eliminar la marca.");
  }
}

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link
          href="/dashboard/brands/add"
          className={buttonVariants({ variant: "agregar" })}
        >
          <PiPlusCircleBold className="mr-2 h-4 w-4" />
          Agregar Marca
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brandsData.data.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell className="font-medium">{brand.id}</TableCell>
                <TableCell>{brand.name}</TableCell>
                <TableCell>{brand.description || "Sin descripción"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      className="bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => router.push(`/dashboard/brands/edit/${brand.id}`)}
                    >
                      <BiPencil className="h-4 w-4" /> Editar
                    </Button>
                    <Button
                      size="sm"
                      className="bg-destructive text-destructive-foreground"
                      onClick={() => handleDelete(brand.id)}
                    >
                      <BiTrash className="h-4 w-4" />
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          disabled={offset === 0}
          onClick={() => loadBrands(offset - limit)}
        >
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">
          Página {Math.floor(offset / limit) + 1} de{" "}
          {Math.ceil(brandsData.total / limit)}
        </span>
        <Button
          variant="outline"
          className="hover:bg-gray-400/90"
          disabled={offset + limit >= brandsData.total}
          onClick={() => loadBrands(offset + limit)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default BrandTable;
