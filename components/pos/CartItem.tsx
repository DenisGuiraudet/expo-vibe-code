import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';

interface CartItemProps {
  name: string;
  quantity: number;
  onRemove: () => void;
}

export function CartItem({ name, quantity, onRemove }: CartItemProps) {
  const colorScheme = useColorScheme() ?? 'light';
  
  // Get gradient colors based on theme
  const getGradientColors = () => {
    return colorScheme === 'dark'
      ? ['rgba(50, 50, 50, 0.4)', 'rgba(40, 40, 40, 0.2)'] 
      : ['rgba(220, 220, 220, 0.6)', 'rgba(240, 240, 240, 0.4)']; // More visible in light mode
  };

  // Get border color based on theme
  const getBorderColor = () => {
    return colorScheme === 'dark'
      ? 'rgba(70, 70, 70, 0.8)'
      : 'rgba(190, 190, 190, 0.9)'; // Darker border in light mode
  };

  // Get bottom border color for item
  const getBottomBorderColor = () => {
    return colorScheme === 'dark' 
      ? 'rgba(129, 212, 250, 0.15)' 
      : 'rgba(129, 212, 250, 0.5)'; // More visible in light mode
  };
  
  // Enhanced shadow for better visibility in light mode
  const getShadowStyle = () => {
    return {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: colorScheme === 'dark' ? 2 : 3 },
      shadowOpacity: colorScheme === 'dark' ? 0.1 : 0.2,
      shadowRadius: colorScheme === 'dark' ? 4 : 6,
      elevation: colorScheme === 'dark' ? 2 : 4,
    };
  };

  return (
    <LinearGradient
      colors={getGradientColors()}
      style={[
        styles.orderItemGradient,
        getShadowStyle(),
        { 
          borderBottomColor: getBottomBorderColor(),
          borderColor: getBorderColor()
        }
      ]}
    >
      <View style={styles.orderItemRow}>
        <ThemedText style={styles.itemName}>{name}</ThemedText>
        <View style={styles.orderItemControls}>
          <TouchableOpacity
            style={[
              styles.orderMinusButton,
              { borderColor: getBorderColor() }
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
          <ThemedText style={[
            styles.quantityText, 
            { color: Colors[colorScheme].tint }
          ]}>x{quantity}</ThemedText>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  orderItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontWeight: '500',
  },
  orderItemControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderMinusButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
  },
  minusButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 18,
    textAlign: 'center',
  },
  quantityText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  orderItemGradient: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
  },
  minusButtonGradient: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});