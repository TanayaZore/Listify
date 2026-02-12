export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type DataType = 'users' | 'products';

export interface SortOption {
  label: string;
  value: string;
  field: keyof User | keyof Product;
  ascending: boolean;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface SearchState {
  query: string;
  sortBy: string;
  filterBy: string;
}