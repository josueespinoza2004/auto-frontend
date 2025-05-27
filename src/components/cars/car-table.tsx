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
import { Car } from "../../interfaces/car.interface";
import { getAllCars, deleteCar } from "../../app/api/cars.api";
import { PiPlusCircleBold } from "react-icons/pi";
import { BiPencil, BiTrash } from "react-icons/bi";
import { useRouter } from "next/navigation";

interface CarsResponse {
  data: Car[];
  total: number;
}

export function CarTable() {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const [CarsData, setCarsData] = useState<CarsResponse>({
    data: [],
    total: 0,
  });

  const router = useRouter();

  const loadCars = async (newOffset: number) => {
    const result = await getAllCars(newOffset, limit);
    setCarsData(result);
    setOffset(newOffset);
  };

  async function handleDelete(id: string) {
    try {
      const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este carro?");
      if (!confirmDelete) return;

      await deleteCar(id);
      alert("Carro eliminado correctamente");
      loadCars(offset);
    } catch (error) {
      console.error("Error al eliminar el carro:", error);
      alert("Hubo un error al intentar eliminar el carro.");
    }
  }

  useEffect(() => {
    loadCars(0);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link
          href="/dashboard/cars/add"
          className={buttonVariants({ variant: "agregar" })}
        >
          <PiPlusCircleBold className="mr-2 h-4 w-4" />
          Agregar Carro
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CarsData.data.map((car) => (
              <TableRow key={car.id}>
                <TableCell className="font-medium">{car.id}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.description || "Sin descripción"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      className="bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => router.push(`/dashboard/cars/edit/${car.id}`)}
                    >
                      <BiPencil className="h-4 w-4" /> Editar
                    </Button>
                    <Button
                      onClick={() => handleDelete(car.id)}
                      size="sm"
                      className="bg-destructive text-destructive-foreground"
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
          onClick={() => loadCars(offset - limit)}
        >
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">
          Página {Math.floor(offset / limit) + 1} de{" "}
          {Math.ceil(CarsData.total / limit)}
        </span>
        <Button
          variant="outline"
          className="hover:bg-gray-400/90"
          disabled={offset + limit >= CarsData.total}
          onClick={() => loadCars(offset + limit)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default CarTable;