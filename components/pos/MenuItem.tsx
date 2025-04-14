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
    width: '22%',  // Reduced from 30% to 22%
    margin: '1.5%', // Slightly reduced margins
    position: 'relative',
    minHeight: 60,  // Reduced from 80 to 60
  },
  menuItemButton: {
    width: '100%',
    padding: 8,     // Reduced from 12 to 8
    borderRadius: 8, // Reduced from 10 to 8
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    minHeight: 60,  // Reduced from 80 to 60
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, // Reduced shadow
    shadowOpacity: 0.1,
    shadowRadius: 2,  // Reduced from 3 to 2
    elevation: 2,     // Reduced from 3 to 2
  },
  itemText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 13,    // Added smaller font size
  },
  minusButton: {
    position: 'absolute',
    top: -6,           // Adjusted from -8 to -6
    right: -6,         // Adjusted from -8 to -6
    backgroundColor: '#FF6B6B',
    width: 20,         // Reduced from 24 to 20
    height: 20,        // Reduced from 24 to 20
    borderRadius: 10,  // Reduced from 12 to 10
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
    fontSize: 16,      // Reduced from 18 to 16
    fontWeight: 'bold',
    lineHeight: 18,    // Reduced from 20 to 18
    textAlign: 'center',
  },
  catalogQuantityBadge: {
    position: 'absolute',
    top: -5,           // Adjusted from -6 to -5
    left: -5,          // Adjusted from -6 to -5
    backgroundColor: Colors.light.tint,
    minWidth: 18,      // Reduced from 22 to 18
    height: 18,        // Reduced from 22 to 18
    borderRadius: 9,   // Reduced from 11 to 9
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
    fontSize: 10,      // Reduced from 12 to 10
    fontWeight: 'bold',
  },
});