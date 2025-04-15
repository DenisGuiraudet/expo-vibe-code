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
  categoryItemCounts?: Record<string, number>; // Add this new prop
}

export function CategorySelector({ 
  categories, 
  selectedCategory, 
  onSelectCategory,
  categoryItemCounts = {} // Add default empty object
}: CategorySelectorProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Get screen width to adjust button size
  const screenWidth = Dimensions.get('window').width;
  const isSmallScreen = screenWidth < 768; // Consider tablets at 768px+

  // Define gradient colors based on category and theme
  const getCategoryGradient = (category: string) => {
    if (category.includes('Desserts') || category.includes('Appetizers') || category.includes('Specials')) {
      return [
        'rgba(255, 128, 171, 0.9)', 
        'rgba(255, 128, 171, 0.6)'
      ]; // Pink gradient
    } else {
      return [
        'rgba(129, 212, 250, 0.9)', 
        'rgba(129, 212, 250, 0.6)'
      ]; // Sky blue gradient
    }
  };
  
  // Get button border color based on theme and selection state
  const getButtonBorderColor = (isSelected: boolean) => {
    if (colorScheme === 'dark') {
      return isSelected 
        ? 'rgba(100, 100, 100, 0.8)'
        : 'rgba(70, 70, 70, 0.5)';
    } else {
      return isSelected 
        ? 'rgba(180, 180, 180, 0.9)' // Darker border for selected in light mode
        : 'rgba(200, 200, 200, 0.8)'; // Darker border for unselected in light mode
    }
  };
  
  // Get container background color based on theme
  const getContainerBackground = () => {
    return colorScheme === 'dark'
      ? 'rgba(30, 30, 30, 0)' // Fully transparent
      : 'rgba(255, 255, 255, 0)'; // Fully transparent
  };
  
  // Get text color for unselected categories based on theme
  const getUnselectedTextColor = () => {
    return colorScheme === 'dark' ? '#E0E0E0' : '#333333'; // Darker text in light mode
  };

  // Get background color for unselected buttons
  const getUnselectedButtonBackground = () => {
    return colorScheme === 'dark' 
      ? 'rgba(50, 50, 50, 0.3)'
      : 'rgba(230, 230, 230, 0.5)'; // More visible in light mode
  };

  // Enhanced shadow for better visibility in light mode
  const getShadowStyle = () => {
    return {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: colorScheme === 'dark' ? 2 : 3 },
      shadowOpacity: colorScheme === 'dark' ? 0.15 : 0.25,
      shadowRadius: colorScheme === 'dark' ? 5 : 6,
      elevation: colorScheme === 'dark' ? 3 : 5,
    };
  };

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: getContainerBackground(),
        borderBottomColor: 'transparent'
      }
    ]}>
      {isCollapsed ? (
        <View style={styles.collapsedView}>
          <TouchableOpacity
            style={[
              styles.selectedButton,
              getShadowStyle(),
              { borderColor: getButtonBorderColor(true) }
            ]}
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
                getShadowStyle(),
                isSmallScreen && styles.categoryButtonMobile,
                { borderColor: getButtonBorderColor(selectedCategory === category) }
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
                  <View style={styles.categoryTextContainer}>
                    <ThemedText style={[styles.categoryText, { color: 'white' }]}>
                      {category}
                    </ThemedText>
                    {categoryItemCounts[category] > 0 && (
                      <View style={[styles.countBadge, styles.selectedCountBadge]}>
                        <ThemedText style={styles.countBadgeText}>{categoryItemCounts[category]}</ThemedText>
                      </View>
                    )}
                  </View>
                </LinearGradient>
              ) : (
                <View style={[
                  styles.categoryButtonInner,
                  { 
                    backgroundColor: getUnselectedButtonBackground()
                  }
                ]}>
                  <View style={styles.categoryTextContainer}>
                    <ThemedText style={[
                      styles.categoryText, 
                      { color: getUnselectedTextColor() }
                    ]}>
                      {category}
                    </ThemedText>
                    {categoryItemCounts[category] > 0 && (
                      <View style={[styles.countBadge, { backgroundColor: colorScheme === 'dark' ? 'rgba(80, 80, 80, 0.9)' : 'rgba(200, 200, 200, 0.9)' }]}>
                        <ThemedText style={[styles.countBadgeText, { color: getUnselectedTextColor() }]}>{categoryItemCounts[category]}</ThemedText>
                      </View>
                    )}
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
          
          {/* Collapse button for tablet+ */}
          {!isSmallScreen && selectedCategory && (
            <TouchableOpacity
              style={[
                styles.collapseButton,
                getShadowStyle(),
                { 
                  backgroundColor: colorScheme === 'dark' 
                    ? 'rgba(50, 50, 50, 0.5)' 
                    : 'rgba(230, 230, 230, 0.6)',
                  borderColor: getButtonBorderColor(false)
                }
              ]}
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
    borderBottomWidth: 1,
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
  },
  collapseButton: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    marginRight: 12,
    borderRadius: 12, // More rounded for glassmorphic look
    borderWidth: 1,
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
    borderRadius: 12,
  },
  categoryCount: {
    fontSize: 12,
    fontWeight: '400',
  },
  countBadge: {
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
    minWidth: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  categoryTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCountBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
});