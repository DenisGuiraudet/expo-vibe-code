import { Category } from '@/types/pos';

// Categories of menu items
export const categories: Category[] = [
  'Appetizers',
  'Main Courses',
  'Desserts',
  'Beverages',
  'Sides',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Salads',
  'Soups',
  'Vegan',
  'Gluten-Free',
  'Specials'
];

// Food items for each category
export const menuItems: Record<Category, string[]> = {
  'Appetizers': [
    'Mozzarella Sticks', 'Nachos', 'Chicken Wings', 'Garlic Bread', 'Calamari', 'Spinach Dip',
    'Bruschetta', 'Potato Skins', 'Stuffed Mushrooms', 'Spring Rolls', 'Onion Rings', 
    'Shrimp Cocktail', 'Buffalo Wings', 'Jalapeno Poppers', 'Fried Pickles', 'Hummus Platter',
    'Cheese Platter', 'Truffle Fries', 'Deviled Eggs', 'Crab Cakes', 'Crispy Calamari',
    'Chicken Satay', 'Coconut Shrimp', 'Artichoke Dip', 'Edamame'
  ],
  'Main Courses': [
    'Burger', 'Pizza', 'Steak', 'Pasta', 'Fish & Chips', 'Grilled Chicken',
    'Lasagna', 'Chicken Parmesan', 'Salmon', 'Beef Wellington', 'Lobster Tail', 
    'Lamb Chops', 'Beef Stroganoff', 'Pork Chops', 'Duck Confit', 'Rib Eye Steak',
    'Chicken Alfredo', 'Vegetable Curry', 'Seafood Paella', 'Beef Tacos', 'Chicken Tikka Masala',
    'Eggplant Parmesan', 'Mushroom Risotto', 'Beef Tenderloin', 'Shrimp Scampi'
  ],
  'Desserts': [
    'Cheesecake', 'Ice Cream', 'Chocolate Cake', 'Apple Pie', 'Tiramisu',
    'Crème Brûlée', 'Chocolate Mousse', 'Strawberry Shortcake', 'Carrot Cake', 'Panna Cotta',
    'Baklava', 'Banana Split', 'Bread Pudding', 'Fruit Tart', 'Red Velvet Cake',
    'Peach Cobbler', 'Macarons', 'Brownies', 'Key Lime Pie', 'Lemon Bars'
  ],
  'Beverages': [
    'Soda', 'Coffee', 'Tea', 'Lemonade', 'Water', 'Juice', 'Beer', 'Wine',
    'Espresso', 'Cappuccino', 'Latte', 'Mocha', 'Hot Chocolate', 'Smoothie', 'Milkshake',
    'Iced Tea', 'Green Tea', 'Kombucha', 'Sparkling Water', 'Mojito', 'Margarita',
    'Whiskey', 'Gin & Tonic', 'Vodka Soda', 'Cocktail Special'
  ],
  'Sides': [
    'French Fries', 'Mashed Potatoes', 'Rice Pilaf', 'Coleslaw', 'Mac & Cheese', 
    'Steamed Vegetables', 'Sweet Potato Fries', 'Onion Rings', 'Garlic Bread',
    'Corn on the Cob', 'Baked Beans', 'Potato Salad', 'Caesar Salad', 'House Salad',
    'Quinoa', 'Wild Rice', 'Roasted Potatoes', 'Creamed Spinach', 'Brussels Sprouts'
  ],
  'Breakfast': [
    'Pancakes', 'Waffles', 'French Toast', 'Eggs Benedict', 'Omelette', 
    'Breakfast Burrito', 'Avocado Toast', 'Croissant', 'Bagel & Lox', 'Fruit Bowl',
    'Yogurt Parfait', 'Cinnamon Roll', 'Breakfast Sandwich', 'Hash Browns', 'Breakfast Platter',
    'Steak & Eggs', 'Huevos Rancheros', 'Frittata', 'Breakfast Potatoes', 'Bacon & Eggs'
  ],
  'Lunch': [
    'Club Sandwich', 'Caesar Wrap', 'Chicken Quesadilla', 'Tuna Melt', 'BLT', 
    'Grilled Cheese', 'Turkey Sandwich', 'Veggie Wrap', 'Quiche', 'Gyro',
    'Panini', 'Falafel Wrap', 'Cobb Salad', 'Soup & Sandwich', 'Chicken Salad',
    'Buffalo Chicken Wrap', 'Reuben Sandwich', 'Fish Tacos', 'Beef Burrito', 'Poke Bowl'
  ],
  'Dinner': [
    'Prime Rib', 'Roasted Chicken', 'Filet Mignon', 'Surf & Turf', 'Sea Bass', 
    'Rack of Lamb', 'Pork Tenderloin', 'Osso Buco', 'Beef Bourguignon', 'Stuffed Peppers',
    'Beef Short Ribs', 'Chicken Marsala', 'Grilled Swordfish', 'Veal Parmesan', 'Ribeye Steak',
    'Lamb Ragu', 'Duck Breast', 'Seafood Linguine', 'Baked Ziti', 'Shepherd\'s Pie'
  ],
  'Salads': [
    'Caesar Salad', 'Greek Salad', 'Cobb Salad', 'House Salad', 'Spinach Salad',
    'Caprese Salad', 'Waldorf Salad', 'Asian Chicken Salad', 'Tuna Niçoise', 'Kale Salad',
    'Quinoa Salad', 'Pasta Salad', 'Fruit Salad', 'Wedge Salad', 'Arugula Salad',
    'Southwest Salad', 'Chopped Salad', 'Beet Salad', 'Chicken Caesar', 'Steak Salad'
  ],
  'Soups': [
    'Tomato Soup', 'Chicken Noodle', 'French Onion', 'Clam Chowder', 'Minestrone',
    'Lentil Soup', 'Potato Leek', 'Butternut Squash', 'Beef Stew', 'Gazpacho',
    'Split Pea', 'Miso Soup', 'Chili', 'Lobster Bisque', 'Corn Chowder',
    'Mushroom Soup', 'Broccoli Cheddar', 'Tortilla Soup', 'Pho', 'Ramen'
  ],
  'Vegan': [
    'Beyond Burger', 'Impossible Meatballs', 'Vegan Pizza', 'Tofu Stir-Fry', 'Falafel Plate',
    'Vegan Curry', 'Cauliflower Steak', 'Veggie Pad Thai', 'Mushroom Risotto', 'Jackfruit Tacos',
    'Seitan Wings', 'Buddha Bowl', 'Vegan Lasagna', 'Tempeh Sandwich', 'Vegan Mac & Cheese',
    'Stuffed Bell Peppers', 'Zucchini Noodles', 'Eggplant Rollatini', 'Chickpea Burger', 'Acai Bowl'
  ],
  'Gluten-Free': [
    'Grilled Salmon', 'Steak & Vegetables', 'Stuffed Portobello', 'Rice Bowl', 'Quinoa Salad',
    'Grilled Chicken', 'Shrimp Skewers', 'Zoodles', 'Stuffed Peppers', 'Poke Bowl',
    'GF Pizza', 'Açaí Bowl', 'Cobb Salad', 'Risotto', 'Lettuce Wraps',
    'GF Pasta', 'Roasted Vegetables', 'Sushi Rolls', 'Taco Salad', 'Baked Potato'
  ],
  'Specials': [
    'Daily Special', 'Chef\'s Choice', 'Seasonal Item', 'Thanksgiving Dinner', 'Valentine\'s Special',
    'Weekend Brunch', 'Holiday Feast', 'Seasonal Catch', 'Harvest Special', 'Summer BBQ',
    'Winter Comfort Food', 'Spring Vegetable Plate', 'Autumn Harvest', 'Anniversary Dinner', 'Local Farm Special',
    'Fusion Special', 'International Dish', 'Sous Vide Feature', 'Smoked Meat Special', 'Seafood Platter'
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
    case 'Sides':
      return 'pizza';
    case 'Breakfast':
      return 'sunny';
    case 'Lunch':
      return 'nutrition';
    case 'Dinner':
      return 'restaurant-outline';
    case 'Salads':
      return 'leaf';
    case 'Soups':
      return 'water';
    case 'Vegan':
      return 'leaf-outline';
    case 'Gluten-Free':
      return 'fitness';
    case 'Specials':
      return 'star';
    default:
      return 'restaurant';
  }
}

// Menu item prices (new addition)
export const itemPrices: Record<string, number> = {};

// Generate prices for all menu items
Object.values(menuItems).flat().forEach(item => {
  // Generate a random price between $5.99 and $29.99
  itemPrices[item] = parseFloat((Math.random() * 24 + 5.99).toFixed(2));
});

// Popular menu items for recommendations
export const popularItems = [
  'Burger', 'Pizza', 'Nachos', 'Cheesecake', 'Coffee', 
  'Chocolate Cake', 'Chicken Wings', 'Pancakes', 'Caesar Salad', 'Steak'
];

// Dietary restrictions
export type DietaryRestriction = 'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Nut-Free' | 'Dairy-Free';

// Menu items with dietary restrictions
export const dietaryRestrictions: Record<string, DietaryRestriction[]> = {};

// Generate random dietary restrictions for items
Object.values(menuItems).flat().forEach(item => {
  const restrictions: DietaryRestriction[] = [];
  const allRestrictions: DietaryRestriction[] = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Nut-Free', 'Dairy-Free'];
  
  // Randomly assign dietary restrictions
  allRestrictions.forEach(restriction => {
    if (Math.random() > 0.7) {
      restrictions.push(restriction);
    }
  });
  
  // Ensure logical consistency (e.g., vegan is also vegetarian)
  if (restrictions.includes('Vegan') && !restrictions.includes('Vegetarian')) {
    restrictions.push('Vegetarian');
  }
  
  dietaryRestrictions[item] = restrictions;
});