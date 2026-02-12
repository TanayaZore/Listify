import { User, Product, SortOption, FilterOption, SearchState } from '../types';

export const filterUsers = (users: User[], query: string, filterBy: string): User[] => {
  return users.filter(user => {
    const matchesSearch = user.first_name.toLowerCase().includes(query.toLowerCase()) ||
                         user.last_name.toLowerCase().includes(query.toLowerCase()) ||
                         user.email.toLowerCase().includes(query.toLowerCase());
    
    if (!filterBy) return matchesSearch;
    
    const domain = user.email.split('@')[1];
    const matchesFilter = filterBy === user.last_name || filterBy === domain;
    
    return matchesSearch && matchesFilter;
  });
};

export const filterProducts = (products: Product[], query: string, filterBy: string): Product[] => {
  return products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(query.toLowerCase()) ||
                         product.description.toLowerCase().includes(query.toLowerCase());
    
    if (!filterBy) return matchesSearch;
    
    return matchesSearch && product.category === filterBy;
  });
};

export const sortUsers = (users: User[], sortBy: string): User[] => {
  const sorted = [...users];
  switch (sortBy) {
    case 'name_asc':
      return sorted.sort((a, b) => a.first_name.localeCompare(b.first_name));
    case 'name_desc':
      return sorted.sort((a, b) => b.first_name.localeCompare(a.first_name));
    case 'id_asc':
      return sorted.sort((a, b) => a.id - b.id);
    case 'id_desc':
      return sorted.sort((a, b) => b.id - a.id);
    default:
      return sorted;
  }
};

export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sorted = [...products];
  switch (sortBy) {
    case 'price_asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name_asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'name_desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
};

export const getUserFilterOptions = (users: User[]): FilterOption[] => {
  const lastNames = [...new Set(users.map(u => u.last_name))];
  const domains = [...new Set(users.map(u => u.email.split('@')[1]))];
  
  return [
    ...lastNames.map(ln => ({ label: `Last Name: ${ln}`, value: ln })),
    ...domains.map(d => ({ label: `Domain: ${d}`, value: d }))
  ];
};

export const getProductSortOptions = (): SortOption[] => [
  { label: 'Price: Low to High', value: 'price_asc', field: 'price' as any, ascending: true },
  { label: 'Price: High to Low', value: 'price_desc', field: 'price' as any, ascending: false },
  { label: 'Name: A-Z', value: 'name_asc', field: 'title' as any, ascending: true },
  { label: 'Name: Z-A', value: 'name_desc', field: 'title' as any, ascending: false },
];

export const getUserSortOptions = (): SortOption[] => [
  { label: 'Name: A-Z', value: 'name_asc', field: 'first_name' as any, ascending: true },
  { label: 'Name: Z-A', value: 'name_desc', field: 'first_name' as any, ascending: false },
  { label: 'ID: Ascending', value: 'id_asc', field: 'id' as any, ascending: true },
  { label: 'ID: Descending', value: 'id_desc', field: 'id' as any, ascending: false },
];