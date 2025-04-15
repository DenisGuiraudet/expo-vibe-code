import React from 'react';
import { View, StyleSheet, ImageBackground, useWindowDimensions } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

interface SnowTextureBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
}

export function SnowTextureBackground({ intensity = 'medium' }: SnowTextureBackgroundProps) {
  const { width, height } = useWindowDimensions();
  const colorScheme = useColorScheme() ?? 'light';
  
  // Get base background color based on theme (now fully transparent)
  const getBaseColor = () => {
    return colorScheme === 'dark' 
      ? 'rgba(21, 23, 24, 0)'  // Dark mode base - fully transparent
      : 'rgba(245, 245, 245, 0)'; // Light mode base - fully transparent
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
  }
});