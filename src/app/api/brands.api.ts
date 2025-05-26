import { BrandData, BrandsResponse } from "../../interfaces/brand.interface";

export async function getAllBrands(
  offset: number = 0,
  limit: number = 5
): Promise<BrandsResponse> {
  const response = await fetch(
    `http://localhost:4000/api/v1/brands?offset=${offset}&limit=${limit}`,
    { cache: "no-store" }
  );
  return await response.json();
}

export async function getBrandById(id: string) {
  const res = await fetch(`http://localhost:4000/api/v1/brands/${id}`);
  if (!res.ok) throw new Error("Error al obtener la marca");
  return res.json();
}

export async function addBrand(brandData: BrandData) {
  const res = await fetch("http://localhost:4000/api/v1/brands", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(brandData),
  });

  return await res.json();
}

export async function updateBrand(id: string, brandData: BrandData) {
  const res = await fetch(`http://localhost:4000/api/v1/brands/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(brandData),
  });

  if (!res.ok) {
    throw new Error("Error al actualizar la marca");
  }

  return res.json();
}

export async function deleteBrand(id: string) {
  const res = await fetch(`http://localhost:4000/api/v1/brands/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al eliminar la marca");
  }

  return res.json();
}