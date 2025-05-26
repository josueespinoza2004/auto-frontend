import { CarData } from '../../interfaces/car.interface';

export async function getAllCars(offset: number = 0, limit: number = 5) {
  const response = await fetch(
    `http://localhost:4000/api/v1/cars`,
    { cache: "no-store" }
  );

  return await response.json();
}

export async function addCar(carData: CarData) {
  const res = await fetch("http://localhost:4000/api/v1/cars", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ4MjI3OTU3LCJleHAiOjE3NDgyMzUxNTd9.CoOnyQytjjtzf0LVD7Ks-VDU7AWNatim9hnTpEIpFmE`}`
    },
    body: JSON.stringify(carData),
  });

  return await res.json();
}

export async function deleteCar(id: number) {
  const res = await fetch(`http://localhost:4000/api/v1/cars/${id}`, {
    method: "DELETE",

          headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ4MjI3OTU3LCJleHAiOjE3NDgyMzUxNTd9.CoOnyQytjjtzf0LVD7Ks-VDU7AWNatim9hnTpEIpFmE`}`
      }
  });

  if (!res.ok) {
    throw new Error("Error al eliminar el carro");
  }

  return res.json();
}


export async function updateCar(id: number, carData: CarData, token: string) {
  const res = await fetch(`http://localhost:4000/api/v1/cars/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Autehorization: `Bearer ${token}`,
    },
    body: JSON.stringify(carData),
  });

  if (!res.ok) {
    throw new Error("Error al actualizar el carro");
  }

  return res.json();
}