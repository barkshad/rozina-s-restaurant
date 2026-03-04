export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Paid' | 'Completed';
  timestamp: any; // Firestore Timestamp
}
