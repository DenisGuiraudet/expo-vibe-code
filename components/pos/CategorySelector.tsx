import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategorySelector({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategorySelectorProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Get screen width to adjust button size
  const screenWidth = Dimensions.get('window').width;
  const isSmallScreen = screenWidth < 768; // Consider tablets at 768px+

  return (
    <View style={styles.container}>
      {isCollapsed ? (
        <View style={styles.collapsedView}>
          <TouchableOpacity
            style={[
              styles.selectedButton,
              { backgroundColor: Colors[colorScheme].tint }
            ]}
            onPress={() => setIsCollapsed(false)}
          >
            <ThemedText style={[styles.categoryText, { color: 'white' }]}>
              {selectedCategory}
            </ThemedText>
            <Ionicons name="chevron-down" size={20} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoryContainer}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                isSmallScreen && styles.categoryButtonMobile,
                {
                  backgroundColor: selectedCategory === category 
                    ? Colors[colorScheme].tint 
                    : Colors[colorScheme].background,
                  borderColor: selectedCategory === category
                    ? Colors[colorScheme].tint
                    : '#ddd'
                }
              ]}
              onPress={() => {
                onSelectCategory(category);
                // Collapse after selection on mobile devices
                if (isSmallScreen) {
                  setIsCollapsed(true);
                }
              }}
            >
              <ThemedText 
                style={[
                  styles.categoryText,
                  selectedCategory === category ? { color: 'white' } : undefined
                ]}
              >
                {category}
              </ThemedText>
            </TouchableOpacity>
          ))}
          
          {/* Collapse button for tablet+ */}
          {!isSmallScreen && selectedCategory && (
            <TouchableOpacity
              style={styles.collapseButton}
              onPress={() => setIsCollapsed(true)}
            >
              <Ionicons name="chevron-up" size={20} color={Colors[colorScheme].text} />
            </TouchableOpacity>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  categoryContainer: {
    paddingVertical: 12,
    marginBottom: 8,
  },
  categoryContent: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginRight: 12,
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minWidth: 120,
  },
  categoryButtonMobile: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginRight: 8,
    minWidth: 100,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  collapsedView: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  selectedButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  collapseButton: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    marginRight: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});