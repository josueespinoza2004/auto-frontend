import { CarData } from '../../interfaces/car.interface';

export async function getAllCars(offset = 0, limit = 3) {
  const response = await fetch(
    `http://localhost:4000/api/v1/cars?offset=${offset}&limit=${limit}`,
    { cache: "no-store" }
  );

  return await response.json();
}

export async function getCarById(id: string) {
  const res = await fetch(`http://localhost:4000/api/v1/cars/${id}`);
  if (!res.ok) throw new Error("Error al obtener el carro");
  return res.json();
}

export async function addCar(carData: CarData) {
  const res = await fetch("http://localhost:4000/api/v1/cars", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ4MzE5NDYwLCJleHAiOjE3NDgzMjY2NjB9.LIW7fHgqZb283OLdwSLxYyKzBcPTrMnBQg0w3r42qnY`}`
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
        'Authorization': `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ4MzE5NDYwLCJleHAiOjE3NDgzMjY2NjB9.LIW7fHgqZb283OLdwSLxYyKzBcPTrMnBQg0w3r42qnY`}`
      }
  });

  if (!res.ok) {
    throw new Error("Error al eliminar el carro");
  }

  return res.json();
}


// filepath: [cars.api.ts](http://_vscodecontentref_/1)
export async function updateCar(id: number, carData: CarData, token: string) {
  const res = await fetch(`http://localhost:4000/api/v1/cars/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ4MzE5NDYwLCJleHAiOjE3NDgzMjY2NjB9.LIW7fHgqZb283OLdwSLxYyKzBcPTrMnBQg0w3r42qnY`}`,
    },
    body: JSON.stringify(carData),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error backend:", errorText);
    throw new Error("Error al actualizar el carro");
  }

  return res.json();
}