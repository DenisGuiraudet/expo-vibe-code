import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';

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

  // Define gradient colors based on category
  const getCategoryGradient = (category: string) => {
    if (category.includes('Desserts') || category.includes('Appetizers') || category.includes('Specials')) {
      return ['rgba(255, 128, 171, 0.9)', 'rgba(255, 128, 171, 0.6)']; // Pink gradient
    } else {
      return ['rgba(129, 212, 250, 0.9)', 'rgba(129, 212, 250, 0.6)']; // Sky blue gradient
    }
  };

  return (
    <View style={styles.container}>
      {isCollapsed ? (
        <View style={styles.collapsedView}>
          <TouchableOpacity
            style={styles.selectedButton}
            onPress={() => setIsCollapsed(false)}
          >
            <LinearGradient
              colors={getCategoryGradient(selectedCategory)}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.selectedButtonGradient}
            >
              <ThemedText style={[styles.categoryText, { color: 'white' }]}>
                {selectedCategory}
              </ThemedText>
              <Ionicons name="chevron-down" size={20} color="white" />
            </LinearGradient>
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
                  borderColor: selectedCategory === category
                    ? 'rgba(255, 255, 255, 0.8)'
                    : 'rgba(255, 255, 255, 0.5)'
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
              {selectedCategory === category ? (
                <LinearGradient
                  colors={getCategoryGradient(category)}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.categoryButtonGradient}
                >
                  <ThemedText style={[styles.categoryText, { color: 'white' }]}>
                    {category}
                  </ThemedText>
                </LinearGradient>
              ) : (
                <View style={styles.categoryButtonInner}>
                  <ThemedText style={[styles.categoryText, { color: '#333' }]}>
                    {category}
                  </ThemedText>
                </View>
              )}
            </TouchableOpacity>
          ))}
          
          {/* Collapse button for tablet+ */}
          {!isSmallScreen && selectedCategory && (
            <TouchableOpacity
              style={styles.collapseButton}
              onPress={() => setIsCollapsed(true)}
            >
              <Ionicons name="chevron-up" size={20} color={Colors[colorScheme].pink} />
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
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Very light glass effect
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.8)', // Glass border
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
    borderRadius: 12, // More rounded for glassmorphic look
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
    minWidth: 120,
    backdropFilter: 'blur(10px)', // This only works on iOS
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
    borderRadius: 12, // More rounded for glassmorphic look
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)', // Glass border
  },
  collapseButton: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    marginRight: 12,
    borderRadius: 12, // More rounded for glassmorphic look
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Glass effect
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  selectedButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  categoryButtonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
  },
  categoryButtonInner: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});