// import React from "react";
"use client";

import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { CarData } from "../../interfaces/car.interface";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { addCar } from "@/app/api/cars.api";
import { useEffect, useState } from "react";
import { getAllBrands } from "@/app/api/brands.api";

interface Brand {
  id: number;
  name: string
}

export const metadata = {
  title: "Agregar Marca",
  description: "Agregar una nueva marca al sistema",
};

export interface CarFormProps {
  carId?: string; // Si se pasa un ID, el formulario estará en modo edición
}



export function CarForm() {
  const { register, handleSubmit, setValue } = useForm<CarData>();
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    const fetchBrands = async () => {
      const data = await getAllBrands();
      setBrands(data.data); // Assuming the array is in data.brands
    };
    fetchBrands()
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const formattedData = {
      ...data,
      year: data.year ? parseInt(data.year.toString()) : undefined,
      price: data.price ? parseFloat(data.price.toString()) : undefined,
      stock: data.stock ? parseInt(data.stock.toString()) : undefined,
    };

    
    await addCar(formattedData);
    router.push("/dashboard/cars");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit}>
      <Label>Modelo</Label>
      <Input {...register("model")} />
      <Label>Descripción</Label>
      <Input {...register("description")} />
      <Label>Año</Label>
      <Input type="number" {...register("year")} />
      <Label>Stock</Label>
      <Input type="number" {...register("stock")} />
      <Label>Precio</Label>
      <Input type="number" {...register("price")} />
      <Label>Marca</Label>
      <Select onValueChange={value => setValue("brand_id", parseInt(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue/>
        </SelectTrigger>
        <SelectContent className="bg-white">
          {brands.map((brand) => (
            <SelectItem key={brand.id} value={brand.id.toString()}>
              {brand.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Label>Disponibilidad</Label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue/>
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="true">Si</SelectItem>
          <SelectItem value="false">No</SelectItem>
        </SelectContent>
      </Select>
      <br/>
      <Button className={buttonVariants({ variant: "agregar" })}>
        Agregar 
      </Button>
    </form>
  );
}

export default CarForm;