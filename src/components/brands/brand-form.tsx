"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { BrandData } from "../../interfaces/brand.interface";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { addBrand, updateBrand, getBrandById } from "../../app/api/brands.api";
import { useEffect } from "react";

interface BrandFormProps {
  brandId?: string; // Si se pasa un ID, el formulario estará en modo edición
}

export function BrandForm({ brandId }: BrandFormProps) {
  const { register, handleSubmit, setValue } = useForm<BrandData>();
  const router = useRouter();

  useEffect(() => {
    if (brandId) {
      // Si hay un ID, carga los datos de la marca para edición
      async function fetchBrand() {
        const brand = await getBrandById(brandId);
        setValue("name", brand.name);
        setValue("description", brand.description);
      }
      fetchBrand();
    }
  }, [brandId, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    if (brandId) {
      console.log("ID que se va a actualizar:", brandId, data);
      // Modo edición
      await updateBrand(Number(brandId), data);
      alert("Marca actualizada correctamente");
    } else {
      // Modo creación
      await addBrand(data);
      alert("Marca agregada correctamente");
    }
    router.push("/dashboard/brands");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit}>
      <Label>Marca</Label>
      <Input {...register("name")} />
      <Label>Descripción</Label>
      <Input {...register("description")} />
      <br />
      <Button className={buttonVariants({ variant: "agregar" })}>
        {brandId ? "Actualizar Marca" : "Agregar Marca"}
      </Button>
    </form>
  );
}

export default BrandForm;
