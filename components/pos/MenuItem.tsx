import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface MenuItemProps {
  name: string;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  category: string;
}

export function MenuItem({ name, quantity, onAdd, onRemove, category }: MenuItemProps) {
  const colorScheme = useColorScheme() ?? 'light';
  
  // Get background color based on category
  const getCategoryColor = (category: string): string => {
    switch(category) {
      case 'Appetizers':
        return '#FFD580'; // Light orange
      case 'Main Courses':
        return '#B5EAD7'; // Mint green
      case 'Desserts':
        return '#FF9AA2'; // Light pink
      case 'Beverages':
        return '#C7CEEA'; // Light blue
      case 'Specials':
        return '#FFC8DD'; // Light purple
      default:
        return '#E2E2E2'; // Default gray
    }
  };

  const backgroundColor = getCategoryColor(category);
  
  return (
    <View style={styles.menuItemContainer}>
      <TouchableOpacity
        style={[
          styles.menuItemButton,
          { 
            backgroundColor: 
              colorScheme === 'dark' 
                ? `${backgroundColor}80` // Add transparency for dark mode
                : backgroundColor
          }
        ]}
        onPress={onAdd}
      >
        <ThemedText style={styles.itemText}>{name}</ThemedText>
        {quantity > 0 && (
          <View style={styles.catalogQuantityBadge}>
            <Text style={styles.catalogQuantityText}>{quantity}</Text>
          </View>
        )}
      </TouchableOpacity>
      {quantity > 0 && (
        <TouchableOpacity
          style={styles.minusButton}
          onPress={onRemove}
        >
          <Text style={styles.minusButtonText}>-</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuItemContainer: {
    width: '30%',
    margin: '1.66%',
    position: 'relative',
    minHeight: 80,
  },
  menuItemButton: {
    width: '100%',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    minHeight: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  itemText: {
    textAlign: 'center',
    fontWeight: '500',
  },
  minusButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF6B6B',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  minusButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
    textAlign: 'center',
  },
  catalogQuantityBadge: {
    position: 'absolute',
    top: -6,
    left: -6,
    backgroundColor: Colors.light.tint,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  catalogQuantityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});