import React from 'react';
import { View, StyleSheet, ImageBackground, useWindowDimensions } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';

interface SnowTextureBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
}

export function SnowTextureBackground({ intensity = 'medium' }: SnowTextureBackgroundProps) {
  const { width, height } = useWindowDimensions();
  const colorScheme = useColorScheme() ?? 'light';
  
  // Get base background color based on theme - now with subtle tint
  const getBaseColor = () => {
    return colorScheme === 'dark' 
      ? 'rgba(21, 23, 24, 0.05)'  // Very subtle dark background
      : 'rgba(245, 245, 245, 0.1)'; // Very subtle light background
  };
  
  // Get overlay gradient colors based on theme
  const getGradientColors = () => {
    if (colorScheme === 'dark') {
      return [
        'rgba(21, 23, 24, 0.05)', 
        'rgba(21, 23, 24, 0.1)'
      ];
    } else {
      // Light mode gets a subtle blue tint that enhances UI elements visibility
      return [
        'rgba(220, 240, 255, 0.05)',
        'rgba(220, 240, 255, 0.1)'
      ];
    }
  };
  
  return (
    <View style={[styles.container, { width, height }]}>
      <View style={[styles.baseBackground, { backgroundColor: getBaseColor() }]} />
      <ImageBackground 
        source={require('@/assets/images/textures/snow.png')} 
        style={styles.backgroundImage}
        resizeMode="repeat"
      >
        {/* Add a subtle gradient overlay to enhance contrast */}
        <LinearGradient
          colors={getGradientColors()}
          style={styles.gradientOverlay}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  baseBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    flex: 1,
    width: '100%',
    height: '100%',
  }
});