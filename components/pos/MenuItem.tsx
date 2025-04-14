import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
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
  
  // Get screen width to adjust item size
  const screenWidth = Dimensions.get('window').width;
  const isSmallScreen = screenWidth < 600; // Phone
  const isMediumScreen = screenWidth >= 600 && screenWidth < 900; // Small tablet
  const isLargeScreen = screenWidth >= 1200; // Large desktop
  
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
    <View style={[
      styles.menuItemContainer,
      isSmallScreen && styles.menuItemContainerSmall,
      isMediumScreen && styles.menuItemContainerMedium,
      isLargeScreen && styles.menuItemContainerLarge
    ]}>
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
    width: '23.5%', // Slightly adjusted to work better with space-between
    margin: '0.5%',
    position: 'relative',
    minHeight: 80,
  },
  menuItemContainerSmall: {
    width: '48%', // Two items per row on small screens
    margin: '1%',
    minHeight: 80,
    maxWidth: 'none',
  },
  menuItemContainerMedium: {
    width: '31.33%', // Three items per row
    margin: '1%',
    minHeight: 80,
    maxWidth: 'none', // Remove max width constraint
  },
  menuItemContainerLarge: {
    width: '19%', // Five items per row on large screens
    margin: '0.5%',
    minHeight: 100,
    maxWidth: 'none', // Remove max width constraint
  },
  menuItemButton: {
    width: '100%',
    height: '100%',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    minHeight: 80,
    aspectRatio: 1, // Make buttons square
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
  },
  minusButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF6B6B',
    width: 28,
    height: 28,
    borderRadius: 14,
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
    minWidth: 24,
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
  catalogQuantityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});