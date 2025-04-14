// Define the category type
export type Category = 
  | 'Appetizers' 
  | 'Main Courses' 
  | 'Desserts' 
  | 'Beverages' 
  | 'Sides'
  | 'Breakfast'
  | 'Lunch'
  | 'Dinner'
  | 'Salads'
  | 'Soups'
  | 'Vegan'
  | 'Gluten-Free'
  | 'Specials';

// Define an order item type
export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  modifiers?: ItemModifier[];
  notes?: string;
  category: Category;
  timestamp: number;
};

// Define a customer type
export type Customer = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  loyaltyPoints?: number;
  orderHistory?: Order[];
  favoriteItems?: string[];
};

// Define a modifier type
export type ItemModifier = {
  name: string;
  price: number;
};

// Define a complete order
export type Order = {
  id: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  tip?: number;
  total: number;
  status: OrderStatus;
  paymentMethod?: PaymentMethod;
  timestamp: number;
  customer?: Customer;
  tableNumber?: number;
  server?: string;
};

export type OrderStatus = 
  | 'pending'
  | 'preparing'
  | 'ready'
  | 'delivered'
  | 'completed'
  | 'cancelled';

export type PaymentMethod = 
  | 'cash'
  | 'credit'
  | 'debit'
  | 'mobile'
  | 'gift card'
  | 'loyalty points';

export type DietaryRestriction = 'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Nut-Free' | 'Dairy-Free';

// Order history filters
export type OrderHistoryFilter = {
  dateRange?: {
    start: Date;
    end: Date;
  };
  minAmount?: number;
  maxAmount?: number;
  status?: OrderStatus;
  paymentMethod?: PaymentMethod;
};