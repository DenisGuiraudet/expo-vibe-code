import { Category } from '@/types/pos';

// Categories of menu items
export const categories: Category[] = [
  'Appetizers',
  'Main Courses',
  'Desserts',
  'Beverages',
  'Specials'
];

// Food items for each category
export const menuItems: Record<Category, string[]> = {
  'Appetizers': [
    'Mozzarella Sticks', 
    'Nachos', 
    'Chicken Wings', 
    'Garlic Bread', 
    'Calamari', 
    'Spinach Dip'
  ],
  'Main Courses': [
    'Burger', 
    'Pizza', 
    'Steak', 
    'Pasta', 
    'Fish & Chips', 
    'Grilled Chicken'
  ],
  'Desserts': [
    'Cheesecake', 
    'Ice Cream', 
    'Chocolate Cake', 
    'Apple Pie', 
    'Tiramisu'
  ],
  'Beverages': [
    'Soda', 
    'Coffee', 
    'Tea', 
    'Lemonade', 
    'Water', 
    'Juice',
    'Beer',
    'Wine'
  ],
  'Specials': [
    'Daily Special', 
    'Chef\'s Choice', 
    'Seasonal Item'
  ]
};

// Helper function to get icon for each category
export function getCategoryIcon(category: Category): string {
  switch(category) {
    case 'Appetizers':
      return 'restaurant';
    case 'Main Courses':
      return 'fast-food';
    case 'Desserts':
      return 'ice-cream';
    case 'Beverages':
      return 'cafe';
    case 'Specials':
      return 'star';
    default:
      return 'restaurant';
  }
}