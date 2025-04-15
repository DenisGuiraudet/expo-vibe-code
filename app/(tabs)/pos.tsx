import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Image, Dimensions, SafeAreaView, Text, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Added LinearGradient import back

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MenuItem } from '@/components/pos/MenuItem';
import { CartItem } from '@/components/pos/CartItem';
import { CategorySelector } from '@/components/pos/CategorySelector';
import { Category, OrderItem } from '@/types/pos';
import { categories, menuItems, getCategoryIcon } from '@/constants/pos/menuData';
import { ThemeToggleButton } from '@/components/ui/ThemeToggleButton';
import { SnowTextureBackground } from '@/components/ui/SnowTextureBackground';
import { SnowBackground } from '@/components/ui/SnowBackground';

export default function POSScreen() {
  const [selectedCategory, setSelectedCategory] = React.useState<Category>('Appetizers');
  const [orderItems, setOrderItems] = React.useState<OrderItem[]>([]);
  const [showCart, setShowCart] = React.useState(false);
  const colorScheme = useColorScheme() ?? 'light';
  
  // Get screen dimensions with real-time updates
  const [screenWidth, setScreenWidth] = React.useState(Dimensions.get('window').width);
  const isSmallScreen = screenWidth < 768; // Consider phones below 768px

  // Count items by category
  const getCategoryItemCount = (category: Category): number => {
    return orderItems.reduce((count, item) => {
      if (item.category === category) {
        return count + item.quantity;
      }
      return count;
    }, 0);
  };

  // Create a map of category counts for the CategorySelector
  const getCategoryCounts = (): Record<string, number> => {
    const counts: Record<string, number> = {};
    
    // Initialize all categories with zero count
    categories.forEach(category => {
      counts[category] = 0;
    });
    
    // Count items for each category
    orderItems.forEach(item => {
      if (counts[item.category]) {
        counts[item.category] += item.quantity;
      } else {
        counts[item.category] = item.quantity;
      }
    });
    
    return counts;
  };

  // Add event listener for screen dimension changes
  React.useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    // Set up the event listener
    const dimensionsListener = Dimensions.addEventListener('change', updateScreenWidth);

    // Clean up the listener when the component unmounts
    return () => {
      dimensionsListener.remove();
    };
  }, []);

  const addToOrder = (item: string) => {
    setOrderItems(currentItems => {
      // Check if item already exists in the order
      const existingItemIndex = currentItems.findIndex(
        orderItem => orderItem.name === item
      );
      
      if (existingItemIndex !== -1) {
        // Item exists, increment its quantity
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // Item doesn't exist, add it with quantity 1
        return [...currentItems, { 
          name: item, 
          quantity: 1,
          price: 10,
          category: selectedCategory,
          id: Date.now().toString(),
          timestamp: Date.now()
        }];
      }
    });
  };

  const removeFromOrder = (item: string) => {
    setOrderItems(currentItems => {
      // Find the item in the order
      const existingItemIndex = currentItems.findIndex(
        orderItem => orderItem.name === item
      );
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...currentItems];
        const currentQuantity = updatedItems[existingItemIndex].quantity;
        
        if (currentQuantity > 1) {
          // Decrease quantity if more than 1
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: currentQuantity - 1
          };
          return updatedItems;
        } else {
          // Remove item completely if quantity is 1
          return updatedItems.filter((_, index) => index !== existingItemIndex);
        }
      }
      return currentItems;
    });
  };

  const clearOrder = () => {
    setOrderItems([]);
  };

  // Get item quantity from order
  const getItemQuantity = (itemName: string): number => {
    const item = orderItems.find(item => item.name === itemName);
    return item ? item.quantity : 0;
  };

  // Calculate total items
  const totalItems = orderItems.reduce((total, item) => total + item.quantity, 0);

  // Calculate subtotal
  const calculateSubtotal = () => {
    // In a real app, you'd have prices for each item
    // For this example, let's use a fixed price of $10 per item
    return orderItems.reduce((total, item) => total + (item.quantity * 10), 0);
  };

  const subtotal = calculateSubtotal();

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const currentDate = "April 15, 2025";

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Snow texture background layer */}
      <SnowTextureBackground intensity="high" />
      
      {/* Animated falling snow overlay */}
      <SnowBackground intensity="medium" />
      
      <ThemedView style={styles.container}>
        {/* Header with semi-transparent background */}
        <LinearGradient
          colors={colorScheme === 'dark' 
            ? ['rgba(30, 30, 30, 0.75)', 'rgba(20, 20, 20, 0.65)']
            : ['rgba(255, 255, 255, 0.75)', 'rgba(240, 240, 240, 0.65)']}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              {/* Use logo-dark.png for dark theme and logo.png for light theme */}
              <View style={styles.restaurantLogoContainer}>
                <Image 
                  source={colorScheme === 'dark' 
                    ? require('@/assets/images/logo-dark.png') 
                    : require('@/assets/images/logo.png')} 
                  style={styles.logoImage} 
                />
              </View>
              <ThemedText type="title" style={isSmallScreen && styles.smallTitle}>Restaurant POS</ThemedText>
            </View>
            
            <View style={styles.headerRight}>
              <ThemedText style={styles.dateText}>{currentDate}</ThemedText>
              
              <ThemeToggleButton size={40} />
              
              {/* Cart button for mobile */}
              {isSmallScreen && (
                <TouchableOpacity 
                  style={[styles.cartButton, { backgroundColor: colorScheme === 'dark' ? 'rgba(50, 50, 50, 0.8)' : 'rgba(255, 255, 255, 0.8)' }]} 
                  onPress={toggleCart}
                >
                  <Ionicons name="cart" size={24} color={Colors[colorScheme].tint} />
                  {totalItems > 0 && (
                    <View style={[styles.cartBadge, { backgroundColor: Colors[colorScheme].pink }]}>
                      <ThemedText style={styles.cartBadgeText}>{totalItems}</ThemedText>
                    </View>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </LinearGradient>
        
        {/* Category Selection */}
        <CategorySelector 
          categories={categories} 
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => setSelectedCategory(category as Category)}
          categoryItemCounts={getCategoryCounts()}
        />
        
        {/* Main Content */}
        <View style={[
          styles.contentContainer,
          isSmallScreen && (showCart ? styles.hiddenContentMobile : styles.visibleContentMobile)
        ]}>
          {/* Menu Items */}
          <View style={[
            styles.menuItemsContainer,
            { backgroundColor: 'transparent' }, // Changed to transparent
            { borderColor: colorScheme === 'dark' ? 'rgba(70, 70, 70, 0.8)' : 'rgba(255, 255, 255, 0.8)' },
            isSmallScreen && styles.menuItemsContainerMobile
          ]}>
            <View style={styles.categoryHeader}>
              <ThemedText type="subtitle">{selectedCategory}</ThemedText>
              <Ionicons 
                name={getCategoryIcon(selectedCategory)} 
                size={24} 
                color={Colors[colorScheme].tint} 
              />
            </View>
            
            <ScrollView style={styles.menuScroll}>
              <View style={[
                styles.itemsGrid,
                isSmallScreen ? styles.itemsGridMobile : (screenWidth >= 1200 ? styles.itemsGridLarge : null)
              ]}>
                {menuItems[selectedCategory].map((item) => (
                  <MenuItem
                    key={item}
                    name={item}
                    quantity={getItemQuantity(item)}
                    onAdd={() => addToOrder(item)}
                    onRemove={() => removeFromOrder(item)}
                    category={selectedCategory}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
          
          {/* Order List - only visible on tablet+ by default - removed background */}
          {!isSmallScreen && (
            <View style={[
              styles.orderContainer, 
              { borderColor: colorScheme === 'dark' ? 'rgba(70, 70, 70, 0.8)' : 'rgba(255, 255, 255, 0.8)' },
              { borderLeftColor: colorScheme === 'dark' ? 'rgba(129, 212, 250, 0.15)' : 'rgba(129, 212, 250, 0.3)' }
            ]}>
              <ThemedView style={[
                styles.orderHeader,
                { borderBottomColor: colorScheme === 'dark' ? 'rgba(129, 212, 250, 0.15)' : 'rgba(129, 212, 250, 0.3)' }
              ]} transparent={true}>
                <View style={styles.orderHeaderTitle}>
                  <Ionicons name="cart" size={24} color={Colors[colorScheme].tint} />
                  <ThemedText type="subtitle" style={styles.orderTitle}>Current Order</ThemedText>
                </View>
                <TouchableOpacity onPress={clearOrder} style={[
                  styles.clearButton,
                  { borderColor: colorScheme === 'dark' ? 'rgba(70, 70, 70, 0.5)' : 'rgba(255, 255, 255, 0.5)' }
                ]}>
                  <Ionicons name="trash" size={18} color="white" />
                </TouchableOpacity>
              </ThemedView>
              
              <ScrollView style={styles.orderItems}>
                {orderItems.length > 0 ? (
                  orderItems.map((item, index) => (
                    <CartItem
                      key={index}
                      name={item.name}
                      quantity={item.quantity}
                      onRemove={() => removeFromOrder(item.name)}
                    />
                  ))
                ) : (
                  <ThemedText style={styles.emptyOrder}>No items in order</ThemedText>
                )}
              </ScrollView>
              
              {orderItems.length > 0 && (
                <ThemedView style={[
                  styles.orderSummary,
                  { borderTopColor: colorScheme === 'dark' ? 'rgba(129, 212, 250, 0.15)' : 'rgba(129, 212, 250, 0.3)' }
                ]}>
                  <View style={styles.subtotalRow}>
                    <ThemedText style={styles.subtotalText}>Subtotal:</ThemedText>
                    <ThemedText style={styles.subtotalAmount}>${subtotal.toFixed(2)}</ThemedText>
                  </View>
                  <TouchableOpacity style={[
                    styles.checkoutButton,
                    { borderColor: colorScheme === 'dark' ? 'rgba(70, 70, 70, 0.7)' : 'rgba(255, 255, 255, 0.7)' }
                  ]}>
                    <Ionicons name="card" size={20} color="white" style={styles.checkoutIcon} />
                    <ThemedText style={styles.checkoutText}>
                      Checkout ({totalItems} items)
                    </ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              )}
            </View>
          )}
        </View>
        
        {/* Mobile Cart View - only visible when showCart is true - removed background */}
        {isSmallScreen && showCart && (
          <View style={styles.mobileCartContainer}>
            <ThemedView style={[
              styles.orderHeader,
              { borderBottomColor: colorScheme === 'dark' ? 'rgba(129, 212, 250, 0.15)' : 'rgba(129, 212, 250, 0.3)' }
            ]} transparent={true}>
              <View style={styles.orderHeaderTitle}>
                <TouchableOpacity 
                  onPress={toggleCart} 
                  style={[
                    styles.backButton,
                    { backgroundColor: colorScheme === 'dark' ? 'rgba(60, 60, 60, 0.7)' : 'rgba(255, 255, 255, 0.7)' }
                  ]}
                >
                  <Ionicons name="arrow-back" size={24} color={Colors[colorScheme].tint} />
                </TouchableOpacity>
                <ThemedText type="subtitle">Current Order</ThemedText>
              </View>
              <TouchableOpacity 
                onPress={clearOrder} 
                style={[
                  styles.clearButton,
                  { borderColor: colorScheme === 'dark' ? 'rgba(70, 70, 70, 0.5)' : 'rgba(255, 255, 255, 0.5)' }
                ]}
              >
                <Ionicons name="trash" size={18} color="white" />
              </TouchableOpacity>
            </ThemedView>
            
            <ScrollView style={styles.orderItems}>
              {orderItems.length > 0 ? (
                orderItems.map((item, index) => (
                  <CartItem
                    key={index}
                    name={item.name}
                    quantity={item.quantity}
                    onRemove={() => removeFromOrder(item.name)}
                  />
                ))
              ) : (
                <ThemedText style={styles.emptyOrder}>No items in order</ThemedText>
              )}
            </ScrollView>
            
            {orderItems.length > 0 && (
              <ThemedView style={[
                styles.orderSummary,
                { borderTopColor: colorScheme === 'dark' ? 'rgba(129, 212, 250, 0.15)' : 'rgba(129, 212, 250, 0.3)' }
              ]}>
                <View style={styles.subtotalRow}>
                  <ThemedText style={styles.subtotalText}>Subtotal:</ThemedText>
                  <ThemedText style={styles.subtotalAmount}>${subtotal.toFixed(2)}</ThemedText>
                </View>
                <TouchableOpacity style={[
                  styles.checkoutButton,
                  { borderColor: colorScheme === 'dark' ? 'rgba(70, 70, 70, 0.7)' : 'rgba(255, 255, 255, 0.7)' }
                ]}>
                  <Ionicons name="card" size={20} color="white" style={styles.checkoutIcon} />
                  <ThemedText style={styles.checkoutText}>
                    Checkout ({totalItems} items)
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
            )}
          </View>
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'transparent',
  },
  headerGradient: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 128, 171, 0.3)', // Soft pink border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 0, // Remove margin if it was there
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  header: {
    padding: 0, // Removed padding since it's moved to headerGradient
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    borderBottomWidth: 0,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantLogoContainer: {
    marginRight: 10,
  },
  logoImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  smallTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
  },
  cartButton: {
    position: 'relative',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    gap: 8,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: 'transparent',
  },
  visibleContentMobile: {
    display: 'flex',
  },
  hiddenContentMobile: {
    display: 'none',
  },
  menuItemsContainer: {
    flex: 2,
    marginRight: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    padding: 16,
    borderWidth: 1,
  },
  menuItemsContainerMobile: {
    flex: 1,
    marginRight: 0,
    backgroundColor: 'transparent',
  },
  menuScroll: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 20,
    justifyContent: 'flex-start',
    width: '100%',
  },
  itemsGridMobile: {
    justifyContent: 'space-between',
  },
  itemsGridLarge: {
    justifyContent: 'flex-start',
  },
  orderContainer: {
    flex: 1,
    borderLeftWidth: 1,
    paddingLeft: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    padding: 16,
    borderWidth: 1,
    backgroundColor: 'transparent', // Explicitly set to transparent
  },
  mobileCartContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    padding: 16,
    paddingTop: 0,
    backgroundColor: 'transparent', // Explicitly set to transparent
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  orderHeaderTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  orderTitle: {
    marginLeft: 4,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: 'rgba(255, 107, 107, 0.8)', // Semi-transparent red
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  orderItems: {
    flex: 1,
  },
  emptyOrder: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 40,
    opacity: 0.6,
  },
  orderSummary: {
    marginTop: 16,
    borderTopWidth: 1,
    paddingTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: 'transparent', // Explicitly set to transparent
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  subtotalText: {
    fontWeight: '600',
  },
  subtotalAmount: {
    fontWeight: '700',
    fontSize: 18,
  },
  checkoutButton: {
    backgroundColor: 'rgba(129, 212, 250, 0.8)', // Semi-transparent sky blue
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    borderWidth: 1,
  },
  checkoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
  checkoutIcon: {
    marginRight: 8,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    zIndex: 5,
    borderWidth: 1,
  },
  fabBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  }
  // Removed gradientBackground style
});