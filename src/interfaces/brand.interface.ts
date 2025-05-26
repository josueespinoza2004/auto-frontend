// export interface BrandData {
//   name: string;
//   description?: string;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt: string;
// }

export interface Brand {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface BrandData {
  name: string;
  description?: string;
}

export interface BrandsResponse {
  data: Brand[];
  total: number;
}
