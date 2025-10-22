export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  productName: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  category: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  children?: MenuItem[];
}
