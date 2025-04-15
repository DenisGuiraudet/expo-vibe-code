import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';

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
  
  // Get gradient colors based on category and theme
  const getCategoryGradient = (category: string) => {
    // Light theme needs more opacity to be visible against snow background
    const lightOpacityBase = 0.35;
    const lightOpacityLow = 0.15;
    
    // Dark theme should be more subtle
    const darkOpacityBase = 0.15;
    const darkOpacityLow = 0.05;
    
    // Use theme-specific opacity values
    const opacityAdjust = colorScheme === 'dark' ? darkOpacityBase : lightOpacityBase;
    const opacityAdjustLow = colorScheme === 'dark' ? darkOpacityLow : lightOpacityLow;
    
    switch(category) {
      case 'Appetizers':
        return [
          `rgba(255, 128, 171, ${opacityAdjust})`, 
          `rgba(255, 128, 171, ${opacityAdjustLow})`
        ]; // Pink gradient
      case 'Main Courses':
        return [
          `rgba(129, 212, 250, ${opacityAdjust})`, 
          `rgba(129, 212, 250, ${opacityAdjustLow})`
        ]; // Sky blue gradient
      case 'Desserts':
        return [
          `rgba(255, 128, 171, ${opacityAdjust + 0.05})`, 
          `rgba(255, 128, 171, ${opacityAdjustLow + 0.05})`
        ]; // Darker pink gradient
      case 'Beverages':
        return [
          `rgba(129, 212, 250, ${opacityAdjust + 0.05})`, 
          `rgba(129, 212, 250, ${opacityAdjustLow + 0.05})`
        ]; // Darker sky blue gradient
      case 'Specials':
        return colorScheme === 'dark' 
          ? ['rgba(180, 160, 200, 0.15)', 'rgba(180, 160, 200, 0.05)']  // Dark purple for dark mode
          : ['rgba(180, 160, 200, 0.35)', 'rgba(180, 160, 200, 0.20)']; // More visible purple for light mode
      default:
        return colorScheme === 'dark'
          ? ['rgba(70, 70, 70, 0.3)', 'rgba(50, 50, 50, 0.15)']       // Dark gray for dark mode
          : ['rgba(160, 160, 160, 0.35)', 'rgba(190, 190, 190, 0.2)']; // Medium gray for light mode
    }
  };
  
  // Determine text color based on theme - better contrast in light mode
  const getTextColor = () => {
    return colorScheme === 'dark' ? '#E0E0E0' : '#333333';
  };

  // Shadow settings based on theme
  const getShadowStyle = () => {
    return colorScheme === 'dark' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 5,
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
    };
  };
  
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
          getShadowStyle(),
          { 
            borderColor: colorScheme === 'dark' 
              ? 'rgba(70, 70, 70, 0.7)' 
              : 'rgba(200, 200, 200, 0.9)' // Stronger border in light mode
          }
        ]}
        onPress={onAdd}
      >
        <LinearGradient
          colors={getCategoryGradient(category)}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.menuItemGradient}
        >
          <ThemedText style={[styles.itemText, { color: getTextColor() }]}>{name}</ThemedText>
          {quantity > 0 && (
            <View style={[
              styles.catalogQuantityBadge,
              { backgroundColor: Colors[colorScheme].skyBlue }
            ]}>
              <Text style={styles.catalogQuantityText}>{quantity}</Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
      {quantity > 0 && (
        <TouchableOpacity
          style={[
            styles.minusButton,
            { 
              borderColor: colorScheme === 'dark' 
                ? 'rgba(70, 70, 70, 0.7)' 
                : 'rgba(255, 255, 255, 0.9)' // Stronger border in light mode
            }
          ]}
          onPress={onRemove}
        >
          <LinearGradient
            colors={['rgba(255, 128, 171, 0.9)', 'rgba(255, 128, 171, 0.7)']}
            style={styles.minusButtonGradient}
          >
            <Text style={styles.minusButtonText}>-</Text>
          </LinearGradient>
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
    borderRadius: 12, // More rounded corners for glassmorphic look
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    minHeight: 80,
    aspectRatio: 1, // Make buttons square
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    backdropFilter: 'blur(10px)', // This only works on iOS
  },
  menuItemGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
  minusButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
  },
  minusButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
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
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)', // Glass border
  },
  catalogQuantityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});