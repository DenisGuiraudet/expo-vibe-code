import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MenuItem } from '@/components/pos/MenuItem';
import { CartItem } from '@/components/pos/CartItem';
import { CategorySelector } from '@/components/pos/CategorySelector';
import { Category, OrderItem } from '@/types/pos';
import { categories, menuItems, getCategoryIcon } from '@/constants/pos/menuData';

export default function POSScreen() {
  const [selectedCategory, setSelectedCategory] = React.useState<Category>('Appetizers');
  const [orderItems, setOrderItems] = React.useState<OrderItem[]>([]);
  const colorScheme = useColorScheme() ?? 'light';

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
        return [...currentItems, { name: item, quantity: 1 }];
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

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('@/assets/images/react-logo.png')} 
              style={styles.logo} 
              resizeMode="contain"
            />
            <ThemedText type="title">Restaurant POS</ThemedText>
          </View>
          <ThemedText style={styles.dateText}>April 14, 2025</ThemedText>
        </View>
      </ThemedView>
      
      {/* Category Selection */}
      <CategorySelector 
        categories={categories} 
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => setSelectedCategory(category as Category)}
      />
      
      {/* Main Content */}
      <View style={styles.contentContainer}>
        <View style={styles.menuItemsContainer}>
          <View style={styles.categoryHeader}>
            <ThemedText type="subtitle">{selectedCategory}</ThemedText>
            <Ionicons 
              name={getCategoryIcon(selectedCategory)} 
              size={24} 
              color={Colors[colorScheme].tint} 
            />
          </View>
          
          <ScrollView style={styles.menuScroll}>
            <View style={styles.itemsGrid}>
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
        
        {/* Order List */}
        <View style={styles.orderContainer}>
          <ThemedView style={styles.orderHeader}>
            <View style={styles.orderHeaderTitle}>
              <Ionicons name="cart" size={24} color={Colors[colorScheme].tint} />
              <ThemedText type="subtitle" style={styles.orderTitle}>Current Order</ThemedText>
            </View>
            <TouchableOpacity onPress={clearOrder} style={styles.clearButton}>
              <Ionicons name="trash" size={18} color="white" />
              <ThemedText style={styles.clearButtonText}>Clear</ThemedText>
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
            <ThemedView style={styles.orderSummary}>
              <View style={styles.subtotalRow}>
                <ThemedText style={styles.subtotalText}>Subtotal:</ThemedText>
                <ThemedText style={styles.subtotalAmount}>${subtotal.toFixed(2)}</ThemedText>
              </View>
              <TouchableOpacity style={styles.checkoutButton}>
                <Ionicons name="card" size={20} color="white" style={styles.checkoutIcon} />
                <ThemedText style={styles.checkoutText}>
                  Checkout ({totalItems} items)
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          )}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  dateText: {
    fontSize: 16,
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
  },
  menuItemsContainer: {
    flex: 2,
    marginRight: 16,
  },
  menuScroll: {
    flex: 1,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 20,
  },
  orderContainer: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#eee',
    paddingLeft: 16,
    borderRadius: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  orderHeaderTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderTitle: {
    marginLeft: 4,
  },
  clearButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
    borderTopColor: '#eee',
    paddingTop: 16,
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
    backgroundColor: '#4CAF50',
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
  },
  checkoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
  checkoutIcon: {
    marginRight: 8,
  }
});