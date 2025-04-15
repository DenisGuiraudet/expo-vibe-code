import React from 'react';
import { View, StyleSheet, ImageBackground, useWindowDimensions } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

interface SnowTextureBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
}

export function SnowTextureBackground({ intensity = 'medium' }: SnowTextureBackgroundProps) {
  const { width, height } = useWindowDimensions();
  const colorScheme = useColorScheme() ?? 'light';
  
  // Get base background color based on theme (completely transparent)
  const getBaseColor = () => {
    return colorScheme === 'dark' 
      ? 'rgba(21, 23, 24, 0.8)'  // Dark mode base - slightly transparent
      : 'rgba(245, 245, 245, 0.8)'; // Light mode base - slightly transparent
  };
  
  return (
    <View style={[styles.container, { width, height }]}>
      <View style={[styles.baseBackground, { backgroundColor: getBaseColor() }]} />
      <ImageBackground 
        source={require('@/assets/images/textures/snow.png')} 
        style={styles.backgroundImage}
        resizeMode="repeat"
      />
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
    zIndex: 0, // Use 0 instead of -1 as negative zIndex often doesn't work as expected
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
  }
});