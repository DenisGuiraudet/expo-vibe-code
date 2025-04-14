import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface CartItemProps {
  name: string;
  quantity: number;
  onRemove: () => void;
}

export function CartItem({ name, quantity, onRemove }: CartItemProps) {
  return (
    <ThemedView style={styles.orderItem}>
      <View style={styles.orderItemRow}>
        <ThemedText>{name}</ThemedText>
        <View style={styles.orderItemControls}>
          <TouchableOpacity
            style={styles.orderMinusButton}
            onPress={onRemove}
          >
            <Text style={styles.minusButtonText}>-</Text>
          </TouchableOpacity>
          <ThemedText style={styles.quantityText}>x{quantity}</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  orderItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 4,
    borderRadius: 8,
  },
  orderItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderItemControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderMinusButton: {
    backgroundColor: '#FF6B6B',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
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
  quantityText: {
    fontWeight: 'bold',
  },
});