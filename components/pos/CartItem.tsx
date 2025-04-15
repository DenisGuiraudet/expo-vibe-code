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
  
  return (
    <LinearGradient
      colors={['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.4)']}
      style={styles.orderItemGradient}
    >
      <View style={styles.orderItemRow}>
        <ThemedText style={styles.itemName}>{name}</ThemedText>
        <View style={styles.orderItemControls}>
          <TouchableOpacity
            style={styles.orderMinusButton}
            onPress={onRemove}
          >
            <LinearGradient
              colors={['rgba(255, 128, 171, 0.9)', 'rgba(255, 128, 171, 0.7)']}
              style={styles.minusButtonGradient}
            >
              <Text style={styles.minusButtonText}>-</Text>
            </LinearGradient>
          </TouchableOpacity>
          <ThemedText style={styles.quantityText}>x{quantity}</ThemedText>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  orderItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(129, 212, 250, 0.3)', // Light blue border
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Glass effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)', // Glass border
  },
  orderItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    color: '#333',
    fontWeight: '500',
  },
  orderItemControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderMinusButton: {
    backgroundColor: Colors.light.pink, // Pink button
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
    borderColor: 'rgba(255, 255, 255, 0.7)', // Glass border
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
    color: Colors.light.skyBlue, // Sky blue text
  },
  orderItemGradient: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(129, 212, 250, 0.3)', // Light blue border
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Glass effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)', // Glass border
  },
  minusButtonGradient: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});