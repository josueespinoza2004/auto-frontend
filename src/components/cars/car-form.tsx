"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CarData } from "../../interfaces/car.interface";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { addCar, updateCar, getCarById } from "@/app/api/cars.api";
import { useEffect, useState } from "react";
import { getAllBrands } from "@/app/api/brands.api";

interface Brand {
  id: number;
  name: string;
}

export interface CarFormProps {
  carId?: string; // Si se pasa un ID, el formulario estará en modo edición
}

export function CarForm({ carId }: CarFormProps) {
  const { register, handleSubmit, setValue, reset } = useForm<CarData>();
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);

  // Cargar marcas para el select
 useEffect(() => {
  const fetchBrands = async () => {
    const data = await getAllBrands();
    setBrands(data.data);
    // Si no estás editando, pon la primera marca como valor por defecto
    if (!carId && data.data.length > 0) {
      setValue("brand_id", data.data[0].id);
    }
  };
  fetchBrands();
}, [carId, setValue]);

useEffect(() => {
  if (!carId) {
    setValue("available", true); // Por defecto disponible
  }
}, [carId, setValue]);

  // Si hay carId, cargar datos del carro para edición
useEffect(() => {
  if (carId) {
    async function fetchCar() {
      const car = await getCarById(carId);
      // Solo pasa car.data si existe, si no, pasa car
      reset(car.data ?? car);
    }
    fetchCar();
  }
}, [carId, reset]);

const onSubmit = handleSubmit(async (data) => {
  // Elimina todos los campos no permitidos
  const { data: _data, id: _id, brand, user, createdAt, updatedAt, deletedAt, available, ...rest } = data;
  const formattedData = {
    ...rest,
    year: rest.year ? parseInt(rest.year.toString()) : undefined,
    price: rest.price ? parseFloat(rest.price.toString()) : undefined,
    stock: rest.stock ? parseInt(rest.stock.toString()) : undefined,
    brand_id: rest.brand_id ? Number(rest.brand_id) : undefined,
  };

  console.log(formattedData);

  if (carId) {
    await updateCar(Number(carId), formattedData, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ4MzE5NDYwLCJleHAiOjE3NDgzMjY2NjB9.LIW7fHgqZb283OLdwSLxYyKzBcPTrMnBQg0w3r42qnY");
    alert("Carro actualizado correctamente");
  } else {
    await addCar(formattedData);
    alert("Carro agregado correctamente");
  }
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
          <SelectValue placeholder="Selecciona una marca" />
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
      <Select onValueChange={value => setValue("available", value === "true")}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecciona disponibilidad" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="true">Si</SelectItem>
          <SelectItem value="false">No</SelectItem>
        </SelectContent>
      </Select>
      <br />
      <Button className={buttonVariants({ variant: "agregar" })}>
        {carId ? "Actualizar Carro" : "Agregar Carro"}
      </Button>
    </form>
  );
}

export default CarForm;