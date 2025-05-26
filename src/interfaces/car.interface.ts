export interface Car {
  id?: number;
  model?: string;
  description: string;
  year?: number;
  stock?: number;
  price?: number;
  isAvailable?: boolean;
  brand_id: number;
  brand?: {
    id: number;
    nombre: string;
  }
  createdAt?: number
  updatedAt?: number;
  deletedAt?: number;
  // Puedes agregar más campos si tu backend los retorna, como createdAt, updatedAt, etc.
}

export interface CarData {
  id: number;
  model?: string;    
  description: string;
  year?: number;
  stock?: number;
  price?: number;
  isAvailable?: boolean;
  brand_id: number;
}

export interface CarsResponse {
  data: Car[];
  total: number;
}