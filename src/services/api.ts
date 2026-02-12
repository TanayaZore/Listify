import axios, { AxiosInstance } from 'axios';
import { User, UsersResponse, Product, ProductsResponse } from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // Add CORS handling if needed
      withCredentials: false,
    });

    // Add response interceptor for better error handling (silent for production)
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        // Silent error handling for cleaner console
        return Promise.reject(error);
      }
    );
  }

  async getUsers(): Promise<User[]> {
    try {
      // Try different approaches to get users data
      const response = await this.api.get<UsersResponse>('https://reqres.in/api/users?page=1&per_page=12');
      return response.data.data;
    } catch (error) {
      // Fallback to mock data if API fails - no console logging needed
      return this.getMockUsers();
    }
  }

  private getMockUsers(): User[] {
    return [
      {
        id: 1,
        email: "george.bluth@example.com",
        first_name: "George",
        last_name: "Bluth",
        avatar: "https://reqres.in/img/faces/1-image.jpg"
      },
      {
        id: 2,
        email: "janet.weaver@company.org",
        first_name: "Janet",
        last_name: "Weaver",
        avatar: "https://reqres.in/img/faces/2-image.jpg"
      },
      {
        id: 3,
        email: "emma.wong@gmail.com",
        first_name: "Emma",
        last_name: "Wong",
        avatar: "https://reqres.in/img/faces/3-image.jpg"
      },
      {
        id: 4,
        email: "eve.holt@yahoo.com",
        first_name: "Eve",
        last_name: "Holt",
        avatar: "https://reqres.in/img/faces/4-image.jpg"
      },
      {
        id: 5,
        email: "charles.morris@company.org",
        first_name: "Charles",
        last_name: "Morris",
        avatar: "https://reqres.in/img/faces/5-image.jpg"
      },
      {
        id: 6,
        email: "tracey.ramos@gmail.com",
        first_name: "Tracey",
        last_name: "Ramos",
        avatar: "https://reqres.in/img/faces/6-image.jpg"
      },
      {
        id: 7,
        email: "michael.lawson@example.com",
        first_name: "Michael",
        last_name: "Lawson",
        avatar: "https://reqres.in/img/faces/7-image.jpg"
      },
      {
        id: 8,
        email: "lindsay.ferguson@yahoo.com",
        first_name: "Lindsay",
        last_name: "Ferguson",
        avatar: "https://reqres.in/img/faces/8-image.jpg"
      },
      {
        id: 9,
        email: "tobias.funke@company.org",
        first_name: "Tobias",
        last_name: "Funke",
        avatar: "https://reqres.in/img/faces/9-image.jpg"
      },
      {
        id: 10,
        email: "byron.fields@gmail.com",
        first_name: "Byron",
        last_name: "Fields",
        avatar: "https://reqres.in/img/faces/10-image.jpg"
      },
      {
        id: 11,
        email: "george.edwards@example.com",
        first_name: "George",
        last_name: "Edwards",
        avatar: "https://reqres.in/img/faces/11-image.jpg"
      },
      {
        id: 12,
        email: "rachel.howell@yahoo.com",
        first_name: "Rachel",
        last_name: "Howell",
        avatar: "https://reqres.in/img/faces/12-image.jpg"
      }
    ];
  }

  async getProducts(): Promise<Product[]> {
    try {
      const response = await this.api.get<Product[]>('https://fakestoreapi.com/products');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  }

  async getProductCategories(): Promise<string[]> {
    try {
      const response = await this.api.get<string[]>('https://fakestoreapi.com/products/categories');
      return response.data;
    } catch (error) {
      // Return fallback categories if API fails
      return ["electronics", "jewelery", "men's clothing", "women's clothing"];
    }
  }
}

export const apiService = new ApiService();